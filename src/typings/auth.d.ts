declare namespace Auth {
  type RoleType = keyof {
    super: '超级管理员'
    admin: '管理员'
    user: '会员'
    guest: '游客'
    custom: '自定义'
  }
  interface UserInfo {
    userId: string
    userName: string
    userRole: RoleType
  }
}
