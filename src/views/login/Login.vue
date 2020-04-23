<template lang="pug">
  #login.fill-height.mx-auto.justify-center.align-center.d-flex.flex-column
    p.blue--text.text-md-center(style="width:300px") 正在登录
    v-progress-linear(indeterminate, rounded, height="6", striped)
</template>
<script>
  import * as util from '_u/util'

  export default {
    name: "login",
    created() {
      let _this = this;
      let code = util.getQueryString("code")
      let data={type:"code",code:code}
      console.log(code)
      _this.$store.dispatch("auth/login", {data}).then(data => {
        console.log("登录成功" + data)
        util.routeToName("index")
      }).then(error => {
        console.log("登录失败" + error)
      })
    }
  }
</script>
