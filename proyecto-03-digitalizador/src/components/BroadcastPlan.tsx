"use client";

import { useState } from "react";

import { lang } from "@/lang";
import { BroadcastPlan as Plan } from "@/services/broadcast-planner";

function MessageCard({
  body,
  title,
  charCount,
  itemCount,
  index,
}: {
  body: string;
  title: string;
  charCount: number;
  itemCount: number;
  index: number;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[0.75rem] font-bold text-ink-mute">
          Mensaje {index + 1} · {title}
        </span>

        <button
          type="button"
          onClick={copy}
          className="shrink-0 cursor-pointer rounded-md border border-hairline-strong bg-surface-high px-2.5 py-1 text-[0.72rem] font-semibold text-ink-mute transition-colors hover:border-accent hover:text-accent"
        >
          {copied ? lang.broadcast.copied : lang.broadcast.copyOne}
        </button>
      </div>

      <div className="wa-canvas grain rounded-xl p-3">
        <div className="max-w-[95%] rounded-xl rounded-tl-sm bg-wa-bubble px-3 py-2.5 shadow-lg">
          <pre className="whitespace-pre-wrap font-sans text-[0.8rem] leading-relaxed text-[#0b141a]">
            {body}
          </pre>
          <p className="mt-1 text-right text-[0.6rem] text-[#667781]">✓✓</p>
        </div>
      </div>

      <span className="text-[0.7rem] text-ink-faint">
        {charCount} {lang.broadcast.charsLabel} · {itemCount}{" "}
        {lang.broadcast.itemsInMessage}
      </span>
    </div>
  );
}

export default function BroadcastPlan({ plan }: { plan: Plan }) {
  const intro = plan.exceedsLimit
    ? lang.broadcast.body.replace(
        "{chars}",
        plan.singleMessageChars.toLocaleString("es-CO")
      )
    : lang.broadcast.bodyShort;

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-extrabold tracking-tight text-ink">
          {lang.broadcast.title}
        </h2>
        <p className="max-w-[640px] text-[0.9rem] leading-relaxed text-ink-mute">
          {intro}
        </p>
        <span className="text-[0.78rem] font-semibold text-accent">
          {plan.messages.length} {lang.broadcast.messagesLabel}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
        {plan.messages.map((message, index) => (
          <MessageCard
            key={message.title}
            index={index}
            title={message.title}
            body={message.body}
            charCount={message.charCount}
            itemCount={message.itemCount}
          />
        ))}
      </div>
    </section>
  );
}
