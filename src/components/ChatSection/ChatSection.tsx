import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
} from '@mui/material'
import { Send } from '@mui/icons-material'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/App.context'

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
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            height: '40vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >

            { messages?.length === 0
              ? (<div>No any messages</div>)
              : messages?.map((message) => (
                <ListItem
                  key={message.id}
                  sx={{
                    border: '1px solid lightgray',
                    color: 'dimgray',
                    marginBottom: '10px',
                    borderRadius: '10px',
                    maxWidth: '300px',
                  }}
                  style={ userID === message.authorID ? { alignSelf: 'end', border: '1px solid deeppink' } : { alignSelf: 'start' }}
                >
                  <ListItemText
                    primary={message.text}
                    secondary={String(message.createdAt) + ' by ID: ' + message.authorID}
                    sx={{ maxWidth: '300px' }}
                  />
                </ListItem>
              ))}


      </List>

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