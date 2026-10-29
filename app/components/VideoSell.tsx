'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { addLike, removeLike } from '@/app/redux/likeSlice'
import '../globals.css'

const userStyles: React.CSSProperties = {
  width: '2rem',
  height: 'auto',
}

const videoStyles: React.CSSProperties = {
  width: '45rem',
  height: '15rem',
  objectFit: 'cover',
  borderRadius: '1rem',
}

const widgetStyles = {
  width: '2.5rem',
}

export default function VideoSell({ video }: { video: any }) {
  const dispatch = useAppDispatch()
  const [isAnimating, setIsAnimating] = useState(false)
  const isLiked = useAppSelector((state) => state.likes.likedVideoIds.includes(video.id))

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

  const handleLike = (id: number) => {
    if (isLiked) {
      dispatch(removeLike(id))
    } else {
      dispatch(addLike(id))
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  return (
    <Link key={video.id} href={`/currentVideo/${video.id}`}>
      <div className='flex justify-center w-full hover:rounded-xl hover:bg-light-elements p-2'>
        <div className='flex flex-col gap-2'>
          <div className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {isLiked && (
              <button
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  handleLike(video.id)
                }}
                className='absolute top-[10px] right-[10px] z-10 w-4 h-auto cursor-pointer'
              >
                <Image
                  src={isLiked ? '/liked.png' : '/likes.png'}
                  alt='Likes'
                  width={100}
                  height={100}
                  style={widgetStyles}
                  className={`${isAnimating ? 'animate-like-pop' : ''}`}
                />
              </button>
            )}
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
              src={video.videos.large.thumbnail}
              alt={video.user}
              width={800}
              height={800}
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
                style={userStyles}
                width={100}
                height={100}
                loading='eager'
                className='rounded-full object-cover'
              />
            </div>
            <div>
              <h3 className='font-bold line-clamp-1'>{video.name}</h3>
              <span className='opacity-50'>{video.user}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
