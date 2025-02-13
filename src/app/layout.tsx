import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
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
  title: {
    default: 'Dara Gallopin | Contemporary Artist',
    template: '%s | Dara Gallopin'
  },
  description: 'Contemporary artist Dara Gallopin explores the intersection of cultural identity, modern technology, and traditional techniques through paintings, digital art, and mixed media.',
  keywords: ['contemporary art', 'Swiss-Iranian artist', 'digital art', 'oil painting', 'mixed media', 'fine art', 'modern art', 'Dara Gallopin'],
  creator: 'Dara Gallopin',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://daragallopin.com',
    title: 'Dara Gallopin | Contemporary Artist',
    description: 'Contemporary artist Dara Gallopin explores the intersection of cultural identity, modern technology, and traditional techniques through paintings, digital art, and mixed media.',
    siteName: 'Dara Gallopin',
    images: [
      {
        url: '/dara_self.webp',
        width: 1200,
        height: 630,
        alt: 'Dara Gallopin - Contemporary Artist'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dara Gallopin | Contemporary Artist',
    description: 'Contemporary artist exploring cultural identity through art',
    images: ['/dara_self.webp']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://daragallopin.com/#artist",
            "name": "Dara Gallopin",
            "url": "https://daragallopin.com",
            "image": "https://daragallopin.com/dara_self.webp",
            "sameAs": [],
            "jobTitle": "Contemporary Artist",
            "description": "Swiss-Iranian contemporary artist known for blending traditional techniques with modern approaches",
            "knowsAbout": ["Contemporary Art", "Oil Painting", "Digital Art", "Mixed Media"]
          })}
        </script>
      </head>
      <body className={`font-inter antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={false}>
          <Navbar />
          <div className="flex-1 relative z-0 w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
