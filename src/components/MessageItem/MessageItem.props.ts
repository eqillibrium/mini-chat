import { IMessage } from '../../context/App.context'

export interface MessageItemProps {
  userID: number | undefined,
  message:IMessage
}