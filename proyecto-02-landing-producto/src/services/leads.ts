import { neon } from "@neondatabase/serverless";

import { PROJECT_SLUG } from "@/config/product";
import { LeadInput } from "@/schemas/lead.schema";

export type SaveLeadResult =
  | { status: "saved"; id: number }
  | { status: "duplicate" }
  | { status: "unavailable" };

function normalizeWhatsapp(value: string): string {
  return value.replace(/\D/g, "");
}

function emptyToNull(value: string | undefined): string | null {
  const trimmed = value?.trim();

  return trimmed ? trimmed : null;
}

export async function saveLead(
  lead: LeadInput,
  userAgent: string | null
): Promise<SaveLeadResult> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("[leads] Falta DATABASE_URL: el lead no se guardaría.");

    return { status: "unavailable" };
  }

  const sql = neon(databaseUrl);

  const rows = await sql`
    insert into leads (
      project_slug, full_name, whatsapp, email, business_name,
      niche, daily_messages, catalog_location, catalog_size,
      top_question, user_agent
    ) values (
      ${PROJECT_SLUG},
      ${lead.fullName},
      ${normalizeWhatsapp(lead.whatsapp)},
      ${emptyToNull(lead.email)},
      ${emptyToNull(lead.businessName)},
      ${lead.niche},
      ${emptyToNull(lead.dailyMessages)},
      ${emptyToNull(lead.catalogLocation)},
      ${emptyToNull(lead.catalogSize)},
      ${emptyToNull(lead.topQuestion)},
      ${userAgent}
    )
    on conflict (project_slug, whatsapp) do nothing
    returning id
  `;

  if (rows.length === 0) {
    return { status: "duplicate" };
  }

  return { status: "saved", id: Number(rows[0].id) };
}

export async function countLeads(): Promise<number> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return 0;
  }

  try {
    const sql = neon(databaseUrl);
    const rows = await sql`
      select count(*)::int as total
      from leads
      where project_slug = ${PROJECT_SLUG}
    `;

    return Number(rows[0]?.total ?? 0);
  } catch (error) {
    console.error("[leads] No se pudo contar los registros:", error);

    return 0;
  }
}
