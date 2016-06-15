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
          <img id="green-light" src="images/response_cards/green_light.png" />
          <img id="yellow-light" src="images/response_cards/yellow_light.png" />
          <img id="red-light" src="images/response_cards/red_light.png" />
          <img id="delivering-value" src="images/area_cards/delivering_value.png" />
        </a-assets>

        <Table />

        <Card type="area" title="delivering-value" />

        <Card type="response" color="green" selected={false} />
        <Card type="response" color="yellow" selected={false} />
        <Card type="response" color="red" selected={false} />

        <Card type="response" color="green" selected={true} />
      </Scene>
    )
  }
}
