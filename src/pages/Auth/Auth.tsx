import { FormEvent } from 'React'
import {
  CssBaseline,
  Typography,
  Container
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setName, set_id, setaccess_token, setEmail } from '../../features/user/userSlice'
import { AuthForm } from '../../components'
import axios, { AxiosResponse } from 'axios'
import socket from '../../socket'
import { IUser } from '../../interfaces'
import { useState } from 'react'
import { FormType } from '../../components/AuthForm/AuthForm.props'

interface UserDTO {
  user: IUser;
  event: 'message' | 'connection';
}

export const Auth = () => {
  const [formType, setFormType] = useState<FormType>('register')
  const token = useSelector((state: RootState) => state.user.access_token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onRegister = async (formData: FormData): Promise<void> => {
    const userData = { name: formData.get('name'), email: formData.get('email'), password: formData.get('password') }
    try {
      const { data } = await axios.post<IUser, AxiosResponse<IUser>>('http://localhost:8000/api/auth/register', userData)
      data._id && dispatch(set_id(data._id))
      data.email && dispatch(setEmail(data.email))
      data.name && dispatch(setName(data.name))
      data.access_token && dispatch(setaccess_token(data.access_token))
    } catch (e) {
      console.log(e)
    }
  }
  const onLogin = async (formData: FormData): Promise<void> => {
    const userData = { email: formData.get('email'), password: formData.get('password') }
    try {
      const { data } = await axios.post<IUser, AxiosResponse<IUser>>('http://localhost:8000/api/auth/login', userData)
      data._id && dispatch(set_id(data._id))
      data.email && dispatch(setEmail(data.email))
      data.name && dispatch(setName(data.name))
      data.access_token && dispatch(setaccess_token(data.access_token))
    } catch (e) {
      console.log(e)
    }
  }
  const onAuth = (formData: FormData): Promise<void> => {
    if(formType === 'register') {
      return onRegister(formData)
    }
    return onLogin(formData)

    // const { data } = await axios.post<IUser, AxiosResponse<IUser>>('http://localhost:8000/api/auth/register', userData)
    // socket.send(JSON.stringify(body))
    //
    // socket.onmessage = (e: MessageEvent): void => {
    //   const data = JSON.parse(e.data)
    //   if(data.event === 'connection') {
    //     navigate('/chat')
    //   }
    // }

  };
  const switchFormType = () => {
    setFormType((prevState) => prevState === 'login' ? 'register' : 'login')
  }

  if(token) {
    return (
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {token && String(token)}
        </Typography>
      </Container>
    );
  }

  return (
      <Container maxWidth="xs">
        <CssBaseline />
        <AuthForm
          type={formType}
          handleSubmit={onAuth}
          title={formType === 'register' ? 'Sign Up' : 'Sign In'}
          switchFormType={switchFormType}
        />
      </Container>
  );
}