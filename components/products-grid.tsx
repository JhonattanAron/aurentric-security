import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Bone as Drone, Radar, Shield, Smartphone, Wifi } from "lucide-react"

export function ProductsGrid() {
  const products = [
    {
      icon: Camera,
      title: "Cámaras IP 4K",
      description:
        "Cámaras de alta resolución con visión nocturna, detección de movimiento y almacenamiento en la nube.",
      features: ["Resolución 4K", "Visión nocturna IR", "IA integrada"],
    },
    {
      icon: Drone,
      title: "Drones de Vigilancia",
      description: "Drones autónomos con cámaras térmicas y seguimiento inteligente para áreas extensas.",
      features: ["Vuelo autónomo", "Cámara térmica", "Transmisión en vivo"],
    },
    {
      icon: Radar,
      title: "Sistemas de Radar",
      description: "Detección perimetral avanzada con radar de largo alcance y alertas en tiempo real.",
      features: ["Detección 360°", "Largo alcance", "Alertas instantáneas"],
    },
    {
      icon: Shield,
      title: "Control de Acceso",
      description: "Sistemas biométricos y de reconocimiento facial para control de acceso inteligente.",
      features: ["Reconocimiento facial", "Huella digital", "Tarjetas RFID"],
    },
    {
      icon: Smartphone,
      title: "App Móvil",
      description: "Monitorea todos tus sistemas desde cualquier lugar con nuestra app móvil avanzada.",
      features: ["iOS y Android", "Notificaciones push", "Control remoto"],
    },
    {
      icon: Wifi,
      title: "Red Mesh Segura",
      description: "Infraestructura de red mesh cifrada para conectividad confiable en toda tu propiedad.",
      features: ["Cifrado AES-256", "Auto-reparación", "Cobertura amplia"],
    },
  ]

  return (
    <section id="productos" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Tecnología de seguridad avanzada
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Soluciones integrales de vigilancia y protección con la última tecnología del mercado
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const Icon = product.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary bg-transparent"
                  >
                    Más información
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
