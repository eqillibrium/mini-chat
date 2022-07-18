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
import socket from '../../socket'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { IMessage } from '../../interfaces'
import { addMessages } from '../../features/chat/chatSlice'

export const ChatSection = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>('');
  const UID = useSelector((state: RootState) => state.user.UID)
  const messages = useSelector((state: RootState) => state.chat.messages)
  if (!UID) {
    return;
  }
  const handleClick = () => {
    const newMessage: IMessage = { event: 'message', text: value, authorID: UID }
    socket.send(JSON.stringify(newMessage))
    setValue('')
  }

  socket.onmessage = (e: MessageEvent) => {
      const newMessageData = JSON.parse(e.data)
      if(newMessageData.event === 'message') {
        dispatch(addMessages({ id: newMessageData.id, text: newMessageData.text, authorID: newMessageData.authorID, createdAt: newMessageData.createdAt }))
      }
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
            {messages.map(message => (<MessageItem userID={UID} message={message} key={message.id} />))}
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