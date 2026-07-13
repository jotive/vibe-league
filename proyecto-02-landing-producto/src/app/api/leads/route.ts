import { NextRequest, NextResponse } from "next/server";

import { HTTP_STATUS } from "@/constants/http-status";
import { lang } from "@/lang";
import { leadSchema } from "@/schemas/lead.schema";
import { triggerAutomation } from "@/services/automation";
import { saveLead } from "@/services/leads";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of parsed.error.issues) {
        const field = issue.path[0];

        if (typeof field === "string" && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }

      return NextResponse.json(
        { error: lang.form.validationError, fieldErrors },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const result = await saveLead(
      parsed.data,
      request.headers.get("user-agent")
    );

    if (result.status === "unavailable") {
      return NextResponse.json(
        { error: lang.form.storageUnavailable },
        { status: HTTP_STATUS.SERVICE_UNAVAILABLE }
      );
    }

    if (result.status === "duplicate") {
      return NextResponse.json({ status: "duplicate" });
    }

    triggerAutomation(result.id, parsed.data);

    return NextResponse.json({ status: "saved", id: result.id });
  } catch (error) {
    console.error("[api/leads] Fallo al guardar el lead:", error);

    return NextResponse.json(
      { error: lang.form.unexpectedError },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
