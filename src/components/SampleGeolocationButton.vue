<template>
  <q-btn
    v-bind="{color, disable, label}"
    :label="_label"
    @click="onClick"
  />
</template>

<script>
import { mapGeolocationActions, mapGeolocationGetters } from 'quasar-app-extension-geolocation/src/store'

export default {
  props: {
    label: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      pollingTimer: null
    }
  },
  computed: {
    color () {
      if (!this.isPermissionKnown || this.isPermissionPrompt) {
        return 'primary'
      } else if (this.isPermissionGranted) {
        return 'positive'
      } else if (this.isPermissionDenied) {
        return 'negative'
      }
      return null
    },
    disable () {
      return this.isPermissionDenied
    },
    _label () {
      return this.label || this.hasPosition ? 'Resample' : 'Sample'
    },
    ...mapGeolocationGetters([
      'isPermissionKnown',
      'isPermissionGranted',
      'isPermissionPrompt',
      'isPermissionDenied',
      'hasPosition'
    ])
  },
  created () {
    this.queryPermission()
  },
  methods: {
    doQueryPermission () {
      this.queryPermission()
        .then(() => {
          if (this.isPermissionDenied) {
            // poll permission as the user might allow them in a separate tab
            this.pollingTimer = setTimeout(() => this.doQueryPermission(), 2000)
          } else if (this.pollingTimer) {
            clearTimeout(this.pollingTimer)
          }
        })
    },
    onClick () {
      this.samplePosition()
        .catch(() => { })
        .finally(() => {
          // update permissions (as the user might have enabled them)
          this.doQueryPermission()
        })
    },
    ...mapGeolocationActions([
      'samplePosition',
      'queryPermission'
    ])
  }
}
</script>
