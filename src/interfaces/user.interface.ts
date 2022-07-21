import type { PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
  _id?: string,
  name?: string,
  email?: string,
  access_token: string,
  createdAt?: '',
}

export interface IUserReducers {
  set_id: (state: IUser, action: PayloadAction<string>) => void
  setName: (state: IUser, action: PayloadAction<string>) => void
  setEmail: (state: IUser, action: PayloadAction<string>) => void
  setaccess_token: (state: IUser, action: PayloadAction<string>) => void
}