import altspace from 'altspace'
import { setFullStateFromSnapshot, receiveResponse, receiveArea, receiveUser } from './actions'
import { getCurrentArea, getInstanceId } from '../core'

let firebaseConnection, firebaseAppInstance
function initFirebaseConnection() {
  return new Promise(function(resolve, reject) {
    // See http://altspacevr.github.io/AltspaceSDK/doc/sync.html#connect
    altspace.utilities.sync.connect({
        // Use own Firebase database
        baseRefUrl: 'https://agile-space.firebaseio.com/',
        // All sync instances with the same instance id will share
        // properties.
        // instanceId: getInstanceId(),
        // This helps to prevent collisions.
        authorId: 'immersionftw.com',
        appId: 'agile-space'
    }).then((connection) => {
      // See http://altspacevr.github.io/AltspaceSDK/doc/sync-Connection.html
      firebaseConnection = connection
      firebaseAppInstance = connection.instance
      resolve(connection)
    })
  })
}

let myPlayerId
export function saveUser(playerId, name) {
  myPlayerId = playerId
  let usersRef = firebaseAppInstance.child('users')
  usersRef.child(playerId).update({ name })
}

export function saveResponse(color) {
  if (myPlayerId) {
    let currentArea = getCurrentArea()
    let areasRef = firebaseAppInstance.child('areas')

    let response = {}
    response[myPlayerId] = color

    areasRef.child(currentArea).update(response)
  } else {
    console.error('No player id!')
  }
}

export function saveArea(area, onComplete) {
  firebaseAppInstance.update({ currentArea: area}, onComplete)
}

export function saveTableAngle(tableAngle) {
  let usersRef = firebaseAppInstance.child('users')
  usersRef.child(myPlayerId).update({ tableAngle })
}

export function initRead(store) {
  return new Promise(function(resolve, reject) {
    initFirebaseConnection().then(() => {
      // Debugging
      firebaseAppInstance.on("value", function(snapshot) {
        console.log(snapshot.val());
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

      // Initial state from Firebase
      firebaseAppInstance.once("value", (snapshot) => {
        store.dispatch(setFullStateFromSnapshot(snapshot.val()))

        // Needed to get data for the first area
        let initialArea = getCurrentArea()

        // Ensure we have a current area in Firebase, then listen for changes to it
        ensureCurrentArea(store, initialArea).then((currentArea) => {
          firebaseAppInstance.child('currentArea').on('value', onCurrentAreaChanged.bind(this, store))
          listenToNewArea(store, null, currentArea)

          // We need to know where users are
          listenToUsers(store)

          // All done with initialization
          resolve(store)
        })
      })
    })
  })
}

function onSelectedColorsReceived(store, snapshot) {
  let responsesObject = snapshot.val()
  if (!responsesObject) {
    return
  }

  let responsesMap = new Map(Object.entries(responsesObject))
  responsesMap.forEach((color, playerId) => {
    store.dispatch(receiveResponse(color, playerId))
  })
}

function onSelectedColorChanged(store, snapshot) {
  let playerId = snapshot.key()
  let color = snapshot.val()
  store.dispatch(receiveResponse(color, playerId))
}

function onUsersReceived(store, snapshot) {
  let usersObject = snapshot.val()
  if (!usersObject) {
    return
  }

  let usersMap = new Map(Object.entries(usersObject))
  usersMap.forEach((attributes, playerId) => {
    store.dispatch(receiveUser(playerId, attributes.name, attributes.tableAngle || 0))
  })
}

function onUserChanged(store, snapshot) {
  let playerId = snapshot.key()
  let attributes = snapshot.val()
  store.dispatch(receiveUser(playerId, attributes.name, attributes.tableAngle))
}

function onCurrentAreaChanged(store, snapshot) {
  let oldArea = getCurrentArea()
  let newArea = snapshot.val()
  listenToNewArea(store, oldArea, newArea)
  store.dispatch(receiveArea(newArea))
}

function listenToNewArea(store, oldArea, newArea) {
  // Unsubscribe all listeners on old area
  if (oldArea) {
    let oldAreaRef = firebaseAppInstance.child('areas').child(oldArea)
    oldAreaRef.off()
  }

  // Subscribe to events on new area
  let newAreaRef = firebaseAppInstance.child('areas').child(newArea)
  newAreaRef.once('value', onSelectedColorsReceived.bind(this, store))
  newAreaRef.on('child_added', onSelectedColorChanged.bind(this, store))
  newAreaRef.on('child_changed', onSelectedColorChanged.bind(this, store))
}

function ensureCurrentArea(store, initialArea) {
  return new Promise(function(resolve, reject) {
    firebaseAppInstance.child('currentArea').once('value', (snapshot) => {
      if (snapshot.exists()) {
        let newArea = snapshot.val()
        store.dispatch(receiveArea(newArea))
        resolve(newArea)
      } else {
        store.dispatch(receiveArea(initialArea))
        saveArea(initialArea, () => {
          resolve(initialArea)
        })
      }
    })
  })
}

function listenToUsers(store) {
  let usersRef = firebaseAppInstance.child('users')
  usersRef.once('value', onUsersReceived.bind(this, store))
  usersRef.on('child_added', onUserChanged.bind(this, store))
  usersRef.on('child_changed', onUserChanged.bind(this, store))
}