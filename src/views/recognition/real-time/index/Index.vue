<template lang="pug">
  #recognition-index
    shared-header(title="班级考勤")
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
              end-time="未结束" @click="routeDetail")
</template>
<script>
  import GatherProfile from "_c/gather-profile";
  import * as managementAPI from "_api/management"
  import * as util from "_u/util"
  import SharedHeader from "_c/shared-header";

  export default {
    name: "recognition-index",
    components: {
      GatherProfile,
      SharedHeader
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
        if (data.length === 0) {
          this.$message("当前无班级考勤", 'warning')
          util.routeBack()
        }
        this.attendanceList = data
      })
    },
    methods: {
      routeDetail(attendanceId, attendanceName, gatherId, gatherName) {
        console.log(gatherId)
        util.routeToName("recognition-detail",
          {attendanceId: attendanceId, attendanceName: attendanceName, gatherId: gatherId, gatherName: gatherName})
      }
    }
  }
</script>