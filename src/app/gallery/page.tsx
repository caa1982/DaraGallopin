'use client'
import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import ArtworkCard from '@/components/ArtworkCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import Modal from '@/components/Lightbox'
import Image from 'next/image'
import { categories, getArtworksByCategory } from '@/data/artworks'

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isLoading, setIsLoading] = useState(true)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [openImage, setOpenImage] = useState<string | null>(null)
  const filterRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        {
          const nextIndex = index === categories.length - 1 ? 0 : index + 1
          filterRefs.current[nextIndex]?.focus()
        }
        break
      case 'ArrowLeft':
        e.preventDefault()
        {
          const prevIndex = index === 0 ? categories.length - 1 : index - 1
          filterRefs.current[prevIndex]?.focus()
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        handleFilterChange(categories[index])
        break
    }
  }

  const filteredArtworks = getArtworksByCategory(selectedCategory)

  return (
    <section className="bg-background min-h-screen w-full pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-12">
        {/* Gallery Header */}
        <h1 className="text-4xl font-bold mb-2 text-text">Gallery</h1>
        <p className="text-text/70 mb-6">Explore a selection of my works below.</p>

        {/* Category Filters */}
        <div
          className="flex flex-wrap gap-4"
          role="tablist"
          aria-label="Filter artworks by category"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              ref={el => { filterRefs.current[index] = el }}
              onClick={() => handleFilterChange(category)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                outline-none focus:outline-none 
                ${selectedCategory === category 
                  ? 'bg-primary_accent text-text' 
                  : 'bg-primary_accent/10 text-text hover:bg-primary_accent/20'}
                ${focusedIndex === index 
                  ? 'ring-2 ring-primary_accent ring-offset-2 ring-offset-background' 
                  : ''}
              `}
              role="tab"
              aria-selected={selectedCategory === category}
              aria-controls="gallery-grid"
              tabIndex={selectedCategory === category ? 0 : -1}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          role="region"
          aria-label="Gallery artworks"
          id="gallery-grid"
        >
          {filteredArtworks.map((artwork, index) => (
            <div
              key={artwork.title}
              className={`
                group relative bg-primary_accent/10 
                rounded-lg overflow-hidden transition-all duration-300 
                aspect-auto animate__animated animate__fadeIn 
                hover:shadow-lg hover:shadow-primary_accent/30 hover:scale-[1.02]
                cursor-pointer
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
              tabIndex={0}
              role="article"
              aria-label={`${artwork.title} - ${artwork.category}`}
              onClick={() => setOpenImage(artwork.image)}
            >
              <div className="relative w-full h-auto min-h-[300px]">
                <ArtworkCard {...artwork} />
              </div>
            </div>
          ))}

          {!isLoading && filteredArtworks.length === 0 && (
            <div className="animate__animated animate__fadeIn text-center text-text/60 mt-8 col-span-full">
              No artworks found in this category.
            </div>
          )}
        </div>
      )}

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
    </section>
  )
}

