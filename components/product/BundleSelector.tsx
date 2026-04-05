"use client";

import Image from "next/image";
import { bundles } from "@/lib/data";

interface BundleSelectorProps {
  selected: string;
  onChange: (id: string) => void;
}

export default function BundleSelector({ selected, onChange }: BundleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {bundles.map((bundle) => {
        const isSelected = selected === bundle.id;
        return (
          <button
            key={bundle.id}
            onClick={() => onChange(bundle.id)}
            className={`flex flex-col rounded-2xl border-2 transition-all ${
              isSelected
                ? "border-brand-yellow shadow-md"
                : "border-brand-grey-card opacity-70 hover:opacity-90"
            }`}
          >
            {/* Bundle image — text already baked in */}
            <div className="relative w-full rounded-t-2xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <Image
                src={bundle.image}
                alt={bundle.label}
                fill
                className="object-cover object-top"
              />
            </div>

            {/* What's included */}
            <div
              className={`w-full py-2 rounded-b-2xl text-xs underline text-center ${
                isSelected ? "bg-brand-yellow/30 text-brand-dark/70" : "bg-brand-grey-card text-brand-dark/50"
              }`}
            >
              What&apos;s Included?
            </div>
          </button>
        );
      })}
    </div>
  );
}
