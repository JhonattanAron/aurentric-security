import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const whatsappUrl = "https://wa.me/593969849653?text=Quiero%20mayor%20informaci%C3%B3n"

  return (
    <section id="contacto" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              ¿Listo para proteger tu propiedad?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Contáctanos por WhatsApp y descubre cómo podemos diseñar el sistema de seguridad perfecto para ti.
            </p>

            <div className="mt-8 flex justify-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Consultar por WhatsApp
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">Conecta directamente con nuestro equipo de atención al cliente.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
