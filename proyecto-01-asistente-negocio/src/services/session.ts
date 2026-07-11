"use client";

const SESSION_STORAGE_KEY = "acuario-nebula-session";

export function resolveSessionId(): string {
  if (typeof window === "undefined") {
    return "server";
  }

  const stored = window.sessionStorage.getItem(SESSION_STORAGE_KEY);

  if (stored) {
    return stored;
  }

  const created = crypto.randomUUID();
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, created);

  return created;
}
