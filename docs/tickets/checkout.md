# 🛒 [FEATURE] Implement Checkout Page with Payment Form

## 📋 Story Type
**Feature** | Epic: E-Commerce Core Functionality

## 🎯 Summary
Implement a complete checkout page with billing/shipping form, payment card input, and order summary panel following the provided UI design.

## 📝 Description

Create a new `/checkout` route with a two-column layout:
- **Left column:** Multi-section form for billing/shipping information and payment details
- **Right column:** Order summary with cart items, quantity controls, subtotal, shipping, and total

The page should integrate with the existing cart store and provide a professional checkout experience matching the attached UI design.

## 🖼️ Design Reference
See attached: `checkout-ui-reference.png`

## ✅ Acceptance Criteria

### Form Functionality (use shadcn form w/ react hooks and zod)
- [ ] Full name field (required, text input)
- [ ] Company field (optional, text input)
- [ ] Tax ID field (optional, text input with placeholder "eg. PL123456789")
- [ ] Address field (required, text input)
- [ ] Address continuation field (optional, text input)
- [ ] Postal Code field (required, text input)
- [ ] City field (required, text input)
- [ ] State/Region field (optional, text input)
- [ ] Country dropdown (required, searchable select with "Select country..." placeholder)
- [ ] Phone number field (required, tel input)
- [ ] "Billing address same as shipping" checkbox (checked by default)
- [ ] All required fields show asterisk (*) indicator
- [ ] Form validation displays errors on submit

### Payment Section (use shadcn components)
- [ ] Card number input (simple text input, no brand detection)
- [ ] Expiration date input (simple text input with MM/YY placeholder)
- [ ] Security code (CVC) input (simple text input)
- [ ] Basic validation only (required fields, no complex card validation)

### Order Summary Panel
- [ ] Display cart items with product image, name, and price
- [ ] Quantity controls (+/-) functional and update totals
- [ ] Remove item functionality (if needed)
- [ ] Subtotal calculation displays correctly
- [ ] Shipping method shown ("In-Store Pickup instant" - Free)
- [ ] Total calculation includes all costs
- [ ] Summary updates in real-time as quantities change

### Navigation & UX
- [ ] "Pay now" button (disabled state for demo, or shows simple success toast)
- [ ] Responsive layout 
- [ ] Proper form field tab order
- [ ] Loading states during form submission
- [ ] Back to cart navigation option
- [ ] Empty cart redirect (if user navigates with empty cart)

- Country list data source (use static list)
- Form validation library decision (shadcn from with react forms and zod)

## 🛠️ Technical Requirements

**MVP Approach:** Keep it simple - no external validation libraries, hardcoded countries, basic form validation only.

### New Files to Create
```
/app/checkout/
  └── page.tsx                    # Main checkout page (Server Component wrapper)

/components/checkout/
  ├── CheckoutForm.tsx             # Main form container (Client Component)
  ├── BillingForm.tsx              # Billing/shipping fields section
  ├── PaymentForm.tsx              # Payment card input section
  └── OrderSummary.tsx             # Right-side order summary panel
```

### Dependencies
- **Existing:** `store/cart.ts` (read cart items, update quantities)
- **Existing:** `lib/types.ts` (Product, CartLineItem types)
- **Existing:** shadcn components already installed in ui folder
- **Form library:** `react-hook-form` + `zod` for basic validation (required fields only)
- **Countries:** Hardcoded list in `/lib/countries.ts` (simple array of country names)

### Type Definitions
```typescript
// lib/types.ts additions
export type CheckoutFormData = {
  // Billing/Shipping
  fullName: string;
  company?: string;
  taxId?: string;
  address: string;
  addressCont?: string;
  postalCode: string;
  city: string;
  stateRegion?: string;
  country: string;
  phoneNumber: string;
  billingSameAsShipping: boolean;
  
  // Payment
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
};

export type ShippingMethod = {
  id: string;
  name: string;
  description: string;
  price: number;
};
```

### Integration Points
- Hook into `useCartStore()` for cart items and totals
- Use existing `formatPrice()` utility for currency display
- Follow existing blue theme (`bg-blue-600`) for buttons
- Match glassmorphism patterns from AppShell header
- localhost is already running

**⚠️ CRITICAL: Zustand Store Pattern**
- **DO NOT** use `useCartStore((s) => s.getItems())` directly - this causes infinite loops
- **CORRECT PATTERN:** Select stable `items` map, then derive array with `useMemo`:
  ```typescript
  const itemsMap = useCartStore((s) => s.items)
  const items = useMemo(() => Object.values(itemsMap), [itemsMap])
  ```
- Same pattern applies to `getSubtotal()` - derive it from memoized items array

**⚠️ CRITICAL: Navigation Pattern**
- **DO NOT** use `window.location.href = "/checkout"` - this causes full page reload and resets the cart store
- **CORRECT PATTERN:** Use Next.js router for client-side navigation:
  ```typescript
  import { useRouter } from "next/navigation"
  const router = useRouter()
  router.push("/checkout")
  ```
- This keeps the Zustand store in memory without resetting

## 🎨 UI/UX Guidelines

### Layout
- Two-column grid: `lg:grid-cols-2` (left: form, right: summary)
- Max width container: `max-w-7xl mx-auto`
- Proper spacing: `gap-8 p-6`
- Right column sticky on scroll for desktop

### Form Styling
- Input fields: Clean borders with `focus:ring-2 focus:ring-blue-600`
- Labels: `text-sm font-medium` with required asterisk in red
- Sections: "Billing & Shipping" and "Payment" headings
- Grid layout for paired fields (Postal Code + City, etc.)
- Proper input types (`type="tel"` for phone, etc.)

### Payment Section
- Simple text inputs for card number, expiration, and CVC
- Basic placeholder text for guidance
- Standard input styling matching other form fields

### Order Summary
- Product images: Small thumbnail format
- Quantity controls: Same rounded-full style from CartDrawer
- Subtotal/Shipping/Total: Clear hierarchy with bold total
- Separator lines between sections

### Buttons
- "Pay now": Full-width, `rounded-full bg-blue-600`, disabled state styling
- Quantity +/-: Subtle ghost buttons matching cart drawer


## 📌 Notes

### Out of Scope (for now)
- ❌ Actual payment processing (Stripe/PayPal integration)
- ❌ Card number validation (Luhn algorithm, brand detection, etc.)
- ❌ Input masking/formatting libraries
- ❌ Backend API for order submission
- ❌ Email confirmation
- ❌ Order history/tracking
- ❌ Multi-step checkout wizard
- ❌ Guest vs. authenticated user flow
- ❌ Address autocomplete/validation
- ❌ Country API/database (use simple hardcoded array)

### Future Enhancements
- Add promo code/discount input

## 🏷️ Labels
`frontend`, `checkout`, `forms`, `payment`, `high-priority`