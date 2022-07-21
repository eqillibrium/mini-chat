import { Middleware } from '@reduxjs/toolkit'
import { RootState } from './index'

export const exampleMiddleware: Middleware<{}, RootState> = store => next => action => {
  return next(action)
}