<template>
  <div>
    <q-banner
      v-if="getterIsPermissionGranted"
      rounded
      class="bg-primary text-white"
    >
      Geolocation privileges granted
    </q-banner>
    <q-banner
      v-if="getterIsPermissionPrompt"
      rounded
      class="bg-primary text-white"
    >
      <template v-slot:avatar>
        <q-icon
          name="info"
          color="white"
        />
      </template>
      Need to ask for geolocation privileges
    </q-banner>
    <q-banner
      v-if="getterIsPermissionDenied"
      rounded
      class="text-white bg-red"
    >
      Location sharing is blocked
      <template v-slot:action>
        <q-btn
          flat
          color="white"
          label="How to share your location"
          @click="openURL('https://support.google.com/chrome/answer/142065')"
        />
      </template>
    </q-banner>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('geolocation', [
      'getterIsPermissionGranted',
      'getterIsPermissionPrompt',
      'getterIsPermissionDenied',
      'getterHasPosition'
    ])
  }
}
</script>
