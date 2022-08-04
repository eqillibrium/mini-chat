import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import userReducer from '../features/user/userSlice'
import chatReducer from '../features/chat/chatSlice'
import { middleware } from 'store/middlewares/chat.middleware'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger).concat(middleware)
})

const rootReducer = combineReducers({ user: userReducer, chat: chatReducer });

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch