"use client";

import { useState, useEffect } from "react";
import { getArtworks } from "@/data/artworks";
import PhotoGallery from "@/components/PhotoGallery";

export default function GalleryPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const photos = getArtworks().map((art) => ({
    src: art.image,
    width: art.width || 0,
    height: art.height || 0,
    title: art.title || "",
    size: art.size || "",
    description: art.description || "",
    year: art.year || "",
  }));

  return (
    <div className="min-h-screen pt-16 sm:pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">My Life Work</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my collection of artworks spanning various techniques and inspirations
          </p>
        </div>
        <PhotoGallery 
          photos={photos}
          isLoading={isLoading}
          columns={(containerWidth) => {
            if (containerWidth < 500) return 1;
            if (containerWidth < 768) return 2;
            if (containerWidth < 1280) return 3;
            return 4;
          }}
        />
      </div>
    </div>
  );
}
