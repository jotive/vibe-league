import { NextRequest, NextResponse } from "next/server";

import { HTTP_STATUS } from "@/constants/http-status";
import { lang } from "@/lang";
import { parseRequestSchema } from "@/schemas/catalog.schema";
import { planBroadcast } from "@/services/broadcast-planner";
import { parseCatalog } from "@/services/catalog-parser";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = parseRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? lang.errors.invalidInput },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const items = await parseCatalog(parsed.data.rawText);

    if (items.length === 0) {
      return NextResponse.json(
        { error: lang.errors.noItemsFound },
        { status: HTTP_STATUS.UNPROCESSABLE }
      );
    }

    return NextResponse.json({
      items,
      plan: planBroadcast(items),
    });
  } catch (error) {
    console.error("[api/parse] Fallo al digitalizar la lista:", error);

    return NextResponse.json(
      { error: lang.errors.parseFailed },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
