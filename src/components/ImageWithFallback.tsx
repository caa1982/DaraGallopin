'use client'
import Image from 'next/image'
import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  onLoadingComplete?: () => void
  priority?: boolean
  sizes?: string
  quality?: number
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  onLoadingComplete,
  priority = false,
  sizes = '100vw',
  quality = 85
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => {
    setIsLoading(false)
    onLoadingComplete?.()
  }

  return (
    <>
      {error ? (
        <div className="flex items-center justify-center w-full h-full bg-jewel-persian/10 text-jewel-ivory/60">
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-jewel-persian/20 animate-pulse" />
          )}
          <div className={`relative h-full w-full ${className}`}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              quality={quality}
              priority={priority}
              className="object-contain"
              onError={() => setError(true)}
              onLoad={handleLoad}
              style={{ maxHeight: '100%', width: '100%' }}
            />
          </div>
        </>
      )}
    </>
  )
}