require('../aframe/look-at-altspace-user-component')
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Entity } from 'aframe-react'
import { COLORS } from '../core'
import { saveTableAngle } from '../store/sync'
import ResponseCard from '../components/ResponseCard'

export default class MyResponseCards extends Component {
  render () {
    return (
      <Entity
        look-at-altspace-user={{yMode: true}}
        ref={(component) => this.domNode = ReactDOM.findDOMNode(component)}
      >
        { COLORS.map(function(color) {
          let isSelected = (this.props.selectedColor === color)
          return (
            <ResponseCard
              color={color}
              selected={isSelected} key={color}
              onResponse={this.props.onResponse}
            />
          )
        }.bind(this))}
      </Entity>
    )
  }

  componentDidMount () {
    // Let's only report angle once per second, more is just overkill
    this.yAngleObserverInterval = setInterval(this.observeYAngle.bind(this), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.tableAngleObserverInterval)
  }

  observeYAngle () {
    let rotation = this.domNode.attributes.rotation.value
    let yAngle = rotation.split(" ")[1]
    if (yAngle && yAngle !== this.lastYAngle) {
      this.lastYAngle = yAngle
      saveTableAngle(yAngle)
    }
  }
}
