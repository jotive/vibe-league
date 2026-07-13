import { ArrowIcon, SparkIcon } from "@/components/Icons";

const RAW_LINES = [
  "Bailarina roja : 8.000 (en promoción)",
  "Monjitas color: 5.000 o 6 unidades x 25.000",
  "Bettas machos: 15.0000",
  "15 neones x 20.000 semi jumbo",
];

const CLEAN_ROWS = [
  { name: "Bailarina roja", price: "$8.000", tag: "promo", tone: "brand" },
  { name: "Monjitas color", price: "$5.000", tag: "6 x $25.000", tone: "muted" },
  { name: "Bettas machos", price: "$15.000", tag: "cero de más", tone: "alert" },
  { name: "Neones", price: "sin precio unitario", tag: "solo paquete", tone: "alert" },
];

export default function HeroVisual() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-lg:grid-cols-1">
      <div className="wa-canvas grain rounded-2xl p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-[0.68rem] font-semibold text-white/50">
            Tu proveedor · 10:12 a. m.
          </span>
        </div>

        <div className="max-w-[95%] rounded-xl rounded-tl-sm bg-wa-bubble px-3 py-2.5 shadow-lg">
          <p className="mb-1 font-mono text-[0.68rem] font-bold text-[#0b141a]">
            LISTA DE LA SEMANA
          </p>
          {RAW_LINES.map((line) => (
            <p
              key={line}
              className="font-mono text-[0.68rem] leading-relaxed text-[#0b141a]"
            >
              {line}
            </p>
          ))}
          <p className="mt-1 text-right text-[0.6rem] text-[#667781]">✓✓</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 max-lg:rotate-90">
        <span className="flex h-11 w-11 animate-float items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_20px_rgba(18,163,122,0.4)]">
          <SparkIcon className="h-5 w-5" />
        </span>
        <ArrowIcon className="h-5 w-5 text-accent/50" />
      </div>

      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-hairline bg-surface px-4 py-2">
          <span className="text-[0.68rem] font-bold uppercase tracking-wide text-ink-faint">
            Tu catálogo
          </span>
          <span className="rounded-full bg-accent px-2 py-0.5 text-[0.6rem] font-bold text-white">
            listo
          </span>
        </div>

        <ul className="divide-y divide-hairline">
          {CLEAN_ROWS.map((row, index) => (
            <li
              key={row.name}
              style={{ animationDelay: `${index * 110}ms` }}
              className="flex animate-drop-in items-center justify-between gap-3 px-4 py-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-[0.82rem] font-semibold text-ink">
                  {row.name}
                </p>
                <span
                  className={`text-[0.66rem] font-medium ${
                    row.tone === "alert"
                      ? "text-warn"
                      : row.tone === "brand"
                        ? "text-accent"
                        : "text-ink-faint"
                  }`}
                >
                  {row.tone === "alert" ? "⚠ " : ""}
                  {row.tag}
                </span>
              </div>

              <span
                className={`shrink-0 text-[0.85rem] font-extrabold tabular-nums ${
                  row.price.startsWith("$") ? "text-ink" : "text-warn"
                }`}
              >
                {row.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
