import { IMessage } from './message.interface'
import { IUser } from './user.interface'
import { PayloadAction } from '@reduxjs/toolkit'

export interface IChat {
  id?: number,
  title?: string,
  messages?: IMessage[],
  users?: IUser[],
  createdAt?: string,
  isEstablishingConnection: boolean,
  isConnected: boolean
}

export interface IChatReducers {
  addUser: (state: IChat, action: PayloadAction<IUser>) => void
  onMessage: (state: IChat, action: PayloadAction<IMessage>) => void
  startConnecting: (state: IChat) => void
  connectionEstablished: (state: IChat) => void
  disconnect: (state: IChat) => void
}