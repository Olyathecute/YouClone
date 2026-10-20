import { NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { validateUser, createSession, getSessionUser } from '@/app/libs/authStore'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ message: 'Username and password are required' }, { status: 400 })
  }

  const isValid = validateUser(username, password)

  if (!isValid) {
    return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 })
  }

  const sessionId = randomUUID()

  createSession(sessionId, username)

  console.log('Created session:', sessionId)
  console.log('Session user:', getSessionUser(sessionId))

  const response = NextResponse.json({ message: 'Login successful' }, { status: 200 })

  response.cookies.set('sessionId', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return response
}
