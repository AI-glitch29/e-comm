<!-- c11bb477-fff2-4bc6-9093-58519eae9997 e8dbc574-0a4a-4971-b10a-fbf98b85b606 -->
# Foundation Layer: Implementation Plan

### Scope

Create core domain types, product catalog, and utility helpers to unblock cart store and UI work. Files touched: `lib/types.ts`, `lib/products.ts`, and (if needed) `lib/utils.ts`.

### 1) Add domain types in `lib/types.ts`

- Export `Product` and `CartLineItem` types used across store and UI.
```ts
export type Product = {
  id: string;
  name: string;
  price: number; // USD dollars, e.g., 29.99
  imageSrc: string; // path under /public
  imageAlt?: string;
};

export type CartLineItem = {
  product: Product;
  quantity: number; // integer ≥ 1
};
```


Notes:

- Keep fields minimal and stable; add more later without breaking API.
- Price stored as number in dollars to align with plan; `formatPrice()` handles presentation.

### 2) Ensure utilities in `lib/utils.ts`

If missing, add the following exports (keep existing helpers unchanged):

```ts
// Utility to merge Tailwind class names
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

// Currency formatting (en-US, USD)
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
```

Notes:

- Simple `cn` keeps no external deps; can swap to tailwind-merge later.
- `formatPrice` centralizes currency display.

### 3) Create static catalog in `lib/products.ts`

- Import `Product`.
- Export `PRODUCTS: Product[]` with 8–12 items using existing images beneath `public/images`.
- Include representative categories (arrivals, products, sellers) to validate paths.
```ts
import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "prod-001",
    name: "Everyday Cotton Tee",
    price: 29.0,
    imageSrc: "/images/arrivals/arrivals-01.png",
    imageAlt: "White cotton tee on a hanger",
  },
  {
    id: "prod-002",
    name: "Lightweight Hoodie",
    price: 49.0,
    imageSrc: "/images/products/product-2-bg-1.png",
    imageAlt: "Gray hoodie folded on table",
  },
  // ... add 6–10 more items referencing existing assets
];
```


Guidelines:

- Stable `id` scheme `prod-###` avoids collisions.
- Prefer images that exist in `public/images` per repo snapshot.
- Keep names and prices human-friendly; price range $29–$199.

### 4) Lightweight integrity checks (dev-only, optional)

- Quick assert function in `lib/products.ts` or a separate `lib/dev-assert.ts` to ensure unique IDs and positive prices in development builds.
```ts
function assertUniqueIds(items: { id: string }[]): void {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) throw new Error(`Duplicate product id: ${item.id}`);
    seen.add(item.id);
  }
}

if (process.env.NODE_ENV !== "production") {
  assertUniqueIds(PRODUCTS);
}
```


### 5) Type-check and usage examples

- Verify `PRODUCTS` matches `Product` and can be consumed:
```ts
// Example (to be used later):
// import { PRODUCTS } from "@/lib/products";
// const firstPrice = formatPrice(PRODUCTS[0].price);
```


### Acceptance Criteria

- `lib/types.ts` exports `Product` and `CartLineItem` exactly as specified.
- `lib/utils.ts` exports `cn` and `formatPrice` (without breaking existing helpers).
- `lib/products.ts` exports `PRODUCTS: Product[]` with 8–12 valid items referencing real assets.
- Running a type check (`tsc --noEmit`) yields no errors related to the above files.
- Price formatting via `formatPrice(29)` returns `$29.00`.

### Risks & Mitigations

- Image path typos: cross-check against `public/images` folders; open first and last asset in list to confirm.
- Type drift later: keep `Product` minimal now; extend with optional fields only.
- Currency differences: centralized `formatPrice` allows future locale/currency changes without touching data.

### To-dos

- [ ] Create `lib/types.ts` with Product and CartLineItem types
- [ ] Ensure `lib/utils.ts` exports cn() and formatPrice()
- [ ] Create `lib/products.ts` with 8–12 Product entries
- [ ] Add unique-id dev assertions for PRODUCTS (optional)
- [ ] Run type check and verify utils work with PRODUCTS