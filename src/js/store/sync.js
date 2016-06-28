import altspace from 'altspace'
import { receiveResponse, receiveArea, receiveUser } from './actions'
import { getCurrentArea, getInstanceId } from '../core'

const FIREBASE_REF = altspace.utilities.sync.getInstance({
    // All sync instances with the same instance id will share
    // properties.
    instanceId: getInstanceId(),
    // This helps to prevent collisions.
    authorId: 'com.immersionftw.agile-space'
})

let myPlayerId

export function saveUser(playerId, name) {
  myPlayerId = playerId
  let usersRef = FIREBASE_REF.child('users')
  usersRef.child(playerId).update({ name })
}

export function saveResponse(color) {
  if (myPlayerId) {
    let currentArea = getCurrentArea()
    let areasRef = FIREBASE_REF.child('areas')

    let response = {}
    response[myPlayerId] = color

    areasRef.child(currentArea).update(response)
  } else {
    console.error('No player id!')
  }
}

export function saveArea(area, onComplete) {
  FIREBASE_REF.update({ currentArea: area}, onComplete)
}

export function saveTableAngle(tableAngle) {
  let usersRef = FIREBASE_REF.child('users')
  usersRef.child(myPlayerId).update({ tableAngle })
}

export function initRead(store) {
  // Debugging
  FIREBASE_REF.on("value", function(snapshot) {
    console.log(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  // Needed to get data for the first area
  let initialArea = getCurrentArea()
  listenToNewArea(store, null, initialArea)

  // Ensure we have a current area in Firebase, then listen for changes to it
  ensureCurrentArea(initialArea).then(() => {
    FIREBASE_REF.child('currentArea').on('value', onCurrentAreaChanged.bind(this, store))
  })

  // We need to know where users are
  listenToUsers(store)
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
    let oldAreaRef = FIREBASE_REF.child('areas').child(oldArea)
    oldAreaRef.off()
  }

  // Subscribe to events on new area
  let newAreaRef = FIREBASE_REF.child('areas').child(newArea)
  newAreaRef.once('value', onSelectedColorsReceived.bind(this, store))
  newAreaRef.on('child_added', onSelectedColorChanged.bind(this, store))
  newAreaRef.on('child_changed', onSelectedColorChanged.bind(this, store))
}

function ensureCurrentArea(initialArea) {
  return new Promise(function(resolve, reject) {
    FIREBASE_REF.child('currentArea').once('value', (snapshot) => {
      if (snapshot.exists()) {
        resolve()
      } else {
        saveArea(initialArea, () => {
          resolve()
        })
      }
    })
  })
}

function listenToUsers(store) {
  let usersRef = FIREBASE_REF.child('users')
  usersRef.once('value', onUsersReceived.bind(this, store))
  usersRef.on('child_added', onUserChanged.bind(this, store))
  usersRef.on('child_changed', onUserChanged.bind(this, store))
}