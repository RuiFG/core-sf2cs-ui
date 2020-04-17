export const Role = {
  ROLE_ADMIN: 1, // 管理员
  ROLE_PUBLIC: 2, // 公共
  ROLE_ACCESS: 3, // 游客
  ROLE_STUDENT: 4,
  ROLE_TEACHER: 5,
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