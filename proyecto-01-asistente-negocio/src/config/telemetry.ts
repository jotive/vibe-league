export const PROJECT_SLUG = "proyecto-01-asistente-negocio";

export const BUSINESS_SLUG = "acuario-nebula";

export const USD_TO_COP = 4000;

export const LLM_PRICING_USD_PER_MILLION = {
  "gemini-flash-latest": { input: 0.3, output: 2.5 },
  "gemini-2.5-flash": { input: 0.3, output: 2.5 },
  "gpt-4o-mini": { input: 0.15, output: 0.6 },
  "llama-3.1-8b-instant": { input: 0.05, output: 0.08 },
} as const;

export const FALLBACK_PRICING_USD_PER_MILLION = { input: 0.3, output: 2.5 };

export const DEFLECTION_MARKERS = [
  "no tengo esa información",
  "no te puedo ayudar",
];
