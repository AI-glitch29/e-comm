"use client"

import Image from "next/image"
import * as React from "react"
import { ShoppingCart } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart"
import { formatPrice } from "@/lib/utils"

type CartDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  // Select the stable items map; derive array & subtotal via memo to avoid unstable snapshots
  const itemsMap = useCartStore((s) => s.items)
  const items = React.useMemo(() => Object.values(itemsMap), [itemsMap])
  const subtotal = React.useMemo(
    () => items.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0),
    [items]
  )
  const increment = useCartStore((s) => s.increment)
  const decrement = useCartStore((s) => s.decrement)
  const remove = useCartStore((s) => s.remove)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-lg font-semibold">Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-auto px-6 pb-6">
            {items.length === 0 ? (
              <div className="mt-20 flex w-full flex-col items-center justify-center">
                <ShoppingCart className="h-16 text-neutral-400" />
                <p className="mt-6 text-center text-2xl font-bold">
                  Your cart is empty.
                </p>
                <p className="mt-2 text-center text-sm text-neutral-500">
                  Add some products to get started!
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-4">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="grid grid-cols-[64px_1fr_auto] items-start gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-xs border">
                      <Image
                        src={product.imageSrc}
                        alt={product.imageAlt ?? product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                        priority={false}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-medium" title={product.name}>
                        {product.name}
                      </div>
                      <div className="text-sm text-neutral-500">{formatPrice(product.price)}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-8 rounded-full"
                          aria-label="Decrease quantity"
                          onClick={() => decrement(product.id)}
                        >
                          –
                        </Button>
                        <span className="w-6 text-center text-sm" aria-live="polite">
                          {quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-8 rounded-full"
                          aria-label="Increase quantity"
                          onClick={() => increment(product.id)}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs text-neutral-500 hover:text-neutral-900"
                        aria-label="Remove item"
                        onClick={() => remove(product.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Separator />

          <SheetFooter className="p-6 pt-4">
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Subtotal</span>
                <span className="text-lg font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <Button disabled className="w-full rounded-full bg-blue-600 text-white">
                Checkout
              </Button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CartDrawer


