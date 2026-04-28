import { CheckCircle2 } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Instalación profesional",
      description:
        "Nuestro equipo de expertos certificados instala y configura todos los sistemas con garantía completa.",
    },
    {
      title: "Monitoreo 24/7",
      description: "Centro de monitoreo activo las 24 horas con respuesta inmediata ante cualquier incidente.",
    },
    {
      title: "Inteligencia artificial",
      description: "Detección inteligente de personas, vehículos y objetos con alertas personalizadas.",
    },
    {
      title: "Almacenamiento seguro",
      description: "Grabaciones cifradas en la nube con acceso desde cualquier dispositivo.",
    },
    {
      title: "Mantenimiento incluido",
      description: "Actualizaciones automáticas y mantenimiento preventivo sin costo adicional.",
    },
    {
      title: "Escalabilidad total",
      description: "Sistemas modulares que crecen con tus necesidades sin reemplazar equipos.",
    },
  ]

  return (
    <section id="servicios" className="bg-secondary/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Servicio completo de principio a fin
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              No solo vendemos equipos, ofrecemos soluciones completas de seguridad con instalación profesional,
              configuración personalizada y soporte continuo para garantizar tu tranquilidad.
            </p>
            <div className="mt-8">
              <img
                src="/security-technician-installing-camera-professional.jpg"
                alt="Instalación profesional"
                className="rounded-lg border border-border shadow-xl"
              />
            </div>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
