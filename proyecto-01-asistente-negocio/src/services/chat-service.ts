import { buildSystemPrompt } from "./system-prompt";
import { ChatMessage } from "./chat-types";
import { LlmCompletion } from "./llm/llm-provider";
import { resolveCandidateChain } from "./llm/provider-chain";
import { resolveLlmCompletionDefaults } from "./llm/resolve-llm-provider";

export interface ChatReply extends LlmCompletion {
  provider: string;
  model: string;
}

export async function generateChatReply(
  messages: ChatMessage[]
): Promise<ChatReply | null> {
  const candidates = resolveCandidateChain();

  if (candidates.length === 0) {
    return null;
  }

  const { temperature, maxTokens } = resolveLlmCompletionDefaults();
  const lastQuestion = messages[messages.length - 1]?.content ?? "";
  const systemPrompt = buildSystemPrompt(lastQuestion);
  let lastError: unknown;

  for (const { provider, model } of candidates) {
    try {
      const completion = await provider.complete({
        systemPrompt,
        messages,
        model,
        temperature,
        maxTokens,
      });

      if (completion) {
        return { ...completion, provider: provider.id, model };
      }
    } catch (error) {
      lastError = error;
      console.warn(
        `[llm] ${provider.id}/${model} falló; probando el siguiente candidato.`,
        error instanceof Error ? error.message : error
      );
    }
  }

  if (lastError) {
    throw lastError;
  }

  return null;
}

export function hasConfiguredProvider(): boolean {
  return resolveCandidateChain().length > 0;
}
