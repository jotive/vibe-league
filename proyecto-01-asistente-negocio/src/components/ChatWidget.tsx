"use client";

import {
  AssistantModalPrimitive,
  AssistantRuntimeProvider,
  useLocalRuntime,
} from "@assistant-ui/react";
import { useEffect, useState } from "react";

import { CHAT_OPEN_EVENT } from "@/constants/chat";
import { lang } from "@/lang";
import { chatModelAdapter } from "@/services/chat-model-adapter";
import { knowledgeBase } from "@/services/knowledge-base.loader";

import Thread from "./Thread";

export default function ChatWidget() {
  const runtime = useLocalRuntime(chatModelAdapter);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function open() {
      setIsOpen(true);
    }

    window.addEventListener(CHAT_OPEN_EVENT, open);

    return () => window.removeEventListener(CHAT_OPEN_EVENT, open);
  }, []);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <AssistantModalPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <AssistantModalPrimitive.Anchor className="fixed bottom-5 right-5 z-50">
          <AssistantModalPrimitive.Trigger
            aria-label={lang.chat.openWidget}
            className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-water text-2xl text-white shadow-[0_10px_28px_rgba(31,45,61,0.35)] transition-transform hover:scale-105 data-[state=open]:scale-95"
          >
            <span className="group-data-[state=open]:hidden">🐠</span>
            <span className="hidden group-data-[state=open]:inline">✕</span>
          </AssistantModalPrimitive.Trigger>
        </AssistantModalPrimitive.Anchor>

        <AssistantModalPrimitive.Content
          sideOffset={16}
          className="z-50 flex h-[560px] w-[390px] max-sm:h-[70vh] max-sm:w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_60px_rgba(29,43,33,0.28)] data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-fade-in-up"
        >
          <header className="flex items-center gap-3 border-b border-border bg-water-dark px-4 py-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-plant text-lg">
              🐠
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-water-dark bg-stock" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-[0.92rem] font-semibold text-white">
                {lang.chat.assistantHeaderPrefix} {knowledgeBase.business.name}
              </h2>
              <p className="truncate text-[0.72rem] text-white/70">
                {lang.chat.headerSubtitle}
              </p>
            </div>
          </header>

          <Thread />
        </AssistantModalPrimitive.Content>
      </AssistantModalPrimitive.Root>
    </AssistantRuntimeProvider>
  );
}
