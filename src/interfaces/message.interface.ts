export interface IMessage {
  id?: string,
  authorID: string,
  text?: string,
  event?: 'connection' | 'message'
  createdAt?: ''
}