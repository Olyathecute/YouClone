'use client'

import { useState } from 'react'
import Logo from '../components/elements/Logo'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn as authSignIn } from 'next-auth/react'

const registerText = {
  greeting: ['Welcome back!', 'Registration'],
  button: ['Sign In', 'Sign Up'],
  question: [`Don't have an account?`, 'Already have an account?'],
  redirectButton: ['Sign Up', 'Sign In'],
}

export default function Registration() {
  const router = useRouter()

  const [firstEnter, setFirstEnter] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  async function signIn(username: string, password: string) {
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

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-10 gap-6'>
      <div>
        <Logo />
      </div>
      <h1>{registerText.greeting[Number(firstEnter)]}</h1>

      <div className='flex flex-col items-center justify-center gap-2'>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(event) => setUsername(String(event.target.value))}
        />
        {!firstEnter ? null : (
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(event) => setEmail(String(event.target.value))}
          />
        )}
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(event) => setPassword(String(event.target.value))}
        />
      </div>

      <div className='flex flex-col items-center justify-center gap-1'>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'
          onClick={() => (firstEnter ? signUp(username, password, email) : signIn(username, password))}
        >
          {registerText.button[Number(firstEnter)]}
        </button>

        <div>
          <h1>
            {registerText.question[Number(firstEnter)]}{' '}
            <button className='cursor-pointer' onClick={() => setFirstEnter(!firstEnter)}>
              {registerText.redirectButton[Number(firstEnter)]}
            </button>
          </h1>
        </div>
      </div>
    </div>
  )
}
