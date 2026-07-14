import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { DEMO_PROJECT_SLUG } from "@/config/demo";
import { HTTP_STATUS } from "@/constants/http-status";
import { runPipeline } from "@/services/pipeline";

export const maxDuration = 60;

const WHATSAPP_PATTERN = /^[\d\s+()-]{7,20}$/;

const demoSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  whatsapp: z.string().trim().regex(WHATSAPP_PATTERN),
  email: z.string().trim().email().optional().or(z.literal("")),
  businessName: z.string().trim().max(120).optional().or(z.literal("")),
  niche: z.string().trim().min(1).max(60),
  dailyMessages: z.string().trim().max(60).optional().or(z.literal("")),
  catalogLocation: z.string().trim().max(80).optional().or(z.literal("")),
  catalogSize: z.string().trim().max(60).optional().or(z.literal("")),
  topQuestion: z.string().trim().max(300).optional().or(z.literal("")),
});

function emptyToNull(value: string | undefined): string | null {
  const trimmed = value?.trim();

  return trimmed ? trimmed : null;
}

export async function POST(request: NextRequest) {
  try {
    const parsed = demoSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Revisa los campos." },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      return NextResponse.json(
        { error: "Base de datos no configurada." },
        { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
      );
    }

    const lead = parsed.data;
    const sql = neon(databaseUrl);
    const suffix = Math.random().toString(36).slice(2, 8);

    const rows = await sql`
      insert into leads (
        project_slug, full_name, whatsapp, email, business_name, niche,
        daily_messages, catalog_location, catalog_size, top_question
      ) values (
        ${DEMO_PROJECT_SLUG},
        ${lead.fullName},
        ${`${lead.whatsapp.replace(/\D/g, "")}-${suffix}`},
        ${emptyToNull(lead.email)},
        ${emptyToNull(lead.businessName)},
        ${lead.niche},
        ${emptyToNull(lead.dailyMessages)},
        ${emptyToNull(lead.catalogLocation)},
        ${emptyToNull(lead.catalogSize)},
        ${emptyToNull(lead.topQuestion)}
      )
      returning id
    `;

    const leadId = Number(rows[0].id);

    const runId = await runPipeline({
      leadId,
      projectSlug: DEMO_PROJECT_SLUG,
      fullName: lead.fullName,
      whatsapp: lead.whatsapp,
      email: emptyToNull(lead.email),
      businessName: emptyToNull(lead.businessName),
      niche: lead.niche,
      dailyMessages: emptyToNull(lead.dailyMessages),
      catalogLocation: emptyToNull(lead.catalogLocation),
      catalogSize: emptyToNull(lead.catalogSize),
      topQuestion: emptyToNull(lead.topQuestion),
    });

    return NextResponse.json({ status: "ok", runId, leadId });
  } catch (error) {
    console.error("[api/demo] Falló la automatización de prueba:", error);

    return NextResponse.json(
      { error: "La automatización falló. Intenta de nuevo." },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
