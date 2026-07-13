import Digitizer from "@/components/Digitizer";
import { TOOL } from "@/config/product";
import { lang } from "@/lang";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="shell flex items-center justify-between gap-4 py-3.5">
          <span className="flex items-center gap-2 text-[1.02rem] font-extrabold tracking-tight text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
              M
            </span>
            {TOOL.name}
          </span>

          <a
            href={TOOL.landingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.82rem] font-semibold text-text-muted transition-colors hover:text-brand"
          >
            {lang.footer.landing}
          </a>
        </div>
      </header>

      <main className="shell flex flex-col gap-12 py-14 max-md:py-10">
        <section className="flex flex-col gap-4">
          <span className="w-fit rounded-full border border-brand/25 bg-brand-soft px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-wide text-brand-dark">
            {lang.hero.badge}
          </span>

          <h1 className="text-[clamp(2rem,4.6vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            {lang.hero.title}{" "}
            <span className="text-brand">{lang.hero.titleAccent}</span>
          </h1>

          <p className="max-w-[620px] text-[1.02rem] leading-relaxed text-text-muted">
            {lang.hero.subtitle}
          </p>
        </section>

        <Digitizer />
      </main>

      <footer className="mt-8 border-t border-border bg-paper py-10">
        <div className="shell flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[460px] text-[0.82rem] leading-relaxed text-text-muted">
            {lang.footer.note}
          </p>

          <div className="flex gap-2">
            <a
              href={TOOL.assistantDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border-strong bg-white px-4 py-2.5 text-[0.82rem] font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              {lang.footer.demo}
            </a>
            <a
              href={TOOL.landingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-ink px-4 py-2.5 text-[0.82rem] font-semibold text-white transition-opacity hover:opacity-90"
            >
              {lang.footer.landing}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
