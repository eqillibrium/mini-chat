import { FormEvent } from 'React'
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
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setName, setUID } from '../../features/user/userSlice'
import socket from '../../socket'

interface userData {
  UID: number;
  name: FormDataEntryValue | null | string;
  event: 'message' | 'connection';
}

export const Auth = () => {
  const userName = useSelector((state: RootState) => state.user.name)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name'))
    if (!name) {
      return;
    }
    dispatch(setName(name));
    const UID = Math.random() * 1000
    dispatch(setUID(UID))
    const body: userData = { UID, name, event: 'connection' }
    socket.send(JSON.stringify(body))

    socket.onmessage = (e: MessageEvent): void => {
      const data = JSON.parse(e.data)
      if(data.event === 'connection') {
        navigate('/chat')
      }
    }

  };

  if(userName) {
    return (
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {userName && String(userName)}
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