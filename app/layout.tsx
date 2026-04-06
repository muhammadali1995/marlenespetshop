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
      <head></head>
      <body className="min-h-screen">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
