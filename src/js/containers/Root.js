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
import DevTools from './DevTools'

export default class Root extends Component {
  render () {
    return (
      <Provider store={this.props.store}>
        <div>
          { url.parse(window.location.href, true).query['overview'] ? this.renderOverviewManager() : this.renderGameManager() }
          { this.renderDevTools() }
        </div>
      </Provider>
    )
  }

  renderGameManager () {
    return (
      <Scene embedded={"development" === process.env.NODE_ENV} altspace="usePixelScale: false; verticalAlign: bottom;" vr-mode-ui="enabled: false;">
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

  renderDevTools () {
    if ("development" === process.env.NODE_ENV) {
      return (
        <DevTools />
      )
    } else {
      return null
    }
  }
}
