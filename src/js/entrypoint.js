import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import { createStore } from 'redux'

let store = createStore(function() {}) // TODO: Create store

render(
  <Root store={store} />,
  document.getElementById('root')
)