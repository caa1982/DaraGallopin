'use client'
import { useState, useEffect } from 'react'
import { MasonryPhotoAlbum } from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import Captions from "yet-another-react-lightbox/plugins/captions";
import 'yet-another-react-lightbox/styles.css'
import "yet-another-react-lightbox/plugins/captions.css";

import LoadingSpinner from '@/components/LoadingSpinner'
import Image from 'next/image'
import { getArtworks } from '@/data/artworks'
import 'react-photo-album/masonry.css'

function renderNextImage(
  { alt = '', title = '', sizes }: { alt?: string; title?: string; sizes?: string },
  { photo, width, height }: { photo: { src: string; title?: string; description?: string; year?: string }; width: number; height: number }
) {
  return (
    <div className="group relative w-full overflow-hidden rounded-lg shadow-lg">
      <div style={{ aspectRatio: `${width} / ${height}` }} className="relative">
        <Image
          fill
          src={photo.src}
          alt={alt || 'Artwork'}
          title={title}
          sizes={sizes}
          className="transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-4 text-white w-full bg-black/60 rounded-b-lg">
          {photo.title && <h2 className="font-semibold">{photo.title}</h2>}
          {photo.description && <p className="text-sm">{photo.description}</p>}
          {photo.year && <p className="text-xs text-gray-200 mt-1">{photo.year}</p>}
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(true)

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Build the list of photos
  const allArtworks = getArtworks()
  const photos = allArtworks.map((artwork) => ({
    src: artwork.image,
    width: artwork.width || 3,
    height: artwork.height || 4,
    alt: artwork.title || '',
    title: artwork.title || '',
    description: artwork.description || '',
    year: artwork.year || '',
  }))

  // Slides for Lightbox
  const slides = photos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    title: photo.title,
    description: photo.description,
  }))

  return (
    <section className="max-w-7xl mx-auto min-h-screen pt-24 pb-20 px-4">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <MasonryPhotoAlbum
            columns={(containerWidth) => {
              if (containerWidth < 500) return 1
              if (containerWidth < 900) return 2
              return 3
            }}
            photos={photos}
            spacing={16}
            render={{ image: renderNextImage }}
            onClick={({ index }) => {
              setCurrentIndex(index)
              setLightboxOpen(true)
            }}
          />

          <Lightbox
            plugins={[Captions]}
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={slides}
            index={currentIndex}
          />
        </>
      )}
    </section>
  )
}
