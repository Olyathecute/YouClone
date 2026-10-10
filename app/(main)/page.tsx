'use client'

import { getVideos } from '../libs/getVideos'
import { useInfiniteQuery } from '@tanstack/react-query'
import Loader from '../components/elements/Loader'
import { useMemo } from 'react'
import VideoSell from '../components/VideoSell'

export default function MainPage() {
  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: ({ pageParam }) => getVideos(pageParam),
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1
    },
  })

  const videos = data?.pages.flatMap((page) => page.hits) ?? []
  // the API has repeated videos with the same id in different pages, so we need to filter them out
  const uniqueVideos = new Set()
  videos.map((video: any) => uniqueVideos.add(video.id))
  const renderedVideos = useMemo(() => videos.filter((video: any) => uniqueVideos.has(video.id)), [videos])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg: gap-3'>
          {renderedVideos.map((video: any) => (
            <VideoSell video={video} key={video.id} />
          ))}
          <button onClick={() => fetchNextPage()}>Load more</button>
        </div>
      )}
    </>
  )
}
