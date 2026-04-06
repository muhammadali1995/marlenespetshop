import { features } from "@/lib/data";

export default function FeaturesSection() {
  return (
    <section className="bg-white lg:bg-brand-yellow py-9 px-6">
      <div className="mx-auto max-w-[1440px]">

        {/* Heading row — desktop */}
        <div className="hidden lg:flex lg:items-end lg:justify-between gap-4 mb-10">
          <p className="text-brand-dark text-xl font-normal">
            We couldn&apos;t find a toy that wouldn&apos;t bore cats...
          </p>
          <h2 className="text-3xl text-brand-dark lg:text-right leading-tight">
            So We Built One!
          </h2>
        </div>

        {/* Heading — mobile */}
        <div className="lg:hidden flex flex-col items-center gap-4 mb-8">
          <p className="text-brand-dark text-lg text-center">
            We couldn&apos;t find a toy that wouldn&apos;t bore cats...
          </p>
          <h2 className="bg-brand-yellow rounded-full px-8 py-4 text-2xl font-bold text-brand-dark text-center">
            So We Built One!
          </h2>
        </div>

        {/* Mobile: stacked alternating cards */}
        <div className="lg:hidden flex flex-col gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className={`bg-brand-yellow px-8 py-6 ${i % 2 === 0 ? "rounded-r-full -ml-6 mr-10" : "rounded-l-full ml-10 -mr-6"}`}
            >
              <h3 className="font-bold text-brand-dark text-lg mb-2">{f.title}</h3>
              <p className="text-brand-dark text-base leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Desktop: grid layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-2 mb-2">
          {features.slice(0, 3).map((f, i) => (
            <div key={i} className="bg-white rounded-full p-8">
              <h3 className="font-bold text-brand-dark text-lg mb-3 text-center">{f.title}</h3>
              <p className="text-brand-dark/70 text-xl leading-relaxed text-center">{f.description}</p>
            </div>
          ))}
        </div>
        <div className="hidden lg:grid lg:grid-cols-3 gap-2">
          <div className="bg-white rounded-full p-8">
            <h3 className="font-bold text-brand-dark text-lg mb-3 text-center">{features[3].title}</h3>
            <p className="text-brand-dark/70 text-xl leading-relaxed text-center">{features[3].description}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
