<template lang="pug">
  #admin-management-device
    v-btn.mx-2(fab dark color='indigo' @click="dialog=true").ma-md-3
      v-icon(dark) mdi-plus
    span
    | 监控设备
    v-data-table(
      :headers='headers', :items='deviceList'
      :sort-by="['createTime','modifyTime']"
      multi-sort
      @click:row="actionAskDialog"
      :loading="loading" loading-text="正在加载数据"
    )
      template(v-slot:item.enable='{ item }')
        v-chip.white--text( label :color="item.enable?'orange':'red'") {{item.enable?'是':'否'}}
    v-dialog(v-model="dialog" max-width='290')
      v-card
        v-card-title
          | 新增设备
        v-card-text
          v-text-field(label="设备名" v-model="deviceName" )
        v-card-actions
          v-spacer
          v-btn(color='primary', text='', @click='addDevice') 确定
</template>
<script>
  import * as managementAPI from '_api/management'

  export default {
    name: "management-device",
    data() {
      return {
        headers: [
          {
            text: '设备名',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          {text: '密钥', value: 'token'},
          {text: '是否启用', value: 'enable'},
          {text: '创建时间', value: 'createTime'},
          {text: '修改时间', value: 'modifyTime'},
        ],
        deviceList: [],
        loading: true,
        dialog: false,
        deviceName: ""
      }
    },
    created() {
      this.loadDevice()
    },
    methods: {
      loadDevice() {
        let _this = this
        _this.loadingStart()
        managementAPI.getDevices().then(data => {
          _this.deviceList = data
        }).finally(_this.loadingStop)
      },
      loadingStart() {
        this.loading = true
      },
      loadingStop() {
        this.loading = false
      },
      addDevice() {
        let _this = this
        managementAPI.addDevice(_this.deviceName).then(() => {
          _this.loadDevice()
          _this.$message("添加设备成功")
        }).finally(() => {
          _this.deviceName = ""
          _this.dialog = false
        })
      }
    }
  }
</script>