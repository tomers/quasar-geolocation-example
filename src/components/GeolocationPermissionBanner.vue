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
      v-if="getterIsPermissionDenied"
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
import { mapGetters } from 'vuex'

export default {
  computed: {
    classes () {
      if (this.getterIsPermissionGranted) {
        return 'bg-primary text-white'
      } else if (this.getterIsPermissionPrompt) {
        return 'bg-grey-3'
      } else if (this.getterIsPermissionDenied) {
        return 'text-white bg-red'
      }
      return null
    },
    icon () {
      if (this.getterIsPermissionGranted) {
        return 'done'
      } else if (this.getterIsPermissionPrompt) {
        return 'info'
      } else if (this.getterIsPermissionDenied) {
        return 'block'
      }
      return null
    },
    iconColor () {
      if (this.getterIsPermissionGranted) {
        return 'white'
      } else if (this.getterIsPermissionPrompt) {
        return null
      } else if (this.getterIsPermissionDenied) {
        return 'white'
      }
      return null
    },
    label () {
      if (this.getterIsPermissionGranted) {
        return 'Geolocation privileges granted'
      } else if (this.getterIsPermissionPrompt) {
        return 'Need to ask for geolocation privileges'
      } else if (this.getterIsPermissionDenied) {
        return 'Location sharing is blocked'
      }
      return null
    },
    ...mapGetters('geolocation', [
      'getterIsPermissionGranted',
      'getterIsPermissionPrompt',
      'getterIsPermissionDenied',
      'getterHasPosition'
    ])
  }
}
</script>
