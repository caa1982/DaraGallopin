import { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getRecentArtworks } from "@/data/artworks";
import PhotoGallery from "@/components/PhotoGallery";

interface RecentWorksProps {
  isLoading: boolean;
}

export default function RecentWorks({ isLoading }: RecentWorksProps): JSX.Element {
  const photos = useMemo(() => {
    const recentWorks = getRecentArtworks(2);
    return recentWorks.map((artwork) => ({
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
    <section className="max-w-7xl mx-auto text-center mb-8 sm:mb-12 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card to-background">
      <div className="mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-accent mb-4 sm:mb-6">Recent Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
          Explore my latest artistic endeavors and newest creations
        </p>
      </div>
      <div className="max-w-5xl mx-auto">
        <PhotoGallery 
          photos={photos} 
          isLoading={isLoading}
          columns={(containerWidth) => {
            if (containerWidth < 640) return 1;
            if (containerWidth < 1024) return 2;
            return 2;
          }}
        />
      </div>
      <div className="mt-12 text-center">
        <Button
          asChild
          variant="outline"
          className="dark:text-accent-foreground group"
        >
          <Link href="/gallery" className="flex items-center">
            View Recent Collection
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
    </section>
  );
}