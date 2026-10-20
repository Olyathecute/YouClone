import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { deleteSession } from '@/app/libs/authStore'

export async function POST() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('sessionId')?.value

  if (sessionId) {
    deleteSession(sessionId)
  }

  const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 })

  response.cookies.set('sessionId', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })

  return response
}
