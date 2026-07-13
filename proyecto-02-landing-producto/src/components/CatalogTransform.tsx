import Image from "next/image";

import { lang } from "@/lang";

const SUPPLIER_LINES = [
  "LISTA DE LA SEMANA",
  "Bailarina roja : 8.000 (en promoción)",
  "Golfish calico de velo: 6.000 (super promo)",
  "Monjitas color: 5.000 o 6 unidades x 25.000",
  "Platy variado: 3.000 o 4 unidades en 10.000",
  "Escalar de velo: 8.000",
  "Bettas machos: 15.0000",
  "Cucha albina liss: 5.000",
];

const CATALOG_ITEMS = [
  {
    name: "Betta Halfmoon (macho)",
    price: "$38.000",
    status: "Disponible",
    note: "Un macho por pecera",
    image: "/img/catalogo/betta-halfmoon-macho.jpg",
  },
  {
    name: "Tetra neón",
    price: "$5.500",
    status: "Disponible",
    note: "Venta mínima 6 unidades",
    image: "/img/catalogo/tetra-neon-paracheirodon-innesi.jpg",
  },
  {
    name: "Guppy de velo",
    price: "$9.500",
    status: "Disponible",
    note: "Venta mínima 3 unidades",
    image: "/img/catalogo/guppy-de-velo-poecilia-reticulata.jpg",
  },
  {
    name: "Camarón Neocaridina",
    price: "$9.500",
    status: "Stock limitado",
    image: "/img/catalogo/camaron-neocaridina.jpg",
    note: "Sensible al cobre",
  },
];

export default function CatalogTransform() {
  return (
    <div className="grid grid-cols-[0.85fr_1.15fr] items-center gap-8 max-lg:grid-cols-1">
      <div className="flex flex-col gap-3">
        <span className="text-[0.7rem] font-bold uppercase tracking-widest text-text-faint">
          {lang.transform.beforeLabel}
        </span>

        <div className="rounded-2xl bg-[#e5ddd5] p-4">
          <div className="max-w-[92%] rounded-xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm">
            <p className="mb-1.5 text-[0.7rem] font-bold text-brand">
              Distribuidora Aquamar
            </p>
            <div className="flex flex-col gap-0.5">
              {SUPPLIER_LINES.map((line) => (
                <p
                  key={line}
                  className="font-mono text-[0.72rem] leading-snug text-[#111b21]"
                >
                  {line}
                </p>
              ))}
            </div>
            <p className="mt-1.5 text-right text-[0.62rem] text-[#667781]">
              11:05 a. m. ✓✓
            </p>
          </div>
        </div>

        <p className="text-[0.78rem] leading-snug text-text-faint">
          {lang.transform.beforeCaption}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-[0.7rem] font-bold uppercase tracking-widest text-brand">
          {lang.transform.afterLabel}
        </span>

        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
          {CATALOG_ITEMS.map((item) => (
            <article
              key={item.name}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-white"
            >
              <div className="relative aspect-[4/3] bg-paper">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 45vw, 22vw"
                  className="object-cover"
                />
                <span className="absolute left-1.5 top-1.5 rounded-full bg-brand px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wide text-white">
                  {item.status}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-0.5 p-2.5">
                <p className="text-[0.75rem] font-semibold leading-tight text-ink">
                  {item.name}
                </p>
                <p className="text-[0.65rem] leading-tight text-text-faint">
                  {item.note}
                </p>
                <p className="mt-auto pt-1 text-[0.9rem] font-extrabold tabular-nums text-ink">
                  {item.price}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="text-[0.78rem] leading-snug text-text-muted">
          {lang.transform.afterCaption}
        </p>
      </div>
    </div>
  );
}
