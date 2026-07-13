"use client";

import { useCallback, useEffect, useState } from "react";

import FlowRunner from "@/components/FlowRunner";
import RunHistory from "@/components/RunHistory";
import { lang } from "@/lang";
import { Run, RunsSummary } from "@/services/runs";

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col rounded-xl border border-line bg-panel px-5 py-4">
      <span className="num text-2xl font-extrabold leading-none text-accent">
        {value}
      </span>
      <span className="mt-1 text-[0.72rem] leading-tight text-ink-mute">
        {label}
      </span>
    </div>
  );
}

export default function MachineRoom({
  initialRuns,
  initialSummary,
}: {
  initialRuns: Run[];
  initialSummary: RunsSummary;
}) {
  const [runs, setRuns] = useState(initialRuns);
  const [summary, setSummary] = useState(initialSummary);

  const refresh = useCallback(async () => {
    try {
      const data = await fetch("/api/runs").then((res) => res.json());

      setRuns(data.runs);
      setSummary(data.summary);
    } catch {
      // si falla el refresco, seguimos mostrando lo último que teníamos
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(refresh, 15000);

    return () => clearInterval(timer);
  }, [refresh]);

  return (
    <div className="flex flex-col gap-14">
      <section className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
        <Stat value={summary.total} label={lang.summary.total} />
        <Stat value={summary.hot} label={lang.summary.hot} />
        <Stat value={summary.avgScore} label={lang.summary.avgScore} />
        <Stat value={summary.avgSeconds} label={lang.summary.avgTime} />
      </section>

      <FlowRunner onFinished={refresh} />

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-extrabold tracking-tight text-ink">
          {lang.runs.title}
        </h2>
        <RunHistory runs={runs} />
      </section>
    </div>
  );
}
