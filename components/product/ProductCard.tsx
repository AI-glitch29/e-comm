"use client"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/lib/types"

type ProductCardProps = {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white transition duration-300 ease-in-out hover:border-blue-600">
        <img
          src={product.imageSrc}
          alt={product.imageAlt ?? product.name}
          loading="lazy"
          className="h-48 w-full bg-gray-50 object-contain transition duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium leading-tight">{product.name}</p>
          <p className="text-sm text-neutral-500">{formatPrice(product.price)}</p>
        </div>
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard




