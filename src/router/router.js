import Home from '_v/home'
import Index from '_v/index'
import Login from '_v/login'
import Logout from "_v/logout";

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {meta: '登录'}
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    meta: {meta: '注销'}
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
        path: 'recognition/realtime/index',
        name: 'recognition-index',
        meta: {meta: '考勤'},
        component: () => import("_v/recognition/real-time/index")
      },
      {
        path: 'recognition/realtime/detail',
        name: 'recognition-detail',
        meta: {meta: '考勤详情'},
        component: () => import("_v/recognition/real-time/detail")
      },
      {
        path: 'recognition/history/index',
        name: 'recognition-history-index',
        meta: {meta: '历史考勤'},
        component: () => import("_v/recognition/history/index")
      },
      {
        path: 'recognition/history/detail',
        name: 'recognition-history-detail',
        meta: {meta: '历史考勤详情'},
        component: () => import("_v/recognition/history/detail")

      },
      {
        path: 'admin/dashboard',
        name: 'admin-dashboard',
        meta: {meta: '仪表盘'},
        component: () => import("_v/admin/dashboard")
      },
      {
        path: 'admin/management/gather',
        name: 'admin-management-gather',
        meta: {meta: '班级管理'},
        component: () => import("_v/admin/management/gather")
      },
      {
        path: 'admin/management/device',
        name: 'admin-management-device',
        meta: {meta: '设备管理'},
        component: () => import("_v/admin/management/device")
      },
      {
        path: 'student/attendance',
        name: 'student-attendance',
        meta: {meta: '我的考勤'},
        component: () => import("_v/student/attendance")
      }
    ]
  }
]