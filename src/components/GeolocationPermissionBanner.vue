<template>
  <q-banner
    rounded
    :class="classes"
  >
    <template v-slot:avatar>
      <q-icon
        :name="icon"
        :color="iconColor"
      />
    </template>
    {{ label }}
    <template
      v-if="isPermissionDenied"
      v-slot:action
    >
      <q-btn
        flat
        color="white"
        label="How to share your location"
        @click="openURL('https://support.google.com/chrome/answer/142065')"
      />
    </template>
  </q-banner>
</template>

<script>
import { mapGeolocationGetters } from 'quasar-app-extension-geolocation/src/store'

export default {
  computed: {
    classes () {
      if (this.isPermissionGranted) {
        return 'bg-primary text-white'
      } else if (this.isPermissionPrompt) {
        return 'bg-grey-3'
      } else if (this.isPermissionDenied) {
        return 'text-white bg-red'
      }
      return null
    },
    icon () {
      if (this.isPermissionGranted) {
        return 'done'
      } else if (this.isPermissionPrompt) {
        return 'info'
      } else if (this.isPermissionDenied) {
        return 'block'
      }
      return null
    },
    iconColor () {
      if (this.isPermissionGranted) {
        return 'white'
      } else if (this.isPermissionPrompt) {
        return null
      } else if (this.isPermissionDenied) {
        return 'white'
      }
      return null
    },
    label () {
      if (this.isPermissionGranted) {
        return 'Geolocation privileges granted'
      } else if (this.isPermissionPrompt) {
        return 'Need to ask for geolocation privileges'
      } else if (this.isPermissionDenied) {
        return 'Location sharing is blocked'
      }
      return null
    },
    ...mapGeolocationGetters([
      'isPermissionGranted',
      'isPermissionPrompt',
      'isPermissionDenied',
      'hasPosition'
    ])
  }
}
</script>
