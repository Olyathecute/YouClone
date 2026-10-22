'use client'

import { getVideos } from '../libs/getVideos'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRef, useEffect } from 'react'
import Loader from '../components/elements/LoaderIceCream'
import { useMemo } from 'react'
import VideoSell from '../components/VideoSell'
import LoaderSpinner from '../components/elements/LoaderSpinner'

export default function MainPage() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: ({ pageParam }) => getVideos(pageParam),
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1
    },
  })

  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        threshold: 0.1,
      },
    )

    const target = observerTarget.current

    if (target) {
      observer.observe(target)
    }

    return () => {
      observer.disconnect()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

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
        <>
          <div className='flex flex-col items-center'>
            <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-3 md:gap-5 xl:grid-cols-4 px-4'>
              {renderedVideos.map((video: any) => (
                <VideoSell video={video} key={video.id} />
              ))}
            </div>
            <div ref={observerTarget} className='py-5'>
              {isFetchingNextPage && <LoaderSpinner />}
            </div>
          </div>
        </>
      )}
    </>
  )
}
