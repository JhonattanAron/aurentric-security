"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart, type Product } from "@/lib/cart-context"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ShoppingCart, Check, AlertCircle } from "lucide-react"
import Link from "next/link"

interface ProductJSON {
  product_name: string
  category: string
  price_usd?: number
  pricing?: {
    full_price_usd: number
    monthly_subscription_usd?: number
  }
  description: string
  features?: string[]
  installation?: {
    included: boolean
    details?: string[]
  }
  use_cases?: string[]
  ai_features?: string[]
  hardware_included?: {
    drone?: {
      name: string
      features: string[]
    }
    base_station?: {
      included: boolean
      features: string[]
    }
  }
  software_features?: string[]
  alerts?: {
    methods: string[]
  }
  requirements?: string[]
  support?: {
    included: boolean
    monthly_subscription_features?: string[]
  }
  autonomy?: {
    level: string
    functions: string[]
  }
}

export function ProductDetailClient() {
  const params = useParams()
  const id = params.id as string
  const { addToCart } = useCart()
  const [product, setProduct] = useState<ProductJSON | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch("/products.json")
        const data = await response.json()
        const productIndex = parseInt(id.split("-")[1])
        const productData = data.products[productIndex]
        setProduct(productData)
      } catch (error) {
        console.error("Error loading product:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 flex items-center justify-center">
          <p className="text-muted-foreground">Cargando producto...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Producto no encontrado</p>
            <Link href="/productos">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Volver al catálogo
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const price = product.price_usd || product.pricing?.full_price_usd || 0
  const monthlyPrice = product.pricing?.monthly_subscription_usd

  const handleBuyWhatsApp = () => {
    const message = `Hola, me interesa comprar el siguiente producto:

📦 *${product.product_name}*
💰 Precio: $${price.toLocaleString()}
📝 Descripción: ${product.description}

${product.features && product.features.length > 0 ? `✨ Características:\n${product.features.slice(0, 5).map(f => `• ${f}`).join('\n')}\n\n` : ''}¿Puedo obtener más información?`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/593969849653?text=${encodedMessage}`, '_blank')
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `${id}-${i}`,
        name: product.product_name,
        brand: product.category,
        price: price,
        image: `/product-${id.split("-")[1]}.jpg`,
        category: product.category,
        description: product.description,
      } as Product)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/productos" className="hover:text-foreground transition-colors">
              Productos
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.product_name}</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-lg border border-border bg-secondary">
                <Image
                  src={`/product-${id.split("-")[1]}.jpg`}
                  alt={product.product_name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  {product.category}
                </Badge>
              </div>

              <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                {product.product_name}
              </h1>

              <p className="mb-8 text-lg text-muted-foreground">{product.description}</p>

              {/* Price */}
              <div className="mb-8 rounded-lg border border-border bg-secondary/30 p-6">
                <div className="text-3xl font-bold text-primary">
                  ${price.toLocaleString()}
                </div>
                {monthlyPrice && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    + ${monthlyPrice}/mes por suscripción
                  </div>
                )}
                {product.installation?.included && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    Instalación incluida
                  </div>
                )}
              </div>

              {/* Add to Cart */}
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 px-4 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    +
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {added ? "¡Agregado!" : "Agregar al carrito"}
                </Button>
              </div>

              {/* Contact WhatsApp */}
              <Button 
                onClick={handleBuyWhatsApp}
                variant="outline" 
                size="lg" 
                className="w-full"
              >
                💬 Comprar por WhatsApp
              </Button>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            {/* Main Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Características principales</h2>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Installation Details */}
            {product.installation && (
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Instalación</h2>
                <div className="rounded-lg border border-border bg-secondary/30 p-6">
                  {product.installation.included && (
                    <div className="mb-4 flex items-center gap-2 text-green-600 font-semibold">
                      <Check className="h-5 w-5" />
                      Instalación incluida
                    </div>
                  )}
                  {product.installation.details && (
                    <ul className="space-y-2">
                      {product.installation.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Use Cases */}
          {product.use_cases && product.use_cases.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Casos de uso</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {product.use_cases.map((useCase, index) => (
                  <div key={index} className="rounded-lg border border-border bg-secondary/30 p-4 text-center">
                    <p className="text-foreground font-medium">{useCase}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Features */}
          {product.ai_features && product.ai_features.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Características de IA</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {product.ai_features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Software Features */}
          {product.software_features && product.software_features.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Características de software</h2>
              <ul className="space-y-3">
                {product.software_features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hardware */}
          {product.hardware_included && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Hardware incluido</h2>
              <div className="space-y-6">
                {product.hardware_included.drone && (
                  <div className="rounded-lg border border-border bg-secondary/30 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">
                      {product.hardware_included.drone.name}
                    </h3>
                    <ul className="space-y-2">
                      {product.hardware_included.drone.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.hardware_included.base_station?.included && (
                  <div className="rounded-lg border border-border bg-secondary/30 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">Estación base</h3>
                    <ul className="space-y-2">
                      {product.hardware_included.base_station.features?.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Alerts */}
          {product.alerts && product.alerts.methods && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Métodos de alerta</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {product.alerts.methods.map((method, index) => (
                  <div key={index} className="rounded-lg border border-border bg-secondary/30 p-4 text-center">
                    <p className="text-foreground font-medium">{method}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {product.requirements && product.requirements.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Requisitos</h2>
              <ul className="space-y-3">
                {product.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Support */}
          {product.support && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Soporte</h2>
              {product.support.included && (
                <div className="rounded-lg border border-border bg-secondary/30 p-6">
                  <div className="mb-4 flex items-center gap-2 text-green-600 font-semibold">
                    <Check className="h-5 w-5" />
                    Soporte técnico incluido
                  </div>
                  {product.support.monthly_subscription_features && (
                    <div className="mt-4">
                      <p className="mb-3 font-semibold text-foreground">Con suscripción mensual:</p>
                      <ul className="space-y-2">
                        {product.support.monthly_subscription_features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Autonomy */}
          {product.autonomy && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Autonomía</h2>
              <div className="rounded-lg border border-border bg-secondary/30 p-6">
                <p className="mb-4 font-semibold text-foreground">
                  Nivel: <span className="text-primary">{product.autonomy.level}</span>
                </p>
                <ul className="space-y-2">
                  {product.autonomy.functions.map((func, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>{func}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Back to Products */}
          <div className="mt-16">
            <Link href="/productos">
              <Button variant="outline" className="bg-transparent hover:bg-secondary">
                ← Volver al catálogo
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
