"use client";

import { useEffect, useState, useRef, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FeaturedWorks from "@/components/FeaturedWorks";
import "animate.css";
import { Buffer } from "buffer";

function useParallax() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frameId: number;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Adjust these multipliers to taste for stronger or subtler rotation
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    const animate = () => {
      if (ref.current) {
        // Compose your transform in a single pass
        const transformString = `
          perspective(1000px)
          rotateX(${mousePos.y * 0.02}deg)
          rotateY(${mousePos.x * 0.02}deg)
          translateY(${scrollY * 0.3}px)
        `;

        ref.current.style.transform = transformString;
      }
      // schedule next frame
      frameId = requestAnimationFrame(animate);
    };

    // Attach listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    // Kick off the animation loop
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [mousePos.x, mousePos.y, scrollY]);

  return ref;
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
  const featuredWorksRef = useRef<HTMLDivElement>(null);

  // Use our parallax hook for the background container
  const parallaxRef = useParallax();

  const scrollToFeaturedWorks = () => {
    if (featuredWorksRef.current) {
      const navbarHeight = 64; // typical navbar height in pixels
      const elementPosition = featuredWorksRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Simulate a brief loading period
    const timer = window.setTimeout(() => setIsLoading(false), 1000);
    
    // Rotate the artist quotes every 5 seconds
    const quoteInterval = window.setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % artistQuotes.length);
    }, 5000);

    // Fade in hero elements
    setIsVisible(true);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="pt-16">
      {/* HERO SECTION */}
      <header className="relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden px-4">
        {/* Parallax Background Container using our ref */}
        <div ref={parallaxRef} className="absolute inset-0 z-0 parallax-bg">
          {/* Optional overlay to soften or tint the background */}
          <div
            className="absolute inset-0 bg-gradient-to-b 
              from-background/95 via-background/80 to-background/95 
              backdrop-blur-sm dark:backdrop-blur-[2px] z-10"
            style={{ transform: "scale(1.1)" }}
          />
          {/* Your hero image */}
          <Image
            src="/Second_chance.jpg"
            alt="Hero Background"
            fill
            priority
            quality={90}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
              '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="100%" height="100%" fill="hsl(var(--background))"/></svg>'
            ).toString("base64")}`}
            className="object-cover object-center scale-110"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 animate__animated animate__fadeInDown">
            <div className="inline-block relative">
              <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-brand" />
              <h1 className="relative text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold heading-gradient leading-tight">
                Dara Gallopin
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <div className="h-[1px] w-6 sm:w-12 bg-gradient-to-r from-transparent via-accent to-transparent" />
              <p className="text-accent tracking-[0.15em] sm:tracking-[0.3em] font-medium text-sm sm:text-base">
                INTERDISCIPLINARY ARTIST
              </p>
              <div className="h-[1px] w-6 sm:w-12 bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            <p className={`text-lg sm:text-2xl lg:text-3xl text-foreground/90 font-light mb-6 sm:mb-8 animate__animated ${
              isVisible ? 'animate__fadeInUp animate__delay-1s' : ''
            }`}>
              <span className="text-foreground/90 block xs:inline">Swiss-Iranian Artist</span>
              <span className="text-accent mx-2 hidden xs:inline">•</span>
              <span className="text-foreground/90 block xs:inline">Global Explorer</span>
              <span className="text-accent mx-2 hidden xs:inline">•</span>
              <span className="text-foreground/90 block xs:inline">Visual Storyteller</span>
            </p>
            <div className="min-h-[120px] flex items-center justify-center backdrop-blur-sm rounded-lg px-3 sm:px-6 py-4">
              <p className={`text-lg sm:text-xl lg:text-2xl text-foreground/90 italic max-w-3xl mx-auto transition-all duration-500 font-light animate__animated ${
                isVisible ? 'animate__fadeIn animate__delay-2s' : ''
              }`}>
                &quot;{artistQuotes[currentQuote]}&quot;
              </p>
            </div>
          </div>

          <div className="flex flex-col xs:flex-row items-center justify-center gap-4 sm:gap-6 animate__animated animate__fadeInUp animate__delay-3s">
            <Button
              asChild
              size="lg"
              variant="default"
              className="w-full xs:w-auto text-accent-foreground px-8 text-lg"
            >
              <Link href="/gallery">Explore Gallery</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full xs:w-auto dark:text-accent-foreground px-8 text-lg"
            >
              <Link href="/about">About the Artist</Link>
            </Button>
          </div>

          <div className="mt-8 sm:mt-12 animate__animated animate__fadeIn animate__delay-2s">
            <div className="inline-flex flex-wrap justify-center gap-2 text-muted-foreground text-sm sm:text-base tracking-wider bg-card/30 backdrop-blur-sm px-4 sm:px-8 py-2 rounded-full">
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

        <div 
          onClick={scrollToFeaturedWorks}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-30 transition-all duration-1500 hover:scale-110 group"
        >
          <div className="w-[3px] h-12 bg-gradient-to-b from-accent to-transparent group-hover:from-accent/80" />
          <div className="w-5 h-5 absolute -bottom-2 left-1/2 -translate-x-1/2 rotate-45 border-b-[3px] border-r-[3px] border-accent group-hover:border-accent/80" />
        </div>
      </header>

      {/* Featured Works Section */}
      <div ref={featuredWorksRef}>
        <FeaturedWorks isLoading={isLoading} />
      </div>
    </div>
  );
}
