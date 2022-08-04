import { createSlice, Draft, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IChat, IChatReducers, IMessage, IUser } from '../../interfaces'

const initialState: IChat = {
  id: 0,
  title: '',
  messages: [],
  users: [],
  isEstablishingConnection: false,
  isConnected: false
}

export const chatSlice: Slice<IChat, Pick<IChatReducers, 'addUser' | 'connectionEstablished' | 'startConnecting' | 'disconnect' | 'onMessage'>, string> = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addUser (state: Draft<IChat>, action: PayloadAction<IUser>) {
      state.users?.push(action.payload)
    },
    onMessage (state: Draft<IChat>, action: PayloadAction<IMessage>) {
      state.messages?.push(action.payload)
    },
    startConnecting (state: Draft<IChat>) {
      state.isEstablishingConnection = true
    },
    connectionEstablished (state: Draft<IChat>) {
      state.isEstablishingConnection = true
      state.isConnected = true
    },
    disconnect (state: Draft<IChat>) {
      state.isEstablishingConnection = false
      state.isConnected = false
    }
  },
})

export const { onMessage, startConnecting } = chatSlice.actions

export default chatSlice.reducer