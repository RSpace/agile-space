export function respond(color) {
  return { type: 'RESPOND', color }
}

export function nextArea() {
  return { type: 'NEXT_AREA' }
}
