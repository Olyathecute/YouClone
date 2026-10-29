import '../globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import StoreProvider from '../StoreProvider'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect('/registration')
  }

  return (
    <StoreProvider>
      <SessionProvider>
        <div className='min-h-screen flex flex-col'>
          <Header />
          <main className='flex-1 flex items-center justify-center'>{children}</main>
          <Footer />
        </div>
      </SessionProvider>
    </StoreProvider>
  )
}
