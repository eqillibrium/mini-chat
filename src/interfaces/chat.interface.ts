import { IMessage } from './message.interface'
import { IUser } from './user.interface'
import { PayloadAction } from '@reduxjs/toolkit'

export interface IChat {
  id?: number,
  title?: string,
  messages?: IMessage[],
  users?: IUser[],
  createdAt?: string
}

export interface IChatReducers {
  addUsers: (state: IChat, action: PayloadAction<IUser>) => void
  addMessages: (state: IChat, action: PayloadAction<IMessage>) => void
}