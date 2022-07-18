import { createSlice, Draft, Slice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser, IUserReducers } from '../../interfaces'

const initialState: IUser = {
  UID: 0,
  name: '',
}

export const userSlice: Slice<IUser, Pick<IUserReducers, 'setName' | 'setUID'>, string> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state: Draft<IUser>, action:PayloadAction<string>) {
      state.name = action.payload
    },
    setUID(state: Draft<IUser>, action:PayloadAction<number>) {
      state.UID = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setName, setUID } = userSlice.actions

export default userSlice.reducer