import { Map } from 'immutable'
import { setState } from './store/sync'
import { getStore } from './store/store'

export const AREAS = ['delivering-value', 'fun', 'health-of-codebase', 'easy-to-release']
export const COLORS = ['green', 'yellow', 'red']

export const INITIAL_STATE = Map({
  currentArea: AREAS[0],
  selectedColor: null
})

export function setResponse(state, color, playerId) {
  return state.set('selectedColor', color)
}

export function getNextArea() {
  let store = getStore()
  let state = store.getState()
  let area = state.get('currentArea')
  let index = AREAS.indexOf(area)
  index++
  if (index >= AREAS.length) {
    index = 0
  }
  return AREAS[index]
}

export function setArea(state, area) {
  return state.set('currentArea', area)
}
