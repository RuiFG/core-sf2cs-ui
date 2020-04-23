<template lang="pug">
  #shared-header
    v-row(no-gutters align-md="center" )
      v-btn(text  @click="util.routeBack" fab small).mx-md-2
        v-icon mdi-arrow-left
      .headline.mx-md-auto {{title}}
    v-divider
</template>
<script>
  import * as util from '_u/util'

  export default {
    name: "shared-header",
    props: {
      title: String
    },
    computed: {
      util() {
        return util
      }
    }
  }
</script>