import altspace from 'altspace'
import { setFullStateFromSnapshot, receiveResponse, receiveArea, receiveUser, receiveGameState } from './actions'
import { getGameState, getCurrentArea, INITIAL_STATE } from '../core'
import { getStore } from './store'
import url from 'url'

let firebaseConnection, firebaseAppInstance
let initalItemsLoaded = { responses: false, users: false }

function initFirebaseConnection() {
  return new Promise(function(resolve, reject) {
    getInstanceId().then((instanceId) => {
      // See http://altspacevr.github.io/AltspaceSDK/doc/sync.html#connect
      altspace.utilities.sync.connect({
          // Use own Firebase database
          baseRefUrl: 'https://agile-space.firebaseio.com/',
          // This helps to prevent collisions.
          authorId: 'immersionftw.com',
          appId: 'agile-space',
          instanceId
      }).then((connection) => {
        // See http://altspacevr.github.io/AltspaceSDK/doc/sync-Connection.html
        firebaseConnection = connection
        firebaseAppInstance = connection.instance
        resolve(connection)
      })
    })
  })
}

function getInstanceId() {
  return new Promise(function(resolve, reject) {
    let parsedUrl = url.parse(window.location.href, true)
    if (parsedUrl.query['altspace-sync-instance']) {
      resolve(parsedUrl.query['altspace-sync-instance'])
    } else if(altspace.inClient) {
      altspace.getSpace().then((space) => {
        resolve(space.sid)
      })
    } else {
      resolve(null)
    }
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

export function saveGameState(gameState, onComplete) {
  firebaseAppInstance.update({ gameState: gameState}, onComplete)
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
      // Initial state from Firebase
      firebaseAppInstance.once("value", (snapshot) => {
        store.dispatch(setFullStateFromSnapshot(snapshot.val()))

        // Get current state and listen to changes to it
        let gameState = getGameState()
        ensureGameState(store, gameState).then((gameState) => {
          firebaseAppInstance.child('gameState').on('value', onGameStateChanged.bind(this, store))

          // Listen to changes on the current area
          firebaseAppInstance.child('currentArea').on('value', onCurrentAreaChanged.bind(this, store))

          // If game is running, listen current area
          if (gameState == 'running') {
            let currentArea = getCurrentArea()
            if (currentArea) {
              listenToNewArea(store, null, currentArea)
            }
          }

          // We need to know where users are
          listenToUsers(store)

          // All done with initialization
          resolve(store)
        })
      })
    })
  })
}

export function resetInstanceData() {
  firebaseAppInstance.update(INITIAL_STATE.toJS())
}

function onSelectedColorsReceived(store, area, snapshot) {
  let responsesObject = snapshot.val()
  if (!responsesObject) {
    return
  }

  let responsesMap = new Map(Object.entries(responsesObject))
  responsesMap.forEach((color, playerId) => {
    store.dispatch(receiveResponse(area, color, playerId, false))
  })

  initalItemsLoaded.responses = true // OK for onSelectedColorChanged to dispatch now
}

function onSelectedColorChanged(store, area, snapshot) {
  if(!initalItemsLoaded.responses) {
    return // Let onSelectedColorsReceived do it's work first
  }

  let playerId = snapshot.key()
  let color = snapshot.val()
  store.dispatch(receiveResponse(area, color, playerId, true))
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

  initalItemsLoaded.users = true // OK for onUserChanged to dispatch now  
}

function onUserChanged(store, snapshot) {
  if(!initalItemsLoaded.users) {
    return // Let onUsersReceived do it's work first
  }

  let playerId = snapshot.key()
  let attributes = snapshot.val()
  store.dispatch(receiveUser(playerId, attributes.name, attributes.tableAngle))
}

function onGameStateChanged(store, snapshot) {
  let newGameState = snapshot.val()
  store.dispatch(receiveGameState(newGameState))
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

  // Subscribe to events on new area if we have one
  if (newArea) {
    let newAreaRef = firebaseAppInstance.child('areas').child(newArea)
    newAreaRef.once('value', onSelectedColorsReceived.bind(this, store, newArea))
    newAreaRef.on('child_added', onSelectedColorChanged.bind(this, store, newArea))
    newAreaRef.on('child_changed', onSelectedColorChanged.bind(this, store, newArea))
  }
}

function ensureGameState(store, initialGameState) {
  return new Promise(function(resolve, reject) {
    firebaseAppInstance.child('gameState').once('value', (snapshot) => {
      if (snapshot.exists()) {
        let gameState = snapshot.val()
        store.dispatch(receiveGameState(gameState))
        resolve(gameState)
      } else {
        store.dispatch(receiveGameState(initialGameState))
        saveGameState(initialGameState, () => {
          resolve(initialGameState)
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
