import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/navbar'
import './globals.css'
import ClientOnly from './components/CLientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
const font = Nunito({ subsets: ['latin'], })

export const metadata: Metadata = {
  title: 'kiray ',
  description: 'Nu tekerayu',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly> 
          <ToasterProvider/>
          <RentModal/>
          <RegisterModal/>
          <LoginModal/>
          <Navbar currentUser={currentUser}/>
        </ClientOnly>     
        {children}
      </body>
    </html>
  )
}
