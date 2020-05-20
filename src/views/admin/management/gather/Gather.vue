<template lang="pug">
  #admin-management-gather
    v-btn.mx-2(fab dark color='indigo' right absolute @click="gatherDialog=true").ma-md-2
      v-icon(dark) mdi-plus
    v-container
      v-row(align-md="center")
        template( v-for="(gather,index) in gatherList")
          v-col
            gather(:gather-id="gather.id"
              :gather-name="gather.name"
              :gather-size="gather.size"
              @click="action" :key="index")
      v-row(justify='center')
        v-dialog(v-model='actionDialog' fullscreen hide-overlay transition='dialog-bottom-transition')
          v-card
            v-toolbar(dark, color="cyan")
              v-spacer
              v-toolbar-title {{actionText}}
              v-btn(icon, dark, @click='()=>{loadGathers(); actionDialog = false}')
                v-icon mdi-close
            v-data-table.elevation-1(
              :headers='headers', :items='personList'
              :sort-by="['alias', 'createTime','modifyTime']"
              multi-sort
              @click:row="actionAskDialog"
              :loading="tableLoading" loading-text="正在加载数据"
            )
              template(v-slot:item.avatar='{ item }')
                v-img(:src="util.toAvatarSrc(item.avatar)" width=50 height=50)
      v-row
        v-dialog(v-model='askDialog' max-width='290')
          v-card
            v-card-title.headline.justify-md-center 是否确认{{actionText}}？
            v-card-actions.justify-md-center
              v-btn(color='green darken-1', text, @click='actionPerson') 确认
      v-row
        v-dialog(v-model="gatherDialog" max-width='290')
          v-card
            v-card-title
              | 新增班级
            v-card-text
              v-text-field(label="名字" v-model="actionGatherName" )
            v-card-actions
              v-spacer
              v-btn(color='primary', text='', @click='addGather') 确定


</template>
<script>
  import Gather from "_c/gather";
  import * as managementAPI from '_api/management'
  import * as ServerAPI from '_api/server'
  import * as util from '_u/util'

  export default {
    name: "management-gather",
    components: {
      Gather
    },
    computed: {
      util() {
        return util
      }
    },
    data() {
      return {
        gatherList: [],
        frameLoading: false,
        tableLoading: false,
        actionDialog: false,
        askDialog: false,
        gatherDialog: false,
        actionText: "",
        actionFlag: 0,
        actionGatherId: 0,
        actionPersonId: 0,
        actionGatherName: "",
        personList: [],
        headers: [
          {
            text: '头像',
            align: 'start',
            sortable: false,
            value: 'avatar',
          },
          {text: '姓名', value: 'alias'},
          {text: '创建时间', value: 'createTime'},
          {text: '修改时间', value: 'modifyTime'},
        ]
      }
    },
    created() {
      this.loadGathers()
    },
    methods: {
      frameLoadingStart() {
        this.frameLoading = true
      },
      frameLoadingStop() {
        this.frameLoading = false
      },
      tableLoadingStart() {
        this.tableLoading = true
      },
      tableLoadingStop() {
        this.tableLoading = false
      },
      action(gatherId, actionParam) {
        this.actionFlag = actionParam
        this.actionGatherId = gatherId
        switch (actionParam) {
          case 1: //add student
            this.actionDialog = true
            this.actionText = "添加学生"
            this.actionPersonText = "添加"
            this.loadPeron()
            break
          case 2: // del student
            this.actionDialog = true
            this.actionText = "删除学生"
            this.actionPersonText = "删除"
            this.loadStudents()
            break
          case 3: //add teacher
            this.actionDialog = true
            this.actionText = "添加教师"
            this.actionPersonText = "添加"
            this.loadPeron()
            break
          case 4: // del teacher
            this.actionDialog = true
            this.actionText = "删除教师"
            this.actionPersonText = "删除"
            this.loadTeachers()
            break
        }
        console.log(gatherId, actionParam)
      },
      loadStudents() {
        let _this = this
        _this.tableLoadingStart()
        managementAPI.getStudentByGatherId(this.actionGatherId).then(data => {
          _this.personList = data
        }).finally(_this.tableLoadingStop)
      },
      loadTeachers() {
        let _this = this
        _this.tableLoadingStart()
        managementAPI.getTeacherByGatherId(this.actionGatherId).then(data => {
          _this.personList = data
        }).finally(_this.tableLoadingStop)
      },
      loadPeron() {
        let _this = this
        _this.tableLoadingStart()
        managementAPI.getPersonByNotInGatherId(this.actionGatherId).then(data => {
          _this.personList = data
        }).finally(_this.tableLoadingStop)
      },
      loadGathers() {
        let _this = this
        console.log("asd")
        _this.frameLoadingStart()
        managementAPI.getAdminGathers().then(data => {
          _this.gatherList = data
        }).finally(_this.frameLoadingStop)
      },
      actionAskDialog(item) {
        console.log(item.id)
        let _this = this
        _this.actionPersonId = item.id
        _this.askDialog = true

      },
      actionPerson() {
        let _this = this
        _this.askDialog = false
        _this.tableLoadingStart()
        switch (_this.actionFlag) {
          case 1:
            ServerAPI.addGatherStudent(_this.actionGatherId, _this.actionPersonId).then(message => {
              _this.$message(message)
              _this.loadPeron()
            })
            break
          case 2:
            ServerAPI.delGatherStudent(_this.actionGatherId, _this.actionPersonId).then(message => {
              _this.$message(message)
              _this.loadStudents()
            })
            break
          case 3:
            managementAPI.addGatherManager(_this.actionGatherId, _this.actionPersonId).then(() => {
              _this.$message("添加教师成功")
              _this.loadPeron()
            })
            break
          case 4:
            managementAPI.delGatherManager(_this.actionGatherId, _this.actionPersonId).then(() => {
              _this.$message("删除教师成功")
              _this.loadTeachers()
            })
            break
        }
      },

      addGather() {
        let _this = this
        managementAPI.addGather(_this.actionGatherName).then(() => {
          _this.loadGathers()
          _this.$message("添加班级成功")
        }).finally(() => {
          _this.gatherDialog = false
          _this.actionGatherName = ""
        })
      },

    }
  }
</script>