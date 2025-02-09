"use client"

import { useEffect, useState, Fragment } from 'react'
import Image from 'next/image'
import ArtworkCard from '@/components/ArtworkCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import Link from 'next/link'
import Modal from '@/components/Lightbox'
import { getFeaturedArtworks } from '@/data/artworks'

const artistQuotes = [
  "Art should be like the stars that delight everyone, from a child to an astrophysicist",
  "I'm like a scuba diver who dives into the abyss of my subconscious, bringing up pearls to share with the world",
  "Life only has value if shared. If not, it's just like a dream",
  "Art is about relationships, multi-layered"
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [openImage, setOpenImage] = useState<string | null>(null)
  
  // Get featured artworks from the centralized data
  const featuredWorks = getFeaturedArtworks()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    const handleScroll = () => {
      const scrolled = window.scrollY
      const parallaxElement = document.querySelector('.parallax-bg') as HTMLElement
      if (parallaxElement) {
        parallaxElement.style.transform = `translateY(${scrolled * 0.3}px)`
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % artistQuotes.length)
    }, 5000)

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    setIsVisible(true)

    return () => {
      clearTimeout(timer)
      clearInterval(quoteInterval)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="pt-16">
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background with Mouse Movement Effect */}
        <div 
          className="absolute inset-0 z-0 parallax-bg transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) translateZ(0)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/80 to-primary/95 backdrop-blur-sm z-10" 
               style={{ transform: 'scale(1.2)' }} />
          <Image
            src="/Second_chance.jpg"
            alt="Hero Background"
            fill
            className="object-cover scale-125 transform transition-transform duration-300"
            priority
            quality={100}
          />
        </div>
        
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Artist Name and Title with Refined Animation */}
          <div className="space-y-6 mb-12 animate__animated animate__fadeInDown">
            <div className="inline-block relative">
              <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-r from-secondary_accent via-text to-secondary_accent" />
              <h1 className="relative text-6xl sm:text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-text via-secondary_accent to-text leading-tight">
                Dara Gallopin
              </h1>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-secondary_accent to-transparent" />
              <p className="text-secondary_accent-light tracking-[0.3em] font-medium text-sm sm:text-base">
                INTERDISCIPLINARY ARTIST
              </p>
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-secondary_accent to-transparent" />
            </div>
          </div>
          
          {/* Artist Description */}
          <div className="max-w-3xl mx-auto mb-16">
            <p className={`text-2xl sm:text-3xl text-text font-light mb-12 animate__animated ${
              isVisible ? 'animate__fadeInUp animate__delay-1s' : ''
            }`}>
              <span className="opacity-90">Swiss-Iranian Artist</span>
              <span className="text-secondary_accent mx-3">•</span>
              <span className="opacity-90">Global Explorer</span>
              <span className="text-secondary_accent mx-3">•</span>
              <span className="opacity-90">Visual Storyteller</span>
            </p>
            <div className="h-[120px] flex items-center justify-center backdrop-blur-sm bg-primary/20 rounded-lg">
              <p className={`text-xl sm:text-2xl text-text/90 italic max-w-2xl mx-auto px-6 transition-all duration-500 font-light animate__animated ${
                isVisible ? 'animate__fadeIn animate__delay-2s' : ''
              }`}>
                "{artistQuotes[currentQuote]}"
              </p>
            </div>
          </div>

          {/* Call to Action Buttons with Enhanced Design */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 animate__animated animate__fadeInUp animate__delay-3s">
            <Link 
              href="/gallery" 
              className="group relative px-12 py-4 bg-gradient-to-r from-primary_accent to-primary_accent/90 text-primary rounded-full hover:shadow-lg hover:shadow-primary_accent/20 transition-all hover:scale-105 font-semibold w-full sm:w-auto tracking-wide text-lg overflow-hidden"
            >
              <span className="relative z-10">Explore Gallery</span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
            <Link 
              href="/about" 
              className="group relative px-12 py-4 border-2 border-text text-text rounded-full hover:border-secondary_accent transition-all hover:scale-105 font-semibold w-full sm:w-auto tracking-wide text-lg overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-secondary_accent transition-colors">About the Artist</span>
              <div className="absolute inset-0 bg-text/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
          </div>

          {/* Locations with Enhanced Visual Effect */}
          <div className="mt-16 animate__animated animate__fadeIn animate__delay-2s">
            <div className="inline-flex flex-wrap justify-center gap-4 text-text/70 text-base tracking-wider backdrop-blur-sm bg-primary/20 px-8 py-3 rounded-full">
              {['Geneva', 'Beijing', 'New York', 'Bali'].map((location, index) => (
                <Fragment key={location}>
                  <span className="hover:text-secondary_accent transition-colors cursor-default">{location}</span>
                  {index < 3 && <span className="text-secondary_accent">•</span>}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
          <div className="w-[2px] h-16 bg-gradient-to-b from-secondary_accent to-transparent shadow-glow" />
          <div className="w-4 h-4 absolute -bottom-2 left-1/2 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-secondary_accent/50" />
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary/95">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 animate__animated ${
            isVisible ? 'animate__fadeInUp' : ''
          }`}>
            <h2 className="text-4xl font-bold text-secondary_accent-light mb-6">
              Featured Works
            </h2>
            <p className="text-text/80 max-w-2xl mx-auto text-lg">
              Discover a selection of my most impactful pieces, each telling its own unique story
            </p>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredWorks.map((work, index) => (
                <div
                  key={work.title}
                  className={`animate__animated ${isVisible ? 'animate__fadeInUp' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={() => setOpenImage(work.image)}
                >
                  <div className="block transform transition-all duration-500">
                    <ArtworkCard {...work} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link 
              href="/gallery"
              className="inline-flex items-center px-8 py-3 bg-primary_accent/10 hover:bg-secondary_accent/20 text-primary_accent hover:text-secondary_accent rounded-full transition-all duration-300 group"
            >
              Explore All Works
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Add the Lightbox Modal */}
      <Modal isOpen={!!openImage} onClose={() => setOpenImage(null)}>
        {openImage && (
          <div className="relative">
            <Image
              src={openImage}
              alt="Fullscreen artwork"
              width={1200}
              height={800}
              className="w-full h-auto rounded"
            />
          </div>
        )}
      </Modal>
    </div>
  )
}
