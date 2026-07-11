import OpenAI from "openai";

import { ENV_KEYS } from "@/config/env";
import { GROQ_BASE_URL, LLM_PROVIDERS, LLM_PROVIDER_DEFAULTS } from "@/config/llm";

import { LlmCompletionOptions, LlmProvider } from "./llm-provider";

export function createGroqProvider(): LlmProvider {
  return {
    id: LLM_PROVIDERS.GROQ,
    isConfigured() {
      return Boolean(process.env[ENV_KEYS.GROQ_API_KEY]);
    },
    getMissingApiKeyEnvName() {
      return ENV_KEYS.GROQ_API_KEY;
    },
    async complete(options: LlmCompletionOptions) {
      const apiKey = process.env[ENV_KEYS.GROQ_API_KEY];
      if (!apiKey) {
        return null;
      }

      const client = new OpenAI({ apiKey, baseURL: GROQ_BASE_URL });
      const completion = await client.chat.completions.create({
        model: options.model,
        messages: [
          { role: "system", content: options.systemPrompt },
          ...options.messages.map((message) => ({
            role: message.role as "user" | "assistant",
            content: message.content,
          })),
        ],
        temperature: options.temperature,
        max_tokens: options.maxTokens,
      });

      const text = completion.choices[0]?.message?.content?.trim();

      if (!text) {
        return null;
      }

      const usage = completion.usage;

      return {
        text,
        usage: {
          promptTokens: usage?.prompt_tokens ?? 0,
          completionTokens: usage?.completion_tokens ?? 0,
          totalTokens: usage?.total_tokens ?? 0,
        },
      };
    },
  };
}

export function resolveGroqModel(): string {
  return (
    process.env[ENV_KEYS.GROQ_MODEL] ??
    LLM_PROVIDER_DEFAULTS[LLM_PROVIDERS.GROQ].model
  );
}
