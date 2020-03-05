<template>
  <div v-if="position">
    Sample! {{ position }}
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {}
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
