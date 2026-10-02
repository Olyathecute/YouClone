'use client'

import { useState } from 'react'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Logo from '../components/Logo'

export default function Registration() {
  const [firstEnter, setFirstEnter] = useState(true)

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-10 gap-2'>
      <div>
        <Logo />
      </div>

      <h1>{firstEnter ? 'Registration' : 'Welcome back!'} </h1>

      <div>{firstEnter ? <SignUp /> : <SignIn />}</div>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'
        onClick={() => console.log('Button clicked!')}
      >
        {firstEnter ? 'Sign Up' : 'Sign In'}
      </button>
      <div>
        <h1>
          {firstEnter ? 'Already have an account?' : `Don't have an account?`}{' '}
          <button className='cursor-pointer' onClick={() => setFirstEnter(!firstEnter)}>
            {firstEnter ? 'Sign In' : 'Sign Up'}
          </button>
        </h1>
      </div>
    </div>
  )
}
