'use client'
import { useState, KeyboardEvent, useEffect } from 'react'
import ImageWithFallback from './ImageWithFallback'

interface ArtworkCardProps {
  title: string
  image: string
  category: string
  description: string
}

export default function ArtworkCard({
  title,
  image,
  category,
  description
}: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsFocused(true)
    }
    if (e.key === 'Escape') {
      setIsFocused(false)
    }
  }

  return (
    <div
      className="group relative rounded-lg overflow-hidden h-auto aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details of ${title}`}
    >
      <div className="relative w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}

        <ImageWithFallback
          src={image}
          alt={title}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="!relative !h-full !w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onLoadingComplete={() => setIsLoading(false)}
          quality={90}
        />

        <div
          className={`
            absolute inset-0 
            backdrop-blur-sm bg-black/50
            flex flex-col items-center justify-center
            transition-all duration-300 ease-out p-4 sm:p-6
            ${isHovered || isFocused ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className={`
            w-full max-w-sm
            transition-all duration-300 transform
            ${isHovered || isFocused ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
              {title}
            </h3>
            <div className="bg-primary_accent/20 text-primary_accent rounded-full px-2 py-1 sm:px-3 sm:py-1 text-sm font-medium inline-block mb-2 sm:mb-4">
              {category}
            </div>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-none">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
