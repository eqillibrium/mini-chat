import { createSlice, Draft, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IChat, IChatReducers, IMessage, IUser } from '../../interfaces'

const initialState: IChat = {
  id: 0,
  title: '',
  messages: [],
  users: [],
}

export const chatSlice: Slice<IChat, Pick<IChatReducers, 'addUsers' | 'addMessages'>, string> = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addUsers (state: Draft<IChat>, action: PayloadAction<IUser>) {
      state.users?.push(action.payload)
    },
    addMessages (state: Draft<IChat>, action: PayloadAction<IMessage>) {
      state.messages?.push(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUsers, addMessages } = chatSlice.actions

export default chatSlice.reducer