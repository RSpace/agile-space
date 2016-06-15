import React, { Component } from 'react'
import { Entity } from 'aframe-react'

export default class Table extends Component {
  render () {
    return (
      <Entity
        geometry={{primitive: 'cylinder', height: 2, radius: 3}}
        material={{color: 'brown'}}
      ></Entity>
    )
  }
}
