<template lang="pug">
  #user-setting
    v-container.fill-height
      v-row.align-center.justify-center
        v-col
          v-card.mx-auto.ma-3(:loading="isUpdating"  width=600)
            template(v-slot:process)
              v-progress-linear(absolute,
                color='green lighten-3', height='4', indeterminate)
            v-card-title 个人设置
            v-form(ref="editedItem")
              v-container
                v-row
                  v-col.text-center(cols='6', md='6')
                    v-avatar(size=144 tile :loading="isUpdating")
                      v-img(:src="imgPreview")
                  v-col(cols='6', md='6')
                    v-card-title.red--text.title 信息仅限于考勤系统
                    v-card-subtitle
                      span 个人信息由授权中心管理，考勤系统只存储个人头像，
                      span 如需修改其他个人信息 请前往
                      a(href="http://www.baidu.com")  授权中心
                  v-file-input.ml-6(prepend-icon="mdi-camera" @change="detectFace"
                    :disabled='isUpdating||!isEditing' label="头像" ref="imgFile")
                  v-spacer
                  v-text-field.mr-6(v-model='editedItem.alias', :disabled='isUpdating||!isEditing'  label='别名')
                  v-btn.mt-3.mr-3(:color="btnColor"  rounded @click="changeEvent" :loading="isUpdating") {{btnText}}
</template>

<script>
  import * as managementAPI from '_api/management'
  import * as serverAPI from '_api/server'
  // import * as util from '_u/util'

  export default {
    name: 'user-setting',
    data() {
      return {
        btnText: "修改",
        btnColor: 'success',
        imgPreview: "https://randomuser.me/api/portraits/men/81.jpg",
        isEditing: false,
        isUpdating: false,
        editedItem: {alias: "", faceData: ""}
      }
    },
    computed: {
      me() {
        return this.$store.getters['auth/me'];
      }
    },
    created() {
      this.editedItem.alias = this.me.alias
      this.editedItem.faceData = this.me.faceData
    },
    watch: {
      isEditing: {
        handler(newValue) {
          console.log(newValue)
          if (newValue) {
            this.btnText = "保存"
            this.btnColor = "error"
          } else {
            this.btnText = "修改"
            this.btnColor = "success"
          }
        }
      }
    },
    methods: {
      changeEvent() {
        this.isEditing = !this.isEditing;
        if (this.editedItem.alias !== this.me.alias || this.editedItem.faceData !== this.me.faceData) {
          managementAPI.updatePerson(this.me.id, this.editedItem)
        }
      },
      detectFace(file) {
        let _this = this
        if (_this._.isUndefined(file)) {
          _this.imgPreview = "https://randomuser.me/api/portraits/men/81.jpg"
          return
        }
        _this.isUpdating = true
        serverAPI.detect(file).then(data => {
          console.log(data)
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (data) => {
            _this.imgPreview = data.target.result
          };
        })
          .catch(() => _this.$refs["imgFile"].clear())
          .finally(() => {
            _this.isUpdating = false
          })
      }
    }
  }
</script>