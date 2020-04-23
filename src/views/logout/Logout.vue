<template lang="pug">
  #logout.fill-height.mx-auto.justify-center.align-center.d-flex.flex-column
    p.blue--text.text-md-center(style="width:300px") 正在注销
    v-progress-linear(indeterminate, rounded, height="6", striped)
</template>
<script>
  import * as util from '_u/util'

  export default {
    name: "logout",
    created() {
      this.$store.dispatch("auth/logout").then(() => {
        setTimeout(() => util.routeToName("index"), 3000)
      })
    }
  }
</script>