import React, { Component } from 'react'
import { Entity } from 'aframe-react'

export default class Card extends Component {
  render () {
    let geometry = { primitive: 'plane' }
    Object.assign(geometry, this.getDimensions())

    let material = {src: this.getSource()}
    let position = this.getPosition()
    let rotation = this.getRotation()

    return (
      <Entity
        geometry={geometry}
        material={material}
        position={position}
        rotation={rotation}
      ></Entity>
    )
  }

  getSource () {
    switch(this.props.type) {
      case 'response':
        return `#${this.props.color}-light`
      case 'area':
        return `#${this.props.title}`
    }
  }


  getDimensions () {
    switch(this.props.type) {
      case 'response':
        return { width: 0.5, height: 0.75 }
      case 'area':
        return { width: 1, height: 1.5 }
    }
  }

  getPosition () {
    switch(this.props.type) {
      case 'response':
        if (this.props.selected) {
          return '0 1.1 1.5'
        } else {
          let x;
          switch(this.props.color) {
            case 'green':
              x = -0.75
              break
            case 'yellow':
              x = 0
              break
            case 'red':
              x = 0.75
              break
          }
          return `${x} 1.5 0`
        }
      case 'area':
        return "0 3 0"
    }
  }

  getRotation () {
    switch(this.props.type) {
      case 'response':
        if(this.props.selected) {
          return '-90 0 0'
        }
    }

    return '0 0 0'
  }

}
