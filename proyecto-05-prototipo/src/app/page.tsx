import { SparkIcon } from "@/components/Icons";
import Stage from "@/components/Stage";
import { lang } from "@/lang";

const LINKS = [
  { href: "https://acuario-nebula.vercel.app", label: lang.links.assistant },
  { href: "https://mostrador-ia.vercel.app", label: lang.links.landing },
  { href: "https://catalogo-express-ia.vercel.app", label: lang.links.tool },
  { href: "https://sala-de-maquinas-ia.vercel.app", label: lang.links.automation },
];

function ContextCard({
  label,
  body,
}: {
  label: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-stage-soft p-5">
      <span className="text-[0.68rem] font-bold uppercase tracking-widest text-live">
        {label}
      </span>
      <p className="text-[0.86rem] leading-relaxed text-canvas/70">{body}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10">
        <div className="shell flex items-center justify-between gap-4 py-3.5">
          <span className="flex items-center gap-2 text-[1rem] font-extrabold tracking-tight text-canvas">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
              <SparkIcon className="h-4 w-4" />
            </span>
            {lang.header.kicker}
          </span>

          <span className="rounded-full border border-live/30 bg-live/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-live">
            {lang.header.badge}
          </span>
        </div>
      </header>

      <main className="shell flex flex-col gap-14 py-14 max-md:py-10">
        <section className="flex flex-col gap-4">
          <h1 className="max-w-[780px] text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold leading-[1.06] tracking-tight text-canvas">
            {lang.hero.title}{" "}
            <span className="text-live">{lang.hero.titleAccent}</span>
          </h1>

          <p className="max-w-[640px] text-[1.02rem] leading-relaxed text-canvas/60">
            {lang.hero.subtitle}
          </p>
        </section>

        <section className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          <ContextCard
            label={lang.context.problem.label}
            body={lang.context.problem.body}
          />
          <ContextCard
            label={lang.context.who.label}
            body={lang.context.who.body}
          />
          <ContextCard
            label={lang.context.idea.label}
            body={lang.context.idea.body}
          />
        </section>

        <section className="grid grid-cols-[1fr_auto] items-start gap-10 max-lg:grid-cols-1">
          <div className="flex flex-col gap-4 max-lg:order-2">
            <h2 className="text-xl font-extrabold tracking-tight text-canvas">
              {lang.guide.title}
            </h2>

            <ol className="flex flex-col gap-2.5">
              {lang.guide.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-3 rounded-xl border border-white/10 bg-stage-soft p-4"
                >
                  <span className="num flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-live text-[0.72rem] font-bold text-stage">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-[0.86rem] font-bold text-canvas">
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-[0.8rem] leading-snug text-canvas/50">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-2 flex flex-col gap-2 rounded-xl border border-dashed border-white/15 p-4">
              <p className="text-[0.7rem] font-bold uppercase tracking-widest text-canvas/40">
                {lang.notes.title}
              </p>
              <p className="text-[0.8rem] leading-relaxed text-canvas/50">
                {lang.notes.isNot}
              </p>
              <p className="text-[0.8rem] leading-relaxed text-canvas/50">
                {lang.notes.is}
              </p>
            </div>
          </div>

          <div className="max-lg:order-1 max-lg:mx-auto">
            <Stage />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="shell flex flex-wrap items-center justify-between gap-4">
          <p className="text-[0.8rem] text-canvas/40">
            Vibe Coders League · Los otros cuatro proyectos, funcionando:
          </p>

          <div className="flex flex-wrap gap-2">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 px-3 py-2 text-[0.76rem] font-semibold text-canvas/60 transition-colors hover:border-live/40 hover:text-live"
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
