import type { Metadata } from "next";
import "./globals.css";
import CartProvider from "@/components/cart/CartProvider";

export const metadata: Metadata = {
  title: "Kitty Kurlz™ — Marlene's Pet Shop",
  description:
    "The #1 interactive mental & physical exercise toy for cats. Voted by over 1300+ cat families.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
