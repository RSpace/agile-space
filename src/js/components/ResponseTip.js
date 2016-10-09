import React, { Component } from 'react'
import { Entity } from 'aframe-react'

export default class ResponseTip extends Component {
  render () {
    let geometry = { primitive: 'plane', width: 0.25, height: 0.155 }
    let material = {src: `#${this.props.color}-tip`, side: 'double', transparent: 'true'}
    let position = "0 0.1875 0.076"
    let rotation = "90 0 0"

    return (
      <Entity
        geometry={geometry}
        material={material}
        position={position}
        rotation={rotation}
        visible={this.props.visible}
      >
      </Entity>
    )
  }
}