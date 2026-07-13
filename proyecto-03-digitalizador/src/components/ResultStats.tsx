"use client";

import { AlertIcon, CheckIcon, ListIcon, TagIcon } from "@/components/Icons";
import { lang } from "@/lang";

export default function ResultStats({
  total,
  issues,
  promos,
  onlyIssues,
  onToggleIssues,
}: {
  total: number;
  issues: number;
  promos: number;
  onlyIssues: boolean;
  onToggleIssues: () => void;
}) {
  const allClear = issues === 0;

  return (
    <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-3 max-md:grid-cols-1">
      <button
        type="button"
        onClick={onToggleIssues}
        disabled={allClear}
        aria-pressed={onlyIssues}
        className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors ${
          allClear
            ? "cursor-default border-ok/40 bg-ok-soft"
            : onlyIssues
              ? "cursor-pointer border-warn bg-warn-soft"
              : "cursor-pointer border-warn/40 bg-warn-soft hover:border-warn"
        }`}
      >
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            allClear ? "bg-ok text-white" : "bg-warn text-white"
          }`}
        >
          {allClear ? <CheckIcon /> : <AlertIcon />}
        </span>

        <div className="flex flex-col">
          <span className="num text-2xl font-extrabold leading-none text-ink">
            {allClear ? "0" : issues}
          </span>
          <span className="mt-0.5 text-[0.76rem] font-semibold leading-tight text-ink">
            {allClear ? lang.results.allClear : lang.results.issuesLabel}
          </span>
          {!allClear && (
            <span className="mt-0.5 text-[0.7rem] font-medium text-warn">
              {onlyIssues ? lang.results.showAll : lang.results.onlyIssues}
            </span>
          )}
        </div>
      </button>

      <div className="panel flex items-center gap-3 px-5 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-ink-mute">
          <ListIcon className="h-4.5 w-4.5" />
        </span>
        <div className="flex flex-col">
          <span className="num text-xl font-extrabold leading-none text-ink">
            {total}
          </span>
          <span className="text-[0.72rem] leading-tight text-ink-mute">
            {lang.results.itemsLabel}
          </span>
        </div>
      </div>

      <div className="panel flex items-center gap-3 px-5 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <TagIcon className="h-4.5 w-4.5" />
        </span>
        <div className="flex flex-col">
          <span className="num text-xl font-extrabold leading-none text-ink">
            {promos}
          </span>
          <span className="text-[0.72rem] leading-tight text-ink-mute">
            {lang.results.promoLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
