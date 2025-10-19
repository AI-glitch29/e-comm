"use client";

import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import { useCartStore } from "@/store/cart";

export default function Home() {
  const addToCart = useCartStore((s) => s.add);

  return (
    <main className="bg-neutral-50 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </div>
    </main>
  );
}
