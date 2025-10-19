import type { Product } from "./types"

export const PRODUCTS: Product[] = [
  {
    id: "prod-001",
    name: "Wireless Game Controller",
    price: 29,
    imageSrc: "/images/arrivals/arrivals-01.png",
    imageAlt: "Black wireless game controller",
  },
  {
    id: "prod-002",
    name: "Smartphone",
    price: 49,
    imageSrc: "/images/products/product-2-bg-1.png",
    imageAlt: "Smartphone front and back",
  },
  {
    id: "prod-003",
    name: "Smartphone Pro",
    price: 99,
    imageSrc: "/images/arrivals/arrivals-02.png",
    imageAlt: "Smartphone with colorful display",
  },
  {
    id: "prod-004",
    name: "Laptop",
    price: 129,
    imageSrc: "/images/products/product-4-bg-1.png",
    imageAlt: "Slim laptop open",
  },
  {
    id: "prod-005",
    name: "All-in-One Desktop",
    price: 59,
    imageSrc: "/images/arrivals/arrivals-03.png",
    imageAlt: "All-in-one desktop computer on stand",
  },
  {
    id: "prod-006",
    name: "Wireless Game Controller (Alt)",
    price: 39,
    imageSrc: "/images/sellers/sellers-01.png",
    imageAlt: "Alternate angle of a game controller",
  },
  {
    id: "prod-007",
    name: "Smartphone Mini",
    price: 29,
    imageSrc: "/images/sellers/sellers-02.png",
    imageAlt: "Compact smartphone",
  },
  {
    id: "prod-008",
    name: "Tablet",
    price: 149,
    imageSrc: "/images/products/product-7-bg-1.png",
    imageAlt: "Tablet with blue abstract wallpaper",
  },
  {
    id: "prod-009",
    name: "Slim Laptop",
    price: 79,
    imageSrc: "/images/arrivals/arrivals-04.png",
    imageAlt: "Slim laptop closed",
  },
  {
    id: "prod-010",
    name: "Smartwatch",
    price: 35,
    imageSrc: "/images/arrivals/arrivals-05.png",
    imageAlt: "Rugged smartwatch with orange band",
  },
  {
    id: "prod-011",
    name: "Ergonomic Mouse",
    price: 199,
    imageSrc: "/images/products/product-6-bg-1.png",
    imageAlt: "Ergonomic wireless mouse",
  },
  {
    id: "prod-012",
    name: "4K Monitor",
    price: 89,
    imageSrc: "/images/products/product-3-bg-1.png",
    imageAlt: "High-resolution desktop monitor",
  },
]

function assertUniqueIds(items: { id: string }[]): void {
  const seen = new Set<string>()
  for (const item of items) {
    if (seen.has(item.id)) throw new Error(`Duplicate product id: ${item.id}`)
    seen.add(item.id)
  }
}

if (process.env.NODE_ENV !== "production") {
  assertUniqueIds(PRODUCTS)
}


