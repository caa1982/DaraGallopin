interface Marketplace {
  name: string
  description: string
  url: string
  type: "traditional" | "digital"
  live: boolean
}

export const marketplaces: Marketplace[] = [
  {
    name: "Artsy",
    description: "Leading platform for discovering and collecting contemporary art.",
    url: "https://www.artsy.net/artist/dara-gallopin",
    type: "traditional",
    live: true
  },
  {
    name: "ArtFinder",
    description: "Online marketplace connecting independent artists with art lovers.",
    url: "https://www.artfinder.com/",
    type: "traditional",
    live: false
  },
  {
    name: "Singulart",
    description: "Curated platform showcasing contemporary artists worldwide.",
    url: "https://www.singulart.com/",
    type: "traditional",
    live: false
  },
  {
    name: "NFT Bazl",
    description: "Innovative marketplace bridging traditional and digital art worlds.",
    url: "https://market.nftbazl.com/Dara-Gallopin",
    type: "digital",
    live: true
  },
  {
    name: "Foundation",
    description: "A curated, high-end NFT platform for digital artists.",
    url: "https://foundation.app/",
    type: "digital",
    live: false
  },
  {
    name: "SuperRare",
    description: "Exclusive platform for single-edition digital artworks.",
    url: "https://superrare.com/",
    type: "digital",
    live: false
  }
]