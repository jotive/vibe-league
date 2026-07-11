import { REPLY_CACHE } from "@/config/llm";

import { ChatMessage } from "./chat-types";

interface CachedReply {
  text: string;
  expiresAt: number;
}

const cache = new Map<string, CachedReply>();

const DIACRITICS = /[̀-ͯ]/g;
const NON_ALPHANUMERIC = /[^a-z0-9\s]/g;
const EXTRA_SPACES = /\s+/g;

function normalizeQuestion(question: string): string {
  return question
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .replace(NON_ALPHANUMERIC, "")
    .replace(EXTRA_SPACES, " ")
    .trim();
}

export function isCacheable(messages: ChatMessage[]): boolean {
  return messages.filter((message) => message.role === "user").length === 1;
}

export function readCachedReply(question: string): string | null {
  const key = normalizeQuestion(question);
  const hit = cache.get(key);

  if (!hit) {
    return null;
  }

  if (hit.expiresAt < Date.now()) {
    cache.delete(key);
    return null;
  }

  return hit.text;
}

export function writeCachedReply(question: string, text: string): void {
  if (cache.size >= REPLY_CACHE.MAX_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest) cache.delete(oldest);
  }

  cache.set(normalizeQuestion(question), {
    text,
    expiresAt: Date.now() + REPLY_CACHE.TTL_MS,
  });
}
