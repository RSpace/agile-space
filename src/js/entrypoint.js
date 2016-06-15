import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import { createStore } from 'redux'
import reducer from './store/reducer'

let store = createStore(reducer)

render(
  <Root store={store} />,
  document.getElementById('root')
)