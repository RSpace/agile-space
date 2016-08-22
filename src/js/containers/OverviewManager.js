import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AREAS, AREA_NAMES } from '../core'
import styles from '../../css/containers/OverviewManager.css'

class OverviewManager extends Component {
  render () {
    return (
      <table className={styles.table}>
        <tbody>
          { AREAS.map((area) => {
            return (
              <tr key={area} className={styles.row}>
                <th className={styles.areaCol}>{AREA_NAMES[area]}</th>
                <td>
                  { this.getResponses(area).map((color, userId) => {
                    return (
                      <img key={userId} src={`images/response_cards/${color}_light.png`} height="50" />
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
      return responses.valueSeq()
    } else {
      return []
    }
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
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewManager)
