import React from 'react'
import styles from '../../css/containers/Faq.css'

export default props => (
  <div className={styles.item}>
    <h3>{props.heading}</h3>
    <p>{props.body}</p>
  </div>
)
