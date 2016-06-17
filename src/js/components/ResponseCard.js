import React, { Component } from 'react'
import { Entity } from 'aframe-react'

export default class ResponseCard extends Component {
  render () {
    let geometry = { primitive: 'plane', width: 0.25, height: 0.375 }

    let material = {src: `#${this.props.color}-light`, side: 'double'}
    let position = this.getPosition()
    let rotation = this.getRotation()

    return (
      <Entity
        geometry={geometry}
        material={material}
        position={position}
        rotation={rotation}
        onClick={this.onClick.bind(this)}
      >
      </Entity>
    )
  }

  onClick () {
    if (this.props.selected) { return }
    this.props.onResponse(this.props.color)
  }

  getPosition () {
    let x, y
    switch(this.props.color) {
      case 'green':
        x = -0.35
        break
      case 'yellow':
        x = 0
        break
      case 'red':
        x = 0.35
        break
    }
    if (this.props.selected) {
      y = 1.3
    } else {
      y = 1
    }
    return `${x} ${y} 1.75`
  }

  getRotation () {
    if(!this.props.selected) {
      return '-90 0 0'
    }
    return '0 0 0'
  }
}
