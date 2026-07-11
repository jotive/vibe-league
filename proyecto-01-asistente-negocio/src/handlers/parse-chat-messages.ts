import { ChatMessage } from "@/services/chat-types";

export function parseChatMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const messages = (body as { messages?: unknown }).messages;

  if (!Array.isArray(messages) || messages.length === 0) {
    return null;
  }

  return messages as ChatMessage[];
}
