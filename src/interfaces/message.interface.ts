export interface IMessage {
  id?: number,
  authorID: number,
  text?: string,
  event?: 'connection' | 'message'
  createdAt?: ''
}