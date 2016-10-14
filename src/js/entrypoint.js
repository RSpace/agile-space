require('aframe/src')
import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import { createStore } from 'redux'
import configureStore from './store/store'
import { INITIAL_STATE, getPlayerInfo } from './core'
import { initRead, saveUser } from './store/sync'
import { loadSounds } from './helpers/SoundManager'

const store = configureStore(INITIAL_STATE)

Promise.all([initRead(store), getPlayerInfo(), loadSounds()]).then((values) => {
  let store, playerInfo
  [store, playerInfo] = values
  saveUser(playerInfo.id, playerInfo.name)

  render(
    <Root store={store} playerInfo={playerInfo} />,
    document.getElementById('root')
  )
})
