<template lang="pug">
  #home
    v-app-bar#bar(app  clipped-left  color="cyan")
      v-toolbar-title(@click="()=>{routeToName('index')}")
        a.title.white--text SF2CS-教室考勤系统
      v-spacer
      v-expand-transition
        v-toolbar-title.mx-md-2.text-right(v-show="fab" v-if="isAuth")
          span.d-block.subtitle-1 {{identity.name}}
          span.d-block.subtitle-2 {{identity.role}}
      v-speed-dial(v-model='fab' direction="bottom"  open-on-hover v-if="isAuth")
        template(v-slot:activator)
          v-avatar(@click="dialog = true")
              v-img(:src='identity.avatar')
        template(v-for="(menu , index) in menuList")
          v-tooltip(left)
            template(v-slot:activator='{on}')
              v-btn(fab dark :color="menu.color" v-on="on" @click="routeToName(menu.routeName)")
                v-icon {{menu.icon}}
            span {{menu.name}}
        v-tooltip(left)
          template(v-slot:activator='{on}')
            v-btn(fab dark color="red" v-on="on" small @click="toLogout")
              v-icon mdi-exit-run
          span 退出
      v-tooltip(bottom v-else)
        template(v-slot:activator='{ on }')
          v-btn.white--text(icon v-on='on' @click="toLogin")
            v-icon mdi-account
        span 登录
      v-dialog(v-model='dialog'  width=486 persistent v-if="isAuth")
        v-row.justify-center(no-gutters)
          v-btn.white--text(icon  @click="dialog=false" large  )
            v-icon mdi-close
        user-setting
    v-content
      v-scroll-y-transition(mode="out-in")
        router-view
</template>
<script>
  import PersonDetail from "_c/person-detail"
  import UserSetting from "_c/user-setting"
  import {routeToName} from "_u/util";
  import * as roleUtil from "_u/role"

  export default {
    name: 'home',
    components: {
      UserSetting,
      PersonDetail
    },
    computed: {
      routeToName() {
        return routeToName
      },
      isAuth() {
        return this.$store.getters['auth/isAuth']
      },
      identity() {
        return {
          name: this.$store.getters['auth/username'],
          avatar: this.$store.getters['auth/avatar'],
          role: roleUtil.getRoleName(this.$store.getters['auth/role'])
        }
      },
      menuList() {
        return roleUtil.getRoleMenu(this.$store.getters['auth/role'])
      }
    },
    data() {
      return {
        fab: false,
        dialog: false,
        drawer: true,
        items: [
          {title: '个人设置', icon: 'mdi-view-dashboard'},
          {title: '检查', icon: 'mdi-image', to: {name: 'recognition-index'}},
          {title: '注销', icon: 'mdi-help-box'},
        ],
      }
    },
    methods: {
      switchDrawer() {
        this.drawer = !this.drawer
      },
      toLogin() {
        let oauthUrl = "http://118.24.1.170:8888/oauth/authorize"
        let callBackUrl = escape("http://127.0.0.1:8081/#/login")
        let clientId = "sf2cs"
        let responseType = "code"
        window.location = `${oauthUrl}?redirect_uri=${callBackUrl}&scope=READ&response_type=${responseType}&client_id=${clientId}`
      },
      toLogout() {
        let oauthUrl = "http://118.24.1.170:8888/oauth/logout"
        let callBackUrl = escape("http://127.0.0.1:8081/#/logout")
        let clientId = "sf2cs"
        window.location = `${oauthUrl}?redirect_url=${callBackUrl}&client_id=${clientId}`

      }

    }
  }
</script>
