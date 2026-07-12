import Link from "next/link";

import { lang } from "@/lang";
import { loadAnalytics, QuestionCount } from "@/services/analytics";

export const dynamic = "force-dynamic";

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 4,
});

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const NUMBER = new Intl.NumberFormat("es-CO");

function Metric({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "neutral" | "good" | "warn";
}) {
  const toneClass =
    tone === "good"
      ? "text-stock"
      : tone === "warn"
        ? "text-coral"
        : "text-water-dark";

  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border bg-white p-5">
      <span className="text-[0.68rem] font-semibold uppercase tracking-widest text-text-faint">
        {label}
      </span>
      <span className={`text-2xl font-bold tabular-nums ${toneClass}`}>
        {value}
      </span>
      {hint && (
        <span className="text-[0.72rem] leading-snug text-text-muted">
          {hint}
        </span>
      )}
    </div>
  );
}

function QuestionList({
  title,
  description,
  questions,
  emptyText,
  accent,
}: {
  title: string;
  description: string;
  questions: QuestionCount[];
  emptyText: string;
  accent: string;
}) {
  return (
    <section className="flex flex-col rounded-xl border border-border bg-white">
      <header className="border-b border-border px-5 py-4">
        <h2 className="text-[1rem] font-semibold text-water-dark">{title}</h2>
        <p className="mt-0.5 text-[0.76rem] leading-snug text-text-muted">
          {description}
        </p>
      </header>

      {questions.length === 0 ? (
        <p className="px-5 py-6 text-[0.82rem] italic text-text-faint">
          {emptyText}
        </p>
      ) : (
        <ol className="flex flex-col">
          {questions.map((item, index) => (
            <li
              key={`${item.question}-${index}`}
              className="flex items-start gap-3 border-b border-border px-5 py-3 last:border-b-0"
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-bold ${accent}`}
              >
                {item.hits}
              </span>
              <span className="text-[0.85rem] leading-snug text-text">
                {item.question}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default async function AdminPage() {
  const { summary, topQuestions, unansweredQuestions, daily, isConfigured } =
    await loadAnalytics();

  const answered = summary.totalQueries - summary.deflectionCount;
  const answerRate =
    summary.totalQueries > 0
      ? Math.round((answered / summary.totalQueries) * 100)
      : 0;

  const cacheRate =
    summary.totalQueries > 0
      ? Math.round((summary.cachedQueries / summary.totalQueries) * 100)
      : 0;

  const costPerQuery =
    summary.totalQueries > 0 ? summary.totalCostUsd / summary.totalQueries : 0;

  const maxDailyCost = Math.max(...daily.map((d) => d.costUsd), 0.000001);

  return (
    <div className="min-h-screen bg-cream/40">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-6 py-5 max-md:px-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-water-dark">
              {lang.admin.title}
            </h1>
            <p className="mt-0.5 text-[0.8rem] text-text-muted">
              {lang.admin.subtitle}
            </p>
          </div>

          <Link
            href="/"
            className="rounded-lg border border-border-strong px-3.5 py-2 text-[0.8rem] font-medium text-text-muted transition-colors hover:border-plant hover:text-plant-dark"
          >
            {lang.admin.backToStore}
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1100px] flex-col gap-8 px-6 py-10 max-md:px-4">
        {!isConfigured && (
          <p className="rounded-xl border border-coral/40 bg-coral/10 px-5 py-4 text-[0.85rem] text-text">
            {lang.admin.notConfigured}
          </p>
        )}

        <section className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <Metric
            label={lang.admin.metricQueries}
            value={NUMBER.format(summary.totalQueries)}
            hint={`${NUMBER.format(summary.sessions)} ${lang.admin.metricSessionsHint}`}
          />
          <Metric
            label={lang.admin.metricCost}
            value={USD.format(summary.totalCostUsd)}
            hint={`${COP.format(summary.totalCostCop)} · ${USD.format(costPerQuery)} ${lang.admin.metricPerQuery}`}
          />
          <Metric
            label={lang.admin.metricAnswerRate}
            value={`${answerRate}%`}
            hint={`${NUMBER.format(summary.deflectionCount)} ${lang.admin.metricDeflectionHint}`}
            tone={answerRate >= 80 ? "good" : "warn"}
          />
          <Metric
            label={lang.admin.metricLatency}
            value={`${NUMBER.format(summary.avgLatencyMs)} ms`}
            hint={`${cacheRate}% ${lang.admin.metricCacheHint}`}
            tone={summary.avgLatencyMs < 2000 ? "good" : "warn"}
          />
        </section>

        <section className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
          <QuestionList
            title={lang.admin.unansweredTitle}
            description={lang.admin.unansweredDescription}
            questions={unansweredQuestions}
            emptyText={lang.admin.unansweredEmpty}
            accent="bg-coral/15 text-coral"
          />

          <QuestionList
            title={lang.admin.topTitle}
            description={lang.admin.topDescription}
            questions={topQuestions}
            emptyText={lang.admin.topEmpty}
            accent="bg-plant/15 text-plant-dark"
          />
        </section>

        <section className="rounded-xl border border-border bg-white">
          <header className="border-b border-border px-5 py-4">
            <h2 className="text-[1rem] font-semibold text-water-dark">
              {lang.admin.dailyTitle}
            </h2>
            <p className="mt-0.5 text-[0.76rem] text-text-muted">
              {lang.admin.dailyDescription}
            </p>
          </header>

          {daily.length === 0 ? (
            <p className="px-5 py-6 text-[0.82rem] italic text-text-faint">
              {lang.admin.dailyEmpty}
            </p>
          ) : (
            <ul className="flex flex-col gap-2.5 p-5">
              {daily.map((day) => (
                <li key={day.day} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-[0.76rem] tabular-nums text-text-muted">
                    {day.day}
                  </span>

                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-cream-deep">
                    <div
                      className="h-full rounded-full bg-water"
                      style={{
                        width: `${Math.max((day.costUsd / maxDailyCost) * 100, 2)}%`,
                      }}
                    />
                  </div>

                  <span className="w-16 shrink-0 text-right text-[0.76rem] tabular-nums text-text-muted">
                    {day.queries}
                  </span>
                  <span className="w-20 shrink-0 text-right text-[0.76rem] font-semibold tabular-nums text-water-dark">
                    {USD.format(day.costUsd)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          <Metric
            label={lang.admin.metricPromptTokens}
            value={NUMBER.format(summary.promptTokens)}
            hint={lang.admin.metricPromptTokensHint}
          />
          <Metric
            label={lang.admin.metricCompletionTokens}
            value={NUMBER.format(summary.completionTokens)}
          />
          <Metric
            label={lang.admin.metricErrors}
            value={NUMBER.format(summary.errorCount)}
            hint={lang.admin.metricErrorsHint}
            tone={summary.errorCount > 0 ? "warn" : "good"}
          />
        </section>
      </main>
    </div>
  );
}
