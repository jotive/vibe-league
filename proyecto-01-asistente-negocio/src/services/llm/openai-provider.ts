import OpenAI from "openai";

import { ENV_KEYS } from "@/config/env";
import { LLM_PROVIDERS, LLM_PROVIDER_DEFAULTS } from "@/config/llm";

import { LlmCompletionOptions, LlmProvider } from "./llm-provider";

export function createOpenAiProvider(): LlmProvider {
  return {
    id: LLM_PROVIDERS.OPENAI,
    isConfigured() {
      return Boolean(process.env[ENV_KEYS.OPENAI_API_KEY]);
    },
    getMissingApiKeyEnvName() {
      return ENV_KEYS.OPENAI_API_KEY;
    },
    async complete(options: LlmCompletionOptions) {
      const apiKey = process.env[ENV_KEYS.OPENAI_API_KEY];
      if (!apiKey) {
        return null;
      }

      const client = new OpenAI({ apiKey });
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

export function resolveOpenAiModel(): string {
  return (
    process.env[ENV_KEYS.OPENAI_MODEL] ??
    LLM_PROVIDER_DEFAULTS[LLM_PROVIDERS.OPENAI].model
  );
}
