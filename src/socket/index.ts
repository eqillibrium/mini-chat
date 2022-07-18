class Socket {
  private static _instance: WebSocket
  private constructor() {
  }
  public static get Instance () {
    return this._instance || (this._instance = new WebSocket('ws://localhost:5000'))
  }
}

const socket: WebSocket = Socket.Instance

export default socket