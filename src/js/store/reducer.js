import {
  INITIAL_STATE, setFullStateFromSnapshot, setResponse, setArea,
  setUser, setGameState, restartGame
} from '../core'
import { saveArea, saveGameState } from './sync'

export default function rootReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_INITIAL_STATE':
      return setFullStateFromSnapshot(state, action.snapshot)
    case 'SET_RESPONSE':
      return setResponse(state, action.color)
    case 'RECEIVE_RESPONSE':
      return setResponse(state, action.color, action.playerId, action.area, action.isUserAction)
    case 'NEXT_AREA':
      if (action.area) {
        return setArea(state, action.area)
      } else {
        return setGameState(state, 'ended')
      }
    case 'RECEIVE_AREA':
      return setArea(state, action.area)
    case 'SET_AREA':
      var state = setArea(state, action.area)
      saveArea(state.get('currentArea'))
      saveGameState(state.get('gameState'))
      return state
    case 'RECEIVE_USER':
      return setUser(state, action.playerId, action.name, action.tableAngle)
    case 'RECEIVE_GAME_STATE':
      return setGameState(state, action.gameState)
    case 'START_GAME':
      return setGameState(state, 'running')
    case 'RESTART_GAME':
      return state
  }
  return state
}
