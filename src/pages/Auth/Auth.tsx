import {
  CssBaseline,
  Typography,
  Container,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { registerUser, loginUser } from '../../features/user/userSlice'
import { startConnecting} from '../../features/chat/chatSlice'
import { AuthForm } from '../../components'
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
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onRegister = async (formData: FormData): Promise<void> => {
    const userData = { name: formData.get('name'), email: formData.get('email'), password: formData.get('password') }
    try {
      await dispatch(registerUser(userData))
      dispatch(startConnecting())
      navigate('/chat')
    } catch (e) {
      console.log(e)
    }
  }

  const onLogin = async (formData: FormData): Promise<void> => {
    const userData = { email: formData.get('email'), password: formData.get('password') }
    try {
      await dispatch(loginUser(userData))
      navigate('/chat')
      dispatch(startConnecting())
    } catch (e) {
      console.log(e)
    }
  }

  const onAuth = (formData: FormData): Promise<void> => {
    if(formType === 'register') {
      return onRegister(formData)
    }
    return onLogin(formData)
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