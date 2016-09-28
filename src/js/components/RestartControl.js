import React, { Component } from 'react'
import { Entity } from 'aframe-react'

export default class RestartControl extends Component {
  render () {
    let size = 0.25
    let geometry = { primitive: 'box', width: size, height: size, depth: size }
    let material = { color: 'red' }
    let position = [0, (1 + (size/2)),  0]

    return (
      <Entity
        geometry={geometry}
        material={material}
        position={position}
        onClick={this.onClick.bind(this)}
      >
      </Entity>
    )
  }

  onClick () {
    this.props.onRestart()
  }
}
