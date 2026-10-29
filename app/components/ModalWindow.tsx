import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useAppDispatch } from '@/app/redux/hooks'
import { closeModalWindow } from '@/app/redux/modalWindowSlice'
import { usePathname } from 'next/navigation'

export default function ModalWindow() {
  const dispatch = useAppDispatch()

  const pathname = usePathname()

  return (
    <div className='fixed right-3 top-11 md:top-16 z-40 sm:w-1/3 md:w-1/6 rounded-xl bg-light-elements p-5 shadow-xl flex flex-col items-start'>
      {pathname !== '/' && (
        <button
          onClick={() => {
            dispatch(closeModalWindow())
            redirect('/')
          }}
          className='cursor-pointer'
        >
          Main page
        </button>
      )}
      <button
        onClick={() => {
          dispatch(closeModalWindow())
          redirect('/profile')
        }}
        className='cursor-pointer'
      >
        My account
      </button>
      <button
        onClick={() => {
          signOut()
          dispatch(closeModalWindow())
        }}
        className='cursor-pointer'
      >
        Log Out
      </button>
    </div>
  )
}
