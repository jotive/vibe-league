import { NextRequest, NextResponse } from "next/server";

import { HTTP_STATUS } from "@/constants/http-status";
import { lang } from "@/lang";
import { leadSchema } from "@/schemas/lead.schema";
import { triggerAutomation } from "@/services/automation";
import { saveLead } from "@/services/leads";

export async function POST(request: NextRequest) {
  try {
    const parsed = leadSchema.safeParse(await request.json());

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of parsed.error.issues) {
        const field = issue.path[0];

        if (typeof field === "string" && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }

      return NextResponse.json(
        { error: lang.errors.validation, fieldErrors },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const result = await saveLead(parsed.data);

    if (result.status === "unavailable") {
      return NextResponse.json(
        { error: lang.errors.leadFailed },
        { status: HTTP_STATUS.SERVICE_UNAVAILABLE }
      );
    }

    if (result.status === "saved") {
      triggerAutomation(result.id, parsed.data);
    }

    return NextResponse.json({ status: result.status });
  } catch (error) {
    console.error("[api/leads] Fallo al guardar el lead:", error);

    return NextResponse.json(
      { error: lang.errors.leadFailed },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
