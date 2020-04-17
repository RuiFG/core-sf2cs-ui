<template lang="pug">
  .headline 正在登录,请稍后
</template>
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
      })
    }
  }
</script>