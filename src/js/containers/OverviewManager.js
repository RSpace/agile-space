import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AREAS, AREA_NAMES } from '../core'
import { setArea } from '../store/actions'
import introStyles from '../../css/containers/OverviewManagerIntro.css'
import tableStyles from '../../css/containers/OverviewManagerTable.css'

const SORT_ORDER = ['green', 'yellow', 'red']

class OverviewManager extends Component {
  render () {
    return this.renderOverviewState()
  }

  renderOverviewState() {
    switch(this.props.gameState) {
      case 'intro':
        return this.renderIntro()
      case 'running':
      case 'ended':
        return this.renderOverviewTable()
      default:
        throw 'Unknown game state: ' + this.props.gameState
    }
  }

  renderIntro () {
    return (
      <div className={introStyles.container}>
        <h1 className={introStyles.headline}>Team Health Check activity instructions</h1>
        <img src="images/mockups/instructions.png" className={introStyles.mockup} />
      </div>
    )
  }

  renderOverviewTable () {
    return (
      <table className={tableStyles.table}>
        <tbody>
          { AREAS.map((area) => {
            return (
              <tr key={area} className={this.props.currentArea == area ? tableStyles.rowActive : tableStyles.rowInactive} onClick={this.onAreaColClicked.bind(this, area)}>
                <th className={tableStyles.areaCol}>
                  {AREA_NAMES[area]}
                </th>
                <td>
                  { this.getResponses(area).map((color, userId) => {
                    return (
                      <img key={userId} src={`images/lights/${color}.png`} className={tableStyles.colorImage} />
                    )
                  })}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  getResponses (area) {
    let responses = this.props.areas.get(area)
    if (responses) {
      let seq = responses.valueSeq()
      return seq.sort((a, b) => {
        return SORT_ORDER.indexOf(a) - SORT_ORDER.indexOf(b)
      })
    } else {
      return []
    }
  }

  onAreaColClicked (area) {
    if (this.props.currentArea == area) { return }
    this.props.onSetArea(area)
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
    onSetArea: (area) => dispatch(setArea(area))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewManager)
