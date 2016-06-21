require('../aframe/look-at-altspace-user-component')
import React, { Component } from 'react'
import { Entity } from 'aframe-react'
import { connect } from 'react-redux'
import { COLORS, getMySelectedColor } from '../core'
import { setResponse, nextArea } from '../store/actions'
import Table from '../components/Table'
import AreaCard from '../components/AreaCard'
import ResponseCard from '../components/ResponseCard'

class GameManager extends Component {
  render () {
    return (
      <Entity>
        <Table />

        <AreaCard title={this.props.currentArea} onNextArea={this.props.onNextArea} />

        <Entity look-at-altspace-user={{yMode: true}}>
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

      </Entity>
    )
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    currentArea: state.get('currentArea'),
    selectedColor: getMySelectedColor(state)
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
