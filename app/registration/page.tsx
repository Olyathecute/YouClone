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
      form.setError('username', {
        type: 'server',
        message: '',
      })
      form.setError('password', {
        type: 'server',
        message: 'Incorrect username or password',
      })
      setLoading(false)

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

    if (result?.error) {
      form.setError('password', {
        type: 'server',
        message: 'This username or email already exist',
      })
      setLoading(false)

      return
    }

    router.push('/')
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
    <div className='min-h-screen flex flex-col items-center justify-center p-10 gap-4'>
      <div>
        <Logo />
      </div>
      <h1 className='font-primary text-2xl'>{registerText.greeting[Number(firstEnter)]}</h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className='flex flex-col  justify-center gap-2 w-full md:w-1/2 xl:w-1/4'
      >
        <input
          {...form.register('username')}
          type='text'
          placeholder='Username'
          className={`w-full border rounded p-2 outline-none ${
            form.formState.errors.username
              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-gray-300 focus:ring-1 focus:ring-yellow-400'
          }`}
        />
        {typeof form.formState.errors.username?.message === 'string' && (
          <p className='text-xs text-error'>{form.formState.errors.username.message}</p>
        )}
        {!firstEnter ? null : (
          <>
            <input
              {...form.register('email')}
              type='email'
              placeholder='Email'
              className={`w-full border rounded p-2 outline-none ${
                form.formState.errors.email
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-1 focus:ring-yellow-400'
              }`}
            />
            {typeof form.formState.errors.email?.message === 'string' && (
              <p className='text-xs text-error'>{form.formState.errors.email.message}</p>
            )}
          </>
        )}
        <input
          {...form.register('password')}
          type='password'
          placeholder='Password'
          className={`w-full border rounded p-2 outline-none ${
            form.formState.errors.password
              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-gray-300 focus:ring-1 focus:ring-yellow-400'
          }`}
        />
        {typeof form.formState.errors.password?.message === 'string' && (
          <p className='text-xs text-error'>{form.formState.errors.password.message}</p>
        )}

        <button type='submit' className='bg-accent text-white px-4 py-2 rounded-md cursor-pointer w-full loading-dots'>
          {loading ? <span className='loading-dots'>Loading </span> : registerText.button[Number(firstEnter)]}
        </button>
      </form>
      <h1>
        {registerText.question[Number(firstEnter)]}{' '}
        <button
          className='cursor-pointer font-primary text-xl'
          onClick={() => {
            setFirstEnter(!firstEnter)
            form.reset()
          }}
          disabled={loading}
        >
          {registerText.button[Number(!firstEnter)]}
        </button>
      </h1>
    </div>
  )
}
