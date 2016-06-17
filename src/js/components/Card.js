require('../aframe/look-at-altspace-user-component')
import React, { Component } from 'react'
import { Animation, Entity } from 'aframe-react'

export default class Card extends Component {
  render () {
    let geometry = { primitive: 'plane' }
    Object.assign(geometry, this.getDimensions())

    let material = {src: this.getSource(), side: 'double'}
    let position = this.getPosition()
    let rotation = this.getRotation()

    return (
      <Entity
        geometry={geometry}
        material={material}
        position={position}
        rotation={rotation}
        onClick={this.onClick.bind(this)}
        {...this.getAdditionalAttributes()}
      >
      </Entity>
    )
  }

  onClick () {
    switch(this.props.type) {
      case 'response':
        if (this.props.selected) { return }
        this.props.onResponse(this.props.color)
        break
      case 'area':
        return
    }
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
        return { width: 0.25, height: 0.375 }
      case 'area':
        return { width: 1, height: 1.5 }
    }
  }

  getPosition () {
    switch(this.props.type) {
      case 'response':
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
      case 'area':
        return "0 2 0"
    }
  }

  getRotation () {
    switch(this.props.type) {
      case 'response':
        if(!this.props.selected) {
          return '-90 0 0'
        }
    }

    return '0 0 0'
  }

  getAdditionalAttributes () {
    switch(this.props.type) {
      case 'area':
        return {"look-at-altspace-user": true}
        break
    }
    return {}
  }

}
