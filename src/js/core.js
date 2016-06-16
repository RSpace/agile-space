import { Map } from 'immutable'
import { setState } from './store/sync'

export const AREAS = ['delivering-value']
export const COLORS = ['green', 'yellow', 'red']

export const INITIAL_STATE = Map({
  currentArea: 'delivering-value',
  selectedColor: null
})

export function setResponse(state, color) {
  let newState = state.set('selectedColor', color)
  setState(newState)
  return newState
}

export function receiveResponse(state, color, playerId) {
  return state.set('selectedColor', color)
}

export function nextArea(state) {

  function getNextArea(area) {
    let index = AREAS.indexOf(area)
    index++;
    if (index >= AREAS.length) {
      index = 0;
    }
    return AREAS[index]
  }

  return state.set('currentArea', getNextArea(state.get('currentArea')))
}
