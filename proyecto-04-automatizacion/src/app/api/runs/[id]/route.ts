import { NextResponse } from "next/server";

import { loadRuns } from "@/services/runs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const runs = await loadRuns(30);
  const run = runs.find((item) => item.id === Number(id));

  if (!run) {
    return NextResponse.json({ error: "No existe esa ejecución." }, { status: 404 });
  }

  return NextResponse.json({ run });
}
