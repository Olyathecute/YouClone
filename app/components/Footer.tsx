import Link from 'next/link'
import Image from 'next/image'

const iconStyle = {
  width: '2rem',
  height: 'auto',
}

const media = [
  {
    link: 'https://github.com/Olyathecute',
    image: '/github.png',
    alt: 'Github',
  },
  {
    link: 'https://www.linkedin.com/in/sitnikova-olga',
    image: '/linkedin.png',
    alt: 'LinkedIn',
  },
  {
    link: 'https://t.me/olga_sitnikova',
    image: '/telegram.png',
    alt: 'Telegram',
  },
]

export default function Footer() {
  return (
    <div className='flex flex-row mt-8 mb-4 mx-4 justify-between items-center'>
      <h1>© 2026, Olya</h1>
      <div className='flex flex-row gap-3'>
        {media.map((media, index) => {
          return (
            <Link key={index} href={media.link} target='_blank'>
              <Image src={media.image} alt={media.alt} width={100} height={100} style={iconStyle} loading='eager' />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
