"use client";

import { useState } from "react";

import { DesktopIcon, PhoneIcon, RestartIcon } from "@/components/Icons";
import ProtoApp from "@/components/ProtoApp";
import { lang } from "@/lang";

type Mode = "mobile" | "desktop";

function StatusBar() {
  return (
    <div className="relative flex h-9 shrink-0 items-center justify-between bg-white px-5 pt-1">
      <span className="num text-[0.7rem] font-bold text-ink">9:14</span>

      <span
        aria-hidden
        className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#0b1310]"
      />

      <span aria-hidden className="flex items-center gap-1 text-ink">
        <svg viewBox="0 0 18 12" className="h-2.5 w-4 fill-current">
          <rect x="0" y="8" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-2.5 w-3.5 fill-current">
          <path d="M8 11.2 0.8 4a10 10 0 0 1 14.4 0L8 11.2Z" />
        </svg>
        <svg viewBox="0 0 26 12" className="h-2.5 w-6">
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="11"
            rx="3"
            className="fill-none stroke-current"
            strokeWidth="1"
          />
          <rect x="2" y="2" width="16" height="8" rx="1.5" className="fill-current" />
          <path d="M24 4.5v3a2 2 0 0 0 0-3Z" className="fill-current" />
        </svg>
      </span>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[382px] shrink-0 rounded-[42px] border-[10px] border-[#0b1310] bg-[#0b1310] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] max-sm:w-full max-sm:rounded-[32px] max-sm:border-[6px]">
      <div className="relative flex h-[740px] flex-col overflow-hidden rounded-[32px] bg-canvas max-sm:h-[660px] max-sm:rounded-[26px]">
        <StatusBar />
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[940px] overflow-hidden rounded-2xl border border-white/10 bg-[#0b1310] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <div className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
            <span
              key={color}
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="mx-auto flex w-full max-w-[280px] items-center justify-center rounded-md bg-white/5 px-3 py-1">
          <span className="num text-[0.68rem] text-white/40">
            {lang.device.url}
          </span>
        </div>
      </div>

      <div className="h-[600px] overflow-hidden bg-canvas max-md:h-[520px]">
        {children}
      </div>
    </div>
  );
}

export default function Stage() {
  const [mode, setMode] = useState<Mode>("mobile");
  const [runId, setRunId] = useState(0);

  const app = <ProtoApp key={runId} mode={mode} onReset={() => setRunId((n) => n + 1)} />;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
          {(
            [
              { id: "mobile", label: lang.toggle.mobile, icon: <PhoneIcon className="h-4 w-4" /> },
              { id: "desktop", label: lang.toggle.desktop, icon: <DesktopIcon className="h-4 w-4" /> },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setMode(option.id)}
              aria-pressed={mode === option.id}
              className={`flex cursor-pointer items-center gap-2 rounded-lg px-3.5 py-2 text-[0.8rem] font-bold transition-colors ${
                mode === option.id
                  ? "bg-live text-stage"
                  : "text-canvas/50 hover:text-canvas"
              }`}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setRunId((n) => n + 1)}
          className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2.5 text-[0.78rem] font-semibold text-canvas/50 transition-colors hover:border-white/25 hover:text-canvas"
        >
          <RestartIcon className="h-4 w-4" />
          {lang.device.reset}
        </button>
      </div>

      <p className="max-w-[440px] text-center text-[0.75rem] leading-snug text-canvas/40">
        {lang.toggle.hint}
      </p>

      {mode === "mobile" ? (
        <PhoneFrame>{app}</PhoneFrame>
      ) : (
        <BrowserFrame>{app}</BrowserFrame>
      )}
    </div>
  );
}
