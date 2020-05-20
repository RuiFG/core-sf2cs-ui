<template lang="pug">
  v-card(hover width="300" color="blue lighten-4")
    v-card-title.justify-md-center
      v-icon mdi-account-supervisor-circle
      | {{gatherName}}
    v-card-subtitle.d-flex.justify-md-center
      | {{gatherSize}}人
    v-card-actions
      v-row(justify-md="center")
        v-col(cols=6)
          v-row(justify-md="center").my-md-2
            v-btn(@click="click(1)" color="green lighten-3" dark) 添加学生
          v-row(justify-md="center").my-md-2
            v-btn(@click="click(2)" color="amber lighten-3" dark) 删除学生
        v-col(cols=6)
          v-row(justify-md="center").my-md-2
            v-btn(@click="click(3)" color="green lighten-3" dark) 添加教师
          v-row(justify-md="center").my-md-2
            v-btn(@click="click(4)" color="amber lighten-3" dark) 删除教师
</template>
<script>
  export default {
    name: "gather",
    props: {
      gatherId: Number,
      gatherName: String,
      gatherSize: Number,
    },
    methods: {
      click(param) {
        this.$emit("click", this.gatherId,param)
      }
    }
  }
</script>