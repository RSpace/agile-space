import React, { Component } from 'react'
import { Entity } from 'aframe-react'
import { connect } from 'react-redux'
import { COLORS } from '../core'
import { respond, nextArea } from '../store/actions'
import Table from '../components/Table'
import Card from '../components/Card'

class GameManager extends Component {
  render () {
    return (
      <Entity>
        <Table />

        <Card type="area" title={this.props.currentArea} />

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
    onResponse: (color) => dispatch(respond(color)),
    nextArea: () => dispatch(nextArea())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameManager)
