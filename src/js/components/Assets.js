import React, { Component } from 'react'
import { Entity } from 'aframe-react'
import { AREAS } from '../core'

export default class Assets extends Component {
  render () {
    return (
      <a-assets>
        <img id="table-texture" src="images/table/wood4.png" />

        <img id="green-response" src="images/response_cards/green.png" />
        <img id="yellow-response" src="images/response_cards/yellow.png" />
        <img id="red-response" src="images/response_cards/red.png" />

        <img id="green-tip" src="images/instructions/when_to_play_green.png" />
        <img id="yellow-tip" src="images/instructions/when_to_play_yellow.png" />
        <img id="red-tip" src="images/instructions/when_to_play_red.png" />

        { AREAS.map(function(area) {
          return (
            <img id={area} key={area} src={`images/area_cards/${area}.png`} />
          )
        })}

        <img id="intro-overlay" src="images/instructions/intro_overlay.png" />

        <audio id="response-sound" src="sounds/cardup.ogg" />
        <audio id="area-change-sound" src="sounds/crystalglass.ogg" />
      </a-assets>
    )
  }
}
