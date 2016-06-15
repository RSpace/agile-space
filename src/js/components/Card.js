import React, { Component } from 'react'
import { Entity } from 'aframe-react'

export default class Card extends Component {
  render () {
    return (
      <Entity
        geometry={{primitive: 'plane', width: 0.10, height: 0.15}}
        material={{src: this.imageSrc()}}
        position="0 2 3"
      ></Entity>
    )
  }

  imageSrc () {
    switch(this.props.type) {
      case 'response':
        switch(this.props.color) {
          case 'green':
            return '#green-light'
        }
        break;
    }
  }
}
