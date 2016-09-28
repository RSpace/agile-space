import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AREAS, AREA_NAMES } from '../core'
import { setArea, restartGame } from '../store/actions'
import OverviewInstructions from '../components/OverviewInstructions'
import OverviewMatrix from '../components/OverviewMatrix'
import styles from '../../css/containers/OverviewManager.css'

class OverviewManager extends Component {
  render () {
    return (
      <div className={styles.outerContainer}>
        <OverviewInstructions gameState={this.props.gameState} />

        <OverviewMatrix
          currentArea={this.props.currentArea}
          onSetArea={this.props.onSetArea}
          gameState={this.props.gameState}
          areas={this.props.areas}
          onRestart={this.props.onRestart}
        />
      </div>
    )
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    gameState: state.get('gameState'),
    currentArea: state.get('currentArea'),
    areas: state.get('areas')
  }
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onSetArea: (area) => dispatch(setArea(area)),
    onRestart: () => dispatch(restartGame())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewManager)
