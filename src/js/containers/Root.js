require('aframe')
require('aframe-altspace-component')
require('aframe-bmfont-text-component')
import url from 'url'
import React, { Component } from 'react'
import { Scene } from 'aframe-react'
import { Provider } from 'react-redux'
import Assets from '../components/Assets'
import GameManager from './GameManager'
import OverviewManager from './OverviewManager'

export default class Root extends Component {
  render () {
    return (
      <Provider store={this.props.store}>
        { url.parse(window.location.href, true).query['overview'] ? this.renderOverviewManager() : this.renderGameManager() }
      </Provider>
    )
  }

  renderGameManager () {
    return (
      <Scene altspace="usePixelScale: false; verticalAlign: bottom;" vr-mode-ui="enabled: false;">
        <Assets />

        <a-entity position="0 1.8 3">
          <a-camera><a-cursor></a-cursor></a-camera>
        </a-entity>

        <GameManager />
      </Scene>
    )
  }

  renderOverviewManager () {
    return (
      <OverviewManager />
    )
  }
}
