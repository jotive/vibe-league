import {
  GROQ_FALLBACK_MODELS,
  LLM_PROVIDERS,
  LlmProviderId,
} from "@/config/llm";

import { LlmProvider } from "./llm-provider";
import { createGeminiProvider } from "./gemini-provider";
import { createGroqProvider } from "./groq-provider";
import { createOpenAiProvider } from "./openai-provider";
import {
  getActiveLlmProviderId,
  resolveLlmModel,
} from "./resolve-llm-provider";

export interface LlmCandidate {
  provider: LlmProvider;
  model: string;
}

const PROVIDER_ORDER: LlmProviderId[] = [
  LLM_PROVIDERS.GROQ,
  LLM_PROVIDERS.GEMINI,
  LLM_PROVIDERS.OPENAI,
];

function createProvider(id: LlmProviderId): LlmProvider {
  if (id === LLM_PROVIDERS.GEMINI) return createGeminiProvider();
  if (id === LLM_PROVIDERS.GROQ) return createGroqProvider();

  return createOpenAiProvider();
}

function modelsFor(id: LlmProviderId): string[] {
  const configured = resolveLlmModel(id);

  if (id !== LLM_PROVIDERS.GROQ) {
    return [configured];
  }

  const extras = GROQ_FALLBACK_MODELS.filter((model) => model !== configured);

  return [configured, ...extras];
}

export function resolveCandidateChain(): LlmCandidate[] {
  const primary = getActiveLlmProviderId();
  const ordered = [primary, ...PROVIDER_ORDER.filter((id) => id !== primary)];

  return ordered.flatMap((id) => {
    const provider = createProvider(id);

    if (!provider.isConfigured()) {
      return [];
    }

    return modelsFor(id).map((model) => ({ provider, model }));
  });
}
