import { saveResponse, saveArea, saveGameState } from './sync'
import { getNextArea } from '../core'

export function setFullStateFromSnapshot(snapshot) {
  return { type: 'SET_INITIAL_STATE', snapshot }
}

export function setResponse(color) {
  saveResponse(color)
  return { type: 'SET_RESPONSE', color }
}

export function receiveResponse(area, color, playerId) {
  return { type: 'RECEIVE_RESPONSE', area, color, playerId }
}

export function nextArea() {
  let area = getNextArea()
  saveArea(area)
  return { type: 'NEXT_AREA', area }
}

export function setArea(area) {
  return { type: 'SET_AREA', area }
}

export function receiveArea(area) {
  return { type: 'RECEIVE_AREA', area }
}

export function receiveUser(playerId, name, tableAngle) {
  return { type: 'RECEIVE_USER', playerId, name, tableAngle }
}

export function receiveGameState(gameState) {
  return { type: 'RECEIVE_GAME_STATE', gameState }
}

export function startGame() {
  saveGameState('running')
  return { type: 'START_GAME' }
}

export function restartGame() {
  return { type: 'RESTART_GAME' }
}
