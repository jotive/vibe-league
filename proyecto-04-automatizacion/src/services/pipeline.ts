import { neon } from "@neondatabase/serverless";

import { LeadPayload } from "@/schemas/lead.schema";

import { sendWelcomeEmail } from "./email";
import { qualifyLead } from "./qualifier";
import { buildTelegramMessage, sendTelegram } from "./telegram";

export const STEPS = [
  "Lead recibido",
  "Calificado con IA",
  "Respondido al lead",
  "Guardado en el CRM",
  "Equipo notificado",
] as const;

function db() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("Falta DATABASE_URL.");
  }

  return neon(url);
}

async function startRun(lead: LeadPayload): Promise<number> {
  const sql = db();
  const rows = await sql`
    insert into lead_runs (lead_id, project_slug, source, status)
    values (${lead.leadId}, ${lead.projectSlug}, ${lead.projectSlug}, 'running')
    returning id
  `;

  return Number(rows[0].id);
}

async function logStep(
  runId: number,
  position: number,
  step: string,
  status: "ok" | "error",
  detail: string,
  latencyMs: number
): Promise<void> {
  const sql = db();

  await sql`
    insert into lead_run_steps (run_id, position, step, status, detail, latency_ms)
    values (${runId}, ${position}, ${step}, ${status}, ${detail}, ${latencyMs})
  `;
}

async function finishRun(runId: number, status: string): Promise<void> {
  const sql = db();

  await sql`
    update lead_runs
    set status = ${status}, finished_at = now()
    where id = ${runId}
  `;
}

export async function runPipeline(lead: LeadPayload): Promise<number> {
  const runId = await startRun(lead);

  await logStep(
    runId,
    1,
    STEPS[0],
    "ok",
    `${lead.fullName}${lead.businessName ? ` — ${lead.businessName}` : ""} (${lead.projectSlug})`,
    0
  );

  try {
    const qualifyStart = Date.now();
    const { qualification, usedFallback } = await qualifyLead(lead);

    await logStep(
      runId,
      2,
      STEPS[1],
      "ok",
      `${qualification.score}/100 · ${qualification.temperature}${usedFallback ? " (reglas fijas: la IA no respondió)" : ""} — ${qualification.reasoning}`,
      Date.now() - qualifyStart
    );

    const emailStart = Date.now();

    try {
      const sent = await sendWelcomeEmail(lead, qualification);

      await logStep(
        runId,
        3,
        STEPS[2],
        "ok",
        `Correo de bienvenida enviado a ${sent.to}`,
        Date.now() - emailStart
      );
    } catch (error) {
      await logStep(
        runId,
        3,
        STEPS[2],
        "error",
        error instanceof Error ? error.message : String(error),
        Date.now() - emailStart
      );
    }

    const crmStart = Date.now();
    const sql = db();

    await sql`
      update leads
      set score = ${qualification.score},
          temperature = ${qualification.temperature},
          reasoning = ${qualification.reasoning},
          next_action = ${qualification.nextAction},
          suggested_message = ${qualification.whatsappMessage}
      where id = ${lead.leadId}
    `;

    await logStep(
      runId,
      4,
      STEPS[3],
      "ok",
      `Lead #${lead.leadId} actualizado: ${qualification.temperature}, siguiente paso "${qualification.nextAction}"`,
      Date.now() - crmStart
    );

    const notifyStart = Date.now();

    try {
      const detail = await sendTelegram(
        buildTelegramMessage(lead, qualification)
      );

      await logStep(
        runId,
        5,
        STEPS[4],
        "ok",
        detail,
        Date.now() - notifyStart
      );
    } catch (error) {
      await logStep(
        runId,
        5,
        STEPS[4],
        "error",
        error instanceof Error ? error.message : String(error),
        Date.now() - notifyStart
      );

      await finishRun(runId, "partial");

      return runId;
    }

    await finishRun(runId, "done");

    return runId;
  } catch (error) {
    await logStep(
      runId,
      2,
      STEPS[1],
      "error",
      error instanceof Error ? error.message : String(error),
      0
    );

    await finishRun(runId, "error");

    throw error;
  }
}
