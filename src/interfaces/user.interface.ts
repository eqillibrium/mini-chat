import type { PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
  UID?: number,
  name?: FormDataEntryValue | null | string,
  createdAt?: '',
}

export interface IUserReducers {
  setName: (state: IUser, action: PayloadAction<string>) => void
  setUID: (state: IUser, action: PayloadAction<number>) => void
}