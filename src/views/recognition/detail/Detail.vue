<template lang="pug">
  #recognition-detail
    .headline asf
</template>
<script>
  // import * as util from '_u/util'
  export default {
    name: "recognition-detail",
    data() {
      return {
        attendanceId: -1
      }
    },
    created() {
      this.attendanceId = this.$route.params.id
      let socket = new WebSocket(`ws://127.0.0.1:9999/management/publish/${this.attendanceId}?authorization=${this.$store.getters['auth/token']}`);
      socket.onopen = this.onOpen
      socket.onmessage = this.onMessage
      socket.onerror = this.onError
      socket.onclose = this.onClose
    },
    methods: {
      onOpen() {
        console.log("建立连接")
      },
      onError() {
        console.log("出错")
      },
      onMessage(data) {
        console.log(data)
      },
      onClose() {
        console.log("关闭")
      }

    }
  }
</script>