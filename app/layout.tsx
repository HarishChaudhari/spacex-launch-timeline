import './globals.css'

import Header from './components/header/header'
import Footer from './components/footer/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='container'>
        <Header/>
        <main>
          {children}
        </main>
        <Footer/>
      </body>      
    </html>
  )
}