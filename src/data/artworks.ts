export interface Artwork {
  title: string;
  image: string;
  category: string;
  description: string;
  isFeatured?: boolean;
  year?: string;
  technique?: string;
  dimensions?: string;
}

export const artworks: Artwork[] = [
  {
    title: "Panel One",
    image: "/panel_1.jpg",
    category: "Abstract",
    description: "Abstract panel composition",
    year: "2023"
  },
  {
    title: "Panel Two",
    image: "/panel.jpg",
    category: "Abstract",
    description: "Panel artwork",
    year: "2023"
  },
  {
    title: "Panel Three",
    image: "/panel_3.jpg",
    category: "Abstract",
    description: "Panel artwork",
    year: "2023"
  },
  {
    title: "Nature's Voice",
    image: "/scream.jpg",
    category: "Digital Art",
    description: "An exploration of environmental consciousness through digital artistry",
    isFeatured: true,
    year: "2023",
    technique: "Digital",
    dimensions: "4K Resolution"
  },
  {
    title: "Knif",
    image: "/knif.jpg",
    category: "Still Life",
    description: "Still life photography",
    year: "2021"
  },
  {
    title: "Robin",
    image: "/Robin.jpg",
    category: "Portrait",
    description: "Portrait photograph",
    year: "2022"
  },
  {
    title: "Second Chance",
    image: "/Second_chance.jpg",
    category: "Abstract",
    description: "A powerful expression of rebirth and transformation through vibrant colors and dynamic brushstrokes",
    isFeatured: true,
    year: "2023",
    technique: "Oil on Canvas",
    dimensions: "120cm x 180cm"
  },
  {
    title: "Urban Dreams",
    image: "/Robin.jpg",
    category: "Mixed Media",
    description: "A contemporary interpretation of city life, blending traditional and digital techniques",
    isFeatured: true,
    year: "2023",
    technique: "Mixed Media",
    dimensions: "100cm x 150cm"
  }
]

export const categories = ["All", "Portrait", "Still Life", "Abstract", "Digital Art", "Mixed Media"]

export function getFeaturedArtworks(): Artwork[] {
  return artworks.filter(artwork => artwork.isFeatured)
}

export function getArtworksByCategory(category: string): Artwork[] {
  if (category === "All") return artworks
  return artworks.filter(artwork => artwork.category === category)
}

export function getRecentArtworks(limit: number = 2): Artwork[] {
  return [...artworks].sort((a, b) => {
    if (!a.year || !b.year) return 0
    return b.year.localeCompare(a.year)
  }).slice(0, limit)
}