import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Aurentric Security | Sistemas de Seguridad y Vigilancia en Quito, Pifó y Tumbaco",
  description:
    "Líder en sistemas de seguridad y vigilancia en Quito, Pifó y Tumbaco. Cámaras 4K inteligentes, drones de vigilancia, control de acceso biométrico y soluciones IA. Instalación profesional y soporte 24/7.",
  icons: {
    icon: "/logos/favicon.ico",
    shortcut: "/logos/favicon.ico",
    apple: "/logos/favicon.png",
  },
  keywords: [
    "cámaras de seguridad Quito",
    "vigilancia seguridad Quito",
    "sistemas seguridad Pifó",
    "drones vigilancia Tumbaco",
    "cámaras IP 4K Quito",
    "control acceso biométrico",
    "vigilancia inteligente IA",
    "seguridad empresas Quito",
    "seguridad hogares Quito",
    "instalación cámaras Quito",
  ],
  authors: [{ name: "Aurentric Security" }],
  creator: "Aurentric Security",
  publisher: "Aurentric Security",
  formatDetection: {
    email: true,
    telephone: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://security.aurentric.com",
    siteName: "Aurentric Security",
    title: "Aurentric Security | Sistemas de Seguridad y Vigilancia en Quito",
    description:
      "Soluciones avanzadas de seguridad con tecnología IA. Cámaras 4K, drones, control de acceso y más en Quito, Pifó y Tumbaco.",
    images: [
      {
        url: "https://security.aurentric.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aurentric Security - Sistemas de Vigilancia Avanzados",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurentric Security | Sistemas de Seguridad Inteligentes",
    description: "Soluciones de vigilancia con IA en Quito, Pifó y Tumbaco",
    creator: "@AurentricSec",
  },
  alternates: {
    canonical: "https://security.aurentric.com",
  },
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <meta name="theme-color" content="#00d4ff" />
        <meta name="msapplication-TileColor" content="#1a1a1a" />
        <meta property="og:type" content="website" />
        <meta name="geo.placename" content="Quito, Ecuador" />
        <meta name="geo.region" content="EC-P" />
        <meta name="ICBM" content="-0.2193, -78.5099" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Aurentric Security",
              image: "https://security.aurentric.com/og-image.jpg",
              description:
                "Sistemas de seguridad y vigilancia inteligente con tecnología IA",
              url: "https://security.aurentric.com",
              telephone: "+593969849653",
              email: "info@aurentric.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Quito",
                addressLocality: "Quito",
                addressRegion: "Pichincha",
                postalCode: "170001",
                addressCountry: "EC",
              },
              areaServed: [
                { "@type": "City", name: "Quito" },
                { "@type": "City", name: "Pifó" },
                { "@type": "City", name: "Tumbaco" },
              ],
              priceRange: "$$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
              sameAs: ["https://wa.me/593969849653"],
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <CartProvider>{children}</CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
