import Vue from 'vue'
import App from './App.vue'
import vuetify from '_plugins/vuetify'
import router from '_router'
import store from '_store'
import _ from 'lodash'
Vue.config.productionTip = false
Vue.prototype._ = _
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
