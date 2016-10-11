import React, { Component } from 'react'
import { AREAS, AREA_NAMES } from '../core'
import RestartControl from './RestartControl'
import styles from '../../css/components/OverviewMatrix.css'

const SORT_ORDER = ['green', 'yellow', 'red']

export default class OverviewMatrix extends Component {
  render () {
    return (
      <div className={styles.container}>
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
            { this.renderModeratorControls() }
          </tbody>
        </table>
      </div>
    )
  }

  renderModeratorControls () {
    if (this.props.userIsModerator) {
      return (
        <tr>
          <td className={styles.tip}>
            <p>
              <strong>Tip:</strong> Click area to switch to it.
            </p>
          </td>
          <td>
            <RestartControl onRestart={this.props.onRestart} />
          </td>
        </tr>      
      )
    } else {
      return null
    }
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
