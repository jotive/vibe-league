"use client";

import { useEffect, useState } from "react";

import { LEGAL_SOURCES } from "@/config/legal";
import { lang } from "@/lang";
import { evaluateSendingWindow, SendingWindow } from "@/services/sending-window";

function WindowBanner({ window }: { window: SendingWindow }) {
  const allowed = window.status === "allowed";

  return (
    <div
      role="status"
      className={`flex flex-col gap-1 rounded-xl border px-5 py-4 ${
        allowed
          ? "border-brand/40 bg-brand-soft"
          : "border-danger/40 bg-danger/5"
      }`}
    >
      <span
        className={`text-[0.75rem] font-bold uppercase tracking-wide ${
          allowed ? "text-brand-dark" : "text-danger"
        }`}
      >
        {allowed ? lang.legal.canSendNow : lang.legal.cannotSendNow}
      </span>

      <p className="text-[0.88rem] leading-snug text-text">{window.reason}</p>

      {window.nextWindow && (
        <p className="text-[0.82rem] font-medium text-text-muted">
          {lang.legal.nextWindow} {window.nextWindow}
        </p>
      )}
    </div>
  );
}

export default function BeforeYouSend() {
  const [window, setWindow] = useState<SendingWindow | null>(null);

  useEffect(() => {
    setWindow(evaluateSendingWindow(new Date()));
  }, []);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-extrabold tracking-tight text-ink">
          {lang.legal.title}
        </h2>
        <p className="max-w-[660px] text-[0.9rem] leading-relaxed text-text-muted">
          {lang.legal.intro}
        </p>
      </div>

      {window && <WindowBanner window={window} />}

      <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
        <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-white p-5">
          <h3 className="text-[0.9rem] font-bold text-ink">
            {lang.legal.scheduleTitle}
          </h3>
          <ul className="flex flex-col gap-1 text-[0.85rem] text-text-muted">
            {lang.legal.scheduleRules.map((rule) => (
              <li key={rule} className="flex gap-2">
                <span className="text-brand">·</span>
                {rule}
              </li>
            ))}
          </ul>
          <span className="mt-1 text-[0.7rem] text-text-faint">
            {LEGAL_SOURCES.ley2300}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-white p-5">
          <h3 className="text-[0.9rem] font-bold text-ink">
            {lang.legal.consentTitle}
          </h3>
          <p className="text-[0.85rem] leading-relaxed text-text-muted">
            {lang.legal.consentBody}
          </p>
          <span className="mt-1 text-[0.7rem] text-text-faint">
            {LEGAL_SOURCES.ley1581}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-alert/40 bg-alert-soft p-5">
        <h3 className="text-[0.9rem] font-bold text-alert">
          {lang.legal.savedNumberTitle}
        </h3>
        <p className="mt-1 text-[0.87rem] leading-relaxed text-text">
          {lang.legal.savedNumberBody}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-paper p-5">
        <h3 className="text-[0.9rem] font-bold text-ink">
          {lang.legal.sanctionTitle}
        </h3>
        <p className="mt-1 text-[0.87rem] leading-relaxed text-text-muted">
          {lang.legal.sanctionBody}
        </p>
        <span className="mt-2 block text-[0.7rem] text-text-faint">
          {LEGAL_SOURCES.sic}
        </span>
      </div>

      <div className="rounded-xl border-2 border-dashed border-border-strong p-5">
        <h3 className="text-[0.9rem] font-bold text-ink">
          {lang.legal.noFakeAdviceTitle}
        </h3>
        <p className="mt-1 text-[0.87rem] leading-relaxed text-text-muted">
          {lang.legal.noFakeAdviceBody}
        </p>
      </div>
    </section>
  );
}
