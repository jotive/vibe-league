import { NextResponse } from "next/server";

import { loadRuns, loadSummary } from "@/services/runs";

export const dynamic = "force-dynamic";

export async function GET() {
  const [runs, summary] = await Promise.all([loadRuns(), loadSummary()]);

  return NextResponse.json({ runs, summary });
}
