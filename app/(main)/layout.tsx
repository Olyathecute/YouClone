import '../globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col p-5'>
      <Header />
      <main className='min-h-screen'>{children}</main>
      <Footer />
    </div>
  )
}
