<template lang="pug">
  #recognition-detail
    shared-header(:title="title")
    v-card(max-width="90vw" v-if="persons.length!==0").mx-md-auto
      v-row
        v-slide-group.mx-md-0
          template(v-for="(person,index) in persons")
            v-slide-item
              person-detail(:img='util.toAvatarSrc(person.avatar)' :name="person.alias" time="未检测")
    .title.text-md-center(v-else) 所有同学已完成签到

    v-card(color="grey lighten-5" width="99vw" flat).mx-md-auto
      v-row(justify-md="center" align-md="center").my-md-2
        .title 实时更新签到人数和检测头像(当前已签到{{totalResult.length}}人，未签到{{persons.length-totalResult.length}}人)
        v-chip(x-large label outlined color="green" @click="attendanceShow=!attendanceShow").mx-md-6
          span {{attendanceShow?`关闭`:`展开`}}详情
          v-icon {{attendanceShow?`mdi-arrow-down`:`mdi-menu`}}
    v-divider
    v-scroll-y-transition
      v-row(justify-md="center" v-show="attendanceShow")
        template(v-for="(result,index) in totalResult" )
          person-detail( :img="result.face"
            :name="result.name" :time="result.time" :key="index")
        v-card(width=300 height=300 flat v-show="persons.length!=0").mx-md-4.my-md-3
          v-progress-circular(size=70 width=7 indeterminate color="purple")


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
        return `考勤详情(${this.gatherName} | ${this.attendanceName})`
      }
    },
    data() {
      return {
        attendanceShow: true,
        attendanceId: -1,
        gatherId: -1,
        socket: null,
        totalResult: [],
        persons: []
      }
    },
    created() {
      //初始化socket
      this.attendanceId = this.$route.params.attendanceId
      this.attendanceName = this.$route.params.attendanceName
      this.gatherId = this.$route.params.gatherId
      this.gatherName = this.$route.params.gatherName

      managementAPI.getPersonByGatherId(this.gatherId).then(data => {
        this.persons = data
        this.socket = new WebSocket(`ws://127.0.0.1:9999/management/publish/${this.attendanceId}?authorization=${this.$store.getters['auth/token']}`);
        this.socket.onopen = this.onOpen
        this.socket.onmessage = this.onMessage
        this.socket.onerror = this.onError
        this.socket.onclose = this.onClose
      })
    },
    beforeDestroy() {
      this.socket.close()
    },
    methods: {
      onOpen() {
        console.log("建立连接")
      },
      onError() {
        this.$message("当前考勤因出错而结束","error")
        util.routeBack()
      },
      onMessage(event) {
        let _this = this
        let recognitionResult = JSON.parse(event.data)
        recognitionResult.persons.forEach(person => {
          let filterPerson = _this._.find(_this.persons, {'id': person.personId});
          let filterResult = _this._.find(_this.totalResult, {"id": person.personId});
          if (_this._.isUndefined(filterPerson) && _this._.isUndefined(filterResult)) {
            console.log("错误")
          }
          if (_this._.isUndefined(filterResult)) {
            _this.totalResult.push({
                id: person.id,
                face: util.toFaceSrc(person.face),
                name: filterPerson.alias,
                compareScore: person.compareScore,
                time: new Date().toLocaleTimeString("cn", {hour12: false})
              }
            )
            _this.persons.splice(_this.persons.indexOf(filterPerson))
          } else if (_this._.isUndefined(filterPerson)) {
            filterResult.face = util.toFaceSrc(person.face)
            filterResult.time = new Date().toLocaleTimeString("cn", {hour12: false})
          } else {
            console.log("出错")
          }
        })
      },
      onClose() {
        this.$message("当前考勤已结束")
        util.routeBack()
      }

    }
  }
</script>