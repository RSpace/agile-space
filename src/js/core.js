import { Map, Set } from 'immutable'
import altspace from 'altspace'
import { saveUser } from './store/sync'
import { getStore } from './store/store'

export const AREAS = ['delivering-value', 'fun', 'health-of-codebase', 'easy-to-release']
export const COLORS = ['green', 'yellow', 'red']

export const INITIAL_STATE = Map({
  currentArea: AREAS[0],
  areas: Map({}),
  users: Map({}),
  selectedColor: null
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

export function setResponse(state, color, playerId) {
  let currentArea = state.get('currentArea')
  return state.setIn(['areas', currentArea, playerId], color)
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
    index = 0
  }
  return AREAS[index]
}

export function setArea(state, area) {
  if (!area) {
    area = AREAS[0] // Always default to first area
  }
  return state.set('currentArea', area)
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
          name: userInfo.displayName
        }
        resolve(playerInfo)
      })
    }
    else {
      let playerId = 'anon-' + Math.floor(Math.random() * 10000)
      playerInfo = {
        id: playerId,
        name: playerId
      }
      resolve(playerInfo)
    }
  })
}

let instanceId
export function getInstanceId() {
  if (instanceId) {
    return instanceId
  }

  let hash = window.location.hash.split("#")[1]
  if (hash) {
    instanceId = hash
  } else {
    instanceId = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16))
    location.href = "#" + instanceId
  }

  return instanceId
}

export function getMySelectedColor(state) {
  let currentArea = state.get('currentArea')
  return state.getIn(['areas', currentArea, playerInfo.id])
}

export function getOtherUsers(state) {
  let currentArea = state.get('currentArea')

  let allUsers = state.get('users')
  let otherUsers = allUsers.filterNot(keyIn(playerInfo.id))

  let userData = otherUsers.map((user) => {
    return {
      name: user.name,
      tableAngle: user.tableAngle,
      color: state.getIn(['areas', currentArea, user.id])
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