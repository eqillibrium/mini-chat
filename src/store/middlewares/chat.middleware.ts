import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { startConnecting, onMessage } from '../../features/chat/chatSlice'
import socket from '../../socket'

export const middleware: Middleware = (store: MiddlewareAPI) => (next) => (action) => {
  if(startConnecting.match(action)) {
    socket.on('message', (e) => {
      store.dispatch(onMessage(e))
    })
  }
  next(action)
}