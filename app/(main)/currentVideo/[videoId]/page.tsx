'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getVideo } from '@/app/libs/getVideo'

export default function Video() {
  const { videoId } = useParams<{ videoId: string }>()
  console.log('currentVideo', videoId)

  const id = Number(videoId)

  const { data, isLoading, error } = useQuery({
    queryKey: ['currentVideo', id],
    queryFn: () => getVideo(id),
  })

  console.log('data getVideo', data)

  return (
    <div>
      {isLoading ? (
        <div>load</div>
      ) : (
        <video width={1000} height={1000} autoPlay playsInline muted loop preload='none'>
          <source src={data.hits[0].videos.large.url} type='video/mp4' />
        </video>
      )}
    </div>
  )
}
