"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore, selectTotalItems } from "@/store/cartStore";
import { useCart } from "@/components/cart/CartProvider";

/** Exact chevron from the live site */
function Chevron() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
      <path d="M5 6L0 1L0.7 0.3L5 4.6L9.3 0.3L10 1L5 6Z" />
    </svg>
  );
}

/** Exact shopping cart icon from the live site */
function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 6h15l-1.5 9h-11L6 6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L5 3H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="19" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="19" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCartStore(selectTotalItems);
  const { openCart } = useCart();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-brand-dark/[0.75] transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 h-[70px] flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center">
          <Image
            src="/images/marleneslogo.svg"
            alt="Marlene's"
            width={130}
            height={30}
            priority
          />
        </Link>

        {/* Center nav — desktop only */}
        <nav className="hidden lg:flex items-center gap-10 text-[15px] text-brand-dark flex-1 justify-center">
          <Link href="/" className="hover:opacity-60 transition-opacity">
            Home
          </Link>
          <Link href="#" className="hover:opacity-60 transition-opacity whitespace-nowrap">
            Marlene&apos;s Selection
          </Link>
          <Link href="#" className="hover:opacity-60 transition-opacity whitespace-nowrap">
            Ask Marlene
          </Link>
          <Link href="#" className="hover:opacity-60 transition-opacity whitespace-nowrap">
            Track Your Package
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-5 shrink-0">

          {/* Currency selector — desktop */}
          <button className="hidden lg:flex items-center gap-2 text-[15px] text-brand-dark hover:opacity-70 transition-opacity">
            <Image
              src="/images/flag-uz.svg"
              alt="UZ"
              width={22}
              height={22}
              className="rounded-full object-cover"
            />
            <span>UZS so&apos;m</span>
            <Chevron />
          </button>

          {/* Language selector — desktop */}
          <button className="hidden lg:flex items-center gap-2 text-[15px] text-brand-dark hover:opacity-70 transition-opacity">
            <Image
              src="/images/flag-us.svg"
              alt="EN"
              width={22}
              height={22}
              className="rounded-full object-cover"
            />
            <span>English</span>
            <Chevron />
          </button>

          {/* Cart button — opens drawer */}
          <button
            onClick={openCart}
            className="relative flex items-center text-brand-dark hover:opacity-70 transition-opacity"
            aria-label="Open cart"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-yellow text-brand-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 text-brand-dark"
            aria-label="Menu"
          >
            <span className="block w-6 h-0.5 bg-current" />
            <span className="block w-6 h-0.5 bg-current" />
            <span className="block w-6 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-brand-dark/10 bg-white px-6 py-4 flex flex-col gap-4 text-sm text-brand-dark">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="#" onClick={() => setMenuOpen(false)}>Marlene&apos;s Selection</Link>
          <Link href="#" onClick={() => setMenuOpen(false)}>Ask Marlene</Link>
          <Link href="#" onClick={() => setMenuOpen(false)}>Track Your Package</Link>
          <div className="flex gap-5 pt-2 border-t border-brand-dark/10">
            <button className="flex items-center gap-2">
              <Image src="/images/flag-uz.svg" alt="UZ" width={20} height={20} className="rounded-full object-cover" />
              <span>UZS so&apos;m</span>
            </button>
            <button className="flex items-center gap-2">
              <Image src="/images/flag-us.svg" alt="EN" width={20} height={20} className="rounded-full object-cover" />
              <span>English</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
