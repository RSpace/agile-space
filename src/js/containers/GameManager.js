import React, { Component } from 'react'
import { Entity } from 'aframe-react'
import { connect } from 'react-redux'
import { getMySelectedColor, getOtherUsers } from '../core'
import { setResponse, nextArea } from '../store/actions'
import Table from '../components/Table'
import AreaCard from '../components/AreaCard'
import MyResponseCards from '../components/MyResponseCards'
import ResponseCard from '../components/ResponseCard'

class GameManager extends Component {
  render () {
    return (
      <Entity>
        <Table />
        <AreaCard title={this.props.currentArea} onNextArea={this.props.onNextArea} />
        <MyResponseCards selectedColor={this.props.selectedColor} onResponse={this.props.onResponse} />

        { this.props.otherUsers.valueSeq().map(function(user) {
          if (user.color) {
            return (
              <Entity rotation={[0, user.tableAngle, 0]} key={user.id}>
                <ResponseCard
                  color={user.color}
                  selected={true}
                />
              </Entity>
            )
          }
        }.bind(this))}

      </Entity>
    )
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    currentArea: state.get('currentArea'),
    selectedColor: getMySelectedColor(state),
    otherUsers: getOtherUsers(state)
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
