"use client";

import {
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";
import { MarkdownTextPrimitive } from "@assistant-ui/react-markdown";
import remarkGfm from "remark-gfm";

import { lang } from "@/lang";

function MarkdownText() {
  return (
    <MarkdownTextPrimitive
      remarkPlugins={[remarkGfm]}
      className="flex flex-col gap-2 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1 [&_ul]:pl-4 [&_ul]:list-disc [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-1 [&_ol]:pl-4 [&_ol]:list-decimal [&_strong]:font-semibold [&_strong]:text-water-dark [&_a]:text-water [&_a]:underline marker:text-plant"
    />
  );
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-end animate-fade-in-up">
      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-water px-3.5 py-2.5 text-sm leading-relaxed text-white">
        <MessagePrimitive.Parts />
      </div>
    </MessagePrimitive.Root>
  );
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-start animate-fade-in-up">
      <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-border bg-cream px-3.5 py-2.5 text-sm leading-relaxed text-text">
        <MessagePrimitive.Parts
          components={{ Text: MarkdownText, Empty: TypingDots }}
        />
      </div>
    </MessagePrimitive.Root>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      <span className="sr-only">{lang.chat.typingIndicator}</span>
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          aria-hidden
          className="h-1.5 w-1.5 animate-blink rounded-full bg-plant"
          style={{ animationDelay: `${dot * 0.18}s` }}
        />
      ))}
    </div>
  );
}

export default function Thread() {
  return (
    <ThreadPrimitive.Root className="flex min-h-0 flex-1 flex-col bg-white">
      <ThreadPrimitive.Viewport className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4 scrollbar-slim">
        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            AssistantMessage,
          }}
        />

        <ThreadPrimitive.If empty>
          <div className="flex flex-col gap-2">
            <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-text-faint">
              {lang.chat.suggestionsLabel}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {lang.chat.suggestedQuestions.map((question) => (
                <ThreadPrimitive.Suggestion
                  key={question}
                  prompt={question}
                  method="replace"
                  autoSend
                  className="cursor-pointer rounded-full border border-border-strong px-3 py-1.5 text-[0.76rem] text-text-muted transition-colors hover:border-plant hover:text-plant-dark"
                >
                  {question}
                </ThreadPrimitive.Suggestion>
              ))}
            </div>
          </div>
        </ThreadPrimitive.If>
      </ThreadPrimitive.Viewport>

      <ComposerPrimitive.Root className="flex items-end gap-2 border-t border-border bg-cream p-3">
        <ComposerPrimitive.Input
          rows={1}
          autoFocus
          placeholder={lang.chat.inputPlaceholder}
          aria-label={lang.chat.inputAriaLabel}
          className="flex-1 resize-none rounded-xl border border-border-strong bg-white px-3.5 py-2.5 text-sm leading-[22px] outline-none transition-colors placeholder:text-text-faint focus:border-water scrollbar-slim"
        />
        <ComposerPrimitive.Send
          aria-label={lang.chat.sendButtonAriaLabel}
          className="shrink-0 cursor-pointer rounded-xl bg-plant px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-plant-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {lang.chat.sendButton}
        </ComposerPrimitive.Send>
      </ComposerPrimitive.Root>
    </ThreadPrimitive.Root>
  );
}
