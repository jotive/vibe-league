import { neon } from "@neondatabase/serverless";

export interface RunStep {
  position: number;
  step: string;
  status: "ok" | "error";
  detail: string | null;
  latencyMs: number | null;
}

export interface Run {
  id: number;
  leadId: number;
  source: string;
  status: string;
  startedAt: string;
  finishedAt: string | null;
  leadName: string | null;
  businessName: string | null;
  score: number | null;
  temperature: string | null;
  reasoning: string | null;
  nextAction: string | null;
  suggestedMessage: string | null;
  steps: RunStep[];
}

export interface RunsSummary {
  total: number;
  hot: number;
  avgScore: number;
  avgSeconds: number;
}

function db() {
  const url = process.env.DATABASE_URL;

  if (!url) return null;

  return neon(url);
}

export async function loadRuns(limit = 12): Promise<Run[]> {
  const sql = db();

  if (!sql) return [];

  try {
    const rows = await sql`
      select
        r.id, r.lead_id, r.source, r.status, r.started_at, r.finished_at,
        l.full_name, l.business_name, l.score, l.temperature,
        l.reasoning, l.next_action, l.suggested_message,
        coalesce(
          json_agg(
            json_build_object(
              'position', s.position, 'step', s.step, 'status', s.status,
              'detail', s.detail, 'latencyMs', s.latency_ms
            ) order by s.position
          ) filter (where s.id is not null),
          '[]'
        ) as steps
      from lead_runs r
      left join leads l on l.id = r.lead_id
      left join lead_run_steps s on s.run_id = r.id
      group by r.id, l.full_name, l.business_name, l.score, l.temperature,
               l.reasoning, l.next_action, l.suggested_message
      order by r.started_at desc
      limit ${limit}
    `;

    return rows.map((row) => ({
      id: Number(row.id),
      leadId: Number(row.lead_id),
      source: row.source as string,
      status: row.status as string,
      startedAt: new Date(row.started_at as string).toISOString(),
      finishedAt: row.finished_at
        ? new Date(row.finished_at as string).toISOString()
        : null,
      leadName: row.full_name as string | null,
      businessName: row.business_name as string | null,
      score: row.score as number | null,
      temperature: row.temperature as string | null,
      reasoning: row.reasoning as string | null,
      nextAction: row.next_action as string | null,
      suggestedMessage: row.suggested_message as string | null,
      steps: row.steps as RunStep[],
    }));
  } catch (error) {
    console.error("[runs] No se pudieron cargar las ejecuciones:", error);

    return [];
  }
}

export async function loadSummary(): Promise<RunsSummary> {
  const sql = db();
  const empty = { total: 0, hot: 0, avgScore: 0, avgSeconds: 0 };

  if (!sql) return empty;

  try {
    const rows = await sql`
      select
        count(*)::int as total,
        count(*) filter (where l.temperature = 'caliente')::int as hot,
        coalesce(avg(l.score), 0)::float as avg_score,
        coalesce(
          avg(extract(epoch from (r.finished_at - r.started_at))), 0
        )::float as avg_seconds
      from lead_runs r
      left join leads l on l.id = r.lead_id
      where r.finished_at is not null
    `;

    const row = rows[0];

    return {
      total: row.total as number,
      hot: row.hot as number,
      avgScore: Math.round(Number(row.avg_score)),
      avgSeconds: Number(Number(row.avg_seconds).toFixed(1)),
    };
  } catch (error) {
    console.error("[runs] No se pudo cargar el resumen:", error);

    return empty;
  }
}
