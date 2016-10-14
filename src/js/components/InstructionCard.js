require('../aframe/look-at-altspace-user-component')
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Entity } from 'aframe-react'
import { COLORS } from '../core'
import ResponseCard from './ResponseCard'

export default class InstructionCard extends Component {
  render () {
    let geometry = { primitive: 'plane', width: 2.48, height: 2.8 }
    let material = {src: '#intro-overlay', side: 'double', transparent: 'true'}
    let position = '0 2.05 0'

    return (
      <Entity>
        <Entity
          geometry={geometry}
          material={material}
          position={position}
          onClick={this.onClick.bind(this)}
          look-at-altspace-user
        >
        </Entity>

        <Entity look-at-altspace-user={{yMode: true}}>
          { COLORS.map(function(color) {
            return (
              <ResponseCard
                color={color}
                selected={false} key={color}
                isMyCard={false}
                showTip={true}
              />
            )
          }.bind(this))}
        </Entity>
      </Entity>
    )
  }

  onClick () {
    this.props.onStart()
  }
}
