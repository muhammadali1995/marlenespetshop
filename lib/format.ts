/** Format price as "371 000 UZS" matching the live site */
export function formatPrice(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0") + " UZS";
}
