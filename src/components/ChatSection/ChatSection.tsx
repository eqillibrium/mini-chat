import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  TextField,
  IconButton,
} from '@mui/material'
import { Send } from '@mui/icons-material'
import { ChangeEvent, useState } from 'react'
import { MessageItem } from '../MessageItem/MessageItem'
import { MessageList } from '../MessageList/MessageList'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { IMessage } from '../../interfaces'
import socket from '../../socket'

export const ChatSection = (): JSX.Element | null => {
  const [value, setValue] = useState<string>('');
  const _id = useSelector((state: RootState) => state.user.profile._id)
  const messages = useSelector((state: RootState) => state.chat.messages)
  if (!_id) {
    return null;
  }
  const handleClick = async () => {
    const newMessage: IMessage = {
      event: 'message',
      text: value,
      authorID:_id,
      id: String(Math.random() * 10000).split(',').join()
    }
    socket.emit('message', newMessage)
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            R
          </Avatar>
        }
        title="interlocutor name"
        subheader="interlocutor ID"
        sx={{ borderBottom: '1px solid lightgray' }}
      />
      <CardContent>
        {messages && messages.length
        ? (<MessageList>
            {messages.map(message => (<MessageItem userID={_id} message={message} key={message.id} />))}
          </MessageList>)
        : (<MessageList><div>None</div></MessageList>)
        }
      </CardContent>
      <CardActions>
        <TextField
          fullWidth
          label="type a message"
          id="message"
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value)}
          value={value}
        >

        </TextField>
        <IconButton onClick={handleClick}>
          <Send />
        </IconButton>
      </CardActions>
    </Card>
  )
};