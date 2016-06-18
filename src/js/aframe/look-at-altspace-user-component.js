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
    enabled: { default: true },
    yMode: { default: false } // Only rotate around y-axis
  },

  init: function () {
    this.target3D = null
    this.vector = new THREE.Vector3()
    this.sceneObject3d = this.el.sceneEl.object3D

    if (altspace.inClient) {
      altspace.getThreeJSTrackingSkeleton().then(function(skeleton)
      {
        skeleton.name = "altvr-skeleton"
        this.sceneObject3d.add(skeleton)
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
    if (this.data.enabled === false ) {
      return
    }

    let target3D = this.target3D
    if (target3D) {
      this.vector.setFromMatrixPosition(target3D.matrixWorld)

      if (this.data.yMode) {
        let yRotationAngle = (this.calculateAngle(this.vector)*-1)+90
        let rotation = this.el.getComputedAttribute('rotation')
        this.el.setAttribute('rotation', {
          x: rotation.x,
          y: yRotationAngle,
          z: rotation.z
        })
      } else {
        if (altspace.inClient) {
          return this.el.object3D.lookAt(target3D.position)
        } else {
          return this.el.object3D.lookAt(this.vector)
        }
      }
    } else {
      let skeleton = this.sceneObject3d.getObjectByName("altvr-skeleton")
      if (skeleton) {
        this.target3D = skeleton.getJoint("Eye")
      }
    }
  },

  beginTracking: function (targetEl) {
    this.target3D = targetEl.object3D
  },

  calculateAngle: function(vector) {
    let xDiff = vector.x - 0; // Table center is at (0, 0)
    let zDiff = vector.z - 0;
    return Math.atan2(zDiff, xDiff) * 180 / Math.PI
  }
})
