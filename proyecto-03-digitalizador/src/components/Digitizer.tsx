"use client";

import { FormEvent, useState } from "react";

import BeforeYouSend from "@/components/BeforeYouSend";
import BroadcastPlan from "@/components/BroadcastPlan";
import CatalogChat from "@/components/CatalogChat";
import CatalogTable from "@/components/CatalogTable";
import {
  AlertIcon,
  DownloadIcon,
  ListIcon,
  SparkIcon,
  TagIcon,
} from "@/components/Icons";
import LeadGate from "@/components/LeadGate";
import ParsingSteps from "@/components/ParsingSteps";
import { SAMPLE_DISCLAIMER, SAMPLE_LIST } from "@/config/product";
import { lang } from "@/lang";
import { CatalogItem } from "@/schemas/catalog.schema";
import { BroadcastPlan as Plan, planBroadcast } from "@/services/broadcast-planner";
import { downloadCsv } from "@/services/csv";

interface Result {
  items: CatalogItem[];
  plan: Plan;
}

function Stat({
  value,
  label,
  icon,
  tone,
}: {
  value: number;
  label: string;
  icon: React.ReactNode;
  tone: "ink" | "alert" | "brand";
}) {
  const styles = {
    ink: "text-ink bg-surface",
    alert: "text-warn bg-warn-soft",
    brand: "text-accent bg-accent-soft",
  }[tone];

  return (
    <div className="panel flex items-center gap-4 px-5 py-4">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles}`}
      >
        {icon}
      </span>

      <div className="flex flex-col">
        <span className="text-2xl font-extrabold leading-none tabular-nums text-ink">
          {value}
        </span>
        <span className="mt-0.5 text-[0.74rem] leading-tight text-ink-mute">
          {label}
        </span>
      </div>
    </div>
  );
}

function SectionHead({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-ink">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white">
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function Digitizer() {
  const [rawText, setRawText] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [usedSample, setUsedSample] = useState(false);

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

  function applyFix(index: number, price: number) {
    setResult((current) => {
      if (!current) return current;

      const items = current.items.map((item, position) =>
        position === index
          ? { ...item, priceCop: price, issue: null, suggestedPriceCop: null }
          : item
      );

      return { items, plan: planBroadcast(items) };
    });
  }

  const issues = result?.items.filter((item) => item.issue).length ?? 0;
  const promos = result?.items.filter((item) => item.promo).length ?? 0;

  return (
    <div className="flex flex-col gap-14">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="lista" className="text-[0.92rem] font-bold text-ink">
            {lang.input.label}
          </label>

          <button
            type="button"
            onClick={() => {
              setRawText(SAMPLE_LIST);
              setUsedSample(true);
            }}
            className="cursor-pointer text-[0.8rem] font-semibold text-accent underline underline-offset-2 transition-colors hover:text-accent"
          >
            {lang.input.sample}
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <textarea
            id="lista"
            value={rawText}
            onChange={(event) => setRawText(event.target.value)}
            placeholder={lang.input.placeholder}
            rows={9}
            disabled={loading}
            className="w-full resize-y rounded-2xl border border-hairline-strong bg-surface-high p-4 font-mono text-[0.82rem] leading-relaxed outline-none transition-colors placeholder:text-ink-faint focus:border-accent disabled:opacity-70"
          />

        </div>

        {loading && <ParsingSteps />}

        {usedSample && (
          <p className="text-[0.75rem] italic text-ink-faint">
            {SAMPLE_DISCLAIMER}
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="flex items-center gap-2 rounded-lg border border-error/30 bg-error/5 px-3.5 py-2.5 text-[0.85rem] font-medium text-error"
          >
            <AlertIcon className="h-4 w-4 shrink-0" />
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={loading || rawText.trim().length < 10}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-[0.95rem] font-bold text-white transition-colors hover:bg-accent-hover active:bg-[#0a4a41] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <SparkIcon className="h-4.5 w-4.5" />
            {loading ? lang.input.submitting : lang.input.submit}
          </button>

          <span className="text-[0.75rem] text-ink-faint">
            {lang.input.hint}
          </span>
        </div>
      </form>

      {result && (
        <div className="flex animate-fade-up flex-col gap-14">
          <section className="flex flex-col gap-5">
            <SectionHead icon={<ListIcon />} title={lang.results.title} />

            <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
              <Stat
                value={result.items.length}
                label={lang.results.itemsLabel}
                icon={<ListIcon />}
                tone="ink"
              />
              <Stat
                value={issues}
                label={lang.results.issuesLabel}
                icon={<AlertIcon />}
                tone={issues > 0 ? "alert" : "ink"}
              />
              <Stat
                value={promos}
                label={lang.results.promoLabel}
                icon={<TagIcon />}
                tone="brand"
              />
            </div>

            {issues > 0 && (
              <div className="flex gap-3 rounded-xl border border-warn/40 bg-warn-soft px-5 py-4">
                <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-warn" />
                <div>
                  <p className="text-[0.9rem] font-bold text-warn">
                    {lang.results.issuesTitle}
                  </p>
                  <p className="mt-1 text-[0.86rem] leading-relaxed text-ink-mute">
                    {lang.results.issuesBody}
                  </p>
                </div>
              </div>
            )}

            <CatalogTable items={result.items} onApplyFix={applyFix} />
          </section>

          <BroadcastPlan plan={result.plan} />

          <BeforeYouSend />

          {unlocked ? (
            <div className="flex flex-col gap-4">
              <CatalogChat items={result.items} />

              <button
                type="button"
                onClick={() => downloadCsv(result.items, "mi-catalogo.csv")}
                className="flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-hairline-strong bg-surface-high px-5 py-3 text-[0.88rem] font-bold text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <DownloadIcon className="h-4.5 w-4.5" />
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
