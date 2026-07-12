import { neon } from "@neondatabase/serverless";

import { PROJECT_SLUG, USD_TO_COP } from "@/config/telemetry";

export interface AnalyticsSummary {
  totalQueries: number;
  cachedQueries: number;
  totalCostUsd: number;
  totalCostCop: number;
  avgLatencyMs: number;
  promptTokens: number;
  completionTokens: number;
  deflectionCount: number;
  errorCount: number;
  sessions: number;
}

export interface QuestionCount {
  question: string;
  hits: number;
}

export interface DailyCost {
  day: string;
  queries: number;
  costUsd: number;
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  topQuestions: QuestionCount[];
  unansweredQuestions: QuestionCount[];
  daily: DailyCost[];
  isConfigured: boolean;
}

const EMPTY: AnalyticsData = {
  summary: {
    totalQueries: 0,
    cachedQueries: 0,
    totalCostUsd: 0,
    totalCostCop: 0,
    avgLatencyMs: 0,
    promptTokens: 0,
    completionTokens: 0,
    deflectionCount: 0,
    errorCount: 0,
    sessions: 0,
  },
  topQuestions: [],
  unansweredQuestions: [],
  daily: [],
  isConfigured: false,
};

export async function loadAnalytics(): Promise<AnalyticsData> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return EMPTY;
  }

  try {
    const sql = neon(databaseUrl);

    const [summaryRows, topRows, unansweredRows, dailyRows] = await Promise.all([
      sql`
        select
          count(*)::int                                             as total_queries,
          count(*) filter (where provider = 'cache')::int           as cached_queries,
          coalesce(sum(cost_usd), 0)::float                         as total_cost_usd,
          coalesce(avg(latency_ms), 0)::float                       as avg_latency_ms,
          coalesce(sum(prompt_tokens), 0)::int                      as prompt_tokens,
          coalesce(sum(completion_tokens), 0)::int                  as completion_tokens,
          count(*) filter (where is_deflection)::int                as deflection_count,
          count(*) filter (where error is not null)::int            as error_count,
          count(distinct session_id)::int                           as sessions
        from chat_events
        where project_slug = ${PROJECT_SLUG}
      `,
      sql`
        select question, count(*)::int as hits
        from chat_events
        where project_slug = ${PROJECT_SLUG} and question <> ''
        group by question
        order by hits desc, max(id) desc
        limit 10
      `,
      sql`
        select question, count(*)::int as hits
        from chat_events
        where project_slug = ${PROJECT_SLUG} and is_deflection
        group by question
        order by hits desc, max(id) desc
        limit 10
      `,
      sql`
        select
          to_char(created_at at time zone 'America/Bogota', 'YYYY-MM-DD') as day,
          count(*)::int                                                   as queries,
          coalesce(sum(cost_usd), 0)::float                               as cost_usd
        from chat_events
        where project_slug = ${PROJECT_SLUG}
        group by day
        order by day desc
        limit 14
      `,
    ]);

    const row = summaryRows[0];
    const totalCostUsd = Number(row.total_cost_usd);

    return {
      isConfigured: true,
      summary: {
        totalQueries: row.total_queries,
        cachedQueries: row.cached_queries,
        totalCostUsd,
        totalCostCop: totalCostUsd * USD_TO_COP,
        avgLatencyMs: Math.round(row.avg_latency_ms),
        promptTokens: row.prompt_tokens,
        completionTokens: row.completion_tokens,
        deflectionCount: row.deflection_count,
        errorCount: row.error_count,
        sessions: row.sessions,
      },
      topQuestions: topRows.map((r) => ({
        question: r.question as string,
        hits: r.hits as number,
      })),
      unansweredQuestions: unansweredRows.map((r) => ({
        question: r.question as string,
        hits: r.hits as number,
      })),
      daily: dailyRows.map((r) => ({
        day: r.day as string,
        queries: r.queries as number,
        costUsd: Number(r.cost_usd),
      })),
    };
  } catch (error) {
    console.error("[analytics] No se pudo cargar la analítica:", error);

    return EMPTY;
  }
}
