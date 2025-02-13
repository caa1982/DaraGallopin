import { useMemo } from "react";
import Link from "next/link";
import { shuffle } from "lodash";
import { Button } from "@/components/ui/button";
import { getArtworks } from "@/data/artworks";
import PhotoGallery from "@/components/PhotoGallery";

interface FeaturedWorksProps {
  isLoading: boolean;
}

export default function FeaturedWorks({ isLoading }: FeaturedWorksProps): JSX.Element {
  const photos = useMemo(() => {
    const allWorks = getArtworks();
    // Get all featured works
    const featuredWorks = allWorks.filter(artwork => artwork.isFeatured);
    
    // If we have more than 3 featured works, shuffle and take 3
    // If we have less than 3, add shuffled non-featured works
    const selectedWorks = 
      featuredWorks.length > 3 
        ? shuffle(featuredWorks).slice(0, 3)
        : [
            ...featuredWorks,
            ...shuffle(allWorks.filter(w => !w.isFeatured))
              .slice(0, 3 - featuredWorks.length)
          ];

    return selectedWorks.map((artwork) => ({
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
    <main className="max-w-7xl mx-auto text-center mb-8 sm:mb-12 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card">
      <div className="mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-accent mb-4 sm:mb-6">Featured Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
          Discover a selection of my most impactful pieces, each telling its own unique story
        </p>
      </div>
      <div className="max-w-5xl mx-auto">
        <PhotoGallery 
          photos={photos} 
          isLoading={isLoading}
          columns={(containerWidth) => {
            if (containerWidth < 640) return 1;
            if (containerWidth < 1024) return 2;
            return 3;
          }}
        />
      </div>
      <div className="mt-12 text-center">
        <Button
          asChild
          variant="secondary"
          className="dark:text-accent-foreground group"
        >
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
  );
}