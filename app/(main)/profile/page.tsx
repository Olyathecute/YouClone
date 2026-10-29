'use client'

import Image from 'next/image'
import { useAppSelector } from '@/app/redux/hooks'
import { useQuery } from '@tanstack/react-query'
import { getLikedVideos } from '@/app/libs/getLikedVideos'
// import { useSession } from 'next-auth/react'
import VideoSell from '../../components/VideoSell'
import LoaderIceCream from '@/app/components/elements/LoaderIceCream'

const userStyles = {
  width: '20rem',
}

type VideoData = {
  id: number
  comments: number
  likes: number
  views: number
  name: string
  user: string
  userImageURL: string
  userURL: string
  videos: object
  [key: string]: unknown
}

export default function Profile() {
  const likedVideosIds = useAppSelector((state) => state.likes.likedVideoIds)
  // const { data } = useSession()

  const {
    data: likedVideos,
    isLoading: likedVideosIsLoading,
    error: likedVideosError,
  } = useQuery({
    queryKey: ['likedVideos', likedVideosIds],
    queryFn: () => getLikedVideos(likedVideosIds),
    enabled: likedVideosIds.length > 0,
  })

  return (
    <div className='self-start w-full flex flex-col md:flex-row px-5 pt-8'>
      <div className='md:w-1/3 flex flex-col items-center gap-3'>
        <Image src={'/darkRandomUser.svg'} alt={'user'} width={100} height={100} style={userStyles} loading='eager' />
        <h1>name</h1>
        <h1>email</h1>
      </div>
      <div className='md:w-2/3 flex flex-col'>
        <h1 className='px-2'>My favorite videos</h1>
        <div>
          {likedVideosIds.length == 0 && <div>0 liked videos</div>}
          {likedVideosIsLoading && <LoaderIceCream />}
          {likedVideosError && <div>Error</div>}
          {likedVideos && (
            <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-3 xl:grid-cols-3'>
              {likedVideos.map((video: VideoData) => (
                <VideoSell video={video} key={video.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
