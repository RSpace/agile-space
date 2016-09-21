require('../aframe/look-at-altspace-user-component')
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Entity } from 'aframe-react'

export default class InstructionCard extends Component {
  render () {
    return (
      <Entity position="0 2 0" onClick={this.onClick.bind(this)} look-at-altspace-user>
        {this.renderMockup()}
      </Entity>
    )
  }

  renderTextBased () {
    return (
      <a-entity>
        <a-image src="#blank-card" width="1" height="1.5"></a-image>
        <a-entity mixin="card-text" bmfont-text="text: This retrospective activity helps your team assess their current situation and identify areas where they can improve. The activity goes through a number of areas, and for each area, each team member picks a green, yellow or red light. Some or all team members then explain why they picked the response they did. This is repeated for each area, and usually wrapped up by looking for the 'worst' areas to take immediate action on." position="-0.38 -0.45 0.01"></a-entity>
        <a-entity mixin="card-text" bmfont-text="text: Click this card to begin" position="-0.38 -0.6 0.01"></a-entity>
      </a-entity>
    )
  }

  renderMockup () {
    return (
      <a-entity>
        <a-image src="#mockup-intro-with-button" width="1.888" height="2.132" rotation="0 -25 0" position="1.5 0 0"></a-image>
        <a-image src="#mockup-response-cards-intro" width="3.08" height="2.02" rotation="0 25 0" position="-1 0 0"></a-image>
      </a-entity>
    )
  }

  onClick () {
    this.props.onStart()
  }
}