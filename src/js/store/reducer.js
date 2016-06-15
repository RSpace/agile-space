import {INITIAL_STATE, respondWith, nextArea} from '../core'

export default function defaultHandler(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'RESPOND':
      return respondWith(state, action.color)
    case 'ENABLE_VR_MODE':
      return nextArea(state)
  }
  return state
}