"use client";

import { useEffect, useState, Fragment, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { shuffle } from "lodash";
import { Button } from "@/components/ui/button";
import { getArtworks } from "@/data/artworks";
import PhotoGallery from "@/components/PhotoGallery";
import "animate.css";
import { Buffer } from "buffer"; // Required for the blur placeholder

// Define interfaces for your artwork and photo objects
interface Artwork {
  image: string;
  width?: number;
  height?: number;
  title?: string;
  size?: string;
  description?: string;
  year?: string;
}

interface Photo {
  src: string;
  width: number;
  height: number;
  title: string;
  size: string;
  description: string;
  year: string;
}

// Rotating Quotes
const artistQuotes: string[] = [
  "Art should be like the stars that delight everyone, from a child to an astrophysicist",
  "I'm like a scuba diver who dives into the abyss of my subconscious, bringing up pearls to share with the world",
  "Life only has value if shared. If not, it's just like a dream",
  "Art is about relationships, multi-layered",
];

export default function Home(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentQuote, setCurrentQuote] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // Simulate a brief loading period
    const timer = window.setTimeout(() => setIsLoading(false), 1000);

    // Parallax scroll effect for the background
    const handleScroll = (): void => {
      const scrolled = window.scrollY;
      const parallaxElement = document.querySelector(
        ".parallax-bg"
      ) as HTMLElement | null;
      if (parallaxElement) {
        parallaxElement.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    // Mouse move effect for slight rotation of the background
    const handleMouseMove = (e: MouseEvent): void => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    // Rotate the artist quotes every 5 seconds
    const quoteInterval = window.setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % artistQuotes.length);
    }, 5000);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    setIsVisible(true);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(quoteInterval);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Prepare Featured Artworks and map them to Photo objects
  const photos: Photo[] = useMemo(() => {
    const featuredWorks: Artwork[] = shuffle(getArtworks()).slice(0, 3);
    return featuredWorks.map((artwork) => ({
      src: artwork.image,
      width: artwork.width ?? 800,
      height: artwork.height ?? 600,
      title: artwork.title ?? "",
      size: artwork.size ?? "",
      description: artwork.description ?? "",
      year: artwork.year ?? "",
    }));
  }, []);

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
            className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95 backdrop-blur-sm z-10"
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
              <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-brand" />
              <h1 className="relative text-6xl sm:text-7xl md:text-8xl font-bold heading-gradient leading-tight">
                Dara Gallopin
              </h1>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-accent to-transparent" />
              <p className="text-accent tracking-[0.3em] font-medium text-sm sm:text-base">
                INTERDISCIPLINARY ARTIST
              </p>
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <p
              className={`text-2xl sm:text-3xl text-foreground/90 font-light mb-12 animate__animated ${
                isVisible ? "animate__fadeInUp animate__delay-1s" : ""
              }`}
            >
              <span className="text-foreground/90">Swiss-Iranian Artist</span>
              <span className="text-accent mx-3">•</span>
              <span className="text-foreground/90">Global Explorer</span>
              <span className="text-accent mx-3">•</span>
              <span className="text-foreground/90">Visual Storyteller</span>
            </p>
            <div className="h-[120px] flex items-center justify-center backdrop-blur-sm rounded-lg">
              <p
                className={`text-xl sm:text-2xl text-foreground/90 italic max-w-2xl mx-auto px-6 transition-all duration-500 font-light animate__animated ${
                  isVisible ? "animate__fadeIn animate__delay-2s" : ""
                }`}
              >
                &quot;{artistQuotes[currentQuote]}&quot;
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 animate__animated animate__fadeInUp animate__delay-3s">
            <Button asChild size="lg" className="w-full sm:w-auto btn-primary">
              <Link href="/gallery">Explore Gallery</Link>
            </Button>
            <Button asChild size="lg" className="w-full sm:w-auto btn-secondary">
              <Link href="/about">About the Artist</Link>
            </Button>
          </div>

          <div className="mt-16 animate__animated animate__fadeIn animate__delay-2s">
            <div className="inline-flex flex-wrap justify-center gap-4 text-muted-foreground text-base tracking-wider bg-card/30 backdrop-blur-sm px-8 py-3 rounded-full">
              {["Geneva", "Beijing", "New York", "Bali"].map((location, index) => (
                <Fragment key={location}>
                  <span className="hover:text-accent transition-colors cursor-default">
                    {location}
                  </span>
                  {index < 3 && <span className="text-accent">•</span>}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
          <div className="w-[2px] h-16 bg-gradient-to-b from-accent to-transparent" />
          <div className="w-4 h-4 absolute -bottom-2 left-1/2 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-accent/50" />
        </div>
      </header>

      {/* FEATURED WORKS SECTION */}
      <main className="max-w-7xl mx-auto text-center mb-12 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-accent mb-6">Featured Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover a selection of my most impactful pieces, each telling its own unique story
          </p>
        </div>

        <PhotoGallery photos={photos} isLoading={isLoading} />

        <div className="mt-12 text-center">
          <Button asChild className="btn-secondary group">
            <Link href="/gallery" className="flex items-center">
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
          </Button>
        </div>
      </main>
    </div>
  );
}
