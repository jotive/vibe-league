import { NextRequest } from "next/server";

import { lang } from "@/lang";
import { HTTP_STATUS } from "@/constants/http-status";
import {
  createErrorResponse,
  handleUnexpectedError,
} from "@/handlers/error-handler";
import { parseChatMessages } from "@/handlers/parse-chat-messages";
import { createChatReplyResponse } from "@/handlers/response-handler";
import {
  generateChatReply,
  hasConfiguredProvider,
} from "@/services/chat-service";
import { EMPTY_USAGE } from "@/services/llm/llm-provider";
import {
  isCacheable,
  readCachedReply,
  writeCachedReply,
} from "@/services/reply-cache";
import { recordChatEvent } from "@/services/telemetry";

const ANONYMOUS_SESSION = "anonymous";
const CACHE_PROVIDER = "cache";

export async function POST(request: NextRequest) {
  const startedAt = Date.now();
  let question = "";
  let sessionId = ANONYMOUS_SESSION;

  try {
    if (!hasConfiguredProvider()) {
      return createErrorResponse(
        lang.errors.noProviderConfigured,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }

    const body = await request.json();
    const messages = parseChatMessages(body);

    if (!messages) {
      return createErrorResponse(
        lang.errors.messagesRequired,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    sessionId = typeof body.sessionId === "string" ? body.sessionId : sessionId;
    question = messages[messages.length - 1]?.content ?? "";

    if (isCacheable(messages)) {
      const cached = readCachedReply(question);

      if (cached) {
        await recordChatEvent({
          sessionId,
          question,
          answer: cached,
          provider: CACHE_PROVIDER,
          model: CACHE_PROVIDER,
          usage: EMPTY_USAGE,
          latencyMs: Date.now() - startedAt,
        });

        return createChatReplyResponse(cached);
      }
    }

    const reply = await generateChatReply(messages);

    if (!reply) {
      return createErrorResponse(
        lang.errors.replyGenerationFailed,
        HTTP_STATUS.BAD_GATEWAY
      );
    }

    if (isCacheable(messages)) {
      writeCachedReply(question, reply.text);
    }

    await recordChatEvent({
      sessionId,
      question,
      answer: reply.text,
      provider: reply.provider,
      model: reply.model,
      usage: reply.usage,
      latencyMs: Date.now() - startedAt,
    });

    return createChatReplyResponse(reply.text);
  } catch (error) {
    await recordChatEvent({
      sessionId,
      question,
      answer: null,
      provider: "desconocido",
      model: "desconocido",
      usage: EMPTY_USAGE,
      latencyMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
    });

    return handleUnexpectedError(error);
  }
}
