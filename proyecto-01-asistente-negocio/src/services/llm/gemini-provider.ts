import { GenerationConfig, GoogleGenerativeAI } from "@google/generative-ai";

import { ENV_KEYS } from "@/config/env";
import {
  GEMINI_THINKING_CONFIG,
  LLM_PROVIDERS,
  LLM_PROVIDER_DEFAULTS,
} from "@/config/llm";

import { LlmCompletionOptions, LlmProvider } from "./llm-provider";
import { withRetry } from "./retry";

export function createGeminiProvider(): LlmProvider {
  return {
    id: LLM_PROVIDERS.GEMINI,
    isConfigured() {
      return Boolean(process.env[ENV_KEYS.GEMINI_API_KEY]);
    },
    getMissingApiKeyEnvName() {
      return ENV_KEYS.GEMINI_API_KEY;
    },
    async complete(options: LlmCompletionOptions) {
      const apiKey = process.env[ENV_KEYS.GEMINI_API_KEY];
      if (!apiKey) {
        return null;
      }

      const client = new GoogleGenerativeAI(apiKey);
      const model = client.getGenerativeModel({
        model: options.model,
        systemInstruction: options.systemPrompt,
        generationConfig: {
          temperature: options.temperature,
          maxOutputTokens: options.maxTokens,
          ...GEMINI_THINKING_CONFIG,
        } as GenerationConfig,
      });

      const contents = options.messages.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      }));

      const result = await withRetry(() => model.generateContent({ contents }));
      const text = result.response.text().trim();

      if (!text) {
        return null;
      }

      const usage = result.response.usageMetadata;

      return {
        text,
        usage: {
          promptTokens: usage?.promptTokenCount ?? 0,
          completionTokens: usage?.candidatesTokenCount ?? 0,
          totalTokens: usage?.totalTokenCount ?? 0,
        },
      };
    },
  };
}

export function resolveGeminiModel(): string {
  return (
    process.env[ENV_KEYS.GEMINI_MODEL] ??
    LLM_PROVIDER_DEFAULTS[LLM_PROVIDERS.GEMINI].model
  );
}
