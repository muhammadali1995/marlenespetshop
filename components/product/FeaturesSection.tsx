import { features } from "@/lib/data";

export default function FeaturesSection() {
  return (
    <section className="bg-brand-yellow py-16 px-6">
      <div className="mx-auto max-w-[1440px]">

        {/* Heading row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <p className="text-brand-dark text-base font-normal max-w-xs">
            We couldn&apos;t find a toy that wouldn&apos;t bore cats...
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark sm:text-right leading-tight">
            So We Built One!
          </h2>
        </div>

        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {features.slice(0, 3).map((f, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] px-8 py-7">
              <h3 className="font-bold text-brand-dark text-base mb-2 text-center">{f.title}</h3>
              <p className="text-brand-dark/70 text-sm leading-relaxed text-center">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Row 2: 1 card (left-anchored) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-[2.5rem] px-8 py-7">
            <h3 className="font-bold text-brand-dark text-base mb-2 text-center">{features[3].title}</h3>
            <p className="text-brand-dark/70 text-sm leading-relaxed text-center">{features[3].description}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
