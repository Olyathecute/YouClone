'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'

const userStyles: React.CSSProperties = {
  width: '2rem',
  height: 'auto',
}

const videoStyles: React.CSSProperties = {
  width: '25rem',
  height: '15rem',
  objectFit: 'cover',
  borderRadius: '1.5rem',
}

export default function VideoSell({ video }: { video: any }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      setIsPlaying(true)
    }, 500)
  }
  const handleMouseLeave = () => {
    setIsPlaying(false)
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  return (
    <Link key={video.id} href={`/currentVideo/${video.id}`}>
      <div className='flex justify-center'>
        <div className='flex flex-col gap-2'>
          <div className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {isPlaying && video && (
              <video
                style={{
                  ...videoStyles,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                width={100}
                height={100}
                autoPlay
                playsInline
                muted
                loop
              >
                <source src={video.videos.small.url} type='video/mp4' />
              </video>
            )}

            <Image
              src={video.videos.small.thumbnail}
              alt={video.user}
              width={100}
              height={100}
              loading='eager'
              className='object-contain'
              style={videoStyles}
            />
          </div>

          <div className='flex flex-row items-start justify-start gap-2'>
            <div>
              <Image
                src={video.userImageURL ? video.userImageURL : '/darkRandomUser.svg'}
                alt={video.user}
                width={100}
                height={100}
                style={userStyles}
                loading='eager'
                className='rounded-full object-cover'
              />
            </div>
            <div>
              <h3 className='font-bold'>{video.name}</h3>
              <span className='opacity-50'>{video.user}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
