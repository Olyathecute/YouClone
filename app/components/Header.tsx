import Image from 'next/image'
import Logo from './elements/Logo'

export default function Header() {
  return (
    <div className='w-screen px-5 py-2 sticky top-0 z-50 bg-light-background'>
      <div className='flex flex-row items-center justify-between'>
        <Logo />
        <div>Search</div>
        <div>Theme Switch</div>
        <div>Lang Switch</div>
        <div>User</div>
      </div>
    </div>
  )
}
