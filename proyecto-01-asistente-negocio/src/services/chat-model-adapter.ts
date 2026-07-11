"use client";

import type { ChatModelAdapter } from "@assistant-ui/react";

import { API_PATHS } from "@/constants/api-paths";
import { parseApiErrorMessage } from "@/handlers/client-error-handler";
import { resolveSessionId } from "@/services/session";

import { ChatMessage } from "./chat-types";

function toChatMessages(
  messages: readonly { role: string; content: readonly unknown[] }[]
): ChatMessage[] {
  return messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .map((message) => ({
      role: message.role as ChatMessage["role"],
      content: message.content
        .filter(
          (part): part is { type: "text"; text: string } =>
            (part as { type?: string }).type === "text"
        )
        .map((part) => part.text)
        .join("\n")
        .trim(),
    }))
    .filter((message) => message.content.length > 0);
}

export const chatModelAdapter: ChatModelAdapter = {
  async run({ messages, abortSignal }) {
    const response = await fetch(API_PATHS.CHAT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: abortSignal,
      body: JSON.stringify({
        sessionId: resolveSessionId(),
        messages: toChatMessages(messages),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(parseApiErrorMessage(data));
    }

    return {
      content: [{ type: "text", text: data.reply as string }],
    };
  },
};
