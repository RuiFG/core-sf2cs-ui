<template lang="pug">
  #student-attendance
    shared-header(title="我的考勤")
    v-container
      v-row(align-md="center")
        template(v-for="(studentAttendanceInfo,index) in studentAttendanceInfoList" )
          v-col(cols=3)
            v-card(width=250 height=300).mx-md-4.my-md-3
              v-img.white--text.align-end(:src='util.toFaceSrc(studentAttendanceInfo.face)'
                gradient='to bottom, rgba(0,0,0,.0), rgba(0,0,0,.1)' height='200')
                .title.text-md-center(v-if="studentAttendanceInfo.face==='default'") 缺勤
              v-chip-group
                v-chip.mx-md-auto.white--text(label color="lime lighten-3")
                  v-icon(left) mdi-label
                  | 相似度 {{studentAttendanceInfo.score}}
                v-chip.white--text.mx-md-auto( label color="orange lighten-3")
                  v-icon(left) mdi-account-group
                  | {{studentAttendanceInfo.gatherName}}
              v-chip-group
                v-chip.mx-md-auto.white--text(label color="light-blue lighten-3")
                  v-icon(left) mdi-account-network
                  | {{studentAttendanceInfo.attendanceName}}

</template>
<script>
  import * as managementAPI from '_api/management'
  import SharedHeader from "_c/shared-header";
  import * as util from '_u/util'

  export default {
    name: "student-attendance",
    components: {
      SharedHeader
    },
    computed: {
      util() {
        return util
      }
    },
    data() {
      return {
        studentAttendanceInfoList: [
          {
            attendanceName: "第一次考勤",
            gatherName: "三班",
            face: "default",
            score: 0.0,
          },
          {
            attendanceName: "第二次考勤",
            gatherName: "三班",
            face: "default",
            score: 0.0,
          },
          {
            attendanceName: "第三次考勤",
            gatherName: "三班",
            face: "1bfc1183-84bc-4f22-a02e-e16e90301c9f",
            score: 0.8,
          }
        ]
      }
    },
    created() {
      this.loadHistory()
    },
    methods: {
      loadHistory() {
        let _this = this
        managementAPI.getStudentHistory().then(data => {
          _this.studentAttendanceInfoList = data
        })
      }
    }
  }
</script>