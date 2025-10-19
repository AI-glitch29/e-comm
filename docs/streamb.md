<!-- 230fc068-8e70-4a7d-809c-aa668a210d81 5617d20c-e8b9-496b-8beb-d07253000698 -->
# Stream B: Cart UI — Implementation Plan

## Scope

Build a right-side cart drawer with line items, quantity controls, remove, subtotal, and a global cart toggle. Integrate with the cart store API (`add`, `remove`, `increment`, `decrement`, `getItemCount`, `getSubtotal`, `getItems`).

## Files to Add

- `components/cart/CartDrawer.tsx`
- `components/cart/CartToggle.tsx`
- `components/ui/{sheet,badge,separator}.tsx` (shadcn components)

## Dependencies

- `lucide-react` for `ShoppingCart` icon
- shadcn UI components: `sheet`, `badge`, `separator` (align with existing `components/ui/button.tsx`)

## Component APIs

- `CartDrawer`
  ```tsx
  // components/cart/CartDrawer.tsx
  type CartDrawerProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  };
  // Renders Sheet with header, list, footer; uses store selectors and actions
  ```

- `CartToggle`
  ```tsx
  // components/cart/CartToggle.tsx
  type CartToggleProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  };
  // Ghost button with ShoppingCart icon; badge shows item count
  ```


## UI Structure

- Drawer (right):
  - Header: "Shopping Cart"
  - Body:
    - Empty state: text + subtle icon
    - List of items: image, name, price, qty controls (– / +), remove (X)
  - Footer: Subtotal, "Checkout" button (disabled)

## Store Integration

- Selectors: `getItems()`, `getItemCount()`, `getSubtotal()`
- Actions: `increment(productId)`, `decrement(productId)`, `remove(productId)`

## Styling (Tailwind)

- Layout classes: `flex`, `gap-4`, `items-center`, `justify-between`
- Grid for line items: `grid grid-cols-[64px_1fr_auto] gap-4`
- Buttons: use `Button` variants from `components/ui/button.tsx`

## Accessibility

- `Sheet` handles focus trap and ESC close; ensure `onOpenChange` wired
- Toggle button has `aria-controls` and `aria-expanded`
- Badge includes sr-only text for screen readers
- Icon buttons include `aria-label` (e.g., "Increase quantity")

## Error/Edge Cases

- Decrement at 1 should remove line via `decrement()` semantics
- Large item names truncate with `line-clamp-2` or `truncate`
- Images have `alt` from product or fallback

## Minimal Code Signatures

- Cart item row controls
  ```tsx
  <div className="flex items-center gap-2">
    <Button variant="outline" size="icon" aria-label="Decrease quantity" onClick={() => decrement(id)}>–</Button>
    <span className="w-8 text-center">{quantity}</span>
    <Button variant="outline" size="icon" aria-label="Increase quantity" onClick={() => increment(id)}>+</Button>
    <Button variant="ghost" size="icon" aria-label="Remove item" onClick={() => remove(id)}>✕</Button>
  </div>
  ```

- Subtotal display
  ```tsx
  <div className="flex items-center justify-between py-4">
    <span className="text-sm text-muted-foreground">Subtotal</span>
    <span className="text-lg font-semibold">{formatPrice(getSubtotal())}</span>
  </div>
  ```

- Toggle with badge
  ```tsx
  <Button variant="ghost" size="icon" aria-label="Open cart" onClick={() => onOpenChange(true)}>
    <ShoppingCart className="h-5 w-5" />
    {count > 0 && (
      <Badge className="ml-1" aria-label={`${count} items in cart`}>{count}</Badge>
    )}
  </Button>
  ```


## Integration Notes

- Stream C will place `CartToggle` in `app/layout.tsx` and host the `open` state, rendering `CartDrawer` at root.
- For Stream B, expose controlled props only; do not manage internal state.

## Validation Checklist

- Add item(s) → Toggle badge increments; Drawer lists items
- Increment/decrement/Remove update quantities and subtotal
- Empty state shows when cart cleared
- ESC closes drawer; focus returns to toggle
- Mobile usability: buttons ≥44px, drawer fits viewport

### To-dos

- [ ] Add shadcn `sheet`, `badge`, `separator` components under components/ui
- [ ] Create `CartDrawer.tsx` with header, list, controls, subtotal, checkout
- [ ] Create `CartToggle.tsx` with icon button and count badge
- [ ] Wire store selectors and actions into drawer and toggle
- [ ] Add aria labels, sr-only badge text, focus and ESC handling
- [ ] Verify mobile/desktop responsiveness and touch targets