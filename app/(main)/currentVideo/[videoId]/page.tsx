'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { addLike, removeLike } from '@/app/redux/likeSlice'
import { getVideo } from '@/app/libs/getVideo'
import Loader from '@/app/components/elements/LoaderIceCream'
import Image from 'next/image'
import Link from 'next/link'
import '../../../globals.css'

const commentText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue nibh libero, in rhoncus magna luctus condimentum. Mauris vitae urna ut ante rutrum aliquet nec sit amet nunc. Aliquam erat volutpat. Nam maximus, felis quis consequat bibendum, nunc lectus consequat nisl, nec tempor tortor est eget neque. Pellentesque turpis quam, pretium id posuere at, porttitor sit amet mi. Pellentesque vel lacus dui. Nunc ac metus et nisl pulvinar tincidunt. Nulla dui neque, imperdiet non mauris sit amet, dignissim finibus sapien. Nullam quis condimentum est, vitae blandit lacus. Cras eleifend felis id lectus ultrices, sed convallis urna varius. Praesent non neque eu nulla vehicula vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec fringilla ornare tellus vel pulvinar. Donec eget blandit est. Nulla facilisi. Maecenas sagittis, lorem in interdum efficitur, enim enim rutrum justo, et tempor eros dui vel diam. Sed placerat elementum mi, in interdum sem ullamcorper nec. Suspendisse nisl metus, mattis id vestibulum at, sollicitudin sit amet orci. Morbi pellentesque ultrices enim eu placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc vitae ullamcorper diam. Curabitur congue tempor euismod.'

const videoStyles = {}

const userStyles = {
  width: '3rem',
}

const widgetStyles = {
  width: '2.5rem',
}

export default function Video() {
  const dispatch = useAppDispatch()

  const [isAnimating, setIsAnimating] = useState(false)

  const { videoId } = useParams<{ videoId: string }>()
  const id = Number(videoId)

  const { data, isLoading, error } = useQuery({
    queryKey: ['currentVideo', id],
    queryFn: () => getVideo(id),
  })

  const video = data?.hits[0]
  const comments = useMemo(
    () => Array.from({ length: video?.comments ?? 0 }, () => Math.round(Math.random() * 100)),
    [video],
  )
  const followers = useMemo(() => Math.round(Math.random() * 1000), [video])
  const isLiked = useAppSelector((state) => state.likes.likedVideoIds.includes(id))

  const handleLike = () => {
    if (isLiked) {
      dispatch(removeLike(id))
    } else {
      dispatch(addLike(id))
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className='w-full flex flex-col gap-1'>
      <div className='w-full h-[83vh] bg-black flex items-center justify-center'>
        <video
          width={1000}
          height={1000}
          controls
          className='w-full h-full object-contain'
          style={videoStyles}
          autoPlay
        >
          <source src={video.videos.large.url} type='video/mp4' />
        </video>
      </div>

      <div className='px-5'>
        <div className='flex flex-col justify-start gap-1'>
          <h1 className='font-bold text-2xl'>{video.name}</h1>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-row items-center gap-2'>
              <Image
                src={video.userImageURL ? video.userImageURL : '/darkRandomUser.svg'}
                alt={video.user}
                width={100}
                height={100}
                style={userStyles}
                loading='eager'
                className='rounded-full object-cover'
              />
              <div className='flex flex-col'>
                <Link key={video.id} href={video.userURL} target='_blank'>
                  <span>{video.user}</span>
                </Link>
                <span className='opacity-50'>{followers} followers</span>
              </div>
            </div>

            <div className='flex flex-row gap-1'>
              <button onClick={handleLike} className='flex flex-row rounded-xl items-center gap-2 px-2 py-1'>
                <Image
                  src={isLiked ? '/liked.png' : '/likes.png'}
                  alt='Likes'
                  width={100}
                  height={100}
                  style={widgetStyles}
                  className={`${isAnimating ? 'animate-like-pop' : ''}`}
                />
                <span>{video?.likes + Number(isLiked)}</span>
              </button>

              <div className='flex flex-row rounded-xl items-center px-2 py-1'>
                <Image src='/views.svg' alt='Views' width={100} height={100} style={widgetStyles} />
                <span>{video.views}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className='font-bold py-4'>Comments {video.comments}</h1>
          <div className='flex flex-col justify-start gap-5'>
            {comments.map((comment, key) => (
              <div key={key} className='flex flex-row items-start gap-2'>
                <Image
                  src={'/darkRandomUser.svg'}
                  alt={`User-${comment}`}
                  width={100}
                  height={100}
                  style={userStyles}
                />
                <div className='flex flex-col gap-1'>
                  <span className='font-bold'>User-{comment}</span>
                  <span>{commentText.slice(0, comment)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
