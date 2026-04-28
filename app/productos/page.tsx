import type { Metadata } from "next"
import { ProductosClient } from "./productos-client"

export const metadata: Metadata = {
  title: "Catálogo de Productos | Cámaras, Drones y Sistemas de Seguridad | Aurentric Security",
  description: "Explora nuestro catálogo completo de cámaras 4K, drones de vigilancia, control de acceso biométrico y sistemas inteligentes. Precios competitivos en Quito, Pifó y Tumbaco.",
  keywords: [
    "cámaras de seguridad",
    "drones vigilancia",
    "control de acceso",
    "sistemas seguridad",
    "cámaras IP",
    "vigilancia inteligente",
    "productos seguridad Quito",
  ],
  openGraph: {
    title: "Catálogo de Productos | Aurentric Security",
    description: "Los mejores productos de seguridad y vigilancia en Quito",
    url: "https://security.aurentric.com/productos",
    type: "website",
  },
}

export default function ProductosPage() {
  return <ProductosClient />
}
