import altspace from 'altspace'
import { receiveResponse } from './actions'

const FIREBASE_REF = altspace.utilities.sync.getInstance({
    // All sync instances with the same instance id will share
    // properties.
    instanceId: 1, // TODO
    // This helps to prevent collisions.
    authorId: 'com.immersionftw.agile-space'
})

export function setState(state) {
  FIREBASE_REF.set(state.toObject())
}

export function initRead(store) {
  FIREBASE_REF.child('selectedColor').on('value', function(snapshot) {
    let color = snapshot.val()
    store.dispatch(receiveResponse(color, 1)) // TODO
  })
}
