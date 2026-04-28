"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return

    const itemsText = items
      .map((item) => `• ${item.name} - Cantidad: ${item.quantity} x $${item.price.toLocaleString()} = $${(item.price * item.quantity).toLocaleString()}`)
      .join("\n")

    const message = `¡Hola! Me gustaría realizar el siguiente pedido:

📦 *DETALLE DEL PEDIDO*

${itemsText}

━━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL: $${totalPrice.toLocaleString()}*
━━━━━━━━━━━━━━━━━━━━━

Por favor, confirma la disponibilidad y los detalles de envío e instalación.`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/593969849653?text=${encodedMessage}`, "_blank")
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-muted-foreground">Tu carrito está vacío</p>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-lg border border-border p-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          <p className="text-xs text-muted-foreground">{item.brand}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-semibold">${item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="mb-4 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <div className="space-y-2">
                <Button 
                  onClick={handleCheckoutWhatsApp}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  💬 Realizar Pedido por WhatsApp
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
                  Vaciar Carrito
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
