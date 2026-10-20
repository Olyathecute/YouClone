import bcrypt from 'bcryptjs'
import { prisma } from '@/app/libs/prisma'

export async function validateUser(username: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      username: username.trim(),
    },
  })

  if (!user) {
    return false
  }
  const isValid = await bcrypt.compare(password, user.passwordHash)
  console.log('Password valid:', isValid)

  return isValid
}
