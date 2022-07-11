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
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/App.context'
import { MessageItem } from '../MessageItem/MessageItem'
import { MessageList } from '../MessageList/MessageList'

export const ChatSection = () => {
  const [value, setValue] = useState<string>('');
  const { userID, messages, setMessages, socket } = useContext(AppContext)

  const handleClick = () => {
    socket && socket.send(JSON.stringify({ event: 'message', text: value, authorID: userID }))
    setValue('')
  }

  useEffect(() => {
    if(socket) {
      socket.onmessage = (e: MessageEvent) => {
        const newMessageData = JSON.parse(e.data)
        if(newMessageData.event === 'message') {
          setMessages && setMessages({ id: newMessageData.id, text: newMessageData.text, authorID: newMessageData.authorID, createdAt: newMessageData.createdAt })
        }
      }
    }
  }, [socket])

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
            {messages.map(message => (<MessageItem userID={userID} message={message} key={message.id} />))}
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