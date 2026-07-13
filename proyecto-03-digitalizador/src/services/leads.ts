import { neon } from "@neondatabase/serverless";

import { PROJECT_SLUG } from "@/config/product";
import { LeadInput } from "@/schemas/lead.schema";

export type SaveLeadResult =
  | { status: "saved" }
  | { status: "duplicate" }
  | { status: "unavailable" };

function normalizeWhatsapp(value: string): string {
  return value.replace(/\D/g, "");
}

function emptyToNull(value: string | undefined): string | null {
  const trimmed = value?.trim();

  return trimmed ? trimmed : null;
}

export async function saveLead(lead: LeadInput): Promise<SaveLeadResult> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("[leads] Falta DATABASE_URL: el lead no se guardaría.");

    return { status: "unavailable" };
  }

  const sql = neon(databaseUrl);

  const rows = await sql`
    insert into leads (
      project_slug, full_name, whatsapp, business_name, niche,
      parsed_items, parsed_issues
    ) values (
      ${PROJECT_SLUG},
      ${lead.fullName},
      ${normalizeWhatsapp(lead.whatsapp)},
      ${emptyToNull(lead.businessName)},
      ${lead.niche},
      ${lead.parsedItems},
      ${lead.parsedIssues}
    )
    on conflict (project_slug, whatsapp) do update
      set parsed_items = excluded.parsed_items,
          parsed_issues = excluded.parsed_issues
    returning (xmax = 0) as inserted
  `;

  return rows[0]?.inserted ? { status: "saved" } : { status: "duplicate" };
}
