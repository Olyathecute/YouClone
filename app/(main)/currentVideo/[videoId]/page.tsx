'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getVideo } from '@/app/libs/getVideo'
import Loader from '@/app/components/elements/Loader'
import Image from 'next/image'
import Link from 'next/link'
import '../../../globals.css'

const commentText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue nibh libero, in rhoncus magna luctus condimentum. Mauris vitae urna ut ante rutrum aliquet nec sit amet nunc. Aliquam erat volutpat. Nam maximus, felis quis consequat bibendum, nunc lectus consequat nisl, nec tempor tortor est eget neque. Pellentesque turpis quam, pretium id posuere at, porttitor sit amet mi. Pellentesque vel lacus dui. Nunc ac metus et nisl pulvinar tincidunt. Nulla dui neque, imperdiet non mauris sit amet, dignissim finibus sapien. Nullam quis condimentum est, vitae blandit lacus. Cras eleifend felis id lectus ultrices, sed convallis urna varius. Praesent non neque eu nulla vehicula vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec fringilla ornare tellus vel pulvinar. Donec eget blandit est. Nulla facilisi. Maecenas sagittis, lorem in interdum efficitur, enim enim rutrum justo, et tempor eros dui vel diam. Sed placerat elementum mi, in interdum sem ullamcorper nec. Suspendisse nisl metus, mattis id vestibulum at, sollicitudin sit amet orci. Morbi pellentesque ultrices enim eu placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc vitae ullamcorper diam. Curabitur congue tempor euismod.'

const videoStyles = {}

const userStyles = {
  width: '3rem',
}

export default function Video() {
  const { videoId } = useParams<{ videoId: string }>()
  console.log('currentVideo', videoId)

  const id = Number(videoId)

  const { data, isLoading, error } = useQuery({
    queryKey: ['currentVideo', id],
    queryFn: () => getVideo(id),
  })

  const video = data?.hits[0]
  console.log('data getVideo', video)

  const comments = Array.from({ length: video?.comments }, () => Math.round(Math.random() * 100))
  console.log('comments', comments)

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
                <span className='opacity-50'>{Math.round(Math.random() * 1000)} followers</span>
              </div>
            </div>

            <div className='flex flex-row gap-5'>
              <div className='flex flex-row rounded-xl items-center gap-2 px-2 py-1'>
                <Image src='/likes.svg' alt='likes' width={90} height={90} style={userStyles} />
                <span>{video.likes}</span>
              </div>
              <div className='flex flex-row rounded-xl items-center gap-2 px-2 py-1'>
                <Image src='/views.svg' alt='views' width={90} height={90} style={userStyles} />
                <span>{video.views}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className='font-bold py-4'>Comments {video.comments}</h1>
          <div className='flex flex-col justify-start gap-5'>
            {comments.map((item, key) => (
              <div key={key} className='flex flex-row items-start gap-2'>
                <Image src={'/darkRandomUser.svg'} alt={`User-${item}`} width={100} height={100} style={userStyles} />
                <div className='flex flex-col gap-1'>
                  <span className='font-bold'>User-{item}</span>
                  <span>{commentText.slice(0, item)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
