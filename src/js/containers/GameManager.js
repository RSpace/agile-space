import React, { Component } from 'react'
import { Entity } from 'aframe-react'
import { connect } from 'react-redux'
import { COLORS } from '../core'
import { setResponse, nextArea } from '../store/actions'
import Table from '../components/Table'
import Card from '../components/Card'

const ANGLE_STEP = 45

class GameManager extends Component {
  render () {
    return (
      <Entity>
        <Table />

        <Card type="area" title={this.props.currentArea} onNextArea={this.props.onNextArea} />

        { [...Array(360/ANGLE_STEP)].map((x, i) =>
          <Entity rotation={[0, i*ANGLE_STEP, 0]} key={`cards-${i}`}>
            { COLORS.map(function(color) {
              let isSelected = (this.props.selectedColor === color)
              return (
                <Card type="response" color={color}
                      selected={isSelected} key={color}
                      onResponse={this.props.onResponse}
                />
              )
            }.bind(this))}
          </Entity>
        )}
      </Entity>
    )
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    currentArea: state.get('currentArea'),
    selectedColor: state.get('selectedColor'),
  }
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onResponse: (color) => dispatch(setResponse(color)),
    onNextArea: () => dispatch(nextArea())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameManager)
