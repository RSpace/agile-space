import AFRAME from 'aframe'
import altspace from 'altspace'

delete AFRAME.components['look-at-altspace-user']

/**
 * Look-at-altspace-user component.
 *
 * Modifies rotation to turn towards the position of the active AltspaceVR user.
 * If used outside the AltspaceVR it works like look-at="[camera]"
 */
AFRAME.registerComponent('look-at-altspace-user', {
  schema: {
    default: '',
  },

  init: function () {
    this.target3D = null
    this.vector = new THREE.Vector3()

    if (altspace.inClient) {
      altspace.getThreeJSTrackingSkeleton().then(function(skeleton)
      {
        this.target3D = skeleton.getJoint("Eye")
      }.bind(this))
    } else {
      let targetEl = this.el.sceneEl.querySelector('[camera]')
      if (targetEl.hasLoaded) {
        this.beginTracking(targetEl)
      } else {
        targetEl.addEventListener('loaded', function () {
          this.beginTracking(targetEl)
        })
      }
    }
  },

  tick: function (t) {
    var target3D = this.target3D
    if (target3D) {
      return this.el.object3D.lookAt(target3D.position)
    }
  },

  beginTracking: function (targetEl) {
    this.target3D = targetEl.object3D
  }
})
