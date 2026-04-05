"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCartStore, selectTotalItems } from "@/store/cartStore";
import { useCart } from "@/components/cart/CartProvider";

/* ─── Icons ────────────────────────────────────────────────── */

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 7H18.5604C19.8225 7 20.7691 8.15465 20.5216 9.39223L19.3216 15.3922C19.1346 16.3271 18.3138 17 17.3604 17H7.61683C6.67376 17 5.85883 16.3412 5.66123 15.4191L3.16939 3.79047C3.07059 3.3294 2.66312 3 2.19158 3H1.5"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      />
      <circle cx="7" cy="20" r="1" fill="currentColor" />
      <circle cx="18" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none">
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z"
        fill="currentColor"
      />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 19L17 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
      <path d="M5 6L0 1L0.7 0.3L5 4.6L9.3 0.3L10 1L5 6Z" />
    </svg>
  );
}

function DrawerCartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M6 6h15l-1.5 9h-11L6 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L5 3H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="19" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="19" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/* ─── Nav links ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Marlene's Selection", href: "/collections/marlenes-top-picks-2024" },
  { label: "Ask Marlene", href: "/pages/contact" },
  { label: "Track Your Package", href: "/pages/track-package" },
];

/* ─── Component ─────────────────────────────────────────────── */
export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore(selectTotalItems);
  const { openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      {/* ── Mobile Drawer ─────────────────────────────────────── */}

      {/* Backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 bg-black/50 z-[1000] transition-[opacity,visibility] duration-300 ${
          drawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer panel — font: Baloo 2 per original CSS */}
      <div
        style={{ fontFamily: '"Baloo 2", "Comic Sans MS", cursive, sans-serif' }}
        className={`fixed inset-y-0 left-0 w-full bg-white z-[1001] flex flex-col transition-transform duration-200 overflow-y-auto ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f0f0f0] shrink-0 w-full">
          {/* Close button — 1.5px border per original CSS */}
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center w-[42px] h-[42px] rounded-full text-[#333] hover:border-[#ccc] hover:bg-[#fafafa] transition-all duration-200 shrink-0"
            style={{ border: "1.5px solid #e5e5e5" }}
          >
            <CloseIcon />
          </button>

          {/* Logo */}
          <Link href="/" onClick={() => setDrawerOpen(false)} className="flex items-center shrink-0 ml-1">
            <Image src="/images/marleneslogo.svg" alt="Marlene's" width={120} height={28} />
          </Link>

          <div className="flex-1 min-w-[50px]" />

          {/* Cart icon in drawer */}
          <button
            onClick={() => { setDrawerOpen(false); openCart(); }}
            aria-label="Cart"
            className="relative flex items-center justify-center text-[#333] shrink-0 p-2 ml-auto"
          >
            <DrawerCartIcon />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-brand-yellow text-[#333] text-[0.65rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Drawer content */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Nav */}
          <nav className="px-5 py-4 shrink-0">
            <ul className="flex flex-col gap-1 list-none m-0 p-0">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center gap-4 px-5 py-4 text-[1.35rem] font-bold rounded-[14px] transition-all duration-200 ${
                        isActive
                          ? "bg-[#FFF8E7] text-brand-yellow"
                          : "text-[#333] hover:bg-[#FFF8E7] hover:text-brand-yellow"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-5 flex-1 flex flex-col overflow-hidden relative">
            {/* Language & currency pill selectors — 1.5px border, with arrows */}
            <div className="flex items-center justify-between gap-4 w-full">
              <button
                className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full text-[0.95rem] font-medium text-[#333] hover:border-[#ccc] hover:bg-[#fafafa] transition-all duration-200"
                style={{ border: "1.5px solid #e5e5e5" }}
              >
                <img
                  src="https://cdn.shopify.com/static/images/flags/us.svg"
                  alt="English"
                  width={26}
                  height={26}
                  className="rounded-full object-cover border border-[#eee] shrink-0"
                />
                <span>English</span>
                <span className="text-[#999] ml-1"><ChevronDown /></span>
              </button>
              <button
                className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full text-[0.95rem] font-medium text-[#333] hover:border-[#ccc] hover:bg-[#fafafa] transition-all duration-200"
                style={{ border: "1.5px solid #e5e5e5" }}
              >
                <img
                  src="/images/flag-us.svg"
                  alt="United States"
                  width={26}
                  height={26}
                  className="rounded-full object-cover border border-[#eee] shrink-0"
                />
                <span>USD $</span>
                <span className="text-[#999] ml-1"><ChevronDown /></span>
              </button>
            </div>

            {/* Spacer */}
            <div className="flex flex-1 min-h-[40px]" />

            {/* Social icons */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <a
                href="https://facebook.com/marlenespetshop"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-12 h-12 rounded-[14px] border border-[#e5e5e5] flex items-center justify-center text-brand-yellow hover:scale-105 transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/marlenespetshop"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-[14px] border border-[#e5e5e5] flex items-center justify-center text-brand-yellow hover:scale-105 transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>

            {/* Contact email */}
            <div className="flex items-center justify-center gap-2 text-[0.95rem] text-[#333] mb-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" className="text-brand-yellow shrink-0">
                <path d="M3 18V12a9 9 0 1 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" />
                <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
              </svg>
              <a href="mailto:help@marlenespetshop.com" className="text-[#333] no-underline">
                help@marlenespetshop.com
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center text-[0.85rem] text-brand-yellow font-medium mb-4">
              © 2026 Marlene&apos;s Pet Shop
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Header Bar ─────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 bg-white border-b border-[#e5e5e5] transition-shadow ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        {/* Mobile: flex | Desktop: CSS grid matching live site (auto 1fr auto, gap 25px) */}
        <div
          className="relative mx-auto max-w-[1500px] px-[25px] py-[20px] h-[92px] flex items-center gap-4 min-[990px]:grid min-[990px]:items-center min-[990px]:gap-x-[25px] font-[Gilroy] text-[18px] text-[#0D0A0BBF]"
          style={{ gridTemplateAreas: '"heading navigation icons"', gridTemplateColumns: 'auto 1fr auto' }}
        >

          {/* Hamburger — hidden at 990px+ */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="min-[990px]:hidden flex items-center justify-center -ml-2 p-2 text-[#0D0A0BBF] hover:opacity-70 transition-opacity shrink-0"
            aria-label="Menu"
          >
            <HamburgerIcon />
          </button>

          {/* Logo — centered on mobile, grid-area "heading" on desktop */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 min-[990px]:static min-[990px]:translate-x-0 shrink-0 flex items-center"
            style={{ gridArea: 'heading' }}
          >
            <Image src="/images/marleneslogo.svg" alt="Marlene's Pet Shop" width={130} height={27} priority />
          </Link>

          {/* Nav — desktop only: display:block text-align:center, ul inline-flex (matches live site) */}
          <nav
            className="hidden min-[990px]:block text-center"
            style={{ gridArea: 'navigation' }}
          >
            <ul className="inline-flex list-none m-0 p-0">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center px-[15px] py-[15px] tracking-[0.75px] font-normal whitespace-nowrap transition-all duration-200 ${
                      pathname === link.href ? "text-brand-yellow" : "hover:text-brand-yellow"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right actions — grid-area "icons", justify-self end */}
          <div
            className="flex items-center gap-3 shrink-0 ml-auto min-[990px]:ml-0 min-[990px]:justify-self-end"
            style={{ gridArea: 'icons' }}
          >

            {/* Currency selector — desktop only (990px+) */}
            <button className="hidden min-[990px]:flex items-center gap-[6.25px] tracking-[0.5px] hover:opacity-70 transition-opacity">
              <GlobeIcon />
              <span>USD $</span>
              <ChevronDown />
            </button>

            {/* Language selector — desktop only (990px+) */}
            <button className="hidden min-[990px]:flex items-center gap-[6.25px] tracking-[0.5px] hover:opacity-70 transition-opacity">
              <img
                src="/images/flag-us.svg"
                alt="English"
                width={20}
                height={20}
                className="rounded-full object-cover w-5 h-5"
              />
              <span>English</span>
              <ChevronDown />
            </button>

            {/* Search — desktop only */}
            <button
              className="hidden min-[990px]:flex hover:opacity-70 transition-opacity"
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center hover:opacity-70 transition-opacity"
              aria-label="Open cart"
            >
              <CartIcon />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-yellow text-brand-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
