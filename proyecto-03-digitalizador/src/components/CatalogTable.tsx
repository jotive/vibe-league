"use client";

import { useState } from "react";

import { AlertIcon } from "@/components/Icons";
import { lang } from "@/lang";
import { CatalogItem } from "@/schemas/catalog.schema";

function formatPrice(value: number): string {
  return `$${value.toLocaleString("es-CO")}`;
}

type RowState = "pending" | "fixed" | "kept";

function FixCard({
  item,
  onFix,
  onKeep,
}: {
  item: CatalogItem;
  onFix: () => void;
  onKeep: () => void;
}) {
  return (
    <div className="mt-1.5 flex flex-col gap-2 rounded-lg border border-hairline bg-surface-high p-2.5">
      <p className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-error">
        <AlertIcon className="h-3.5 w-3.5 shrink-0" />
        {item.issue}
      </p>

      {item.suggestedPriceCop !== null && (
        <>
          <p className="flex flex-wrap items-center gap-2 text-[0.78rem]">
            <span className="num rounded bg-error-soft px-1.5 py-0.5 text-error line-through">
              {item.rawPrice ??
                (item.priceCop !== null ? formatPrice(item.priceCop) : "?")}
            </span>
            <span className="text-ink-faint">→</span>
            <span className="num rounded bg-ok-soft px-1.5 py-0.5 font-bold text-ok">
              {formatPrice(item.suggestedPriceCop)}
            </span>
          </p>

          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={onFix}
              className="cursor-pointer rounded-md bg-ok px-2.5 py-1 text-[0.72rem] font-bold text-white transition-opacity hover:opacity-90"
            >
              {lang.results.fixIt}
            </button>
            <button
              type="button"
              onClick={onKeep}
              className="cursor-pointer rounded-md border border-hairline-strong bg-surface-high px-2.5 py-1 text-[0.72rem] font-semibold text-ink-mute transition-colors hover:border-ink-faint"
            >
              {lang.results.keepIt}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function CatalogTable({
  items,
  onApplyFix,
}: {
  items: CatalogItem[];
  onApplyFix: (index: number, price: number) => void;
}) {
  const [states, setStates] = useState<Record<number, RowState>>({});
  const [onlyIssues, setOnlyIssues] = useState(false);

  const rows = items
    .map((item, index) => ({ item, index }))
    .filter(({ item, index }) =>
      onlyIssues ? Boolean(item.issue) && states[index] !== "fixed" : true
    );

  const pendingIssues = items.filter(
    (item, index) => item.issue && !states[index]
  ).length;

  return (
    <div className="flex flex-col gap-3">
      {items.some((item) => item.issue) && (
        <label className="flex w-fit cursor-pointer items-center gap-2 text-[0.8rem] font-medium text-ink-mute">
          <input
            type="checkbox"
            checked={onlyIssues}
            onChange={(event) => setOnlyIssues(event.target.checked)}
            className="h-4 w-4 cursor-pointer accent-[var(--color-accent)]"
          />
          {lang.results.onlyIssues} ({pendingIssues})
        </label>
      )}

      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left">
          <thead>
            <tr className="border-b border-hairline bg-surface">
              <th className="px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-wider text-ink-faint">
                {lang.results.tableProduct}
              </th>
              <th className="px-4 py-2.5 text-right text-[0.68rem] font-bold uppercase tracking-wider text-ink-faint">
                {lang.results.tablePrice}
              </th>
              <th className="px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-wider text-ink-faint">
                {lang.results.tableCategory}
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map(({ item, index }, position) => {
              const state = states[index];
              const hasIssue = Boolean(item.issue) && state !== "fixed";
              const isBundleOnly = item.priceCop === null;

              return (
                <tr
                  key={`${item.name}-${index}`}
                  style={{ animationDelay: `${position * 40}ms` }}
                  className={`animate-row-in border-b border-hairline transition-colors last:border-b-0 hover:bg-surface ${
                    state === "fixed"
                      ? "animate-flash-ok"
                      : hasIssue
                        ? isBundleOnly
                          ? "bg-warn-soft"
                          : "bg-error-soft"
                        : ""
                  }`}
                >
                  <td className="px-4 py-2.5 align-top">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.88rem] font-medium text-ink">
                        {item.name}
                      </span>
                      {item.promo && (
                        <span className="rounded-full bg-accent px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-wide text-white">
                          promo
                        </span>
                      )}
                    </div>

                    {(item.bundle || item.unit) && (
                      <p className="num mt-0.5 text-[0.7rem] text-ink-faint">
                        {[item.bundle, item.unit].filter(Boolean).join(" · ")}
                      </p>
                    )}

                    {hasIssue && (
                      <FixCard
                        item={item}
                        onFix={() => {
                          if (item.suggestedPriceCop !== null) {
                            onApplyFix(index, item.suggestedPriceCop);
                          }
                          setStates((prev) => ({ ...prev, [index]: "fixed" }));
                        }}
                        onKeep={() =>
                          setStates((prev) => ({ ...prev, [index]: "kept" }))
                        }
                      />
                    )}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2.5 text-right align-top">
                    {item.priceCop !== null ? (
                      <span
                        className={`num text-[0.92rem] font-bold ${
                          hasIssue ? "text-error" : "text-ink"
                        }`}
                      >
                        {formatPrice(item.priceCop)}
                      </span>
                    ) : (
                      <span className="text-[0.75rem] font-semibold text-warn">
                        {lang.results.noPrice}
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-2.5 align-top text-[0.78rem] text-ink-mute">
                    {item.category ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
