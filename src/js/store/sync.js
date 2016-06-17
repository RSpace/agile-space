import altspace from 'altspace'
import { receiveResponse, receiveArea } from './actions'

const FIREBASE_REF = altspace.utilities.sync.getInstance({
    // All sync instances with the same instance id will share
    // properties.
    instanceId: 1, // TODO: Use generated instance id
    // This helps to prevent collisions.
    authorId: 'com.immersionftw.agile-space'
})

export function saveResponse(color) {
  FIREBASE_REF.update({ selectedColor: color})
}

export function saveArea(area) {
  FIREBASE_REF.update({ currentArea: area})
}

export function initRead(store) {
  FIREBASE_REF.child('currentArea').on('value', onCurrentAreaChanged.bind(this, store))
  FIREBASE_REF.child('selectedColor').on('value', onSelectedColorChanged.bind(this, store))
}

function onSelectedColorChanged(store, snapshot) {
    let color = snapshot.val()
    store.dispatch(receiveResponse(color, 1)) // TODO: Use different player ids
}

function onCurrentAreaChanged(store, snapshot) {
    let area = snapshot.val()
    store.dispatch(receiveArea(area))
}