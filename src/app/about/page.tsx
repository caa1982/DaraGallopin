'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import Modal from '@/components/Lightbox'
import { useState } from 'react'
import { getRecentArtworks } from '@/data/artworks'

export default function About() {
  const [openImage, setOpenImage] = useState<string | null>(null)
  const { ref: bioRef, inView: bioInView } = useInView({ triggerOnce: true })
  const { ref: timelineRef, inView: timelineInView } = useInView({ triggerOnce: true })
  const { ref: publicationsRef, inView: publicationsInView } = useInView({ triggerOnce: true })
  const { ref: exhibitionsRef, inView: exhibitionsInView } = useInView({ triggerOnce: true })
  const { ref: galleryRef, inView: galleryInView } = useInView({ triggerOnce: true })

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
  ];

  const soloExhibitions = [
    { year: '2019', title: "Orpheo's Art, Geneva, Switzerland" },
    { year: '2011', title: 'Gallery Yabo-Yiyuan, Beijing, China' },
    { year: '2007', title: 'Galeria IDA, Madrid, Spain' }
  ];

  const groupExhibitions = [
    { year: '2015', title: 'Galerie Frank Pages, Accrochages, April, Geneva, Switzerland' },
    { year: '2015', title: 'ART15, London, England' },
    { year: '2015', title: 'Contemporary Istanbul, Istanbul, Turkey' },
    { year: '2015', title: "Art Dubai, Gallery Dastan's Basement, March, Dubai, U.A.E" },
    { year: '2015', title: 'Galerie Tournemine, February, Gstaad, Switzerland' },
    { year: '2014', title: 'MAMCO, Launch of Tribu Magazine, July, Geneva, Switzerland' },
    { year: '2013', title: 'Scope Miami, December, Miami, U.S.A' }
  ];

  // Get recent works from the centralized data
  const recentWorks = getRecentArtworks(2)

  return (
    <main className="px-2 w-full text-text pb-24">
      <div className="w-full h-full">
        {/* Hero / Top Section */}
        <section className="relative w-full overflow-hidden pb-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 flex flex-col lg:flex-row items-center gap-8">
            {/* Artist Image with Hover */}
            <div className="relative w-full max-w-md h-96 rounded-xl overflow-hidden group shadow-xl">
              <Image
                src="/Dara.jpg"
                alt="Portrait of Dara Gallopin"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/50" />
              <div className="absolute bottom-4 left-4 right-4 text-text">
                <blockquote className="text-lg italic font-light">
                  &ldquo;Through my art, I explore the intersection of cultural identity, technology, and tradition.&rdquo;
                </blockquote>
              </div>
            </div>
            
            {/* Intro Text + CTA */}
            <div className="flex-1 flex flex-col gap-6">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold leading-tight">
                About <span className="text-secondary_accent-light">Dara Gallopin</span>
              </h1>
              <p className="text-text/90 text-lg leading-relaxed tracking-wide">
                A Swiss-Iranian artist whose work transcends cultural boundaries and traditional mediums,
                creating a unique dialogue between heritage and contemporary expression.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link
                  href="/gallery"
                  className="px-6 py-3 bg-secondary_accent text-text rounded-full 
                            font-semibold text-lg hover:bg-secondary_accent-light transition-all
                            hover:shadow-lg hover:shadow-secondary_accent/30"
                >
                  View Gallery
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-transparent border-2 border-primary_accent
                            text-primary_accent rounded-full font-semibold text-lg
                            hover:bg-primary_accent hover:text-text transition-all
                            hover:shadow-md hover:shadow-primary_accent/30"
                >
                  Commission Art
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Biography */}
        <section
          ref={bioRef}
          className={`max-w-7xl mx-auto px-4 md:px-8 py-10 mb-8 rounded-xl 
                      border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-700 
                      ${bioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
                      hover:scale-[1.01]`}
        >
          <h2 className="text-3xl font-playfair font-bold text-secondary_accent mb-6">Biography</h2>
          <div className="space-y-6 text-white/90 leading-relaxed">
            <p>
              Dara Gallopin is an interdisciplinary artist of Swiss-Iranian heritage, 
              born in 1982 and raised in Geneva, Switzerland. He has spent his adult years 
              living in diverse locations across the globe, including England, China, New York, 
              and throughout Western Europe, and is currently based in Bali.
            </p>
            <p>
              This intercultural and nomadic life has imbued Gallopin with a deep appreciation 
              for diversity and a boundless approach to his practice. His multidisciplinary art 
              ranges from geometric abstract drawings influenced by his formal training at 
              L’Ecole Cantonale d’Art de Lausanne (where he earned his BFA) to sculptures such as 
              <em> Hoverboard (2009)</em> and <em>Never Give Up (2010)</em>, as well as more 
              recent figurative paintings.
            </p>
            <p>
              Each piece in his diverse body of work reflects narratives of multi-dimensional growth. 
              Gallopin’s cultural identity is that of a modern nomad, working indiscriminately with any 
              tools and technologies available, across diverse media and living across borders and languages.
            </p>
            <p>
              In works like the <em>Untitled (Triptych) 2020</em>, he references, subverts, and reimagines 
              his past pieces—explosive splashes from older drawings now “liquefied,” bridging 2D and 3D 
              processes. He integrates everything from plasticine models and bronze casts to 3D scanning, 
              painting, and digital manipulation, crafting a surreal-yet-dynamic composition that blurs 
              the line between fantasy, the virtual, and the human.
            </p>
            <blockquote className="border-l-4 border-secondary_accent pl-4 italic text-white/80">
              &ldquo;I&rsquo;m like a scuba diver who dives into the abyss of my subconscious... 
              Life only has value if shared. Art is about relationships, multi-layered...
              My art is open to all.&rdquo;
            </blockquote>
            <p>
              His forward-moving practice envisions a future that is both expansive and inclusive, 
              unifying elements from minimalism, digital technology, and figurative painting. Consistent 
              with an ethos of continual progression and learning, Gallopin’s process remains “democratic” 
              and open—a testament to art’s power to unify rather than discriminate.
            </p>
          </div>
        </section>

        {/* Key Events & Education */}
        <section
          ref={timelineRef}
          className={`max-w-7xl mx-auto px-4 md:px-8 py-10 mb-8 rounded-xl 
                      border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-700 
                      ${timelineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
                      hover:scale-[1.01]`}
        >
          <h2 className="text-3xl font-playfair font-bold text-secondary_accent mb-6">
            Key Events & Education
          </h2>
          <div className="relative border-l border-secondary_accent/40 pl-6 space-y-6 text-text/90">
            {/* Timeline items */}
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
                {/* Timeline bullet */}
                <span className="absolute -left-[15px] top-3 block w-2 h-2 rounded-full bg-secondary_accent border-2 border-accent" />
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
          className={`max-w-7xl mx-auto px-4 md:px-8 py-10 mb-8 rounded-xl 
                      border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-700 
                      ${publicationsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
                      hover:scale-[1.01]`}
        >
          <h2 className="text-3xl font-playfair font-bold text-secondary_accent mb-6">Publications</h2>
          <div className="space-y-6 text-text/90">
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
          className={`max-w-7xl mx-auto px-4 md:px-8 py-10 mb-8 rounded-xl 
                      border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-700 
                      ${exhibitionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
                      hover:scale-[1.01]`}
        >
          <h2 className="text-3xl font-playfair font-bold text-secondary_accent mb-6">Exhibitions</h2>
          {/* Split Solo/Group Exhibitions in columns on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          className={`max-w-7xl mx-auto px-4 md:px-8 py-10 rounded-xl 
                      border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-700 
                      ${galleryInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} 
                      hover:scale-[1.01]`}
        >
          <h2 className="text-3xl font-playfair font-bold text-secondary_accent mb-6">Recent Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentWorks.map((work, index) => (
              <div 
                key={index} 
                className="relative w-full h-64 rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => setOpenImage(work.image)}
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 backdrop-blur-sm bg-black/50 opacity-0 group-hover:opacity-100 
                              transition-all duration-300 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold text-white mb-2">{work.title}</h3>
                  {work.year && (
                    <span className="text-white/80 text-sm mb-1">{work.year}</span>
                  )}
                  <span className="text-white/80 text-sm">View Details</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gallery"
              className="px-8 py-3 bg-primary_accent text-text rounded-full 
                        hover:bg-primary_accent-light hover:shadow-lg hover:shadow-primary_accent/30 transition-all 
                        hover:scale-105 font-semibold tracking-wide text-lg"
            >
              View Full Gallery
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-secondary_accent text-secondary_accent rounded-full 
                        hover:bg-secondary_accent hover:text-text transition-all hover:scale-105 
                        font-semibold tracking-wide text-lg"
            >
              Commission Art
            </Link>
          </div>
        </section>
      </div>

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
    </main>
  )
}
