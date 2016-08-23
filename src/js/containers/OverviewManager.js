import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AREAS, AREA_NAMES } from '../core'
import { setArea } from '../store/actions'
import styles from '../../css/containers/OverviewManager.css'

const SORT_ORDER = ['green', 'yellow', 'red']

class OverviewManager extends Component {
  render () {
    return (
      <table className={styles.table}>
        <tbody>
          { AREAS.map((area) => {
            return (
              <tr key={area} className={this.props.currentArea == area ? styles.rowActive : styles.rowInactive} onClick={this.onAreaColClicked.bind(this, area)}>
                <th className={styles.areaCol}>
                  {AREA_NAMES[area]}
                </th>
                <td>
                  { this.getResponses(area).map((color, userId) => {
                    return (
                      <img key={userId} src={`images/lights/${color}.png`} className={styles.colorImage} />
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
