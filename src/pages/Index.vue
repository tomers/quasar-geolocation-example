<template>
  <q-page class="flex flex-center">
    <frontpage-component />
  </q-page>
</template>

<script>
import FrontpageComponent from '../components/FrontpageComponent'

export default {
  name: 'PageIndex',
  components: {
    FrontpageComponent
  }
}
</script>
