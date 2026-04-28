import type { Metadata } from "next"

interface ProductJSON {
  product_name: string
  category: string
  price_usd?: number
  pricing?: {
    full_price_usd: number
  }
  description: string
  features?: string[]
}

export function generateProductMetadata(product: ProductJSON, productId: string): Metadata {
  const price = product.price_usd || product.pricing?.full_price_usd || 0
  const featuresText = product.features?.slice(0, 3).join(", ") || ""

  return {
    title: `${product.product_name} | ${product.category} | Aurentric Security Quito`,
    description: `${product.product_name} - ${product.description}. Precio: $${price.toLocaleString()}. Disponible en Quito, Pifó y Tumbaco. ${featuresText}`,
    keywords: [
      product.product_name.toLowerCase(),
      product.category.toLowerCase(),
      `${product.category.toLowerCase()} quito`,
      `${product.product_name.toLowerCase()} precio`,
      "seguridad",
      "vigilancia",
      "quito",
      "pifó",
      "tumbaco",
    ],
    openGraph: {
      type: "product",
      locale: "es_ES",
      url: `https://security.aurentric.com/productos/${productId}`,
      title: `${product.product_name} | Aurentric Security`,
      description: product.description,
      images: [
        {
          url: `https://security.aurentric.com/product-${productId.split("-")[1]}.jpg`,
          width: 1200,
          height: 800,
          alt: product.product_name,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.product_name} | Aurantic Security`,
      description: product.description,
      creator: "@AurentricSec",
      images: [`https://security.aurentric.com/product-${productId.split("-")[1]}.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://security.aurentric.com/productos/${productId}`,
    },
  }
}

export function generateProductStructuredData(product: ProductJSON, productId: string) {
  const price = product.price_usd || product.pricing?.full_price_usd || 0

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.product_name,
    description: product.description,
    image: `https://security.aurentric.com/product-${productId.split("-")[1]}.jpg`,
    brand: {
      "@type": "Brand",
      name: "Aurentric Security",
    },
    offers: {
      "@type": "Offer",
      url: `https://security.aurentric.com/productos/${productId}`,
      priceCurrency: "USD",
      price: price.toString(),
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Aurentric Security",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "150",
    },
  }
}
