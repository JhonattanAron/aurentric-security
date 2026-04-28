import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"

export function HeroSection() {
  const whatsappUrl = "https://wa.me/593969849653?text=Quiero%20mayor%20informaci%C3%B3n"

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Tecnología de vigilancia de última generación
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Protección inteligente para un mundo{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">conectado</span>
          </h1>

          <p className="mb-10 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Sistemas de seguridad avanzados con IA, cámaras 4K, drones de vigilancia y monitoreo en tiempo real. Protege
            lo que más importa con tecnología del futuro.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="/productos">
              <Button size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90">
                Explorar Productos
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="group bg-transparent">
                <MessageCircle className="mr-2 h-4 w-4" />
                Consultar por WhatsApp
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <div className="relative rounded-xl border border-border bg-card p-2 shadow-2xl">
            <img src="/futuristic-security-camera-control-panel-dashboard.jpg" alt="Panel de control de seguridad" className="rounded-lg w-full" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
