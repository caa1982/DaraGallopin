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
    <div className="container mx-auto px-6 sm:px-12 md:px-24 min-h-screen pt-24">
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
  );
}
