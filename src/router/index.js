import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from './router'
// import store from '_store'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: routes
})
router.beforeEach((to, from, next) => {
  Vue.prototype.$loading.start()
  next()
})

router.afterEach(route => {
  window.document.title = route.meta.meta || '考勤系统'
  setTimeout(()=>{
    Vue.prototype.$loading.finish()
  },1000)
})

export default router
