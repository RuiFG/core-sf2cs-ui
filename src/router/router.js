import Home from '_v/home'
import Index from '_v/index'
import Login from '_v/login'

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {meta: '登录'}
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {meta: '欢迎使用'},
        component: Index
      },
      {
        path: 'user/setting',
        name: 'user-setting',
        meta: {meta: '用户设置'},
        component: () => import("_v/user/setting")
      },
      {
        path: 'recognition/index',
        name: 'recognition-index',
        meta: {meta: '考勤'},
        component: () => import("_v/recognition/index")
      },
      {
        path: 'recognition/detail',
        name: 'recognition-detail',
        meta: {meta: '考勤详情'},
        component: () => import("_v/recognition/detail")
      }
    ]
  }
]