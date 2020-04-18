<template lang="pug">
  .text-center
    v-progress-circular(:size='80', color='primary', indeterminate='')
      p.font-weight-thin We Loading…
</template>
<style lang="stylus">
  .v-progress-circular {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
<script>
  import * as util from '_u/util'

  export default {
    name: "login",
    created() {
      let _this = this;
      let code = util.getQueryString("code")
      console.log(code)
      _this.$store.dispatch("auth/getToken", {code}).then(data => {
        console.log("登录成功" + data)
        util.routeToName("index")
      }).then(error => {
        console.log("登录失败" + error)
      })
    }
  }
</script>
