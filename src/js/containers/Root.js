require('aframe')
require('aframe-altspace-component')
import React, { Component } from 'react'
import { Scene } from 'aframe-react'
import { Provider } from 'react-redux'
import Assets from './Assets'
import GameManager from './GameManager'

export default class Root extends Component {
  render () {
    return (
      <Provider store={this.props.store}>
        <Scene altspace="usePixelScale: false; verticalAlign: bottom;" vr-mode-ui="enabled: false;">
          <Assets />

          <a-entity position="0 1.8 5">
            <a-camera><a-cursor></a-cursor></a-camera>
          </a-entity>

          <GameManager />
        </Scene>
      </Provider>
    )
  }
}
