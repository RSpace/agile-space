import React, { Component } from 'react'
import { Entity } from 'aframe-react'
import ReactDOM from 'react-dom'
import ResponseTip from './ResponseTip'

export default class ResponseCard extends Component {
  render () {
    let geometry = { primitive: 'plane', width: 0.25, height: 0.375 }
    let material = {src: `#${this.props.color}-response`, side: 'double', transparent: 'true'}
    let position = this.getPosition()
    let rotation = this.getRotation()
    let sound    = { src: '#response-sound', on: 'selected' }

    return (
      <Entity
        geometry={geometry}
        material={material}
        position={position}
        rotation={rotation}
        sound={sound}
        onClick={this.onClick.bind(this)}
        ref={(component) => this.domNode = ReactDOM.findDOMNode(component)}
      >
        <ResponseTip color={this.props.color} visible={this.props.showTip || false} />
      </Entity>
    )
  }

  componentDidMount () {
    if (!this.props.isMyCard) {
      // Another user just selected a response card first time for this area
      setTimeout(() => {
        if (this.domNode) {
          this.domNode.emit('selected')
        }
      }, 500)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (!this.props.isMyCard && prevProps.color !== this.props.color) {
      // Another user just changed their response for this area
      this.domNode.emit('selected')
    }
  }

  onClick () {
    if (!this.props.isMyCard || this.props.selected) { return }
    this.domNode.emit('selected')
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
