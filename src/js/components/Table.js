import React, { Component } from 'react'
import { Entity } from 'aframe-react'

export default class Table extends Component {
  render () {
    return (
      <Entity
        geometry={{primitive: 'cylinder', height: 0.9, radius: 2 }}
        position="0 0.5 0"
        material={{color: '#663300', src: '#table-texture'}}
      ></Entity>
    )
  }
}
