import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import DevTools from '../containers/DevTools'
import createLogger from 'redux-logger'
import rootReducer from './reducer'

const finalCreateStore = compose(
  applyMiddleware(thunk),
  applyMiddleware(createLogger()),
  DevTools.instrument()
)(createStore)

let store

export function getStore () {
  return store
}

export default function configureStore(initialState) {
  store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
