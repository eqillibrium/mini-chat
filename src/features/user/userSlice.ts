import type { PayloadAction } from '@reduxjs/toolkit'
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, Draft, Slice } from '@reduxjs/toolkit'
import { IUser, IUserState, IUserStateReducers } from '../../interfaces'
import axios, { AxiosResponse } from 'axios'

const initialState: IUserState = {
  profile: {},
  access_token: ''
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData: any) => {
  const { data } = await axios.post<IUser, AxiosResponse<IUser>>('http://localhost:8000/api/auth/register', registerData)
  return data;
})

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: any) => {
  const { data } = await axios.post<IUser, AxiosResponse<IUser>>('http://localhost:8000/api/auth/login', loginData)
  return data;
  })

export const userSlice: Slice<IUserState, Pick<IUserStateReducers, 'setProfileData' | 'setAccess_token'>, string> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfileData(state: Draft<IUserState>, action:PayloadAction<IUser>) {
      state.profile = action.payload
    },
    setAccess_token(state: Draft<IUserState>, action:PayloadAction<string>) {
      state.access_token = action.payload
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<IUserState>) => {
    builder
      .addCase(registerUser.fulfilled, (state: Draft<IUserState>, action) => {
        state.profile = {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email
        }
      })
      .addCase(loginUser.fulfilled, (state: Draft<IUserState>, action) => {
        state.profile = {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email
        }
      })
  }
})

export const { setProfileData, setAccess_token } = userSlice.actions

export default userSlice.reducer