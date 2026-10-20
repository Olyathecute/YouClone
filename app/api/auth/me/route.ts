import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionUser } from '@/app/libs/authStore'

export async function GET() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('sessionId')?.value

  if (!sessionId) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }

  const username = getSessionUser(sessionId)

  if (!username) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }

  return NextResponse.json({ username }, { status: 200 })
}
