import { isOverview } from '../core'

export function playResponseSound() {
  play("response-sound")
}

export function playAreaChangeSound() {
  play("area-change-sound")
}

function play(elementId) {
  if (isOverview()) {
    return
  }

  let el = document.getElementById(elementId)
  if (el) {
    el.play()
    console.log("Playing " + elementId)
  } else {
    console.log("Unable to find element " + elementId + " and play sound.")
  }
}
