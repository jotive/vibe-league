"use client";

import { useEffect, useState } from "react";

import { AlertIcon, ClockIcon, ShieldIcon } from "@/components/Icons";
import { LEGAL_SOURCES } from "@/config/legal";
import { lang } from "@/lang";
import { evaluateSendingWindow, SendingWindow } from "@/services/sending-window";

function TrafficLight({ window }: { window: SendingWindow }) {
  const allowed = window.status === "allowed";

  return (
    <div
      role="status"
      className={`grain flex items-center gap-5 overflow-hidden rounded-2xl px-6 py-5 ${
        allowed ? "bg-accent text-white" : "bg-error text-white"
      }`}
    >
      <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface-high/15">
        <span
          className={`absolute inset-0 rounded-full ${
            allowed ? "animate-pulse-soft bg-surface-high/20" : ""
          }`}
        />
        <ClockIcon className="relative h-7 w-7" />
      </span>

      <div className="flex flex-col gap-0.5">
        <span className="text-[0.72rem] font-extrabold uppercase tracking-widest text-white/75">
          {allowed ? lang.legal.canSendNow : lang.legal.cannotSendNow}
        </span>
        <p className="text-[0.95rem] font-semibold leading-snug">
          {window.reason}
        </p>
        {window.nextWindow && (
          <p className="text-[0.82rem] text-white/80">
            {lang.legal.nextWindow} {window.nextWindow}
          </p>
        )}
      </div>
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
        <h2 className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white">
            <ShieldIcon />
          </span>
          {lang.legal.title}
        </h2>
        <p className="max-w-[680px] text-[0.92rem] leading-relaxed text-ink-mute">
          {lang.legal.intro}
        </p>
      </div>

      {window && <TrafficLight window={window} />}

      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <div className="panel flex flex-col gap-2 p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <ClockIcon className="h-4.5 w-4.5" />
          </span>
          <h3 className="text-[0.95rem] font-bold text-ink">
            {lang.legal.scheduleTitle}
          </h3>
          <ul className="flex flex-col gap-1 text-[0.85rem] text-ink-mute">
            {lang.legal.scheduleRules.map((rule) => (
              <li key={rule} className="flex gap-2">
                <span className="font-bold text-accent">·</span>
                {rule}
              </li>
            ))}
          </ul>
          <span className="mt-1 text-[0.68rem] leading-snug text-ink-faint">
            {LEGAL_SOURCES.ley2300}
          </span>
        </div>

        <div className="panel flex flex-col gap-2 p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <ShieldIcon className="h-4.5 w-4.5" />
          </span>
          <h3 className="text-[0.95rem] font-bold text-ink">
            {lang.legal.consentTitle}
          </h3>
          <p className="text-[0.85rem] leading-relaxed text-ink-mute">
            {lang.legal.consentBody}
          </p>
          <span className="mt-auto pt-1 text-[0.68rem] leading-snug text-ink-faint">
            {LEGAL_SOURCES.ley1581}
          </span>
        </div>
      </div>

      <div className="flex gap-3 rounded-2xl border-2 border-warn/40 bg-warn-soft p-5">
        <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-warn" />
        <div>
          <h3 className="text-[0.95rem] font-bold text-warn">
            {lang.legal.savedNumberTitle}
          </h3>
          <p className="mt-1 text-[0.88rem] leading-relaxed text-ink">
            {lang.legal.savedNumberBody}
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-ink p-6 text-white">
        <h3 className="text-[0.95rem] font-bold">{lang.legal.sanctionTitle}</h3>
        <p className="mt-1.5 text-[0.9rem] leading-relaxed text-white/70">
          {lang.legal.sanctionBody}
        </p>
        <span className="mt-3 block text-[0.68rem] leading-snug text-white/40">
          {LEGAL_SOURCES.sic}
        </span>
      </div>

      <div className="rounded-2xl border-2 border-dashed border-hairline-strong bg-surface p-6">
        <h3 className="text-[0.95rem] font-bold text-ink">
          {lang.legal.noFakeAdviceTitle}
        </h3>
        <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-mute">
          {lang.legal.noFakeAdviceBody}
        </p>
      </div>
    </section>
  );
}
