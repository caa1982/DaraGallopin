import { Card } from "@/components/ui/card"
import Link from "next/link"
import 'animate.css';
import { marketplaces } from "@/data/marketplaces"

export default function BuyPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 sm:pb-24 min-h-screen">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 animate__animated animate__fadeIn">Where to Buy</h1>
      
      <section className="mb-8 sm:mb-12 animate__animated animate__fadeInUp">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Traditional Art</h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-3xl">
          Discover my original paintings and traditional artworks through these premier art marketplaces. 
          Each piece is unique and comes with a certificate of authenticity. These platforms offer 
          secure transactions and worldwide shipping, ensuring your artwork arrives safely.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {marketplaces
            .filter(market => market.type === "traditional")
            .map((market, index) => (
              <Card key={market.name} className="relative">
                {!market.live && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center animate__animated animate__pulse animate__infinite animate__slower">
                    <div className="text-center px-4">
                      <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
                      <p className="text-sm text-muted-foreground">Platform integration in progress</p>
                    </div>
                  </div>
                )}
                <div className={`p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 dark:shadow-white/5 dark:hover:shadow-white/10 animate__animated animate__fadeIn animate__delay-${index}s`}>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{market.name}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">{market.description}</p>
                  <Link 
                    href={market.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-accent hover:text-accent/80 hover:underline transition-colors inline-flex items-center gap-1 ${!market.live ? 'pointer-events-none' : ''}`}
                  >
                    Visit Platform 
                    <span className="text-lg" aria-hidden="true">→</span>
                  </Link>
                </div>
              </Card>
            ))}
        </div>
      </section>

      <section className="animate__animated animate__fadeInUp animate__delay-1s">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Digital Art & NFTs</h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-3xl">
          Explore my digital art collections and NFTs on these leading platforms. 
          Each digital piece is carefully crafted and tokenized to ensure authenticity 
          and ownership on the blockchain. Collect unique digital artworks that combine 
          traditional artistic techniques with innovative digital technology.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {marketplaces
            .filter(market => market.type === "digital")
            .map((market, index) => (
              <Card key={market.name} className="relative">
                {!market.live && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center animate__animated animate__pulse animate__infinite animate__slower">
                    <div className="text-center px-4">
                      <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
                      <p className="text-sm text-muted-foreground">Platform integration in progress</p>
                    </div>
                  </div>
                )}
                <div className={`p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 dark:shadow-white/5 dark:hover:shadow-white/10 animate__animated animate__fadeIn animate__delay-${index + 2}s`}>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{market.name}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">{market.description}</p>
                  <Link 
                    href={market.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-accent hover:text-accent/80 hover:underline transition-colors inline-flex items-center gap-1 ${!market.live ? 'pointer-events-none' : ''}`}
                  >
                    Visit Platform 
                    <span className="text-lg" aria-hidden="true">→</span>
                  </Link>
                </div>
              </Card>
            ))}
        </div>
      </section>
    </main>
  )
}