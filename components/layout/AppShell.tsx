"use client"

import * as React from "react"
import CartToggle from "@/components/cart/CartToggle"
import CartDrawer from "@/components/cart/CartDrawer"

type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
        <nav className="relative flex items-center justify-between p-4 lg:px-6">
          <div className="text-xl font-bold">ShopDemo</div>
          <CartToggle open={open} onOpenChange={setOpen} />
        </nav>
      </header>
      <CartDrawer open={open} onOpenChange={setOpen} />
      {children}
    </>
  )
}

export default AppShell




