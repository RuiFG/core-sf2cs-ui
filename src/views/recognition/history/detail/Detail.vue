<template lang="pug">
  #recognition-detail
    shared-header(:title="title")
    v-card(max-width="90vw" v-if="persons.length!==0").mx-md-auto
      v-row
        v-slide-group.mx-md-0
          template(v-for="(person,index) in persons")
            v-slide-item
              v-hover(v-slot:default="{ hover }")
                person-detail(:img='util.toAvatarSrc(person.avatar)' :name="person.alias" time="未检测")
                  v-scale-transition
                    v-overlay(v-if="hover", absolute opacity="0.6")
                      v-btn(large outlined color="deep-orange lighten-3" ) 手动签到
    .title.text-md-center(v-else) 所有同学已完成签到

    v-card(color="grey lighten-5" width="99vw" flat).mx-md-auto
      v-row(justify-md="center" align-md="center").my-md-2
        .title 签到人数和检测头像(当前已签到{{totalResult.length}}人，未签到{{persons.length-totalResult.length}}人)
        v-chip(x-large label outlined color="green" @click="attendanceShow=!attendanceShow").mx-md-6
          span {{attendanceShow?`关闭`:`展开`}}详情
          v-icon {{attendanceShow?`mdi-arrow-down`:`mdi-menu`}}
    v-divider
    v-scroll-y-transition
      v-row(justify-md="center" v-show="attendanceShow")
        template(v-for="(result,index) in totalResult" )
          person-detail( :img="util.toFaceSrc(result.face)"
            :name="result.name" :time="result.time" :key="index")


</template>
<script>
  import * as util from '_u/util'
  import * as managementAPI from '_api/management'
  import PersonDetail from "_c/person-detail";
  import SharedHeader from "_c/shared-header";

  export default {
    name: "recognition-detail",
    components: {
      PersonDetail,
      SharedHeader
    },
    computed: {
      util() {
        return util
      },
      title() {
        return `历史考勤详情(${this.gatherName} | ${this.attendanceName})`
      }
    },
    data() {
      return {
        attendanceShow: true,
        attendanceId: -1,
        gatherId: -1,
        totalResult: [],
        persons: []
      }
    },
    created() {
      let _this = this
      //初始化socket
      _this.attendanceId = _this.$route.params.attendanceId
      _this.attendanceName = _this.$route.params.attendanceName
      _this.gatherId = _this.$route.params.gatherId
      _this.gatherName = _this.$route.params.gatherName
      managementAPI.getPersonByGatherId(_this.gatherId).then(data => {
        _this.persons = data
        managementAPI.getHistoryDetail(_this.attendanceId).then(data => {
          data.forEach(attendanceDetail => {
            let person = _this._.find(_this.persons, {"id": attendanceDetail.personId});
            _this.totalResult.push({
              name: person.alias,
              face: attendanceDetail.face,
              scope: attendanceDetail.scope,
              time: new Date(attendanceDetail.modifyTime).toLocaleTimeString('cn', {hour12: false})
            })
            console.log(person)
            _this.persons.splice(_this.persons.indexOf(person))
          })
        })
      })

    },
    methods: {}
  }
</script>