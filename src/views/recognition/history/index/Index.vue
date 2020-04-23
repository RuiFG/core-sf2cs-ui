<template lang="pug">
  #recognition-history-index
    shared-header(title="历史考勤")
    v-container
      v-row
        template( v-for="(attendance,index) in attendanceList")
          v-col(cols=3 :key="index")
            gather-profile(
              :attendance-id="attendance.id"
              :attendance-name="attendance.name"
              :gather-name="attendance.gatherName"
              :gather-id="attendance.gatherId",
              :not-detect-person-ids="attendance.notDetectPersonIds"
              :detect-person-ids="attendance.detectPersonIds"
              :start-time="attendance.createTime"
              :end-time="attendance.modifyTime" @click="routeDetail")
</template>
<script>
  import * as util from "_u/util";
  import * as managementAPI from "_api/management";
  import SharedHeader from "_c/shared-header";
  import GatherProfile from "_c/gather-profile";
  export default {
    name: "recognition-history-index",
    data() {
      return {
        attendanceList: []
      }
    },
    components: {
      SharedHeader,
      GatherProfile
    },
    created() {
      managementAPI.getHistory().then(data => {
        if (data.length === 0) {
          this.$message("当前无历史班级考勤", 'warning')
          util.routeBack()
        }
        this.attendanceList = data
      }).catch(() => {
        this.$message("无法加载", 'error')
        util.routeBack()
      })
    },
    methods: {
      routeDetail(attendanceId, attendanceName, gatherId, gatherName) {
        console.log(gatherId)
        util.routeToName("recognition-history-detail",
          {attendanceId: attendanceId, attendanceName: attendanceName, gatherId: gatherId, gatherName: gatherName})
      }
    }
  }
</script>