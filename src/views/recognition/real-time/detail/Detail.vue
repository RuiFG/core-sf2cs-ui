<template lang="pug">
  #recognition-detail
    shared-header(:title="title")
    v-card(max-width="90vw" v-if="persons.length!==0").mx-md-auto
      v-row
        v-slide-group.mx-md-0
          template(v-for="(person,index) in persons")
            v-slide-item
              person-detail(:img='util.toAvatarSrc(person.avatar)' :name="person.alias" time="未检测")
    v-card(color="grey lighten-5" width="99vw" flat).mx-md-auto
      v-row(justify-md="center" align-md="center").my-md-2
        .title 当前已签到{{totalResult.length}}人，未签到{{persons.length}}人
        v-chip(x-large label outlined color="green" @click="attendanceShow=!attendanceShow").mx-md-6
          span {{attendanceShow?`关闭`:`展开`}}详情
          v-icon {{attendanceShow?`mdi-arrow-down`:`mdi-menu`}}
    v-divider
    v-scroll-y-transition
      v-row(justify-md="center" v-show="attendanceShow")
        template(v-for="(result,index) in totalResult" )
          v-hover(v-slot:default="{ hover }")
            person-detail( :img="result.face"
              :name="result.name" :time="result.time" :key="index")
              v-scale-transition
                v-overlay(v-if="hover", absolute).justify-center
                  v-row(justify-md="center" align-md="center")
                      v-img(:src='result.avatar' height='200')
                      v-chip.white--text( label color="blue lighten-3").mt-md-1
                        v-icon(left) mdi-timer-outline
                        | 相似度 {{result.compareScore}}
        v-card(width=300 height=300 flat v-show="persons.length!=0").mx-md-4.my-md-3
          v-progress-circular(size=240 width=10 indeterminate color="purple")
            span 实时更新中。。。。。


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
      let _this = this
      //初始化socket
      _this.attendanceId = _this.$route.params.attendanceId
      _this.attendanceName = _this.$route.params.attendanceName
      _this.gatherId = _this.$route.params.gatherId
      _this.gatherName = _this.$route.params.gatherName

      managementAPI.getStudentByGatherId(_this.gatherId).then(data => {
        _this.persons = data
        _this.socket = new WebSocket(`ws://127.0.0.1:9999/management/publish/${this.attendanceId}?authorization=${this.$store.getters['auth/token']}`);
        _this.socket.onopen = _this.onOpen
        _this.socket.onmessage = _this.onMessage
        _this.socket.onerror = _this.onError
        _this.socket.onclose = _this.onClose
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
        this.$message("当前考勤因出错而结束", "error")
        util.routeBack()
      },
      onMessage(event) {
        let _this = this
        let recognitionResult = JSON.parse(event.data)
          if (recognitionResult.id===undefined){
              _this.addDetail(recognitionResult)
          }
          else if(recognitionResult.persons!==undefined){
              recognitionResult.persons.forEach(person => {
                  _this.addDetail(person)
              })
          }

      },
      onClose() {
      },
        addDetail(person){
            let _this=this
            let filterPerson = _this._.find(_this.persons, {'id': person.personId});
            let filterResult = _this._.find(_this.totalResult, {"id": person.personId});
            if (_this._.isUndefined(filterPerson) && _this._.isUndefined(filterResult)) {
                console.log("错误")
            }
            if (_this._.isUndefined(filterResult)) {
                _this.totalResult.push({
                        id: person.id,
                        avatar: util.toAvatarSrc(filterPerson.avatar),
                        face: util.toFaceSrc(person.face),
                        name: filterPerson.alias,
                        compareScore: person.compareScore,
                        time: new Date().toLocaleTimeString("cn", {hour12: false})
                    }
                )
                _this.persons.splice(_this.persons.indexOf(filterPerson), 1)

            } else if (_this._.isUndefined(filterPerson)) {
                filterResult.face = util.toFaceSrc(person.face)
                filterResult.time = new Date().toLocaleTimeString("cn", {hour12: false})
            } else {
                console.log("出错")
            }
        }

    }
  }
</script>