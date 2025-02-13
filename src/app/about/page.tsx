'use client'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { getRecentArtworks } from '@/data/artworks'
import PhotoGallery from '@/components/PhotoGallery'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { publications, soloExhibitions, groupExhibitions, timelineEvents } from '@/data/about-data'

function ImageWithHover({ src, alt, priority = false }) {
  return (
    <div className="relative w-full max-w-md h-72 sm:h-96 rounded-xl overflow-hidden group shadow-">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 transition-colors duration-700 ease-in-out group-hover:bg-black/50" />
    </div>
  )
}

function TimelineItem({ year, text, detail }) {
  return (
    <div className="relative">
      <span className="absolute -left-4 top-1.5 block w-3 h-3 rounded-full bg-accent border-2 border-accent/50" aria-hidden="true" />
      <div>
        <h3 className="text-lg font-semibold text-accent font-playfair">{year}</h3>
        <p className="text-foreground/90 mb-2">{text}</p>
        <p className="text-sm text-foreground/80 leading-relaxed">{detail}</p>
      </div>
    </div>
  )
}

function ExhibitionCard({ title, exhibitions }) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground font-playfair">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {exhibitions.map((ex, index) => (
          <div key={index} className="border-l-2 border-accent/20 pl-4 py-1">
            <div className="flex flex-col gap-2">
              <div>
                <span className="text-accent font-medium font-playfair">{ex.year}</span>
                <span className="mx-2">–</span>
                <span>{ex.title}</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                A significant exhibition showcasing works exploring cultural identity and contemporary expression.
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function CTAButtons({ centered = false }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${centered ? 'items-center sm:justify-center' : 'items-stretch sm:items-start'}`}>
      <Button asChild variant="default" className="btn-primary">
        <Link href="/gallery">View Gallery</Link>
      </Button>
      <Button asChild variant="outline" className="btn-secondary">
        <Link href="/contact">Commission Art</Link>
      </Button>
    </div>
  )
}

export default function About() {
  const { ref: bioRef, inView: bioInView } = useInView({ triggerOnce: true })
  const { ref: timelineRef, inView: timelineInView } = useInView({ triggerOnce: true })
  const { ref: publicationsRef, inView: publicationsInView } = useInView({ triggerOnce: true })
  const { ref: exhibitionsRef, inView: exhibitionsInView } = useInView({ triggerOnce: true })
  const { ref: galleryRef, inView: galleryInView } = useInView({ triggerOnce: true })

  // Get recent works from the centralized data
  const recentWorks = getRecentArtworks(2)
  const photos = recentWorks.map((art) => ({
    src: art.image,
    width: art.width || 3,
    height: art.height || 4,
    title: art.title || "",
    size: art.size || "",
    description: art.description || "",
    year: art.year || "",
  }))
  
  return (
    <main className="px-4 md:px-8 text-foreground pb-24 space-y-8">
      {/* Hero / Top Section */}
      <section className="relative overflow-hidden pb-6 pt-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          {/* Artist Image with Hover Effect */}
          <ImageWithHover src="/Dara.jpg" alt="Portrait of Dara Gallopin" priority />
          
          {/* Intro Text + Call to Action */}
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl md:text-6xl sm:text-left text-center font-playfair font-bold leading-tight">
              About <span className="text-accent">Dara Gallopin</span>
            </h1>
            <p className="text-lg sm:text-left text-center leading-relaxed tracking-wide text-foreground/90">
              A Swiss-Iranian artist whose work transcends cultural boundaries and traditional mediums,
              creating a unique dialogue between heritage and contemporary expression.
            </p>
            <CTAButtons />
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <Card
        ref={bioRef}
        className={`max-w-7xl mx-auto transition-all duration-700 transform ${
          bioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <CardHeader>
          <CardTitle className="text-3xl font-playfair font-bold text-accent">
            Biography
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] rounded-md">
            <div className="space-y-6 text-foreground leading-relaxed pr-4">
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
              <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/90">
                &ldquo;I&rsquo;m like a scuba diver who dives into the abyss of my subconscious... Life only has value if shared. Art is about relationships, multi-layered... My art is open to all.&rdquo;
              </blockquote>
              <p>
                His forward-moving practice envisions a future that is both expansive and inclusive, unifying elements from minimalism, digital technology, and figurative painting. Consistent with an ethos of continual progression and learning, Gallopin’s process remains “democratic” and open—a testament to art’s power to unify rather than discriminate.
              </p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Key Events & Education Timeline */}
      <section
        ref={timelineRef}
        className={`max-w-7xl mx-auto py-10 rounded-xl border border-border/20 bg-card/95 backdrop-blur-sm transition-all duration-700 transform ${
          timelineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl font-playfair font-bold text-accent mb-6 px-4">
          Key Events & Education
        </h2>
        <div className="relative border-l border-accent/40 pl-6 space-y-6 text-foreground/90 px-4">
          {timelineEvents.map((event, idx) => (
            <TimelineItem key={idx} {...event} />
          ))}
        </div>
      </section>

      {/* Publications */}
      <section
        ref={publicationsRef}
        className={`max-w-7xl mx-auto py-10 rounded-xl border border-border/20 bg-card/95 backdrop-blur-sm transition-all duration-700 transform ${
          publicationsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl font-playfair font-bold text-accent mb-6 px-4">
          Publications
        </h2>
        <div className="space-y-6 text-foreground/90 px-4">
          {publications.map((pub, index) => (
            <div key={index}>
              <h3 className="font-semibold text-accent">{pub.year}</h3>
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
      <Card
        ref={exhibitionsRef}
        className={`max-w-7xl mx-auto transition-all duration-700 transform ${
          exhibitionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <CardHeader>
          <CardTitle className="text-3xl font-playfair font-bold text-accent">
            Exhibitions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ExhibitionCard title="Solo Exhibitions" exhibitions={soloExhibitions} />
            <ExhibitionCard title="Group Exhibitions" exhibitions={groupExhibitions} />
          </div>
        </CardContent>
      </Card>

      {/* Recent Works / Gallery Preview */}
      <section 
        ref={galleryRef}
        className={`max-w-7xl mx-auto py-10 rounded-xl border border-border/20 bg-card/95 backdrop-blur-sm transition-all duration-700 transform ${
          galleryInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl font-playfair font-bold text-accent mb-6 px-4">
          Recent Works
        </h2>
        <div className="px-4">
          <PhotoGallery 
            photos={photos}
            isLoading={false}
            columns={(containerWidth) => {
              if (containerWidth < 640) return 1;
              return 2;
            }}
          />
        </div>
        <div className="mt-8 flex justify-center px-4">
          <CTAButtons centered />
        </div>
      </section>
    </main>
  )
}
