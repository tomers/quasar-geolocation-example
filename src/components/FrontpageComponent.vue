<template>
  <div class="column q-gutter-md">
    <sample-geolocation-button />
    <geolocation-permission-banner />
    <sample-position v-if="getterHasPosition" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GeolocationPermissionBanner from './GeolocationPermissionBanner'
import SampleGeolocationButton from './SampleGeolocationButton'
import SamplePosition from './SamplePosition'

export default {
  components: {
    GeolocationPermissionBanner,
    SampleGeolocationButton,
    SamplePosition
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('geolocation', [
      'getterHasPosition'
    ])
  }
}
</script>
