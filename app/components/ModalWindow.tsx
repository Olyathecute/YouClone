import { signOut } from 'next-auth/react'

export default function ModalWindow() {
  return (
    <div className='fixed right-3 top-15 z-40 w-1/5 rounded-xl bg-light-background p-5 shadow-xl'>
      <p>My account</p>
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  )
}
