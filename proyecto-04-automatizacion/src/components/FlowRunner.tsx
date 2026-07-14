"use client";

import { FormEvent, useState } from "react";

import {
  CATALOG_LOCATIONS,
  CATALOG_SIZES,
  DAILY_MESSAGES,
  NICHES,
} from "@/config/demo";
import { lang } from "@/lang";
import { Run } from "@/services/runs";

const STEP_LABELS = lang.flow.steps.map((step) => step.title);

const INPUT =
  "w-full rounded-lg border border-line-strong bg-panel px-3.5 py-2.5 text-[0.9rem] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent";

type Phase = "idle" | "running" | "done" | "error";

function StepPill({
  index,
  label,
  phase,
  step,
}: {
  index: number;
  label: string;
  phase: Phase;
  step?: Run["steps"][number];
}) {
  const isDone = Boolean(step);
  const isFailed = step?.status === "error";
  const isActive = phase === "running" && !isDone;

  return (
    <li
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 transition-all duration-300 ${
        isFailed
          ? "border-danger/50 bg-danger/10"
          : isDone
            ? "border-ok/50 bg-ok/10"
            : isActive
              ? "animate-pulse-soft border-accent/50 bg-accent/10"
              : "border-line bg-panel"
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-bold ${
          isFailed
            ? "bg-danger text-white"
            : isDone
              ? "bg-ok text-white"
              : "border border-line-strong text-ink-faint"
        }`}
      >
        {isFailed ? "!" : isDone ? "✓" : index + 1}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span
            className={`text-[0.88rem] font-bold ${
              isDone || isFailed ? "text-ink" : "text-ink-faint"
            }`}
          >
            {label}
          </span>
          {step?.latencyMs != null && step.latencyMs > 0 && (
            <span className="num shrink-0 text-[0.7rem] text-ink-faint">
              {step.latencyMs} ms
            </span>
          )}
        </div>

        {step?.detail && (
          <p
            className={`mt-0.5 text-[0.78rem] leading-snug ${
              isFailed ? "text-danger" : "text-ink-mute"
            }`}
          >
            {step.detail}
          </p>
        )}
      </div>
    </li>
  );
}

export default function FlowRunner({ onFinished }: { onFinished: () => void }) {
  const [values, setValues] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    businessName: "",
    niche: "",
    dailyMessages: "",
    catalogLocation: "",
    catalogSize: "",
    topQuestion: "",
  });
  const [phase, setPhase] = useState<Phase>("idle");
  const [run, setRun] = useState<Run | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update(field: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (phase === "running") return;

    setPhase("running");
    setRun(null);
    setError(null);

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? lang.errors.failed);
        setPhase("error");

        return;
      }

      const detail = await fetch(`/api/runs/${data.runId}`).then((res) =>
        res.json()
      );

      setRun(detail.run);
      setPhase("done");
      onFinished();
    } catch {
      setError(lang.errors.network);
      setPhase("error");
    }
  }

  return (
    <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-2xl border border-line bg-panel p-6 max-md:p-4"
      >
        <div className="mb-1 flex flex-col gap-1">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">
            {lang.trigger.title}
          </h2>
          <p className="text-[0.85rem] leading-relaxed text-ink-mute">
            {lang.trigger.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <input
            type="text"
            required
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder={lang.trigger.fullNamePlaceholder}
            aria-label={lang.trigger.fullName}
            className={INPUT}
          />
          <input
            type="tel"
            required
            value={values.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            placeholder={lang.trigger.whatsappPlaceholder}
            aria-label={lang.trigger.whatsapp}
            className={INPUT}
          />
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder={lang.trigger.emailPlaceholder}
            aria-label={lang.trigger.email}
            className={INPUT}
          />
          <span className="text-[0.72rem] text-ink-faint">
            {lang.trigger.emailHint}
          </span>
        </div>

        <input
          type="text"
          value={values.businessName}
          onChange={(e) => update("businessName", e.target.value)}
          placeholder={lang.trigger.businessNamePlaceholder}
          aria-label={lang.trigger.businessName}
          className={INPUT}
        />

        <select
          required
          value={values.niche}
          onChange={(e) => update("niche", e.target.value)}
          aria-label={lang.trigger.niche}
          className={INPUT}
        >
          <option value="">{lang.trigger.niche}</option>
          {NICHES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={values.dailyMessages}
          onChange={(e) => update("dailyMessages", e.target.value)}
          aria-label={lang.trigger.dailyMessages}
          className={INPUT}
        >
          <option value="">{lang.trigger.dailyMessages}</option>
          {DAILY_MESSAGES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={values.catalogLocation}
          onChange={(e) => update("catalogLocation", e.target.value)}
          aria-label={lang.trigger.catalogLocation}
          className={INPUT}
        >
          <option value="">{lang.trigger.catalogLocation}</option>
          {CATALOG_LOCATIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={values.catalogSize}
          onChange={(e) => update("catalogSize", e.target.value)}
          aria-label={lang.trigger.catalogSize}
          className={INPUT}
        >
          <option value="">{lang.trigger.catalogSize}</option>
          {CATALOG_SIZES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={values.topQuestion}
          onChange={(e) => update("topQuestion", e.target.value)}
          placeholder={lang.trigger.topQuestionPlaceholder}
          aria-label={lang.trigger.topQuestion}
          className={INPUT}
        />

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-danger/40 bg-danger/10 px-3.5 py-2.5 text-[0.83rem] font-medium text-danger"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={phase === "running"}
          className="mt-1 cursor-pointer rounded-lg bg-accent px-5 py-3.5 text-[0.95rem] font-bold text-black transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {phase === "running"
            ? lang.trigger.submitting
            : lang.trigger.submit}
        </button>

        <p className="text-[0.72rem] italic text-ink-faint">
          {lang.trigger.tip}
        </p>
      </form>

      <div className="flex flex-col gap-3">
        <ol className="flex flex-col gap-2">
          {STEP_LABELS.map((label, index) => (
            <StepPill
              key={label}
              index={index}
              label={label}
              phase={phase}
              step={run?.steps.find((s) => s.position === index + 1)}
            />
          ))}
        </ol>

        {run?.suggestedMessage && (
          <div className="animate-fade-up rounded-2xl border border-accent/40 bg-accent/5 p-5">
            <p className="text-[0.7rem] font-bold uppercase tracking-wide text-accent">
              {lang.runs.messageLabel}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-[0.85rem] leading-relaxed text-ink">
              {run.suggestedMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
