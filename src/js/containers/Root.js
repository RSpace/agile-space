import AFRAME from 'aframe/src'
require('aframe-altspace-component')
import url from 'url'
import React, { Component } from 'react'
import { Scene } from 'aframe-react'
import { Provider } from 'react-redux'
import Assets from '../components/Assets'
import GameManager from './GameManager'
import OverviewManager from './OverviewManager'
import DevTools from './DevTools'
import altspace from 'altspace'
import { isOverview } from '../core'

export default class Root extends Component {
  constructor(props) {
    super(props)

    // Altspace requires this hack for audio to work
    AFRAME.THREE.PositionalAudio = AFRAME.THREE.Audio
  }

  render () {
    let parsedUrl = url.parse(window.location.href, true)
    return (
      <Provider store={this.props.store}>
        <div>
          { isOverview() ? this.renderOverviewManager() : this.renderGameManager() }
          { parsedUrl.query['devtools'] ? this.renderDevTools() : null }
        </div>
      </Provider>
    )
  }

  renderGameManager () {
    return (
      <Scene altspace="usePixelScale: false; verticalAlign: bottom;" vr-mode-ui="enabled: false;">
        <Assets />

        <audio id="response-sound">
          <source src="sounds/cardup.ogg" type="audio/ogg"></source>
        </audio>
        <audio id="area-change-sound">
          <source src="sounds/crystalglass.ogg"  type="audio/ogg"></source>
        </audio>

        <a-entity position="0 0 3">
          <a-camera><a-cursor></a-cursor></a-camera>
        </a-entity>

        <GameManager />
      </Scene>
    )
  }

  renderOverviewManager () {
    return (
      <OverviewManager playerInfo={this.props.playerInfo} />
    )
  }

  renderDevTools () {
    return (
      <DevTools />
    )
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
