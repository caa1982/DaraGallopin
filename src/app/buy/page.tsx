import { Card } from "@/components/ui/card"
import Link from "next/link"

const marketplaces = [
  {
    name: "Saatchi Art",
    description: "Premier online art gallery for discovering and collecting fine art.",
    url: "https://www.saatchiart.com/",
    type: "traditional"
  },
  {
    name: "ArtFinder",
    description: "Online marketplace connecting independent artists with art lovers.",
    url: "https://www.artfinder.com/",
    type: "traditional"
  },
  {
    name: "Singulart",
    description: "Curated platform showcasing contemporary artists worldwide.",
    url: "https://www.singulart.com/",
    type: "traditional"
  },
  {
    name: "OpenSea",
    description: "The world's largest NFT marketplace.",
    url: "https://opensea.io/",
    type: "digital"
  },
  {
    name: "Foundation",
    description: "A curated, high-end NFT platform for digital artists.",
    url: "https://foundation.app/",
    type: "digital"
  },
  {
    name: "SuperRare",
    description: "Exclusive platform for single-edition digital artworks.",
    url: "https://superrare.com/",
    type: "digital"
  }
]

export default function BuyPage() {
  return (
    <main className="container mx-auto px-4 py-24 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Where to Buy</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Traditional Art</h2>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          Discover my original paintings and traditional artworks through these premier art marketplaces. 
          Each piece is unique and comes with a certificate of authenticity. These platforms offer 
          secure transactions and worldwide shipping, ensuring your artwork arrives safely.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaces
            .filter(market => market.type === "traditional")
            .map(market => (
              <Card key={market.name} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{market.name}</h3>
                <p className="text-muted-foreground mb-4">{market.description}</p>
                <Link 
                  href={market.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Visit Platform →
                </Link>
              </Card>
            ))}
        </div>
      </section>

      <section>
        <div className="relative">
            {/* Coming Soon Overlay */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
              <div className="text-center ">
                <h3 className="text-3xl font-bold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">Digital art collection launching shortly</p>
              </div>
            </div>
          <h2 className="text-2xl font-semibold mb-4">Digital Art & NFTs</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Explore my digital art collections and NFTs on these leading platforms. 
            Each digital piece is carefully crafted and tokenized to ensure authenticity 
            and ownership on the blockchain. Collect unique digital artworks that combine 
            traditional artistic techniques with innovative digital technology.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaces
              .filter(market => market.type === "digital")
              .map(market => (
                <Card key={market.name} className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">{market.name}</h3>
                  <p className="text-muted-foreground mb-4">{market.description}</p>
                  <Link 
                    href={market.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline pointer-events-none"
                  >
                    Visit Platform →
                  </Link>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}