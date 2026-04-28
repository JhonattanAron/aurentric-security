export function StatsSection() {
  const stats = [
    { value: "10,000+", label: "Instalaciones completadas" },
    { value: "99.9%", label: "Tiempo de actividad" },
    { value: "24/7", label: "Soporte técnico" },
    { value: "50+", label: "Países atendidos" },
  ]

  return (
    <section className="border-y border-border bg-secondary/30 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-foreground lg:text-5xl">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
