"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { lang } from "@/lang";
import { CatalogItem } from "@/schemas/catalog.schema";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export default function CatalogChat({ items }: { items: CatalogItem[] }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || thinking) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "user", content: trimmed },
    ]);
    setInput("");
    setThinking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, items }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          role: "assistant",
          content: response.ok
            ? data.reply
            : (data.error ?? lang.errors.chatFailed),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          role: "assistant",
          content: lang.errors.networkError,
        },
      ]);
    } finally {
      setThinking(false);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    ask(input);
  }

  return (
    <section className="flex animate-fade-up flex-col gap-4 rounded-2xl border border-border bg-white p-6 max-md:p-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-extrabold tracking-tight text-ink">
          {lang.chat.title}
        </h2>
        <p className="text-[0.88rem] text-text-muted">{lang.chat.subtitle}</p>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="flex h-[300px] flex-col gap-2.5 overflow-y-auto rounded-xl bg-paper p-4"
      >
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {lang.chat.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => ask(suggestion)}
                className="cursor-pointer rounded-full border border-border-strong bg-white px-3 py-1.5 text-[0.78rem] text-text-muted transition-colors hover:border-brand hover:text-brand"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.86rem] leading-relaxed ${
              message.role === "user"
                ? "self-end rounded-br-sm bg-ink text-white"
                : "self-start rounded-bl-sm border border-border bg-white text-text"
            }`}
          >
            {message.content}
          </div>
        ))}

        {thinking && (
          <div className="self-start rounded-2xl rounded-bl-sm border border-border bg-white px-4 py-3">
            <span className="sr-only">{lang.chat.thinking}</span>
            <span className="flex gap-1.5" aria-hidden>
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-brand"
                  style={{ animationDelay: `${dot * 0.18}s` }}
                />
              ))}
            </span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={lang.chat.placeholder}
          aria-label={lang.chat.placeholder}
          className="flex-1 rounded-lg border border-border-strong bg-white px-3.5 py-2.5 text-[0.9rem] outline-none transition-colors placeholder:text-text-faint focus:border-brand"
        />
        <button
          type="submit"
          disabled={thinking || !input.trim()}
          className="shrink-0 cursor-pointer rounded-lg bg-brand px-5 py-2.5 text-[0.88rem] font-bold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {lang.chat.send}
        </button>
      </form>

      <p className="text-[0.75rem] italic text-text-faint">
        {lang.chat.disclaimer}
      </p>
    </section>
  );
}
