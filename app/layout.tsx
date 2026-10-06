import './globals.css'
import QueryProvider from './QueryProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className=''>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
