<template lang="pug">
  #recognition-index
    v-container.fill-height
      v-row
        v-btn-toggle.mx-auto
          v-btn 1
          v-btn 2
          v-btn 3
      template( v-for="(attendance,index) in attendanceList")
        v-col(cols=3 :key="index")
          gather-profile(
            :attendance-id="attendance.id"
            :attendance-name="attendance.name"
            :gather-name="attendance.gatherName"
            :gather-id="attendance.gatherId",
            :not-detect-person-ids="attendance.notDetectPersonIds"
            :detect-person-ids="attendance.detectPersonIds"
            :start-time="util.formatTime(attendance.createTime)"
            end-time="未结束" @click="routeDetail")
</template>
<script>
  import GatherProfile from "_c/gather-profile";
  import * as managementAPI from "_api/management"
  import * as util from "_u/util"

  export default {
    name: "recognition-index",
    components: {
      GatherProfile
    },
    computed: {
      util() {
        return util
      }
    },
    data() {
      return {
        attendanceList: []
      }
    },
    created() {
      managementAPI.getOnline().then(data => {
        console.log(data)
        this.attendanceList = data
      })
    },
    methods: {
      routeDetail(attendanceId, gatherId, gatherName) {
        console.log(gatherId)
        util.routeToName("recognition-detail",
          {attendanceId: attendanceId, gatherId: gatherId, gatherName: gatherName})
      }
    }
  }
</script>