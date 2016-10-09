import React, { Component } from 'react'
import { Entity } from 'aframe-react'

export default class Table extends Component {
  render () {
    return (
      <Entity
        obj-model="obj: #table-obj; mtl: #table-mtl"
        position="0 0.5 0"
        scale="1 1 1"

      ></Entity>
    )
  }
}
