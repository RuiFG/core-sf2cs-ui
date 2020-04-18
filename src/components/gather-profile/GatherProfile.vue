<template lang="pug">
  v-card#gather-card(hover @click="click").ma-1.pa-0
    v-card-title.text-center {{attendanceName}}
    v-card-subtitle.pb-0
      v-chip(color="primary" outlined)
        v-avatar(left)
          v-icon mdi-account-circle
        span {{gatherName}}
      v-chip(outlined)  {{detectPersonIds.length+notDetectPersonIds.length}} 人
    v-container.my-0.mx-2.pt-0
      v-row.subtitle-1
        v-col(cols=6)
          span.green--text 已识别
          span {{detectPersonIds.length}}人
        v-col(cols=6)
          span.red--text 未识别
          span {{notDetectPersonIds.length}}人
      v-row.mx-auto
        span.green--text 开始：
        span.subtitle-2 {{startTime}}
      v-row.mx-auto
        span.red--text 结束：
        span.subtitle-2 {{endTime}}


</template>
<script>
  export default {
    name: "gather-profile",
    props: {
      attendanceId: Number,
      attendanceName: String,
      gatherName: String,
      gatherId: Number,
      detectPersonIds: Array,
      notDetectPersonIds: Array,
      startTime: String,
      endTime: String
    },
    methods: {
      click() {
        this.$emit("click", this.attendanceId, this.gatherId, this.gatherName)
      }
    }
  }
</script>
<style lang="stylus">
  #gather-card
    border-bottom-right-radius 40px
</style>