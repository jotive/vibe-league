import { lang } from "@/lang";
import { CatalogItem } from "@/schemas/catalog.schema";

function formatPrice(value: number): string {
  return `$${value.toLocaleString("es-CO")}`;
}

export default function CatalogTable({ items }: { items: CatalogItem[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="bg-paper">
            <th className="px-4 py-3 text-[0.72rem] font-bold uppercase tracking-wide text-text-faint">
              {lang.results.tableProduct}
            </th>
            <th className="px-4 py-3 text-right text-[0.72rem] font-bold uppercase tracking-wide text-text-faint">
              {lang.results.tablePrice}
            </th>
            <th className="px-4 py-3 text-[0.72rem] font-bold uppercase tracking-wide text-text-faint">
              {lang.results.tableCategory}
            </th>
            <th className="px-4 py-3 text-[0.72rem] font-bold uppercase tracking-wide text-text-faint">
              {lang.results.tableNote}
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr
              key={`${item.name}-${index}`}
              className={`border-t border-border ${
                item.issue ? "bg-alert-soft" : "bg-white"
              }`}
            >
              <td className="px-4 py-2.5">
                <span className="text-[0.88rem] font-medium text-ink">
                  {item.name}
                </span>
                {item.promo && (
                  <span className="ml-2 rounded-full bg-brand px-1.5 py-0.5 text-[0.6rem] font-bold uppercase text-white">
                    promo
                  </span>
                )}
                {(item.bundle || item.unit) && (
                  <p className="text-[0.72rem] text-text-faint">
                    {[item.bundle, item.unit].filter(Boolean).join(" · ")}
                  </p>
                )}
              </td>

              <td className="whitespace-nowrap px-4 py-2.5 text-right">
                {item.priceCop !== null ? (
                  <span className="text-[0.9rem] font-bold tabular-nums text-ink">
                    {formatPrice(item.priceCop)}
                  </span>
                ) : (
                  <span className="text-[0.78rem] italic text-alert">
                    {lang.results.noPrice}
                  </span>
                )}
              </td>

              <td className="px-4 py-2.5 text-[0.78rem] text-text-muted">
                {item.category ?? "—"}
              </td>

              <td className="px-4 py-2.5">
                {item.issue ? (
                  <div className="flex flex-col">
                    <span className="text-[0.78rem] font-semibold text-alert">
                      ⚠ {item.issue}
                    </span>
                    {item.suggestedPriceCop !== null && (
                      <span className="text-[0.72rem] text-text-muted">
                        {lang.results.suggested(
                          formatPrice(item.suggestedPriceCop)
                        )}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-[0.78rem] text-text-faint">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
