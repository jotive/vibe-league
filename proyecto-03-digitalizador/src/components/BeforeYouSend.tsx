"use client";

import { useEffect, useState } from "react";

import { AlertIcon, ClockIcon, ShieldIcon } from "@/components/Icons";
import { LEGAL_SOURCES } from "@/config/legal";
import { lang } from "@/lang";
import { evaluateSendingWindow, SendingWindow } from "@/services/sending-window";

function Detail({
  title,
  source,
  children,
}: {
  title: string;
  source?: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group panel px-5 py-3.5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[0.9rem] font-bold text-ink marker:hidden">
        {title}
        <span className="shrink-0 text-ink-faint transition-transform group-open:rotate-45">
          +
        </span>
      </summary>

      <div className="mt-2.5 text-[0.87rem] leading-relaxed text-ink-mute">
        {children}
      </div>

      {source && (
        <p className="mt-2.5 border-t border-hairline pt-2 text-[0.68rem] leading-snug text-ink-faint">
          {source}
        </p>
      )}
    </details>
  );
}

export default function BeforeYouSend() {
  const [window, setWindow] = useState<SendingWindow | null>(null);

  useEffect(() => {
    setWindow(evaluateSendingWindow(new Date()));
  }, []);

  const allowed = window?.status === "allowed";

  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-ink">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white">
          <ShieldIcon className="h-4.5 w-4.5" />
        </span>
        {lang.legal.title}
      </h2>

      {window && (
        <div
          role="status"
          className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-white ${
            allowed ? "bg-accent" : "bg-error"
          }`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
            <ClockIcon className="h-6 w-6" />
          </span>

          <div className="flex flex-col gap-0.5">
            <span className="text-[0.7rem] font-extrabold uppercase tracking-widest text-white/75">
              {allowed ? lang.legal.canSendNow : lang.legal.cannotSendNow}
            </span>
            <p className="text-[0.9rem] font-semibold leading-snug">
              {window.reason}
            </p>
            {window.nextWindow && (
              <p className="text-[0.8rem] text-white/85">
                {lang.legal.nextWindow} {window.nextWindow}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-3 rounded-2xl border border-warn/50 bg-warn-soft px-5 py-4">
        <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-warn" />
        <div>
          <h3 className="text-[0.9rem] font-bold text-warn">
            {lang.legal.savedNumberTitle}
          </h3>
          <p className="mt-1 text-[0.87rem] leading-relaxed text-ink">
            {lang.legal.savedNumberBody}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Detail
          title={lang.legal.scheduleTitle}
          source={LEGAL_SOURCES.ley2300}
        >
          <ul className="flex flex-col gap-1">
            {lang.legal.scheduleRules.map((rule) => (
              <li key={rule} className="flex gap-2">
                <span className="font-bold text-accent">·</span>
                {rule}
              </li>
            ))}
          </ul>
        </Detail>

        <Detail title={lang.legal.consentTitle} source={LEGAL_SOURCES.ley1581}>
          {lang.legal.consentBody}
        </Detail>

        <Detail title={lang.legal.sanctionTitle} source={LEGAL_SOURCES.sic}>
          {lang.legal.sanctionBody}
        </Detail>

        <Detail title={lang.legal.noFakeAdviceTitle}>
          {lang.legal.noFakeAdviceBody}
        </Detail>
      </div>
    </section>
  );
}
