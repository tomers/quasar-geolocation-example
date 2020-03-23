<template>
  <div v-if="coords">
    <GmapMap
      :center="center"
      :zoom="15"
      map-type-id="satellite"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        v-for="(m, index) in markers"
        :key="`marker_${index}`"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
      <GmapCircle
        :center="center"
        :radius="accuracy"
      />
    </GmapMap>
  </div>
</template>

<script>
import { mapGeolocationGetters } from 'quasar-app-extension-geolocation/src/store'

export default {
  computed: {
    center () {
      return this.coords && { lat: this.latitude, lng: this.longitude }
    },
    centerMapper () {
      return this.center && { position: this.center }
    },
    markers () {
      return this.centerMapper ? [this.centerMapper] : []
    },
    ...mapGeolocationGetters([
      'coords',
      'latitude',
      'longitude',
      'accuracy'
    ])
  }
}
</script>
