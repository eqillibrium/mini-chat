import { FormEvent } from 'React'
import { AppContext } from '../../context/App.context'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container
} from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

interface userData {
  UID: number;
  name: FormDataEntryValue | null | string;
  event: 'message' | 'connection';
}

export const Auth = () => {
  const { name, setName, socket, setSocket, setConnected, setUID } = useContext(AppContext)
  const navigate = useNavigate()
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (setName) {
      setName(data.get('name'))
    }
    if (setSocket && !socket) {
      const newSocket = new WebSocket('ws://localhost:5000')
      setSocket(newSocket)
      newSocket.onopen = (e: Event): void => {
        const UID = Math.random() * 1000
        setUID && setUID(UID)
        const body: userData = { UID, name: data.get('name'), event: 'connection' }
        newSocket.send(JSON.stringify(body))
      }
      newSocket.onmessage = (e: MessageEvent): void => {
        const data = JSON.parse(e.data)
        if(data.event === 'connection') {
          setConnected && setConnected()
          navigate('/chat')
        }
      }
    }
  };

  if(name) {
    return (
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {name && String(name)}
        </Typography>
      </Container>
    );
  }

  return (
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
  );
}