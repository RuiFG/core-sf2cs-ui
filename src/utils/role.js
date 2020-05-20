export const Role = {
  ROLE_ADMIN: 1, // 管理员
  ROLE_STUDENT: 2,
  ROLE_TEACHER: 3,
  all() {
    let ROLE_ALL = []
    Object.keys(this).forEach((key) => {
      if (this[key] !== this.ROLE_PUBLIC) {
        ROLE_ALL.push(this[key])
      }
    })
    return ROLE_ALL
  },
  isAdmin(role) {
    return role.includes(this.ROLE_ADMIN)
  },
  isStudent(role) {
    return role.include(this.ROLE_STUDENT)
  },
  isTeacher(role) {
    return role.include(this.ROLE_TEACHER)
  }

}
/**
 * 检测是否有权限
 */
export const checkPermissions = (auth, role) => {
  return auth.filter(v => role.includes(v)).length > 0
}

export const getRoleName = (role) => {
  switch (role) {
    case Role.ROLE_ADMIN:
      return "管理员"
    case Role.ROLE_STUDENT:
      return "学生"
    case Role.ROLE_TEACHER:
      return "教师"
    default:
      return "未知"
  }
}

export const getRoleMenu = (role) => {
  switch (role) {
    case Role.ROLE_ADMIN:
      return [
        {name: "仪表盘", routeName: "admin-dashboard", icon: "mdi-tablet-dashboard", color: "teal"},
        {name: "班级考勤", routeName: "recognition-index", icon: "mdi-account-multiple-outline", color: "lime"},
        {name: "班级管理", routeName: "admin-management-gather", icon: "mdi-account-group-outline", color: "brown"},
        {name: "设备管理", routeName: "admin-management-device", icon: "mdi-monitor-cellphone-star", color: "yellow"},

      ]
    case Role.ROLE_TEACHER:
      return [
        {name: "班级考勤", routeName: "recognition-index", icon: "mdi-account-multiple-outline", color: "lime"},
        {name: "历史考勤", routeName: "recognition-history-index", icon: "mdi-history", color: "deep-orange"},
      ]
    case Role.ROLE_STUDENT:
      return [
        {name: "我的考勤", routeName: "student-attendance", icon: "mdi-human-handsup", color: "orange"}
      ]
  }
}