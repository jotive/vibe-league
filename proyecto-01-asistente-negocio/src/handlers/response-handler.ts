import { NextResponse } from "next/server";

export interface ChatSuccessBody {
  reply: string;
}

export function createSuccessResponse<T>(data: T): NextResponse<T> {
  return NextResponse.json(data);
}

export function createChatReplyResponse(
  reply: string
): NextResponse<ChatSuccessBody> {
  return createSuccessResponse({ reply });
}
