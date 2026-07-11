export const LLM_PROVIDERS = {
  OPENAI: "openai",
  GEMINI: "gemini",
  GROQ: "groq",
} as const;

export type LlmProviderId =
  (typeof LLM_PROVIDERS)[keyof typeof LLM_PROVIDERS];

export const LLM_CONFIG = {
  DEFAULT_PROVIDER: LLM_PROVIDERS.GEMINI,
  TEMPERATURE: 0.3,
  MAX_TOKENS: 800,
} as const;

export const GEMINI_THINKING_CONFIG = {
  thinkingConfig: { thinkingBudget: 0 },
} as const;

export const LLM_RETRY = {
  MAX_ATTEMPTS: 3,
  BASE_DELAY_MS: 600,
} as const;

export const REPLY_CACHE = {
  TTL_MS: 30 * 60 * 1000,
  MAX_ENTRIES: 200,
} as const;

export const LLM_PROVIDER_DEFAULTS = {
  [LLM_PROVIDERS.OPENAI]: {
    model: "gpt-4o-mini",
    apiKeyEnv: "OPENAI_API_KEY",
    modelEnv: "OPENAI_MODEL",
  },
  [LLM_PROVIDERS.GEMINI]: {
    model: "gemini-2.0-flash",
    apiKeyEnv: "GEMINI_API_KEY",
    modelEnv: "GEMINI_MODEL",
  },
  [LLM_PROVIDERS.GROQ]: {
    model: "llama-3.1-8b-instant",
    apiKeyEnv: "GROQ_API_KEY",
    modelEnv: "GROQ_MODEL",
  },
} as const satisfies Record<
  LlmProviderId,
  { model: string; apiKeyEnv: string; modelEnv: string }
>;

export const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

export const GROQ_FALLBACK_MODELS = [
  "llama-3.1-8b-instant",
  "llama-3.3-70b-versatile",
  "openai/gpt-oss-20b",
] as const;
