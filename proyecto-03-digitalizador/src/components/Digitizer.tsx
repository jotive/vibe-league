"use client";

import { FormEvent, useState } from "react";

import BeforeYouSend from "@/components/BeforeYouSend";
import BroadcastPlan from "@/components/BroadcastPlan";
import CatalogChat from "@/components/CatalogChat";
import CatalogTable from "@/components/CatalogTable";
import LeadGate from "@/components/LeadGate";
import { SAMPLE_LIST } from "@/config/product";
import { lang } from "@/lang";
import { CatalogItem } from "@/schemas/catalog.schema";
import { BroadcastPlan as Plan } from "@/services/broadcast-planner";
import { downloadCsv } from "@/services/csv";

interface Result {
  items: CatalogItem[];
  plan: Plan;
}

function Stat({
  value,
  label,
  tone = "neutral",
}: {
  value: number;
  label: string;
  tone?: "neutral" | "alert" | "brand";
}) {
  const color =
    tone === "alert"
      ? "text-alert"
      : tone === "brand"
        ? "text-brand"
        : "text-ink";

  return (
    <div className="flex flex-col rounded-xl border border-border bg-white px-5 py-4">
      <span className={`text-2xl font-extrabold tabular-nums ${color}`}>
        {value}
      </span>
      <span className="text-[0.75rem] leading-tight text-text-muted">
        {label}
      </span>
    </div>
  );
}

export default function Digitizer() {
  const [rawText, setRawText] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setUnlocked(false);

    try {
      const response = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? lang.errors.parseFailed);

        return;
      }

      setResult({ items: data.items, plan: data.plan });
    } catch {
      setError(lang.errors.networkError);
    } finally {
      setLoading(false);
    }
  }

  const issues = result?.items.filter((item) => item.issue).length ?? 0;
  const promos = result?.items.filter((item) => item.promo).length ?? 0;

  return (
    <div className="flex flex-col gap-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="lista"
            className="text-[0.9rem] font-bold text-ink"
          >
            {lang.input.label}
          </label>

          <button
            type="button"
            onClick={() => setRawText(SAMPLE_LIST)}
            className="cursor-pointer text-[0.8rem] font-semibold text-brand underline underline-offset-2 hover:text-brand-dark"
          >
            {lang.input.sample}
          </button>
        </div>

        <textarea
          id="lista"
          value={rawText}
          onChange={(event) => setRawText(event.target.value)}
          placeholder={lang.input.placeholder}
          rows={9}
          className="w-full resize-y rounded-xl border border-border-strong bg-white p-4 font-mono text-[0.82rem] leading-relaxed outline-none transition-colors placeholder:text-text-faint focus:border-brand"
        />

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-danger/30 bg-danger/5 px-3.5 py-2.5 text-[0.85rem] font-medium text-danger"
          >
            {error}
          </p>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading || rawText.trim().length < 10}
            className="cursor-pointer rounded-lg bg-ink px-6 py-3.5 text-[0.95rem] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? lang.input.submitting : lang.input.submit}
          </button>

          <span className="text-[0.75rem] text-text-faint">
            {lang.input.hint}
          </span>
        </div>
      </form>

      {result && (
        <div className="flex animate-fade-up flex-col gap-12">
          <section className="flex flex-col gap-5">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">
              {lang.results.title}
            </h2>

            <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
              <Stat
                value={result.items.length}
                label={lang.results.itemsLabel}
              />
              <Stat
                value={issues}
                label={lang.results.issuesLabel}
                tone={issues > 0 ? "alert" : "neutral"}
              />
              <Stat
                value={promos}
                label={lang.results.promoLabel}
                tone="brand"
              />
            </div>

            {issues > 0 && (
              <div className="rounded-xl border border-alert/40 bg-alert-soft px-5 py-4">
                <p className="text-[0.88rem] font-bold text-alert">
                  {lang.results.issuesTitle}
                </p>
                <p className="mt-1 text-[0.85rem] leading-relaxed text-text-muted">
                  {lang.results.issuesBody}
                </p>
              </div>
            )}

            <CatalogTable items={result.items} />
          </section>

          <BroadcastPlan plan={result.plan} />

          <BeforeYouSend />

          {unlocked ? (
            <div className="flex flex-col gap-4">
              <CatalogChat items={result.items} />

              <button
                type="button"
                onClick={() => downloadCsv(result.items, "mi-catalogo.csv")}
                className="w-fit cursor-pointer rounded-lg border border-border-strong bg-white px-5 py-3 text-[0.88rem] font-bold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                {lang.gate.downloadCsv}
              </button>
            </div>
          ) : (
            <LeadGate
              parsedItems={result.items.length}
              parsedIssues={issues}
              onUnlocked={() => setUnlocked(true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
