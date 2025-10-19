"use client"

import * as React from "react"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cart"

type CartToggleProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartToggle({ open, onOpenChange }: CartToggleProps) {
  const count = useCartStore((s) => s.getItemCount())

  return (
    <button
      className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 transition-all ease-in-out hover:border-neutral-300"
      aria-label="Open cart"
      aria-expanded={open}
      onClick={() => onOpenChange(true)}
    >
      <ShoppingCart className="h-4 w-4 transition-all ease-in-out hover:scale-110" aria-hidden="true" />
      {count > 0 && (
        <div 
          className="absolute right-0 top-0 -mr-2 -mt-2 flex h-4 w-4 items-center justify-center rounded-sm bg-blue-600 text-[11px] font-medium text-white"
          aria-label={`${count} items in cart`}
        >
          <span aria-hidden="true">{count}</span>
          <span className="sr-only">{count} items in cart</span>
        </div>
      )}
    </button>
  )
}

export default CartToggle




