import type { PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
  _id?: string,
  name?: string,
  email?: string,
  createdAt?: '',
}

export interface IUserState {
  profile: IUser,
  access_token: string
}

export interface IUserStateReducers {
  setProfileData: (state: IUserState, action: PayloadAction<IUser>) => void
  setAccess_token: (state: IUserState, action: PayloadAction<string>) => void
}