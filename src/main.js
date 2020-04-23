import Vue from 'vue'
import App from './App.vue'
import vuetify from '_plugins/vuetify'
import GlobalMessage from '_plugins/global-message'
import GlobalLoading from '_plugins/global-loading'
import router from '_router'
import store from '_store'
import _ from 'lodash'
GlobalLoading.config()
Vue.prototype.$message = GlobalMessage.install
Vue.prototype.$loading = GlobalLoading.install
Vue.config.productionTip = false
Vue.prototype._ = _
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
