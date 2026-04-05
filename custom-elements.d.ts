import type { DetailedHTMLProps, HTMLAttributes } from "react";

type CustomElement = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "cart-items": CustomElement;
      "cart-remove-button": CustomElement;
    }
  }
}
