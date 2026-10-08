import '../globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getVideos } from '../libs/getVideos'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const { data, isLoading, error } = useInfiniteQuery({
  //   queryKey: ['videos'],
  //   queryFn: ({ pageParam }) => getVideos(pageParam),
  //   initialPageParam: 1,
  //   getNextPageParam: () => undefined,
  // })

  return (
    <div className='min-h-screen flex flex-col p-5'>
      <Header />
      <main className='flex-1 p-4 flex items-center justify-center'>{children}</main>
      <Footer />
    </div>
  )
}
