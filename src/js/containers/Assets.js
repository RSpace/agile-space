import React, { Component } from 'react'
import { Entity } from 'aframe-react'
import { AREAS } from '../core'

export default class Assets extends Component {
  render () {
    return (
      <a-assets>
        <img id="green-light" src="images/response_cards/green_light.png" />
        <img id="yellow-light" src="images/response_cards/yellow_light.png" />
        <img id="red-light" src="images/response_cards/red_light.png" />
        { AREAS.map(function(area) {
          return (
            <img id={area} key={area} src={`images/area_cards/${area}.png`} />
          )
        })}
      </a-assets>
    )
  }
}
