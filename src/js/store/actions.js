export function setResponse(color) {
  return { type: 'SET_RESPONSE', color }
}

export function receiveResponse(color, playerId) {
  return { type: 'RECEIVE_RESPONSE', color, playerId }
}

export function nextArea() {
  return { type: 'NEXT_AREA' }
}

export function receiveArea(area) {
  return { type: 'RECEIVE_AREA', area }
}
