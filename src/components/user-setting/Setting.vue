<template lang="pug">
  #user-setting
    v-card.mx-auto(:loading="isUpdating")
      template(v-slot:process)
        v-progress-linear(absolute,
          color='green lighten-3', height='4', indeterminate)
      v-card-title.d-flex.justify-center.no-gutters
        | 个人设置
      v-divider
      v-form(ref="editedItem")
        v-container
          v-row
            v-col.text-center(cols='6', md='6')
              v-hover(v-slot:default="{ hover }")
                v-avatar(size=144 tile :loading="isUpdating")
                  v-img(:src="imgPreview")
                    v-dialog-bottom-transition(v-if="isEditing")
                      v-overlay(v-if="hover", absolute opacity="0.2")
                        v-btn(@click="handleClick" :loading="isUpdating") 上传头像
              v-file-input.d-none(accept="image/*", label="上传头像", prepend-icon="", ref="avatar", @change="detectFace")
              v-row.flex-nowrap.mt-md-2
                v-text-field.mx-4(v-model='editedItem.alias', :disabled='isUpdating||!isEditing'  label='姓名'
                  :rules="ruleUtil.unionRules(ruleUtil.requiredRules('姓名'),ruleUtil.maxLengthRules(6))" ref="alias")

                v-chip-group.mt-md-3
                  v-chip(outlined pill color="blue lighten-1" label)
                    v-icon(left) mdi-account-circle-outline
                    span {{roleName}}

            v-col
              v-card-title.red--text.title 信息仅限于考勤系统
              v-card-text
                span 个人信息由授权中心管理，考勤系统只存储个人头像和姓名，
                span 如需修改其他个人信息 请前往
                a(href="http://www.baidu.com")  授权中心
              .d-flex.justify-center
                v-btn(:color="btnColor"  outlined @click="changeEvent" :loading="isUpdating") {{btnText}}

</template>

<script>
  import * as managementAPI from '_api/management'
  import * as serverAPI from '_api/server'
  import * as ruleUtil from '_u/rule'
  import * as roleUtil from '_u/role'

  export default {
    name: 'user-setting',
    data() {
      return {
        hover: true,
        btnText: "修改",
        btnColor: 'success',
        imgPreview: this.$store.getters['auth/avatar'],
        isEditing: false,
        isUpdating: false,
        editedItem: {alias: "", avatar: null}
      }
    },
    computed: {
      ruleUtil() {
        return ruleUtil
      },
      me() {
        return this.$store.getters['auth/me'];
      },
      roleName() {
        return roleUtil.getRoleName(this.$store.getters['auth/role'])
      }
    },
    created() {
      console.log(this.$store.getters['auth/role'])
      this.editedItem.alias = this.me.alias
      this.editedItem.avatar = this.me.avatar
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
      handleClick() {
        this.$refs.avatar.$refs.input.click()
      },
      changeEvent() {
        let _this = this
        if (_this.isEditing) {
          console.log(_this.$refs.alias)
          if (!_this.$refs.alias.validate(true))
            return
          if (_this.editedItem.alias !== _this.me.name || _this.editedItem.avatar !== this.me.avatar) {
            managementAPI.setMe(_this.editedItem).then(() => {
              _this.$store.dispatch("auth/getPerson")
            })
          }
        }
        _this.isEditing = !_this.isEditing;

      },
      detectFace(file) {
        let _this = this
        if (_this._.isUndefined(file)) {
          _this.imgPreview = _this.$store.getters['auth/avatar']
          return
        }
        _this.isUpdating = true
        serverAPI.detect(file).then(img => {
          _this.imgPreview = 'api/avatar/' + img
          _this.editedItem.avatar = img
        })
          .finally(() => {
            _this.isUpdating = false
          })
      }
    }
  }
</script>