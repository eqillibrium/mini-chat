import { FormEvent } from 'react'

export interface AuthFormProps {
  title: 'Sign Up' | 'Sign In';
  handleSubmit: (data: FormData) => void;
  switchFormType: () => void
  type: FormType
}

export type FormType = 'login' | 'register'
