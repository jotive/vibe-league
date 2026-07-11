import { neon } from "@neondatabase/serverless";

import {
  BUSINESS_SLUG,
  DEFLECTION_MARKERS,
  FALLBACK_PRICING_USD_PER_MILLION,
  LLM_PRICING_USD_PER_MILLION,
  PROJECT_SLUG,
} from "@/config/telemetry";

import { LlmUsage } from "./llm/llm-provider";

export interface ChatEvent {
  sessionId: string;
  question: string;
  answer: string | null;
  provider: string;
  model: string;
  usage: LlmUsage;
  latencyMs: number;
  error?: string;
}

const TOKENS_PER_MILLION = 1_000_000;

export function estimateCostUsd(model: string, usage: LlmUsage): number {
  const pricing =
    LLM_PRICING_USD_PER_MILLION[
      model as keyof typeof LLM_PRICING_USD_PER_MILLION
    ] ?? FALLBACK_PRICING_USD_PER_MILLION;

  const inputCost = (usage.promptTokens / TOKENS_PER_MILLION) * pricing.input;
  const outputCost =
    (usage.completionTokens / TOKENS_PER_MILLION) * pricing.output;

  return inputCost + outputCost;
}

export function isDeflection(answer: string | null): boolean {
  if (!answer) return false;

  const normalized = answer.toLowerCase();

  return DEFLECTION_MARKERS.some((marker) => normalized.includes(marker));
}

export async function recordChatEvent(event: ChatEvent): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return;
  }

  try {
    const sql = neon(databaseUrl);

    await sql`
      insert into chat_events (
        project_slug, business_slug, session_id, question, answer,
        provider, model, prompt_tokens, completion_tokens, total_tokens,
        cost_usd, latency_ms, is_deflection, error
      ) values (
        ${PROJECT_SLUG}, ${BUSINESS_SLUG}, ${event.sessionId},
        ${event.question}, ${event.answer},
        ${event.provider}, ${event.model},
        ${event.usage.promptTokens}, ${event.usage.completionTokens},
        ${event.usage.totalTokens},
        ${estimateCostUsd(event.model, event.usage)}, ${event.latencyMs},
        ${isDeflection(event.answer)}, ${event.error ?? null}
      )
    `;
  } catch (error) {
    console.error("[telemetry] No se pudo registrar el evento:", error);
  }
}
