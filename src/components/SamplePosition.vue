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
import { mapGetters } from 'vuex'

export default {
  computed: {
    center () {
      return this.coords && { lat: this.latitude, lng: this.longitude }
    },
    centerMapper () {
      return this.center && { position: this.center }
    },
    ...mapGetters('geolocation', {
      coords: 'getterCoords',
      latitude: 'getterLatitude',
      longitude: 'getterLongitude',
      accuracy: 'getterAccuracy'
    }),
    markers () {
      return this.centerMapper ? [this.centerMapper] : []
    }
  }
}
</script>
