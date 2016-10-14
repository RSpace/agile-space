import { isOverview } from '../core'

var AudioContext = window.AudioContext || window.webkitAudioContext
var audioContext = new AudioContext()

function AppAudio (url) {
  this.volume = 1
  this.loaded = new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest()
    req.open('GET', url)
    req.responseType = 'arraybuffer'
    req.onload = function () {
      audioContext.decodeAudioData(req.response, function (buffer) {
        this.buffer = buffer
        resolve()
      }.bind(this))
    }.bind(this)
    req.send()
  }.bind(this))
}

AppAudio.prototype.play = function () {
	var source = audioContext.createBufferSource()
	source.buffer = this.buffer

	var gainNode = audioContext.createGain()
	gainNode.gain.value = this.volume
	source.connect(gainNode)
	gainNode.connect(audioContext.destination)

	source.start(0)
}

let responseSound
let areaChangeSound
export function loadSounds() {
  responseSound = new AppAudio("sounds/cardup.ogg")
  areaChangeSound = new AppAudio("sounds/crystalglass.ogg")

  responseSound.volume = 0.5
  areaChangeSound.volume = 0.5

  return Promise.all([
    responseSound.loaded,
    areaChangeSound.loaded
  ])
}

export function playResponseSound() {
  play(responseSound)
}

export function playAreaChangeSound() {
  play(areaChangeSound)
}

function play(sound) {
  if (isOverview()) {
    return
  }

  sound.play()
}
