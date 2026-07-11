import { LLM_RETRY } from "@/config/llm";

const RETRYABLE_STATUS = [500, 502, 503, 504];

function isRetryable(error: unknown): boolean {
  const status = (error as { status?: number })?.status;

  if (typeof status === "number") {
    return RETRYABLE_STATUS.includes(status);
  }

  const message = error instanceof Error ? error.message : String(error);

  return RETRYABLE_STATUS.some((code) => message.includes(String(code)));
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withRetry<T>(operation: () => Promise<T>): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < LLM_RETRY.MAX_ATTEMPTS; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (!isRetryable(error) || attempt === LLM_RETRY.MAX_ATTEMPTS - 1) {
        throw error;
      }

      const backoff = LLM_RETRY.BASE_DELAY_MS * 2 ** attempt;
      console.warn(
        `[llm] Intento ${attempt + 1} fallido (reintentable). Reintentando en ${backoff}ms.`
      );

      await delay(backoff);
    }
  }

  throw lastError;
}
