"use client";

import { FormEvent, useState } from "react";

import {
  CATALOG_LOCATIONS,
  CATALOG_SIZES,
  DAILY_MESSAGES,
  NICHES,
} from "@/config/product";
import { lang } from "@/lang";

type FieldErrors = Record<string, string>;
type Status = "idle" | "sending" | "saved" | "duplicate";

const INITIAL = {
  fullName: "",
  whatsapp: "",
  email: "",
  businessName: "",
  niche: "",
  dailyMessages: "",
  catalogLocation: "",
  catalogSize: "",
  topQuestion: "",
};

function Field({
  label,
  hint,
  error,
  optional,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-baseline gap-2 text-[0.82rem] font-semibold text-text">
        {label}
        {optional && (
          <span className="text-[0.7rem] font-normal text-text-faint">
            {lang.form.optional}
          </span>
        )}
      </span>

      {children}

      {error ? (
        <span role="alert" className="text-[0.75rem] font-medium text-danger">
          {error}
        </span>
      ) : (
        hint && (
          <span className="text-[0.75rem] text-text-faint">{hint}</span>
        )
      )}
    </label>
  );
}

const INPUT_CLASS =
  "w-full rounded-lg border border-border-strong bg-white px-3.5 py-2.5 text-[0.92rem] text-text outline-none transition-colors placeholder:text-text-faint focus:border-brand";

export default function LeadForm({ initialCount }: { initialCount: number }) {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [count, setCount] = useState(initialCount);

  function update(field: keyof typeof INITIAL, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;

      const next = { ...prev };
      delete next[field];

      return next;
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (status === "sending") return;

    setStatus("sending");
    setFormError(null);
    setErrors({});

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.fieldErrors ?? {});
        setFormError(data.error ?? lang.form.unexpectedError);
        setStatus("idle");

        return;
      }

      if (data.status === "duplicate") {
        setStatus("duplicate");

        return;
      }

      setCount((current) => current + 1);
      setStatus("saved");
    } catch {
      setFormError(lang.form.networkError);
      setStatus("idle");
    }
  }

  if (status === "saved" || status === "duplicate") {
    const isSaved = status === "saved";

    return (
      <div
        role="status"
        className="flex animate-fade-up flex-col items-center gap-3 rounded-2xl border border-brand/30 bg-brand-soft p-10 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-xl text-white">
          ✓
        </span>
        <h3 className="text-xl font-bold text-brand-dark">
          {isSaved ? lang.form.successTitle : lang.form.duplicateTitle}
        </h3>
        <p className="max-w-[420px] text-[0.9rem] leading-relaxed text-text-muted">
          {isSaved ? lang.form.successBody : lang.form.duplicateBody}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-7 shadow-[0_18px_50px_rgba(13,17,22,0.07)] max-md:p-5"
    >
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <Field label={lang.form.fullName} error={errors.fullName}>
          <input
            type="text"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder={lang.form.fullNamePlaceholder}
            autoComplete="name"
            className={INPUT_CLASS}
          />
        </Field>

        <Field
          label={lang.form.whatsapp}
          hint={lang.form.whatsappHint}
          error={errors.whatsapp}
        >
          <input
            type="tel"
            inputMode="tel"
            value={values.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            placeholder={lang.form.whatsappPlaceholder}
            autoComplete="tel"
            className={INPUT_CLASS}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <Field
          label={lang.form.businessName}
          optional
          error={errors.businessName}
        >
          <input
            type="text"
            value={values.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            placeholder={lang.form.businessNamePlaceholder}
            className={INPUT_CLASS}
          />
        </Field>

        <Field label={lang.form.niche} error={errors.niche}>
          <select
            value={values.niche}
            onChange={(e) => update("niche", e.target.value)}
            className={INPUT_CLASS}
          >
            <option value="">{lang.form.nichePlaceholder}</option>
            {NICHES.map((niche) => (
              <option key={niche} value={niche}>
                {niche}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <Field label={lang.form.dailyMessages} optional>
          <select
            value={values.dailyMessages}
            onChange={(e) => update("dailyMessages", e.target.value)}
            className={INPUT_CLASS}
          >
            <option value="">—</option>
            {DAILY_MESSAGES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label={lang.form.catalogSize} optional>
          <select
            value={values.catalogSize}
            onChange={(e) => update("catalogSize", e.target.value)}
            className={INPUT_CLASS}
          >
            <option value="">—</option>
            {CATALOG_SIZES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={lang.form.catalogLocation} optional>
        <select
          value={values.catalogLocation}
          onChange={(e) => update("catalogLocation", e.target.value)}
          className={INPUT_CLASS}
        >
          <option value="">—</option>
          {CATALOG_LOCATIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label={lang.form.topQuestion}
        hint={lang.form.topQuestionHint}
        optional
        error={errors.topQuestion}
      >
        <input
          type="text"
          value={values.topQuestion}
          onChange={(e) => update("topQuestion", e.target.value)}
          placeholder={lang.form.topQuestionPlaceholder}
          className={INPUT_CLASS}
        />
      </Field>

      {formError && (
        <p
          role="alert"
          className="rounded-lg border border-danger/30 bg-danger/5 px-3.5 py-2.5 text-[0.82rem] font-medium text-danger"
        >
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 w-full cursor-pointer rounded-lg bg-brand px-5 py-3.5 text-[0.95rem] font-bold text-white transition-all hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? lang.form.submitting : lang.form.submit}
      </button>

      {count > 0 && (
        <p className="text-center text-[0.78rem] text-text-faint">
          {lang.form.leadsCount(count)}
        </p>
      )}
    </form>
  );
}
