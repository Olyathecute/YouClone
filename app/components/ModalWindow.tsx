import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function ModalWindow() {
  return (
    <div className='fixed right-3 top-11 md:top-16 z-40 sm:w-1/3 md:w-1/6 rounded-xl bg-light-elements p-5 shadow-xl flex flex-col items-start'>
      <button onClick={() => redirect('/profile')} className='cursor-pointer'>
        My account
      </button>
      <button onClick={() => signOut()} className='cursor-pointer'>
        Log Out
      </button>
    </div>
  )
}
