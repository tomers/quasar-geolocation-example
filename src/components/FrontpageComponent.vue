<template>
  <div class="column q-gutter-md">
    <q-btn
      label="Sample Position"
      color="primary"
      @click="onSample"
    />
    <sample-position v-if="sample" />
  </div>
</template>

<script>
import SamplePosition from './SamplePosition'

export default {
  components: {
    SamplePosition
  },
  data () {
    return {
      sample: false
    }
  },
  methods: {
    onSample () {
      this.sample = true
    }
  }
}
</script>
