<template>
  <q-btn
    v-bind="{color, disable, label}"
    :label="_label"
    @click="onClick"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
      if (!this.getterIsPermissionKnown || this.getterIsPermissionPrompt) {
        return 'primary'
      } else if (this.getterIsPermissionGranted) {
        return 'positive'
      } else if (this.getterIsPermissionDenied) {
        return 'negative'
      }
      return null
    },
    disable () {
      return this.getterIsPermissionDenied
    },
    _label () {
      return this.label || this.getterHasPosition ? 'Resample' : 'Sample'
    },
    ...mapGetters('geolocation', [
      'getterIsPermissionKnown',
      'getterIsPermissionGranted',
      'getterIsPermissionPrompt',
      'getterIsPermissionDenied',
      'getterHasPosition'
    ])
  },
  created () {
    this.queryPermission()
  },
  methods: {
    queryPermission () {
      this.actionQueryPermission()
        .then(() => {
          if (this.getterIsPermissionDenied) {
            // poll permission as the user might allow them in a separate tab
            this.pollingTimer = setTimeout(() => this.queryPermission(), 2000)
          } else if (this.pollingTimer) {
            clearTimeout(this.pollingTimer)
          }
        })
    },
    onClick () {
      this.actionSamplePosition()
        .catch(() => { })
        .finally(() => {
          // update permissions (as the user might have enabled them)
          this.queryPermission()
        })
    },
    ...mapActions('geolocation', [
      'actionSamplePosition',
      'actionQueryPermission'
    ])
  }
}
</script>
