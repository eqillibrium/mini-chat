import { createContext, PropsWithChildren, useState } from 'react'

interface IMessage {
  id: number,
  authorID: number,
  text: string,
  createdAt: Date
}

export interface IAppContext {
  userID?: number,
  setUID?: (UID: number) => void
  name?: FormDataEntryValue | null | string,
  setName?: (newValue: FormDataEntryValue | null | string) => void
  socket?: WebSocket | null
  setSocket?: (socket: WebSocket | null) => void
  connected?: boolean,
  setConnected?: () => void
  messages?: IMessage[],
  setMessages?: (message: IMessage) => void,
}

export const AppContext = createContext<IAppContext>({})

export const AppContextProvider = ({ children }: PropsWithChildren<IAppContext>): JSX.Element => {
  const [userIDState, setUIDState] = useState<number>(0)
  const [nameState, setNameState] = useState<FormDataEntryValue | null | string>('')
  const [socketInstance, setSocketInstance] = useState<WebSocket | null>(null)
  const [connectedState, setConnectedState] = useState<boolean>(false)
  const [messagesState, setMessagesState] = useState<IMessage[]>([])

  const setUID = (UID: number): void => {
    setUIDState(UID)
  }

  const setName = (newValue: FormDataEntryValue | null | string): void => {
    setNameState(newValue)
  }

  const setSocket = (socket: WebSocket | null): void => {
    setSocketInstance(socket)
  }

  const setConnected = (): void => {
    setConnectedState(false)
  }

  const setMessages = (message: IMessage) => {
    setMessagesState(prev => [ ...prev, message ])
  }


  return (
    <AppContext.Provider value={{
      userID: userIDState,
      setUID,
      name: nameState,
      setName,
      socket: socketInstance,
      setSocket,
      connected: connectedState,
      setConnected ,
      messages: messagesState,
      setMessages
    }}>
      {children}
    </AppContext.Provider>
  );
}