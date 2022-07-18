import { ListItem, ListItemText } from '@mui/material'
import { useStyles } from './Message.styles'
import { MessageItemProps } from './MessageItem.props'

export const MessageItem = ({ userID, message }: MessageItemProps): JSX.Element => {
  const styles = useStyles()
  return (
    <ListItem
      key={message.id}
      className={styles.message}
      style={ userID === message.authorID ? { alignSelf: 'end', border: '1px solid deeppink' } : { alignSelf: 'start' }}
    >
      <ListItemText
        primary={message.text}
        secondary={String(message.createdAt) + ' by ID: ' + message.authorID}
        sx={{ maxWidth: '300px' }}
      />
    </ListItem>
  );
}