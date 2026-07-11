"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { lang } from "@/lang";
import { AvailabilityItem, AvailabilityStatus } from "@/schemas/knowledge-base.schema";
import { discountPercent, formatPriceCop } from "@/services/catalog";

const ALL_CATEGORIES = "Todas";

const STATUS_STYLES: Record<AvailabilityStatus, string> = {
  disponible: "bg-stock text-white",
  agotado: "bg-text-faint text-white",
  por_encargo: "bg-coral text-white",
  temporada: "bg-water text-white",
};

function StatusBadge({ status }: { status: AvailabilityStatus }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide shadow-sm ${STATUS_STYLES[status]}`}
    >
      {lang.availability[status]}
    </span>
  );
}

export default function SpeciesCatalog({
  species,
}: {
  species: AvailabilityItem[];
}) {
  const categories = useMemo(() => {
    const found = new Set(species.map((item) => item.category ?? "Otros"));

    return [ALL_CATEGORIES, ...[...found].sort()];
  }, [species]);

  const [active, setActive] = useState(ALL_CATEGORIES);

  const visible = useMemo(() => {
    if (active === ALL_CATEGORIES) return species;

    return species.filter((item) => (item.category ?? "Otros") === active);
  }, [active, species]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = category === active;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[0.78rem] font-medium transition-all ${
                isActive
                  ? "border-plant bg-plant text-white shadow-[0_4px_14px_rgba(122,169,60,0.35)]"
                  : "border-border-strong bg-white text-text-muted hover:border-plant hover:text-plant-dark"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {visible.map((item) => {
          const discount = discountPercent(item);

          return (
            <article
              key={item.name}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-plant hover:shadow-[0_16px_36px_rgba(29,43,33,0.13)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                      item.status === "agotado" ? "opacity-50 grayscale" : ""
                    }`}
                  />
                )}

                <div className="absolute left-2 top-2 flex flex-col gap-1">
                  <StatusBadge status={item.status} />
                </div>

                {discount > 0 && (
                  <span className="promo-shimmer absolute right-2 top-2 animate-shimmer rounded-full bg-sale px-2 py-0.5 text-[0.65rem] font-bold text-white shadow-sm">
                    -{discount}%
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-1.5 p-3.5">
                <h3 className="text-[0.86rem] font-medium leading-snug text-text">
                  {item.name}
                </h3>

                <p className="line-clamp-2 text-[0.72rem] leading-snug text-text-muted">
                  {item.notes}
                </p>

                <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-2">
                  <span className="text-[1.05rem] font-bold tabular-nums text-water-dark">
                    {formatPriceCop(item.priceCop)}
                  </span>

                  {item.originalPriceCop && (
                    <span className="text-[0.75rem] tabular-nums text-text-faint line-through">
                      {formatPriceCop(item.originalPriceCop)}
                    </span>
                  )}

                  <span className="text-[0.68rem] text-text-faint">
                    / {lang.landing.unitLabel}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
