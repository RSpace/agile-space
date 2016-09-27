import {INITIAL_STATE, setFullStateFromSnapshot, setResponse, setArea, setUser, setGameState} from '../core'
import { saveArea } from './sync'

export default function rootReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_INITIAL_STATE':
      return setFullStateFromSnapshot(state, action.snapshot)
    case 'SET_RESPONSE':
      return setResponse(state, action.color)
    case 'RECEIVE_RESPONSE':
      return setResponse(state, action.color, action.playerId, action.area)
    case 'NEXT_AREA':
    case 'RECEIVE_AREA':
      return setArea(state, action.area)
    case 'SET_AREA':
      var state = setArea(state, action.area)
      saveArea(action.area)
      return state
    case 'RECEIVE_USER':
      return setUser(state, action.playerId, action.name, action.tableAngle)
    case 'RECEIVE_GAME_STATE':
      return setGameState(state, action.gameState)
    case 'START_GAME':
      return setGameState(state, 'running')
  }
  return state
}
