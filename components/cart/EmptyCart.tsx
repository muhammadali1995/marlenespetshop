import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-32">
      <p className="text-3xl font-bold text-brand-dark">Your cart is empty</p>
      <Link
        href="/products/kitty-kurlz"
        className="rounded-full border-2 border-brand-yellow px-8 py-3 font-semibold text-brand-dark hover:bg-brand-yellow transition-colors"
      >
        Continue shopping
      </Link>
    </div>
  );
}
