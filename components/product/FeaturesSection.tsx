import { features } from "@/lib/data";

export default function FeaturesSection() {
  return (
    <section className="bg-brand-yellow py-16 px-6">
      <div className="mx-auto max-w-[1440px]">
        {/* Heading row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-10">
          <p className="text-brand-dark text-xl font-medium">
            We couldn&apos;t find a toy that wouldn&apos;t bore cats...
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-dark sm:text-right">
            So We Built One!
          </h2>
        </div>

        {/* Cards — 3 in top row + 1 bottom (desktop) / stacked (mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className={`bg-white rounded-[2rem] px-7 py-6 ${
                i === 3 ? "lg:col-span-1" : ""
              }`}
            >
              <h3 className="font-bold text-brand-dark text-lg mb-1 text-center">{f.title}</h3>
              <p className="text-brand-dark/70 text-sm leading-relaxed text-center">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
