import Image from "next/image";

import { LeafIcon } from "@/components/Icons";
import { lang } from "@/lang";
import {
  formatPriceCop,
  getAllSpecies,
  getStarterKits,
  getSupplies,
} from "@/services/catalog";

import Reveal from "./Reveal";
import SpeciesCatalog from "./SpeciesCatalog";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-water-dark">
      <span className="h-6 w-1 rounded-full bg-plant" />
      {children}
    </h2>
  );
}

export default function CatalogPanel() {
  const kits = getStarterKits();
  const supplies = getSupplies();

  return (
    <div className="flex flex-col gap-20">
      <section>
        <Reveal>
          <SectionTitle>{lang.landing.catalogTitle}</SectionTitle>
        </Reveal>

        <Reveal delayMs={80}>
          <SpeciesCatalog species={getAllSpecies()} />
        </Reveal>

        <p className="mt-5 text-[0.8rem] italic text-text-faint">
          {lang.landing.seeAllHint}
        </p>
      </section>

      <section>
        <Reveal>
          <SectionTitle>{lang.landing.kitsTitle}</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
          {kits.map((kit, index) => (
            <Reveal key={kit.name} delayMs={index * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(29,43,33,0.13)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                  {kit.imageUrl && (
                    <Image
                      src={kit.imageUrl}
                      alt={kit.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  <span className="absolute left-3 top-3 rounded-full bg-plant px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-white shadow-sm">
                    {kit.tankLiters}L
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="text-[1.05rem] font-semibold leading-snug text-water-dark">
                    {kit.name}
                  </h3>

                  <p className="text-[0.8rem] leading-relaxed text-text-muted">
                    {kit.idealFor}
                  </p>

                  <ul className="flex flex-col gap-1.5 text-[0.76rem] text-text-muted">
                    {kit.includes.slice(0, 4).map((included) => (
                      <li key={included} className="flex items-start gap-2">
                        <LeafIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-plant" />
                        {included}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto pt-3 text-2xl font-bold tabular-nums text-water-dark">
                    {formatPriceCop(kit.priceCop)}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <Reveal>
          <SectionTitle>{lang.landing.suppliesTitle}</SectionTitle>
        </Reveal>

        <Reveal delayMs={80}>
          <ul className="grid grid-cols-2 gap-x-10 max-md:grid-cols-1">
            {supplies.map((supply) => (
              <li
                key={supply.name}
                className="flex items-center justify-between gap-4 border-b border-border py-3.5 transition-colors hover:border-plant"
              >
                <div className="min-w-0">
                  <p className="truncate text-[0.88rem] text-text">
                    {supply.name}
                  </p>
                  <p className="text-[0.68rem] uppercase tracking-wide text-text-faint">
                    {supply.category}
                  </p>
                </div>
                <span className="shrink-0 text-[0.95rem] font-semibold tabular-nums text-water-dark">
                  {formatPriceCop(supply.priceCop)}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </div>
  );
}
