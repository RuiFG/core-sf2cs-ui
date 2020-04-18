<template lang="pug">
  #recognition-detail
    template(v-for="(result,index) in totalResult" )
      person-detail(:gather-name="result.gatherName" :img="result.faceImg"
        :name="result.name" :time="result.time" :key="index")

</template>
<script>
  import * as util from '_u/util'
  import * as managementAPI from '_api/management'
  import PersonDetail from "_c/person-detail";

  export default {
    name: "recognition-detail",
    components: {
      PersonDetail
    },
    data() {
      return {
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
      this.gatherId = this.$route.params.gatherId
      this.gatherName = this.$route.params.gatherName
      this.socket = new WebSocket(`ws://127.0.0.1:9999/management/publish/${this.attendanceId}?authorization=${this.$store.getters['auth/token']}`);
      this.socket.onopen = this.onOpen
      this.socket.onmessage = this.onMessage
      this.socket.onerror = this.onError
      this.socket.onclose = this.onClose
      managementAPI.getNoFacePersonByGatherId(this.gatherId).then(data => {
        this.persons = data
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
        console.log("出错")
      },
      onMessage(event) {
        let _this = this
        let recognitionResult = util.toRecognitionResult(event.data);
        recognitionResult.persons.forEach(person => {
          let filterPerson = _this._.filter(_this.persons, ['id', person.id]);
          if (filterPerson.length !== 1) {
            console.log("出错")
            return
          }
          let filterResult = _this._.filter(_this.totalResult, ["id", person.id]);
          if (filterResult.length === 0) {
            _this.totalResult.push({
                id: person.id,
                faceImg: person.faceImg,
                name: filterPerson[0].alias,
                compareScore: person.compareScore,
                time: new Date().toTimeString()
              }
            )
          } else if (filterResult.length === 1) {
            filterResult[0].faceImg = person.faceImg
            filterResult[0].time = new Date().toTimeString()
          } else {
            console.log("出错")
          }
        })
      },
      onClose() {
        console.log("关闭")
      }

    }
  }
</script>