'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { closeModalWindow, openModalWindow } from '@/app/redux/modalWindowSlice'
import Link from 'next/link'
import Logo from './elements/Logo'
import Image from 'next/image'
import ModalWindow from './ModalWindow'

const user = {
  width: 'clamp(1.8rem, 5vw, 3.2rem)',
  height: 'auto',
}

export default function Header() {
  const dispatch = useAppDispatch()
  const modalWindowIsOpen = useAppSelector((state) => state.modalWindow.modalWindowIsOpen)

  const handleClick = () => {
    if (modalWindowIsOpen) {
      dispatch(closeModalWindow())
    } else {
      dispatch(openModalWindow())
    }
  }

  return (
    <div className='w-screen px-4 py-2 sticky top-0 z-50 bg-light-background'>
      <div className='flex flex-row items-center justify-between'>
        <Link href='/'>
          <Logo />
        </Link>
        <div>Search</div>
        {/* <div>Theme Switch</div>
        <div>Lang Switch</div> */}
        <div className='flex justify-center'>
          <button onClick={handleClick} className='cursor-pointer'>
            <Image
              src={'/lightUser.svg'}
              alt={'My account'}
              width={100}
              height={100}
              loading='eager'
              style={user}
              className='rounded-full object-cover'
            />
          </button>
        </div>
        {modalWindowIsOpen && <ModalWindow />}
      </div>
    </div>
  )
}
