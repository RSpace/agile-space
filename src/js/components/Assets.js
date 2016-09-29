import React, { Component } from 'react'
import { Entity } from 'aframe-react'
import { AREAS } from '../core'

export default class Assets extends Component {
  render () {
    return (
      <a-assets>
        <img id="table-texture" src="images/table/wood4.png" />
        <img id="green-light" src="images/response_cards/green_light.png" />
        <img id="yellow-light" src="images/response_cards/yellow_light.png" />
        <img id="red-light" src="images/response_cards/red_light.png" />
        { AREAS.map(function(area) {
          return (
            <img id={area} key={area} src={`images/area_cards/${area}.png`} />
          )
        })}

        <img id="blank-card" src="images/area_cards/blank.png" />
        <a-mixin id="card-text" bmfont-text="width: 500;" scale="0.3 0.3 0.3"></a-mixin>

        <img id="mockup-intro-with-button" src="images/mockups/intro_with_button.png" />
        <img id="mockup-response-cards-intro" src="images/mockups/response_cards_intro.png" />

        <audio id="response-sound" src="sounds/cardup.ogg" />
        <audio id="area-change-sound" src="sounds/crystalglass.ogg" />
      </a-assets>
    )
  }
}
