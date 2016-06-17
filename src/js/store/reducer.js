import {INITIAL_STATE, setResponse, setArea} from '../core'

export default function rootReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_RESPONSE':
      return setResponse(state, action.color)
    case 'RECEIVE_RESPONSE':
      return setResponse(state, action.color, action.playerId)
    case 'NEXT_AREA':
      return setArea(state, action.area)
    case 'RECEIVE_AREA':
      return setArea(state, action.area)
  }
  return state
}