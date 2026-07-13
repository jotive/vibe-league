import MachineRoom from "@/components/MachineRoom";
import { lang } from "@/lang";
import { loadRuns, loadSummary } from "@/services/runs";

export const dynamic = "force-dynamic";

const LINKS = [
  { href: "https://acuario-nebula.vercel.app", label: lang.footer.assistant },
  { href: "https://mostrador-ia.vercel.app", label: lang.footer.landing },
  { href: "https://catalogo-express-ia.vercel.app", label: lang.footer.tool },
];

export default async function HomePage() {
  const [runs, summary] = await Promise.all([loadRuns(), loadSummary()]);

  return (
    <div className="min-h-screen">
      <main className="shell flex flex-col gap-14 py-14 max-md:py-10">
        <section className="flex flex-col gap-4">
          <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-accent">
            {lang.hero.badge}
          </span>

          <h1 className="max-w-[760px] text-[clamp(2rem,4.6vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            {lang.hero.title}{" "}
            <span className="text-accent">{lang.hero.titleAccent}</span>
          </h1>

          <p className="max-w-[640px] text-[1.02rem] leading-relaxed text-ink-mute">
            {lang.hero.subtitle}
          </p>

          <p className="text-[0.88rem] font-semibold text-accent">
            {lang.hero.tryIt}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">
            {lang.flow.title}
          </h2>

          <ol className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {lang.flow.steps.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col gap-2 rounded-2xl border border-line bg-panel p-5"
              >
                <span className="num flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-[0.85rem] font-bold text-black">
                  {index + 1}
                </span>
                <h3 className="text-[0.92rem] font-bold text-ink">
                  {step.title}
                </h3>
                <p className="text-[0.8rem] leading-relaxed text-ink-mute">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <MachineRoom initialRuns={runs} initialSummary={summary} />
      </main>

      <footer className="border-t border-line py-10">
        <div className="shell flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[460px] text-[0.82rem] leading-relaxed text-ink-faint">
            {lang.footer.note}
          </p>

          <div className="flex flex-wrap gap-2">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-line-strong px-3.5 py-2 text-[0.8rem] font-semibold text-ink-mute transition-colors hover:border-accent hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
