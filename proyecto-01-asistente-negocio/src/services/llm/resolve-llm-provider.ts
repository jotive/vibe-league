import { ENV_KEYS } from "@/config/env";
import {
  LLM_CONFIG,
  LLM_PROVIDERS,
  LlmProviderId,
} from "@/config/llm";

import { LlmProvider } from "./llm-provider";
import { createGeminiProvider, resolveGeminiModel } from "./gemini-provider";
import { createGroqProvider, resolveGroqModel } from "./groq-provider";
import {
  createOpenAiProvider,
  resolveOpenAiModel,
} from "./openai-provider";

function parseLlmProviderId(value: string | undefined): LlmProviderId {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) {
    return LLM_CONFIG.DEFAULT_PROVIDER;
  }

  if (normalized === LLM_PROVIDERS.GEMINI) {
    return LLM_PROVIDERS.GEMINI;
  }

  if (normalized === LLM_PROVIDERS.GROQ) {
    return LLM_PROVIDERS.GROQ;
  }

  if (normalized === LLM_PROVIDERS.OPENAI) {
    return LLM_PROVIDERS.OPENAI;
  }

  return LLM_CONFIG.DEFAULT_PROVIDER;
}

export function getActiveLlmProviderId(): LlmProviderId {
  return parseLlmProviderId(process.env[ENV_KEYS.LLM_PROVIDER]);
}

export function resolveLlmProvider(): LlmProvider {
  const providerId = getActiveLlmProviderId();

  if (providerId === LLM_PROVIDERS.GEMINI) {
    return createGeminiProvider();
  }

  if (providerId === LLM_PROVIDERS.GROQ) {
    return createGroqProvider();
  }

  return createOpenAiProvider();
}

export function resolveLlmModel(providerId: LlmProviderId): string {
  if (providerId === LLM_PROVIDERS.GEMINI) {
    return resolveGeminiModel();
  }

  if (providerId === LLM_PROVIDERS.GROQ) {
    return resolveGroqModel();
  }

  return resolveOpenAiModel();
}

export function resolveLlmCompletionDefaults() {
  return {
    temperature: LLM_CONFIG.TEMPERATURE,
    maxTokens: LLM_CONFIG.MAX_TOKENS,
  };
}
