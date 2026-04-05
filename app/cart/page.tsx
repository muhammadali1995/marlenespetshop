"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartItemRow from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const items = useCartStore((s) => s.items);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-[1440px] px-6 py-10 min-h-[60vh]">
        <h1 className="text-3xl font-bold text-brand-dark mb-8">Your cart</h1>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
            {/* Items list */}
            <div>
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
              <Link
                href="/products/kitty-kurlz"
                className="inline-block mt-6 text-sm text-brand-dark/60 hover:text-brand-dark hover:underline"
              >
                ← Continue shopping
              </Link>
            </div>

            {/* Summary sidebar */}
            <CartSummary />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
