import { io, Socket } from "socket.io-client";

class SocketInstance {
  private static _instance: Socket
  private constructor() {
  }
  public static get Instance () {
    return this._instance || (this._instance = io('http://localhost:8000'))
  }
}

const socket: Socket = SocketInstance.Instance

export default socket