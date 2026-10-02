import Image from 'next/image'

const styles = {
  width: '80px',
  height: 'auto',
}

export default function Logo() {
  return (
    <div className='flex flex-row items-center justify-center'>
      <Image src='/logo.svg' alt='YouClone' width={286} height={173} style={styles} loading='eager' />
      <p className='text-4xl font-bold'>YouClone</p>
    </div>
  )
}
