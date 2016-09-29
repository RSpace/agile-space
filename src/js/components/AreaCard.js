require('../aframe/look-at-altspace-user-component')
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Animation, Entity } from 'aframe-react'

export default class AreaCard extends Component {
  constructor(props) {
    super(props)
    this.state = { isAnimating: false }
  }

  render () {
    let geometry = { primitive: 'plane', width: 1, height: 1.5 }
    let material = {src: `#${this.props.title}`, side: 'double'}
    let position = "0 2 0"
    let sound    = { src: '#area-change-sound', on: 'spin' }

    return (
      <Entity
        geometry={geometry}
        material={material}
        position={position}
        onClick={this.onClick.bind(this)}
        look-at-altspace-user={{enabled: !this.state.isAnimating}}
        ref={(component) => this.domNode = ReactDOM.findDOMNode(component)}
        sound={sound}
      >
        <Animation
          attribute="rotation"
          dur="300"
          easing="linear"
          fill="forwards"
          to="0 360 0"
          repeat="2"
          begin="spin"
          onAnimationEnd={this.onAnimationEnd.bind(this)}
        ></Animation>
      </Entity>
    )
  }

  componentDidMount () {
    // Always animate on first mount, as we just switched from instructions
    setTimeout(this.doAnimation.bind(this), 1)
  }

  componentWillUpdate (nextProps, nextState) {
    if( nextProps.title !== this.props.title ) {
      this.doAnimation()
    }
  }

  doAnimation () {
    this.setState({ isAnimating: true })
    this.domNode.emit('spin')
  }

  onClick () {
    this.props.onNextArea()
  }

  onAnimationEnd() {
    this.setState({ isAnimating: false })
  }
}
