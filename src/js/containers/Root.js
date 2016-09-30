import AFRAME from 'aframe'
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
import altspace from 'altspace'

export default class Root extends Component {
  constructor(props) {
    super(props)

    // Altspace requires this hack for audio to work
    AFRAME.THREE.PositionalAudio = AFRAME.THREE.Audio
  }

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
      <Scene altspace="usePixelScale: false; verticalAlign: bottom;" vr-mode-ui="enabled: false;">
        <Assets />

        <a-entity position="0 0 3">
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
    if ("development" === process.env.NODE_ENV && !altspace.inClient) {
      return (
        <DevTools />
      )
    } else {
      return null
    }
  }

  componentDidMount () {
    this.setupFaq ()
  }

  setupFaq () {
    if (altspace.inClient) {
      let pathWithoutFile = document.location.pathname.split("/")
      pathWithoutFile.pop()
      pathWithoutFile = pathWithoutFile.join("/")
      let baseUrl = document.location.protocol + "//" + document.location.host + pathWithoutFile
      let contentUrl = baseUrl + "/faq.html"
      let iconUrl = baseUrl + "/images/instructions/icon.png"
      altspace.open(contentUrl, "_experience", {
        icon: iconUrl,
        hidden: true
      })
    }
  }
}
