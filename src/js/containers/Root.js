require('aframe')
require('aframe-altspace-component')
import React, { Component } from 'react'
import { Scene } from 'aframe-react'
import Table from '../components/Table'
import Card from '../components/Card'

export default class Root extends Component {
  render () {
    return (
      <Scene altspace="usePixelScale: false; verticalAlign: bottom;" vr-mode-ui="enabled: false;">
        <a-assets>
          <img id="green-light" src="images/green_light.png" />
          <img id="yellow-light" src="images/yellow_light.png" />
          <img id="red-light" src="images/red_light.png" />
        </a-assets>

        <Table />
        <Card type="response" color="green" />
      </Scene>
    )
  }
}
