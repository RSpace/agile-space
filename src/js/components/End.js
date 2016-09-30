require('../aframe/look-at-altspace-user-component')
import React, { Component } from 'react'
import { Entity } from 'aframe-react'

export default class End extends Component {
  render () {
    let geometry = { primitive: 'plane', width: 1.888, height: 2.132 }
    let material = {src: '#end-overlay', side: 'double', transparent: 'true'}
    let position = '0 2 0'

    return (
      <Entity
        geometry={geometry}
        material={material}
        position={position}
        look-at-altspace-user
      >
      </Entity>
    )
  }
}
