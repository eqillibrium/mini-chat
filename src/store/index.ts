import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import userReducer from '../features/user/userSlice'
import chatReducer from '../features/chat/chatSlice'
import { exampleMiddleware } from './middleware'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer
  },
  middleware: [logger, exampleMiddleware]
})

const rootReducer = combineReducers({ user: userReducer, chat: chatReducer });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch