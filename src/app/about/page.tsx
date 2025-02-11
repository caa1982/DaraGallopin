'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { getRecentArtworks } from '@/data/artworks'
import { ColumnsPhotoAlbum } from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
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
        <div className="p-4 text-white w-full bg-black/40 rounded-b-lg">
          {photo.title && <h2 className="font-semibold">{photo.title}</h2>}
          {photo.description && <p className="text-sm">{photo.description}</p>}
          {photo.year && <p className="text-xs text-gray-200 mt-1">{photo.year}</p>}
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const { ref: bioRef, inView: bioInView } = useInView({ triggerOnce: true })
  const { ref: timelineRef, inView: timelineInView } = useInView({ triggerOnce: true })
  const { ref: publicationsRef, inView: publicationsInView } = useInView({ triggerOnce: true })
  const { ref: exhibitionsRef, inView: exhibitionsInView } = useInView({ triggerOnce: true })
  const { ref: galleryRef, inView: galleryInView } = useInView({ triggerOnce: true })

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Example data for "Publications" & "Exhibitions"
  const publications = [
    {
      year: '2012',
      details: ['Tribune Des Arts, June Issue']
    },
    {
      year: '2011',
      details: [
        'Aesthetica Magazine, June & July Issue No.41',
        'Art Takes Miami 2011 Issue'
      ]
    },
    {
      year: '2010',
      details: [
        'ArtPress, June Issue No.368',
        'ArtReview, May Issue',
        '24 Heures, Lausanne, Switzerland, Monday 19th of April'
      ]
    },
    {
      year: '2009',
      details: [
        "L'Invisible, Limited Edition, Artist's Edition",
        'NPIP, Limited Edition, Stockholm, Sweden'
      ]
    }
  ]

  const soloExhibitions = [
    { year: '2019', title: "Orpheo's Art, Geneva, Switzerland" },
    { year: '2011', title: 'Gallery Yabo-Yiyuan, Beijing, China' },
    { year: '2007', title: 'Galeria IDA, Madrid, Spain' }
  ]

  const groupExhibitions = [
    { year: '2015', title: 'Galerie Frank Pages, Accrochages, April, Geneva, Switzerland' },
    { year: '2015', title: 'ART15, London, England' },
    { year: '2015', title: 'Contemporary Istanbul, Istanbul, Turkey' },
    { year: '2015', title: "Art Dubai, Gallery Dastan's Basement, March, Dubai, U.A.E" },
    { year: '2015', title: 'Galerie Tournemine, February, Gstaad, Switzerland' },
    { year: '2014', title: 'MAMCO, Launch of Tribu Magazine, July, Geneva, Switzerland' },
    { year: '2013', title: 'Scope Miami, December, Miami, U.S.A' }
  ]

  // Get recent works from the centralized data
  const recentWorks = getRecentArtworks(2) // Increasing to 4 works for better grid layout
  const photos = recentWorks.map((art) => ({
    src: art.image,
    width: art.width || 3,
    height: art.height || 4,
    title: art.title || "",
    description: art.description || "",
    year: art.year || "",
  }))

  const slides = photos.map((photo) => ({
    src: photo.src,
    alt: photo.title,
    title: photo.title,
    description: photo.description,
  }))

  return (
    <main className="px-4 md:px-8 text-text pb-24">
      {/* Hero / Top Section */}
      <section className="relative overflow-hidden pb-10 pt-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          {/* Artist Image with Hover Effect */}
          <div className="relative w-full max-w-md h-72 sm:h-96 rounded-xl overflow-hidden group shadow-xl">
            <Image
              src="/Dara.jpg"
              alt="Portrait of Dara Gallopin"
              fill
              priority
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 transition-colors duration-700 ease-in-out group-hover:bg-black/50" />
            <div className="absolute bottom-4 left-4 right-4 text-text">
              <blockquote className="text-lg italic font-light">
                &ldquo;Through my art, I explore the intersection of cultural identity, technology, and tradition.&rdquo;
              </blockquote>
            </div>
          </div>
          
          {/* Intro Text + Call to Action */}
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl md:text-6xl sm:text-left text-center font-playfair font-bold leading-tight">
              About <span className="text-secondary_accent-light">Dara Gallopin</span>
            </h1>
            <p className="text-lg sm:text-left text-center leading-relaxed tracking-wide text-text/90">
              A Swiss-Iranian artist whose work transcends cultural boundaries and traditional mediums,
              creating a unique dialogue between heritage and contemporary expression.
            </p>
            <div className="flex flex-col items-center sm:flex-row gap-4 mt-4">
              <Link
                href="/gallery"
                className="w-3/4 sm:w-auto text-center px-6 py-3 bg-primary_accent text-text rounded-full font-semibold text-base md:text-lg hover:bg-primary_accent-light transition-all hover:shadow-lg hover:shadow-primary_accent/30 focus:outline-none focus:ring-2 focus:ring-primary_accent focus:ring-offset-2 active:scale-95"
              >
                View Gallery
              </Link>
              <Link
                href="/contact"
                className="w-3/4 sm:w-auto text-center px-6 py-3 bg-transparent border-2 border-primary_accent text-primary_accent rounded-full font-semibold text-base md:text-lg hover:bg-primary_accent hover:text-text transition-all hover:shadow-md hover:shadow-primary_accent/30 focus:outline-none focus:ring-2 focus:ring-primary_accent focus:ring-offset-2 active:scale-95"
              >
                Commission Art
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section
        ref={bioRef}
        className={`max-w-7xl mx-auto py-10 mb-8 rounded-xl border border-white/20 bg-primary-dark backdrop-blur-sm transition-all duration-700 transform ${
          bioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } hover:scale-105`}
      >
        <h2 className="text-3xl font-playfair font-bold text-secondary_accent mb-6 px-4">
          Biography
        </h2>
        <div className="space-y-6 text-white/90 leading-relaxed px-4">
          <p>
            Dara Gallopin is an interdisciplinary artist of Swiss-Iranian heritage, born in 1982 and raised in Geneva, Switzerland. He has spent his adult years living in diverse locations across the globe—including England, China, New York, and Western Europe—and is currently based in Bali.
          </p>
          <p>
            This intercultural and nomadic life has imbued Gallopin with a deep appreciation for diversity and a boundless approach to his practice. His multidisciplinary art ranges from geometric abstract drawings influenced by his formal training at L’Ecole Cantonale d’Art de Lausanne (BFA) to sculptures such as <em>Hoverboard (2009)</em> and <em>Never Give Up (2010)</em>, as well as more recent figurative paintings.
          </p>
          <p>
            Each piece in his diverse body of work reflects narratives of multi-dimensional growth. Gallopin’s cultural identity is that of a modern nomad—working indiscriminately with any tools and technologies available, across diverse media, and living across borders and languages.
          </p>
          <p>
            In works like <em>Untitled (Triptych) 2020</em>, he references, subverts, and reimagines his past pieces—explosive splashes from older drawings now “liquefied,” bridging 2D and 3D processes. By integrating techniques ranging from plasticine models and bronze casts to 3D scanning, painting, and digital manipulation, he crafts surreal yet dynamic compositions that blur the line between fantasy, the virtual, and the human.
          </p>
          <blockquote className="border-l-4 border-secondary_accent pl-4 italic text-white/80">
            &ldquo;I&rsquo;m like a scuba diver who dives into the abyss of my subconscious... Life only has value if shared. Art is about relationships, multi-layered... My art is open to all.&rdquo;
          </blockquote>
          <p>
            His forward-moving practice envisions a future that is both expansive and inclusive, unifying elements from minimalism, digital technology, and figurative painting. Consistent with an ethos of continual progression and learning, Gallopin’s process remains “democratic” and open—a testament to art’s power to unify rather than discriminate.
          </p>
        </div>
      </section>

      {/* Key Events & Education Timeline */}
      <section
        ref={timelineRef}
        className={`max-w-7xl mx-auto py-10 mb-8 rounded-xl border border-white/20 bg-primary-dark backdrop-blur-sm transition-all duration-700 transform ${
          timelineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } hover:scale-105`}
      >
        <h2 className="text-3xl font-playfair font-bold text-secondary_accent mb-6 px-4">
          Key Events & Education
        </h2>
        <div className="relative border-l border-secondary_accent/40 pl-6 space-y-6 text-text/90 px-4">
          {[
            { year: '1982', text: 'Born in Geneva, Switzerland' },
            { year: '1999-2001', text: 'Study in Cambridge, England' },
            { year: '2001-2002', text: 'Study in Oxford, England' },
            { year: '2003-2005', text: 'Study in Madrid, Spain' },
            { year: '2005-2006', text: 'Study at La Libera Accademia di Belle Arte (RUFA), Rome, Italy' },
            { year: '2009', text: 'BFA, ECAL, Lausanne, Switzerland' },
            { year: '2010', text: 'Work in Beijing, China' },
            { year: '2014', text: 'Work in New York, USA' },
            { year: '2015-2020', text: 'Work in Kiev, Ukraine' },
            { year: '2020-2022', text: 'Work in Switzerland' },
            { year: 'Now', text: 'Lives and works in Bali' },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <span className="absolute -left-4 top-1.5 block w-3 h-3 rounded-full bg-secondary_accent border-2 border-accent" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-semibold text-secondary_accent">{item.year}</h3>
                <p className="text-text/90">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section
        ref={publicationsRef}
        className={`max-w-7xl mx-auto py-10 mb-8 rounded-xl border border-white/20 bg-primary-dark backdrop-blur-sm transition-all duration-700 transform ${
          publicationsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } hover:scale-105`}
      >
        <h2 className="text-3xl font-playfair font-bold text-secondary_accent mb-6 px-4">
          Publications
        </h2>
        <div className="space-y-6 text-text/90 px-4">
          {publications.map((pub, index) => (
            <div key={index}>
              <h3 className="font-semibold text-secondary_accent">{pub.year}</h3>
              <ul className="list-disc list-inside ml-4">
                {pub.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Exhibitions */}
      <section
        ref={exhibitionsRef}
        className={`max-w-7xl mx-auto py-10 mb-8 rounded-xl border border-white/20 bg-primary-dark backdrop-blur-sm transition-all duration-700 transform ${
          exhibitionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } hover:scale-105`}
      >
        <h2 className="text-3xl font-playfair font-bold text-secondary_accent mb-6 px-4">
          Exhibitions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {/* Solo Exhibitions */}
          <div>
            <h3 className="text-2xl font-semibold text-text mb-4">Solo Exhibitions</h3>
            <div className="space-y-3 text-text/90">
              {soloExhibitions.map((ex, index) => (
                <div key={index}>
                  <span className="text-secondary_accent font-medium">{ex.year} – </span>
                  {ex.title}
                </div>
              ))}
            </div>
          </div>
          {/* Group Exhibitions */}
          <div>
            <h3 className="text-2xl font-semibold text-text mb-4">Group Exhibitions</h3>
            <div className="space-y-3 text-text/90">
              {groupExhibitions.map((ex, index) => (
                <div key={index}>
                  <span className="text-secondary_accent font-medium">{ex.year} – </span>
                  {ex.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Works / Gallery Preview */}
      <section 
        ref={galleryRef}
        className={`max-w-7xl mx-auto py-10 rounded-xl border border-white/20 bg-primary-dark backdrop-blur-sm transition-all duration-700 transform ${
          galleryInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } hover:scale-105`}
      >
        <h2 className="text-3xl font-playfair font-bold text-secondary_accent mb-6 px-4">
          Recent Works
        </h2>
        <div className="px-4">
          <ColumnsPhotoAlbum
            columns={(containerWidth) => {
              if (containerWidth < 500) return 1
              if (containerWidth < 900) return 2
              return 2
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
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={slides}
            index={currentIndex}
          />
        </div>
        <div className="mt-8 flex flex-col items-center sm:flex-row sm:items-center gap-4 justify-center max-w-md mx-auto px-4">
          <Link
            href="/gallery"
            className="
              w-full
              text-center
              sm:w-auto
              px-4 py-3
              bg-primary_accent
              text-text
              rounded-full
              hover:bg-primary_accent-light
              hover:shadow-lg hover:shadow-primary_accent/30
              transition-transform duration-300
              hover:scale-105
              active:scale-95
              focus:outline-none
              focus:ring-2
              focus:ring-primary_accent
              focus:ring-offset-2
              font-semibold
              tracking-wide
              text-base
              md:text-lg
            "
          >
            View Full Gallery
          </Link>

          <Link
            href="/contact"
            className="
              w-full
              text-center
              sm:w-auto
              px-4 py-3
              border-2 border-primary_accent
              text-primary_accent
              rounded-full
              hover:bg-primary_accent
              hover:text-text
              transition-transform duration-300
              hover:scale-105
              active:scale-95
              focus:outline-none
              focus:ring-2
              focus:ring-primary_accent
              focus:ring-offset-2
              font-semibold
              tracking-wide
              text-base
              md:text-lg
            "
          >
            Commission Art
          </Link>
        </div>
      </section>
    </main>
  )
}
