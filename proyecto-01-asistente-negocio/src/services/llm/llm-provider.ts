import { LlmProviderId } from "@/config/llm";

import { ChatMessage } from "../chat-types";

export interface LlmCompletionOptions {
  systemPrompt: string;
  messages: ChatMessage[];
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface LlmUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface LlmCompletion {
  text: string;
  usage: LlmUsage;
}

export interface LlmProvider {
  readonly id: LlmProviderId;
  isConfigured(): boolean;
  getMissingApiKeyEnvName(): string;
  complete(options: LlmCompletionOptions): Promise<LlmCompletion | null>;
}

export const EMPTY_USAGE: LlmUsage = {
  promptTokens: 0,
  completionTokens: 0,
  totalTokens: 0,
};
