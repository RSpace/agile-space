require('../aframe/look-at-altspace-user-component')
import React, { Component } from 'react'
import { Animation, Entity } from 'aframe-react'

export default class AreaCard extends Component {
  render () {
    let geometry = { primitive: 'plane', width: 1, height: 1.5 }
    let material = {src: `#${this.props.title}`, side: 'double'}
    let position = "0 2 0"

    return (
      <Entity
        geometry={geometry}
        material={material}
        position={position}
        onClick={this.onClick.bind(this)}
        look-at-altspace-user
      >
      </Entity>
    )
  }

  onClick () {
    this.props.onNextArea()
  }
}
