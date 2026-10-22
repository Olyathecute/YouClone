'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from './elements/Logo'
import ModalWindow from './ModalWindow'

export default function Header() {
  const [modalWindow, setModalWindow] = useState(false)

  return (
    <div className='w-screen px-5 py-2 sticky top-0 z-50 bg-light-background'>
      <div className='flex flex-row items-center justify-between'>
        <Link href='/'>
          <Logo />
        </Link>
        <div>Search</div>
        {/* <div>Theme Switch</div>
        <div>Lang Switch</div> */}
        <div>
          <button onClick={() => setModalWindow(!modalWindow)}>User</button>
        </div>
        {modalWindow && <ModalWindow />}
      </div>
    </div>
  )
}
