import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import { createStore } from 'redux'
import configureStore from './store/store'
import {INITIAL_STATE} from './core'
import { initRead } from './store/sync'

const store = configureStore(INITIAL_STATE)
initRead(store)

render(
  <Root store={store} />,
  document.getElementById('root')
)