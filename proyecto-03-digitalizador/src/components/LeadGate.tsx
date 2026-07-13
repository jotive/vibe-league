"use client";

import { FormEvent, useState } from "react";

import { lang } from "@/lang";
import { NICHES } from "@/schemas/lead.schema";

const INPUT =
  "w-full rounded-lg border border-border-strong bg-white px-3.5 py-2.5 text-[0.9rem] outline-none transition-colors placeholder:text-text-faint focus:border-brand";

export default function LeadGate({
  parsedItems,
  parsedIssues,
  onUnlocked,
}: {
  parsedItems: number;
  parsedIssues: number;
  onUnlocked: () => void;
}) {
  const [values, setValues] = useState({
    fullName: "",
    whatsapp: "",
    businessName: "",
    niche: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  function update(field: keyof typeof values, value: string) {
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
    if (sending) return;

    setSending(true);
    setFormError(null);
    setErrors({});

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, parsedItems, parsedIssues }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.fieldErrors ?? {});
        setFormError(data.error ?? lang.errors.leadFailed);
        setSending(false);

        return;
      }

      onUnlocked();
    } catch {
      setFormError(lang.errors.networkError);
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-2xl border-2 border-brand bg-brand-soft/40 p-7 max-md:p-5"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-extrabold tracking-tight text-ink">
          {lang.gate.title}
        </h2>
        <p className="text-[0.9rem] leading-relaxed text-text-muted">
          {lang.gate.body}
        </p>
        <p className="mt-1 rounded-lg border border-brand/30 bg-white px-3 py-2 text-[0.8rem] font-medium text-brand-dark">
          {lang.gate.fair}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        <label className="flex flex-col gap-1.5">
          <span className="text-[0.8rem] font-semibold">
            {lang.gate.fullName}
          </span>
          <input
            type="text"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder={lang.gate.fullNamePlaceholder}
            autoComplete="name"
            className={INPUT}
          />
          {errors.fullName && (
            <span role="alert" className="text-[0.72rem] text-danger">
              {errors.fullName}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[0.8rem] font-semibold">
            {lang.gate.whatsapp}
          </span>
          <input
            type="tel"
            inputMode="tel"
            value={values.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            placeholder={lang.gate.whatsappPlaceholder}
            autoComplete="tel"
            className={INPUT}
          />
          {errors.whatsapp && (
            <span role="alert" className="text-[0.72rem] text-danger">
              {errors.whatsapp}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[0.8rem] font-semibold">
            {lang.gate.businessName}
          </span>
          <input
            type="text"
            value={values.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            placeholder={lang.gate.businessNamePlaceholder}
            className={INPUT}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[0.8rem] font-semibold">{lang.gate.niche}</span>
          <select
            value={values.niche}
            onChange={(e) => update("niche", e.target.value)}
            className={INPUT}
          >
            <option value="">{lang.gate.nichePlaceholder}</option>
            {NICHES.map((niche) => (
              <option key={niche} value={niche}>
                {niche}
              </option>
            ))}
          </select>
          {errors.niche && (
            <span role="alert" className="text-[0.72rem] text-danger">
              {errors.niche}
            </span>
          )}
        </label>
      </div>

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
        disabled={sending}
        className="cursor-pointer rounded-lg bg-brand px-5 py-3.5 text-[0.95rem] font-bold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? lang.gate.submitting : lang.gate.submit}
      </button>
    </form>
  );
}
