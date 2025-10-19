"use client"

import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import type { CartLineItem, Product } from "@/lib/types"

type CartItemsById = Record<string, CartLineItem>

interface CartState {
  items: CartItemsById

  add: (product: Product, quantity?: number) => void
  remove: (productId: string) => void
  increment: (productId: string) => void
  decrement: (productId: string) => void
  clear: () => void

  getItemCount: () => number
  getSubtotal: () => number
  getItems: () => CartLineItem[]
}

export const useCartStore = create<CartState>()(
  immer((set, get) => ({
    items: {},

    add: (product, quantity = 1) =>
      set((state) => {
        const existing = state.items[product.id]
        if (existing) {
          existing.quantity += quantity
        } else {
          state.items[product.id] = { product, quantity }
        }
      }),

    remove: (productId) =>
      set((state) => {
        delete state.items[productId]
      }),

    increment: (productId) =>
      set((state) => {
        const existing = state.items[productId]
        if (existing) existing.quantity += 1
      }),

    decrement: (productId) =>
      set((state) => {
        const existing = state.items[productId]
        if (!existing) return
        existing.quantity -= 1
        if (existing.quantity <= 0) {
          delete state.items[productId]
        }
      }),

    clear: () => set(() => ({ items: {} })),

    getItemCount: () => {
      const { items } = get()
      return Object.values(items).reduce((acc, item) => acc + item.quantity, 0)
    },

    getSubtotal: () => {
      const { items } = get()
      return Object.values(items).reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )
    },

    getItems: () => {
      const { items } = get()
      return Object.values(items)
    },
  }))
)




