import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { validateUser } from '@/app/libs/authStore'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials

        if (typeof username === 'string' && typeof password === 'string') {
          return (await validateUser(username, password)) ? { id: username, name: username } : null
        } else {
          return null
        }
      },
    }),
  ],
})
