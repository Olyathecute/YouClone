'use client'

import Image from 'next/image'
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
    timerRef.current = setTimeout(() => {
      setIsPlaying(true)
    }, 1000)
  }
  const handleMouseLeave = () => {
    setIsPlaying(false)
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col gap-2'>
        <div className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <video
            style={{
              ...videoStyles,
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: isPlaying ? 1 : 0,
            }}
            width={100}
            height={100}
            autoPlay
            playsInline
            muted
            loop
            preload='none'
          >
            <source src={video.videos.medium.url} type='video/mp4' />
          </video>

          <Image
            src={video.videos.medium.thumbnail}
            alt={video.user}
            width={100}
            height={100}
            loading='eager'
            className='object-contain'
            style={{ ...videoStyles, ...{ opacity: isPlaying ? 0 : 1 } }}
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
  )
}
