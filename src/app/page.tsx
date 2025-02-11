"use client";

import { useEffect, useState, Fragment, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { shuffle } from "lodash";

// External Libraries
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

// Components & Data
import LoadingSpinner from "@/components/LoadingSpinner";
import { getArtworks } from "@/data/artworks";

// Rotating Quotes
const artistQuotes = [
  "Art should be like the stars that delight everyone, from a child to an astrophysicist",
  "I'm like a scuba diver who dives into the abyss of my subconscious, bringing up pearls to share with the world",
  "Life only has value if shared. If not, it's just like a dream",
  "Art is about relationships, multi-layered",
];

function renderNextImage(
  { alt = "", title = "", sizes }: { alt?: string; title?: string; sizes?: string },
  { photo, width, height }: { photo: { src: string; title?: string; description?: string; size?: string; year?: string }; width: number; height: number }
) {
  return (
    <div className="group relative w-full overflow-hidden rounded-lg shadow-lg">
      <div style={{ aspectRatio: `${width} / ${height}` }} className="relative">
        <Image
          fill
          src={photo.src}
          alt={alt || "Artwork"}
          title={title}
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          quality={85}
          loading="lazy"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
            '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="100%" height="100%" fill="#1a1a1a"/></svg>'
          ).toString("base64")}`}
          className="transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-4 text-white w-full bg-black/70 rounded-b-lg">
          {photo.title && <h2 className="font-semibold">{photo.title}</h2>}
          {photo.description && <h3 className="text-sm">{photo.description}</h3>}
          {photo.size && <h4 className="text-xs text-gray-200 mt-1">{photo.size}</h4>}
          {photo.year && <p className="text-xs text-gray-200 mt-1">{photo.year}</p>}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Simulate a brief loading period
    const timer = setTimeout(() => setIsLoading(false), 1000);

    // Parallax scroll effect for the background
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElement = document.querySelector(".parallax-bg");
      if (parallaxElement) {
        (parallaxElement as HTMLElement).style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    // Mouse move effect for slight rotation of the background
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    // Rotate the artist quotes every 5 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % artistQuotes.length);
    }, 5000);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    setIsVisible(true);

    return () => {
      clearTimeout(timer);
      clearInterval(quoteInterval);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Prepare Featured Artworks and Photos
  const featuredWorks = useMemo(() => shuffle(getArtworks()).slice(0, 3), []);

  const photos = featuredWorks.map((art: { image: string; width?: number; height?: number; title?: string; description?: string; size?: string; year?: string }) => ({
    src: art.image,
    width: art.width || 0,
    height: art.height || 0,
    title: art.title || "",
    size: art.size || "",
    description: art.description || "",
    year: art.year || "",
  }));

  interface Photo {
    src: string;
    width: number;
    height: number;
    title?: string;
    size?: string;
    description?: string;
    year?: string;
  }

  interface Slide {
    src: string;
    alt?: string;
    title?: string;
    description?: string;
  }

  const slides: Slide[] = photos.map((photo: Photo) => ({
    src: photo.src,
    alt: photo.title,
    title: photo.title,
    description: photo.description + ' - ' + photo.size,
  }));

  return (
    <div className="pt-16">
      {/* HERO SECTION */}
      <header className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 z-0 parallax-bg transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) translateZ(0)`,
          }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/80 to-primary/95 backdrop-blur-sm z-10"
            style={{ transform: "scale(1.2)" }}
          />
          <Image
            src="/Second_chance.jpg"
            alt="Hero Background"
            fill
            priority
            quality={90}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
              '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="100%" height="100%" fill="#1a1a1a"/></svg>'
            ).toString("base64")}`}
            className="object-cover scale-125 transform transition-transform duration-300"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
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

          <div className="max-w-3xl mx-auto mb-16">
            <p
              className={`text-2xl sm:text-3xl text-text font-light mb-12 animate__animated ${
                isVisible ? "animate__fadeInUp animate__delay-1s" : ""
              }`}
            >
              <span className="opacity-90">Swiss-Iranian Artist</span>
              <span className="text-secondary_accent mx-3">•</span>
              <span className="opacity-90">Global Explorer</span>
              <span className="text-secondary_accent mx-3">•</span>
              <span className="opacity-90">Visual Storyteller</span>
            </p>
            <div className="h-[120px] flex items-center justify-center backdrop-blur-sm rounded-lg">
              <p
                className={`text-xl sm:text-2xl text-text/90 italic max-w-2xl mx-auto px-6 transition-all duration-500 font-light animate__animated ${
                  isVisible ? "animate__fadeIn animate__delay-2s" : ""
                }`}
              >
                &quot;{artistQuotes[currentQuote]}&quot;
              </p>
            </div>
          </div>

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
              className="group relative px-12 py-4 border-2 border-text text-text rounded-full hover:border-primary_accent transition-all hover:scale-105 font-semibold w-full sm:w-auto tracking-wide text-lg overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-primary_accent transition-colors">
                About the Artist
              </span>
              <div className="absolute inset-0 bg-text/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
          </div>

          <div className="mt-16 animate__animated animate__fadeIn animate__delay-2s">
            <div className="inline-flex flex-wrap justify-center gap-4 text-text/70 text-base tracking-wider backdrop-blur-sm px-8 py-3 rounded-full">
              {["Geneva", "Beijing", "New York", "Bali"].map((location, index) => (
                <Fragment key={location}>
                  <span className="hover:text-secondary_accent transition-colors cursor-default">
                    {location}
                  </span>
                  {index < 3 && <span className="text-secondary_accent">•</span>}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
          <div className="w-[2px] h-16 bg-gradient-to-b from-secondary_accent to-transparent shadow-glow" />
          <div className="w-4 h-4 absolute -bottom-2 left-1/2 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-secondary_accent/50" />
        </div>
      </header>

      {/* FEATURED WORKS SECTION */}
      <main className="max-w-7xl mx-auto text-center mb-12 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary/95">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-secondary_accent-light mb-6">
            Featured Works
          </h2>
          <p className="text-text/80 max-w-2xl mx-auto text-lg">
            Discover a selection of my most impactful pieces, each telling its own unique story
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <ColumnsPhotoAlbum
              columns={(containerWidth) => {
                if (containerWidth < 500) return 1;
                if (containerWidth < 900) return 2;
                return 3;
              }}
              photos={photos}
              spacing={16}
              render={{ image: renderNextImage }}
              onClick={({ index }) => {
                setCurrentIndex(index);
                setLightboxOpen(true);
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

        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center px-8 py-3 bg-primary_accent/10 hover:bg-primary_accent/20 text-primary_accent hover:text-primary_accent-dark rounded-full transition-all duration-300 group"
          >
            Explore All Works
            <svg
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
