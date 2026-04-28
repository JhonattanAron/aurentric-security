"use client"

import { Button } from "@/components/ui/button"
import { Menu, Shield, X, ShoppingCart } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { CartSheet } from "@/components/cart-sheet"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Aurentric Security</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/productos" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Productos
          </Link>
          <a href="/#servicios" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Servicios
          </a>
          <a href="/#soluciones" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Soluciones
          </a>
          <a href="/#contacto" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Contacto
          </a>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" size="sm" className="relative" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-6 py-4">
            <Link
              href="/productos"
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Productos
            </Link>
            <a
              href="/#servicios"
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Servicios
            </a>
            <a
              href="/#soluciones"
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Soluciones
            </a>
            <a
              href="/#contacto"
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Contacto
            </a>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="ghost" size="sm" className="w-full relative" onClick={() => setCartOpen(true)}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Carrito {totalItems > 0 && `(${totalItems})`}
              </Button>
            </div>
          </div>
        </div>
      )}

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  )
}
