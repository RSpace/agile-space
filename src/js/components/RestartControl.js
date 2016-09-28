import React, { Component } from 'react'
import styles from '../../css/components/RestartControl.css'

export default class RestartControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isConfirming: false
    }
  }

  render () {
    return (
      <div className={styles.container}>
        { this.state.isConfirming ? this.renderConfirm() : this.renderRestartButton() }
      </div>
    )
  }

  renderRestartButton () {
    return (
      <button
        className={styles.restartButton}
        onClick={this.onRestartInitiated.bind(this)}
      >Restart</button>
    )
  }

  renderConfirm () {
    return (
      <div className={styles.confirmContainer}>
        <p className={styles.confirmText}>Are you sure you want to restart?</p>
        <button
          className={styles.yesButton}
          onClick={this.onRestartConfirmed.bind(this)}
        >Yes</button>
        <button
          className={styles.noButton}
          onClick={this.onRestartCancelled.bind(this)}
        >No</button>
      </div>
    )
  }

  onRestartInitiated () {
    this.setState({ isConfirming: true })
  }

  onRestartConfirmed () {
    this.setState({ isConfirming: false })
    this.props.onRestart()
  }

  onRestartCancelled () {
    this.setState({ isConfirming: false })
  }
}
