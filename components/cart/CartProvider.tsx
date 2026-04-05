"use client";

import { createContext, useContext, useState } from "react";
import CartDrawer from "./CartDrawer";

interface CartContextValue {
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue>({
  openCart: () => {},
  closeCart: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <CartContext.Provider value={{ openCart: () => setOpen(true), closeCart: () => setOpen(false) }}>
      {children}
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </CartContext.Provider>
  );
}
