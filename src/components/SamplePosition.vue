<template>
  <div v-if="position">
    <GmapMap
      :center="{lat:10, lng:10}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      markers: []
    }
  },
  computed: {
    ...mapState('positioning', [
      'position'
    ])
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
