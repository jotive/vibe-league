import { NextRequest, NextResponse } from "next/server";

import { HTTP_STATUS } from "@/constants/http-status";
import { leadPayloadSchema } from "@/schemas/lead.schema";
import { runPipeline } from "@/services/pipeline";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const secret = process.env.WEBHOOK_SECRET;

  if (secret && request.headers.get("x-webhook-secret") !== secret) {
    return NextResponse.json(
      { error: "No autorizado." },
      { status: HTTP_STATUS.UNAUTHORIZED }
    );
  }

  try {
    const parsed = leadPayloadSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Payload inválido.",
          issues: parsed.error.issues.map((issue) => issue.message),
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const runId = await runPipeline(parsed.data);

    return NextResponse.json({ status: "ok", runId });
  } catch (error) {
    console.error("[webhook/lead] Falló la automatización:", error);

    return NextResponse.json(
      { error: "La automatización falló." },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
