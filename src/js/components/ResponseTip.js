import React, { Component } from 'react'
import { Entity } from 'aframe-react'

export default class ResponseTip extends Component {
  render () {
    let geometry = { primitive: 'plane', width: 0.34, height: 0.34 }
    let material = {src: `#${this.props.color}-tip`, side: 'double', transparent: 'true'}
    let position = "0 -0.25 -0.15"
    let rotation = "90 0 0"

    if (this.props.visible) {
      return (
        <Entity
          geometry={geometry}
          material={material}
          position={position}
          rotation={rotation}
        >
        </Entity>
      )
    } else {
      return null
    }
  }
}
