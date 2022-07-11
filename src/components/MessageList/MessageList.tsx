import { List } from '@mui/material'
import { MessageListProps } from './MessageListProps'
import { useStyles } from './MessageList.styles'

export const MessageList = ({ children }: MessageListProps): JSX.Element => {
  const styles = useStyles()
  return (
    <List
      className={styles.messageList}
    >
      {children}
    </List>
  )
}
