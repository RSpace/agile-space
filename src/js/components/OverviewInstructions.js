import React from 'react'
import styles from '../../css/components/OverviewInstructions.css'

export default props => (
  <div className={styles.container}>
    <div className={styles.inner}>
      <h2>Introduction to this activity</h2>
      <p>This retrospective activity helps your team assess their current situation and identify areas where they can improve. The activity goes through a number of areas, and for each area, each team member picks a green, yellow or red light.</p>
      <p>Some or all team members then explain why they picked the response they did. This is repeated for each area, and usually wrapped up by looking for the "worst" areas to take immediate action on.</p>

      <h3>Frequently asked questions</h3>
      <p>
        Click the
        <img src="images/instructions/icon.png" className={styles.faqIcon} />
        button above the Altspace menu button to view the FAQ at any time.
      </p>
    </div>
  </div>
)
