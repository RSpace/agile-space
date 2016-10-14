import React, { Component } from 'react'
import FaqItem from './FaqItem'
import styles from '../../css/components/Faq.css'

const FAQ_ITEMS = [
  {
    heading: "How many players/team members are needed?",
    body: "This activity is meant to have all team members present if possible."
  },
  {
    heading: "Do we need a facilitator?",
    body: "It is recommended to have a facilitator, preferably from outside the team, to run the activity. This can be especially helpful to ensure that everyone gets to say something, and to keep the team on track and on time.",
  },
  {
    heading: "What is an area?",
    body: "An area is a perspective on the work done by the team (ie. quality, fun, value, etc.). The areas were made with a software development team in mind, but can be used for other types of teams.",
  },
  {
    heading: "When should I play a green card?",
    body: "Nothing is ever perfect, so you can play a green card if you are fairly happy with this area and it does not need to improve anytime soon.",
  },
  {
    heading: "When should I play a red card?",
    body: "Play a red light when an area needs immediate improvement seen from your perspective. Be generous with your red cards, the activity is less valuable if everyone plays yellow cards for everything.",
  },
  {
    heading: "When should I play yellow card?",
    body: "As rarely as possible. Often something is fine as it is, or it should really be improved as soon as possible. Only play a yellow card when the area really is in between those two.",
  },
  {
    heading: "Can I change my selected card?",
    body: "Yes, you can change your selected card until the activity progresses to the next area.",
  },
  {
    heading: "Why these specific areas?",
    body: "This is the default areas suggested in the original model made for software development teams. Eventually, it should be possible to pick and create your own areas.",
  },
  {
    heading: "Do I have to play a card?",
    body: "No, you don't have to play a card each round. But you are highly encouraged to do so, even if you only have a slight idea.",
  },
  {
    heading: "Should we be able to see each other's responses?",
    body: "It varies from team to team what works best, but don't be influenced by what other people play. Make up your own mind.",
  },
  {
    heading: "Should we take notes?",
    body: "You are highly encouraged to have someone taking notes, although they will probably have to be outside of AltspaceVR, or at least not participating in virtual reality.",
  }
]

export default class Faq extends Component {
  render () {
    return (
      <div className={styles.container}>
        {FAQ_ITEMS.map(this.renderItem)}
      </div>
    )
  }

  renderItem (faq_item, index) {
    return (
      <FaqItem heading={faq_item.heading} body={faq_item.body} key={index} />
    )
  }
}
