import Image from 'next/image'
import Logo from './Logo'

export default function Header() {
  return (
    <div className='flex flex-row items-center justify-between '>
      <Logo />
      <div>Search</div>
      <div>Theme Switch</div>
      <div>Lang Switch</div>
      <div>User</div>
    </div>
  )
}
