"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ColumnsPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/plugins/counter.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import "react-photo-album/columns.css";

interface Photo {
  src: string;
  width: number;
  height: number;
  title?: string;
  size?: string;
  description?: string;
  year?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  isLoading?: boolean;
  columns?: (containerWidth: number) => number;
}

export default function PhotoGallery({ 
  photos, 
  isLoading = false, 
  columns = (containerWidth) => {
    if (containerWidth < 500) return 1;
    if (containerWidth < 900) return 2;
    return 3;
  }
}: PhotoGalleryProps) {
  const [index, setIndex] = useState(-1);

  const slides = useMemo(
    () => photos.map((photo) => ({
      src: photo.src,
      title: photo.title,
      description: [photo.description, photo.size, photo.year].filter(Boolean).join(" - ")
    })),
    [photos]
  );

  const renderNextImage = (
    { alt = "", title = "", sizes }: { alt?: string; title?: string; sizes?: string },
    { photo, width, height }: { photo: Photo; width: number; height: number }
  ) => {
    return (
      <div
        className="
          group
          relative
          w-full
          overflow-hidden
          rounded-lg
          cursor-pointer
          transition-shadow
          duration-300
          shadow-md
          shadow-black/20
          hover:shadow-xl
          hover:shadow-black/40
          dark:shadow-white/10
          dark:hover:shadow-white/30
        "
      >
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
              '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="100%" height="100%" fill="hsl(var(--background))"/></svg>'
            ).toString("base64")}`}
            className="
              transition-transform
              duration-300
              ease-in-out
              group-hover:scale-105
            "
          />
        </div>
  
        {/* Overlay with title and description */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-background/95
            via-transparent
            to-transparent
            dark:from-background/95
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            flex
            items-end
          "
        >
          <div className="p-4 w-full bg-card/70 dark:bg-card/90 backdrop-blur-sm rounded-b-lg">
            {photo.title && <h1 className="font-semibold text-foreground">{photo.title}</h1>}
            {photo.description && <h3 className="text-sm text-foreground/90">{photo.description}</h3>}
            {photo.size && <h4 className="text-xs text-muted-foreground mt-1">{photo.size}</h4>}
            {photo.year && <p className="text-xs text-muted-foreground mt-1">{photo.year}</p>}
          </div>
        </div>
      </div>
    );
  };
  
  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px] w-full">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <ColumnsPhotoAlbum
        columns={columns}
        photos={photos}
        spacing={16}
        render={{ image: renderNextImage }}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Captions, Zoom, Counter, Fullscreen]}
        carousel={{
          padding: 32,
          spacing: 32,
          imageFit: "cover",
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
        }}
        render={{
          iconPrev: () => <div className="text-white text-2xl px-4 py-2 cursor-pointer select-none">‹</div>,
          iconNext: () => <div className="text-white text-2xl px-4 py-2 cursor-pointer select-none">›</div>,
        }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, .95)" },
          slide: { width: "auto", maxWidth: "100%" }
        }}
        animation={{ fade: 300 }}
        captions={{
          showToggle: true,
          descriptionTextAlign: "center",
        }}
        counter={{
          container: { style: { top: "unset", bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" } }
        }}
      />
    </>
  );
}