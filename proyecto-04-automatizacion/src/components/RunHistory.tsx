import { lang } from "@/lang";
import { Run } from "@/services/runs";

const TEMPERATURE_STYLE: Record<string, string> = {
  caliente: "bg-hot/15 text-hot border-hot/40",
  tibio: "bg-warn/15 text-warn border-warn/40",
  frio: "bg-cold/15 text-cold border-cold/40",
};

const SOURCE_LABEL: Record<string, string> = {
  "proyecto-02-landing-producto": "Landing de Mostrador",
  "proyecto-03-digitalizador": "Catálogo Express",
  "proyecto-04-demo": "Disparo de prueba",
};

function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);

  if (seconds < 60) return "hace segundos";
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)} h`;

  return `hace ${Math.floor(seconds / 86400)} d`;
}

export default function RunHistory({ runs }: { runs: Run[] }) {
  if (runs.length === 0) {
    return (
      <p className="rounded-2xl border border-line bg-panel px-5 py-8 text-center text-[0.88rem] italic text-ink-faint">
        {lang.runs.empty}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {runs.map((run) => (
        <article
          key={run.id}
          className="flex flex-col gap-3 rounded-2xl border border-line bg-panel p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {run.temperature && (
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide ${
                    TEMPERATURE_STYLE[run.temperature] ??
                    "border-line bg-panel-high text-ink-mute"
                  }`}
                >
                  {run.temperature}
                </span>
              )}

              <span className="text-[0.95rem] font-bold text-ink">
                {run.leadName ?? "—"}
              </span>

              {run.businessName && (
                <span className="text-[0.82rem] text-ink-mute">
                  {run.businessName}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {run.score !== null && (
                <span className="num text-[0.9rem] font-extrabold text-accent">
                  {run.score}
                  <span className="text-[0.7rem] font-normal text-ink-faint">
                    /100
                  </span>
                </span>
              )}
              <span className="text-[0.72rem] text-ink-faint">
                {timeAgo(run.startedAt)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {run.steps.map((step) => (
              <span
                key={step.position}
                title={step.detail ?? undefined}
                className={`rounded-md border px-2 py-0.5 text-[0.68rem] font-semibold ${
                  step.status === "error"
                    ? "border-danger/40 bg-danger/10 text-danger"
                    : "border-ok/40 bg-ok/10 text-ok"
                }`}
              >
                {step.status === "error" ? "✕" : "✓"} {step.step}
              </span>
            ))}
          </div>

          {run.reasoning && (
            <p className="text-[0.83rem] leading-relaxed text-ink-mute">
              <span className="font-bold text-ink">
                {lang.runs.reasoningLabel}:
              </span>{" "}
              {run.reasoning}
            </p>
          )}

          {run.nextAction && (
            <p className="rounded-lg border border-line bg-panel-high px-3.5 py-2 text-[0.83rem] text-ink">
              <span className="font-bold">{lang.runs.nextActionLabel}:</span>{" "}
              {run.nextAction}
            </p>
          )}

          <span className="text-[0.7rem] text-ink-faint">
            {lang.runs.fromLabel}: {SOURCE_LABEL[run.source] ?? run.source}
          </span>
        </article>
      ))}
    </div>
  );
}
