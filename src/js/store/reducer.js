import {INITIAL_STATE, setResponse, receiveResponse, nextArea} from '../core'

export default function rootReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_RESPONSE':
      return setResponse(state, action.color)
    case 'RECEIVE_RESPONSE':
      return receiveResponse(state, action.color, action.playerId)
    case 'NEXT_AREA':
      return nextArea(state)
  }
  return state
}