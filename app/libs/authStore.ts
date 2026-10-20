type UserInfo = {
  username: string
  password: string
  email: string
}

const users = new Map<string, UserInfo>([['user', { username: 'user', password: 'user', email: 'user@mail.com' }]])
const sessions = new Map<string, string>()

console.log('authStore loaded:', Date.now())

export function registerUser(username: string, password: string, email: string) {
  if (users.has(username)) {
    return false
  }

  users.set(username, { username, password, email })
  return true
}

export function validateUser(username: string, password: string) {
  const user = users.get(username)
  return !!user && user?.password === password
}

export function createSession(sessionId: string, username: string) {
  sessions.set(sessionId, username)
  console.log('Sessions after create:', [...sessions.entries()])
}

export function getSessionUser(sessionId: string) {
  console.log('getSessionUser called')
  console.log('Sessions when checking:', [...sessions.entries()])
  return sessions.get(sessionId)
}

export function deleteSession(sessionId: string) {
  sessions.delete(sessionId)
}
