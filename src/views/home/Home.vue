<template lang="pug">
  #home
    v-app-bar#bar(app, clipped-left dense color="teal"  height="50" elevate-on-scroll)
      v-toolbar-title
        span.title.white--text SF2CS-教室考勤系统
      v-spacer
      template(v-if="isAuth")
        v-slide-x-transition
          .headline.pr-2(v-show="!drawer") {{username}}
        v-avatar(@click.stop="switchDrawer()")
          v-img(src='https://randomuser.me/api/portraits/men/81.jpg')
      template(v-else)
        v-btn(text @click="toLogin").title.white--text 登录
    v-navigation-drawer(:mini-variant="drawer" app color="teal"  right v-if="isAuth")
      v-list
        v-list-item(v-for="item in items" :key="item.title" link :to="item.to")
          v-list-item-icon
            v-icon {{ item.icon }}
          v-list-item-content
            v-list-item-title {{ item.title }}

    v-content
      v-scroll-y-transition(mode="out-in")
        router-view
</template>
<script>
  import PersonDetail from "_c/person-detail";

  export default {
    name: 'home',
    components: {
      PersonDetail
    },
    computed: {
      isAuth() {
        return this.$store.getters['auth/isOauth']
      },
      username() {
        return this.$store.getters['auth/username']
      }
    },
    data() {
      return {
        drawer: true,
        items: [
          {title: '个人设置', icon: 'mdi-view-dashboard', to: {name: 'user-setting'}},
          {title: '检查', icon: 'mdi-image', to: {name: 'recognition-index'}},
          {title: '注销', icon: 'mdi-help-box', to: 'user-setting'},
        ],
      }
    },
    methods: {
      switchDrawer() {
        this.drawer = !this.drawer
      }
      ,
      toLogin() {
        let oauthUrl = "http://118.24.1.170:8888/oauth/authorize"
        let callBackUrl = escape("http://127.0.0.1:8081/#/login")
        let clientId = "sf2cs"
        let responseType = "code"
        window.location = `${oauthUrl}?redirect_uri=${callBackUrl}&scope=READ&response_type=${responseType}&client_id=${clientId}`
      }

    }
  }
</script>
