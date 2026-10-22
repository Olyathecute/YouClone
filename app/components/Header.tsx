'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from './elements/Logo'
import Image from 'next/image'
import ModalWindow from './ModalWindow'

const user: React.CSSProperties = {
  width: '3rem',
  height: 'auto',
}

export default function Header() {
  const [modalWindow, setModalWindow] = useState(false)

  return (
    <div className='w-screen px-4 py-2 sticky top-0 z-50 bg-light-background'>
      <div className='flex flex-row items-center justify-between'>
        <Link href='/'>
          <Logo />
        </Link>
        <div>Search</div>
        {/* <div>Theme Switch</div>
        <div>Lang Switch</div> */}
        <div>
          <button onClick={() => setModalWindow(!modalWindow)}>
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
        {modalWindow && <ModalWindow />}
      </div>
    </div>
  )
}
