/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../typings/index.d.ts" />

interface UserModel extends Auth.UserInfo {
  token: string
  refreshToken: string
  password: string
  role: number
}

export const userModel: UserModel[] = [
  {
    token: '__TOKEN_SOYBEAN__',
    refreshToken: '__REFRESH_TOKEN_SOYBEAN__',
    userId: '0',
    username: 'Soybean',
    password: 'soybean123',
    role: 0,
  },
  {
    token: '__TOKEN_SUPER__',
    refreshToken: '__REFRESH_TOKEN_SUPER__',
    userId: '1',
    username: 'Super',
    password: 'super123',
    role: 0,
  },
  {
    token: '__TOKEN_ADMIN__',
    refreshToken: '__REFRESH_TOKEN_ADMIN__',
    userId: '2',
    username: 'Admin',
    password: 'admin123',
    role: 0,
  },
  {
    token: '__TOKEN_USER01__',
    refreshToken: '__REFRESH_TOKEN_USER01__',
    userId: '3',
    username: 'User01',
    password: 'user01123',
    role: 0,
  },
]
