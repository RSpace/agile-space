import { Map, Set, fromJS } from 'immutable'
import altspace from 'altspace'
import { saveUser, resetInstanceData } from './store/sync'
import { getStore } from './store/store'
import { playResponseSound, playAreaChangeSound } from './helpers/SoundManager'
import Url from './lib/url'

export const AREAS = [
  'delivering-value',
  'fun',
  'health-of-codebase',
  'easy-to-release',
  'learning',
  'mission',
  'pawns-or-players',
  'speed',
  'suitable-process',
  'support',
  'teamwork'
]
export const AREA_NAMES = {
  'delivering-value': 'Delivering Value',
  'fun': 'Fun',
  'health-of-codebase': 'Health of Codebase',
  'easy-to-release': 'Easy to release',
  'learning': 'Learning',
  'mission': 'Mission',
  'pawns-or-players': 'Pawns or Players',
  'speed': 'Speed',
  'suitable-process': 'Suitable Process',
  'support': 'Support',
  'teamwork': 'Teamwork'
}
export const COLORS = ['green', 'yellow', 'red']
export const VALID_GAME_STATES = ['intro', 'running', 'ended']

export const INITIAL_STATE = Map({
  gameState: VALID_GAME_STATES[0],
  currentArea: null,
  areas: Map({}),
  users: Map({})
})

/* {
  currentArea: 'delivering-value',
  areas: {
    'delivering-value': {
      'altspace-1234': 'green',
      'anon-5678': 'yellow'
    }
  },
  users: {
    'altspace-1234': {
      name: 'Casper',
      tableAngle: 35
    },
    'anon-5678': {
      name: 'Anonymous 5678',
      tableAngle: 210
    }
  }
} */

export function setFullStateFromSnapshot(state, snapshot) {
  return state.merge(fromJS(snapshot))
}

export function setResponse(state, color, playerId, givenArea, isUserAction) {
  if (isUserAction) {
    playResponseSound()
  }

  let area = givenArea || state.get('currentArea')
  return state.setIn(['areas', area, playerId], color)
}

export function getGameState() {
  let store = getStore()
  let state = store.getState()
  return state.get('gameState')
}

export function getCurrentArea() {
  let store = getStore()
  let state = store.getState()
  return state.get('currentArea')
}

export function getNextArea() {
  let area = getCurrentArea()
  let index = AREAS.indexOf(area)
  index++
  if (index >= AREAS.length) {
    return null // Signals end of game
  } else {
    return AREAS[index]
  }
}

export function setGameState(state, gameState) {
  if (!VALID_GAME_STATES.includes(gameState)) {
    console.error('Attempted to set invalid game state "' + gameState + '"')
    return state
  }

  // Game was reset
  if (gameState === VALID_GAME_STATES[0] && state.get('gameState') !== VALID_GAME_STATES[0]) {
    return state.merge({
      gameState: VALID_GAME_STATES[0],
      currentArea: null,
      areas: Map({})
    })
  } else {
    return state.set('gameState', gameState)
  }
}

export function setArea(state, area) {
  let newState = state
  if (area && area !== state.get('currentArea')) {
    playAreaChangeSound()

    if (area !== null && state.get('gameState') !== 'running') {
      newState = state.set('gameState', 'running')
    }
  }
  return newState.set('currentArea', area)
}

export function setUser(state, playerId, name, tableAngle) {
  return state.setIn(['users', playerId], { name, tableAngle })
}

let playerInfo
export function getPlayerInfo() {
  return new Promise(function(resolve, reject) {
    if (playerInfo) {
      resolve(playerInfo)
    }

    if(altspace.inClient) {
      altspace.getUser().then(function(userInfo)
      {
        playerInfo = {
          id: 'altspace-' + userInfo.userId,
          name: userInfo.displayName,
          isModerator: userInfo.isModerator
        }
        resolve(playerInfo)
      })
    }
    else {
      let playerId
      let url = new Url()
      if (url.query['playerId']) {
        playerId = url.query['playerId']
      } else {
        playerId = 'anon-' + Math.floor(Math.random() * 10000)
        url.query['playerId'] = playerId
        window.location.href = url.toString()
      }

      playerInfo = {
        id: playerId,
        name: playerId,
        isModerator: true
      }
      resolve(playerInfo)
    }
  })
}

export function getMySelectedColor(state) {
  let currentArea = state.get('currentArea')
  return state.getIn(['areas', currentArea, playerInfo.id])
}

export function getOtherUsers(state) {
  let currentArea = state.get('currentArea')

  let allUsers = state.get('users')
  let otherUsers = allUsers.filterNot(keyIn(playerInfo.id))

  let userData = otherUsers.map((userAttributes, userId) => {
    return {
      id: userId,
      name: userAttributes.name,
      tableAngle: userAttributes.tableAngle || 0,
      color: state.getIn(['areas', currentArea, userId])
    }
  })

  return userData
}

function keyIn(/*...keys*/) {
  var keySet = Set(arguments);
  return function (v, k) {
    return keySet.has(k);
  }
}

export function restartGame() {
  resetInstanceData()
}

export function isOverview() {
  let url = new Url()
  return !!url.query['overview']
}
