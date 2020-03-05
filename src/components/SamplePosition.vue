<template>
  <div v-if="coords">
    <GmapMap
      :center="center"
      :zoom="15"
      map-type-id="terrain"
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
    </GmapMap>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      markers: []
    }
  },
  computed: {
    center () {
      return this.coords && { lat: this.latitude, lng: this.longitude }
    },
    centerMapper () {
      return this.center && { position: this.center }
    },
    ...mapGetters('positioning', {
      coords: 'getterCoords',
      latitude: 'getterLatitude',
      longitude: 'getterLongitude'
    })
  },
  watch: {
    centerMapper () {
      this.markers = this.centerMapper ? [this.centerMapper] : []
    }
  },
  created () {
    this.actionSamplePosition()
  },
  methods: {
    ...mapActions('positioning', [
      'actionSamplePosition'
    ])
  }
}
</script>
