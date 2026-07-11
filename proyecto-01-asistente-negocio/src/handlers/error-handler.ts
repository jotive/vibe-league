import { NextResponse } from "next/server";

import { lang } from "@/lang";
import { HTTP_STATUS } from "@/constants/http-status";

export interface ApiErrorBody {
  error: string;
}

export function createErrorResponse(
  message: string,
  status: number
): NextResponse<ApiErrorBody> {
  return NextResponse.json({ error: message }, { status });
}

export function handleUnexpectedError(
  error: unknown
): NextResponse<ApiErrorBody> {
  console.error("[api/chat] Fallo inesperado:", error);

  return createErrorResponse(
    lang.errors.processingError,
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
}
