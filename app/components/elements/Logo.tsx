import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href='/'>
      <div className='flex flex-row items-center justify-center gap-2'>
        <Image
          src='/logo.svg'
          alt='YouClone'
          width={286}
          height={173}
          className='w-12 sm:w-16 md:w-20 h-auto'
          loading='eager'
        />
        <p className='text-xl sm:text-2xl md:text-4xl font-bold'>YouClone</p>
      </div>
    </Link>
  )
}
