export const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

export const DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile";

export function resolveGroqModel(): string {
  return process.env.GROQ_MODEL ?? DEFAULT_GROQ_MODEL;
}
