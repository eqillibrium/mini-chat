import { createSlice, Draft, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser, IUserReducers } from '../../interfaces'

const initialState: IUser = {
  _id: '',
  name: '',
  email: '',
  access_token: ''
}

export const userSlice: Slice<IUser, Pick<IUserReducers, 'setName' | 'set_id' | 'setEmail' | 'setaccess_token'>, string> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state: Draft<IUser>, action:PayloadAction<string>) {
      state.name = action.payload
    },
    set_id(state: Draft<IUser>, action:PayloadAction<string>) {
      state._id = action.payload
    },
    setEmail(state: Draft<IUser>, action:PayloadAction<string>) {
      state.email = action.payload
    },
    setaccess_token(state: Draft<IUser>, action:PayloadAction<string>) {
      state.access_token = action.payload
    }
  },
})

export const { setName, set_id, setEmail, setaccess_token } = userSlice.actions

export default userSlice.reducer