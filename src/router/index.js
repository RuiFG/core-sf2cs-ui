import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './router'
// import store from '_store'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: routes
})
router.beforeEach((to, from, next) => {
    next()
})

router.afterEach(route => {
  window.document.title = route.meta.meta || '考勤系统'
})

export default router
