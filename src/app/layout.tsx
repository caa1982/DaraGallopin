import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Dara Gallopin',
  description: 'Contemporary artist exploring the intersection of cultural identity, modern technology, and traditional techniques',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className={`font-inter antialiased min-h-screen flex flex-col`}>
        <div className="fixed inset-0 bg-gradient-to-b from-primary via-blue-800 to-primary -z-10" />
        <Navbar />
        <div className="flex-1 relative z-0">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
