"use client";

import { useEffect, useState } from "react";

import { lang } from "@/lang";

const STEP_MS = 1400;

export default function ParsingSteps() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((current) =>
        Math.min(current + 1, lang.input.steps.length - 1)
      );
    }, STEP_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="panel-sunken flex flex-col gap-2 p-5">
      {lang.input.steps.map((label, index) => {
        const done = index < step;
        const active = index === step;

        return (
          <div
            key={label}
            className={`flex items-center gap-2.5 text-[0.85rem] transition-opacity ${
              done
                ? "text-ink-faint opacity-60"
                : active
                  ? "font-semibold text-ink"
                  : "text-ink-faint opacity-35"
            }`}
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold ${
                done
                  ? "bg-ok text-white"
                  : active
                    ? "animate-pulse-soft bg-accent text-white"
                    : "border border-hairline-strong"
              }`}
            >
              {done ? "✓" : ""}
            </span>
            <span className={done ? "line-through" : ""}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
