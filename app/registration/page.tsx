'use client'

import { useState } from 'react'
import Logo from '../components/elements/Logo'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn as authSignIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { registrationSchema, loginSchema } from '@/app/utils/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerText } from '@/constants/en'

type Registration = {
  username: string
  email: string
  password: string
}

type Enter = {
  username: string
  password: string
}

export default function Registration() {
  const router = useRouter()
  const [firstEnter, setFirstEnter] = useState(false)
  const [loading, setLoading] = useState(false)

  console.log('firstEnter', firstEnter)

  const form = useForm<any>({
    resolver: zodResolver(firstEnter ? registrationSchema : loginSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
  })

  async function signIn(username: string, password: string) {
    const result = await authSignIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (result?.error) {
      form.setError('password', {
        type: 'server',
        message: 'Incorrect username or password',
      })

      return
    }

    router.push('/')
  }

  async function signUp(username: string, email: string, password: string) {
    await axios.post('/api/auth/registration', {
      username,
      password,
      email,
    })

    const result = await authSignIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (result?.ok) {
      router.push('/')
    } else {
      console.log('Login failed')
    }

    return null
  }

  const onSubmit = (data: Registration | Enter) => {
    setLoading(true)
    if ('email' in data) {
      signUp(data.username, data.email, data.password)
    } else {
      signIn(data.username, data.password)
    }
    console.log('EnterData', data)
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-10 gap-6'>
      <div>
        <Logo />
      </div>
      <h1>{registerText.greeting[Number(firstEnter)]}</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center justify-center gap-2'>
        <input {...form.register('username')} type='text' placeholder='Username' />
        {typeof form.formState.errors.username?.message === 'string' && (
          <p className='text-xs text-accent'>{form.formState.errors.username.message}</p>
        )}
        {!firstEnter ? null : (
          <>
            <input {...form.register('email')} type='email' placeholder='Email' />
            {typeof form.formState.errors.email?.message === 'string' && (
              <p className='text-xs text-accent'>{form.formState.errors.email.message}</p>
            )}
          </>
        )}
        <input {...form.register('password')} type='password' placeholder='Password' />
        {typeof form.formState.errors.password?.message === 'string' && (
          <p className='text-xs text-accent'>{form.formState.errors.password.message}</p>
        )}

        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'>
          {loading ? 'Loading' : registerText.button[Number(firstEnter)]}
        </button>
      </form>
      <h1>
        {registerText.question[Number(firstEnter)]}{' '}
        <button className='cursor-pointer' onClick={() => setFirstEnter(!firstEnter)} disabled={loading}>
          {registerText.button[Number(!firstEnter)]}
        </button>
      </h1>
    </div>
  )
}
