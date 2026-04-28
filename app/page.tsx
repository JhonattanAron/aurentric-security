import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductsGrid } from "@/components/products-grid"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <div id="servicios">
          <ProductsGrid />
        </div>
        <div id="soluciones">
          <FeaturesSection />
        </div>
        <div id="contacto">
          <CTASection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
