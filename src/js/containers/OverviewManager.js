import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AREAS, AREA_NAMES } from '../core'
import { setArea } from '../store/actions'
import introStyles from '../../css/containers/OverviewManagerIntro.css'
import tableStyles from '../../css/containers/OverviewManagerTable.css'

const SORT_ORDER = ['green', 'yellow', 'red']

class OverviewManager extends Component {
  render () {
    return (
      <div className={introStyles.outerContainer}>
        { this.renderOverviewTable () }
        { this.renderInstructions () }
      </div>
    )
  }

  renderInstructions () {
    return (
      <div className={introStyles.container}>
        <div className={introStyles.inner}>
          <h2>Introduction to this activity</h2>
          <p>This retrospective activity helps your team assess their current situation and identify areas where they can improve. The activity goes through a number of areas, and for each area, each team member picks a green, yellow or red light.</p>
          <p>Some or all team members then explain why they picked the response they did. This is repeated for each area, and usually wrapped up by looking for the "worst" areas to take immediate action on.</p>

          <h3>Frequently asked questions</h3>
          <p>
            Click the
            <img src="images/instructions/icon.png" className={introStyles.faqIcon} />
            button above the Altspace menu button to view the FAQ at any time.
          </p>
        </div>
      </div>
    )
  }

  renderOverviewTable () {
    return (
      <div className={tableStyles.container}>
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
        <div className={tableStyles.tip}>
          <p>
            <strong>Tip:</strong> You can click any area in the table above to switch to that area.
          </p>
        </div>
      </div>
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
