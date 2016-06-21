import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import { createStore } from 'redux'
import configureStore from './store/store'
import { INITIAL_STATE, getPlayerInfo } from './core'
import { initRead, saveUser } from './store/sync'

const store = configureStore(INITIAL_STATE)
initRead(store)

getPlayerInfo().then((playerInfo) => {
  saveUser(playerInfo.id, playerInfo.name)

  render(
    <Root store={store} />,
    document.getElementById('root')
  )
})
