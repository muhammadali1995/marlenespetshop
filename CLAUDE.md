# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
```

No test suite is configured.

## Stack

- **Next.js 16.2.2** — App Router only; no Pages Router
- **React 19** — all interactive components use `"use client"`
- **Tailwind CSS v4** — configured via `postcss.config.mjs`, no `tailwind.config.*`; use CSS custom properties in `globals.css` for theme values
- **Zustand 5** — cart state, persisted to `localStorage` key `marlenes-cart`
- **TypeScript 5**

## Architecture

**Single-product storefront** for Kitty Kurlz™. No backend or API — all product data is static in `lib/data.ts`.

### Routing

| Route | Purpose |
|---|---|
| `/` | Redirects to `/products/kitty-kurlz` |
| `/products/kitty-kurlz` | Product page (client component) |
| `/cart` | Cart page |
| `/checkout` | Checkout page |

### State

- **Cart items** — Zustand store in `store/cartStore.ts`. Use `useCartStore()` hook in client components. Selectors `selectTotalItems` and `selectSubtotal` are defined in the same file.
- **Cart drawer open/close** — React Context in `components/cart/CartProvider.tsx`. Use `useCart()` hook. `CartProvider` wraps the entire app in `app/layout.tsx` and also renders `CartDrawer`.

### Component organization

```
components/
  cart/       # CartProvider, CartDrawer, CartItem, CartSummary, EmptyCart
  layout/     # Header, Footer
  product/    # All product-page sections (ImageGallery, BundleSelector, etc.)
  ui/         # Generic reusables: Accordion, StarRating, EmailPopup
```

## Project Goal

Pixel-perfect recreation of the live storefront at `https://marlenespetshop.com/products/kitty-kurlz-the-interactive-mental-physical-exercise-for-cats` — product page, cart, and checkout — as a **pure frontend Next.js app**. No backend, no API calls. Only UI interactions (open/close cart drawer, bundle selection, etc.) are wired up. Must be fully responsive.

### Fonts & styles

Gilroy (self-hosted WOFF2 in `public/fonts/`) is declared in `globals.css` via `@font-face`. Baloo 2 is loaded from Google Fonts in `app/layout.tsx`. Theme tokens (colors, spacing) live as CSS custom properties in `globals.css`.
