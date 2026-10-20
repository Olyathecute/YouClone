import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/app/libs/prisma'
import { Prisma } from '@/generated/prisma/client'

export async function POST(request: Request) {
  try {
    const { username, password, email } = await request.json()

    if (
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      typeof email !== 'string' ||
      !username.trim() ||
      !password ||
      !email.trim()
    ) {
      return NextResponse.json({ message: 'Username, email and password are required' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedUsername = username.trim()

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: normalizedEmail }, { username: normalizedUsername }],
      },
    })

    if (existingUser) {
      return NextResponse.json({ message: 'Email or username already exists' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    await prisma.user.create({
      data: {
        username: normalizedUsername,
        email: normalizedEmail,
        passwordHash,
      },
    })

    return NextResponse.json({ message: 'Registration successful' }, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ message: 'Email or username already exists' }, { status: 409 })
    }

    console.error('Registration error:', error)

    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
