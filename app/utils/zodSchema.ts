import { z } from 'zod'

export const registrationSchema = z.object({
  username: z
    .string()
    .min(5, 'Too short Username🫸 🫷')
    .max(50, 'Too long Username 🫸     🫷')
    .regex(/^[A-Za-z0-9_]+$/, 'Username can only contain 🔠, 🔡, 🔢 and `_`'),
  password: z
    .string()
    .min(8, 'At least 8 symbols')
    .max(30, 'Too long')
    .regex(/[A-Z]/, 'At least 1 of 🔠')
    .regex(/[0-9]/, 'At least 1 of 🔢')
    .regex(/[^A-Za-z0-9]/, 'At least 1 of @,$,!,%,*,# etc.'),
  email: z.email(),
})

export const loginSchema = z.object({
  username: z.string().min(1, 'Enter tne username'),
  password: z.string().min(1, 'Enter tne password'),
})
