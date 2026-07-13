import Image from "next/image";

import CatalogTransform from "@/components/CatalogTransform";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";
import { PRODUCT } from "@/config/product";
import { lang } from "@/lang";
import { countLeads } from "@/services/leads";

export const dynamic = "force-dynamic";

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-extrabold leading-[1.15] tracking-tight text-ink">
      {children}
    </h2>
  );
}

function Source({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[0.7rem] uppercase tracking-wide text-text-faint">
      Fuente: {children}
    </span>
  );
}

export default async function HomePage() {
  const leads = await countLeads();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="shell flex items-center justify-between gap-4 py-3.5">
          <span className="flex items-center gap-2 text-[1.1rem] font-extrabold tracking-tight text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
              M
            </span>
            {PRODUCT.name}
          </span>

          <nav className="flex items-center gap-2">
            <a
              href={PRODUCT.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-2 text-[0.82rem] font-semibold text-text-muted transition-colors hover:text-brand max-sm:hidden"
            >
              {lang.nav.demo}
            </a>
            <a
              href="#cupo"
              className="rounded-lg bg-ink px-4 py-2 text-[0.82rem] font-semibold text-white transition-opacity hover:opacity-90"
            >
              {lang.nav.cta}
            </a>
          </nav>
        </div>
      </header>

      <section className="border-b border-border bg-paper-warm">
        <div className="shell grid grid-cols-[1.05fr_0.95fr] items-center gap-14 py-20 max-lg:grid-cols-1 max-lg:gap-10 max-md:py-12">
          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full border border-brand/25 bg-brand-soft px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-wide text-brand-dark">
              {lang.hero.badge}
            </span>

            <h1 className="text-[clamp(2.2rem,4.8vw,3.5rem)] font-extrabold leading-[1.06] tracking-tight text-ink">
              {lang.hero.title}{" "}
              <span className="text-brand">{lang.hero.titleAccent}</span>
            </h1>

            <p className="max-w-[520px] text-[1.03rem] leading-relaxed text-text-muted">
              {lang.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#cupo"
                className="rounded-lg bg-brand px-6 py-3.5 text-[0.95rem] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                {lang.hero.ctaPrimary}
              </a>
              <a
                href={PRODUCT.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border-strong bg-white px-6 py-3.5 text-[0.95rem] font-bold text-ink transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
              >
                {lang.hero.ctaSecondary}
              </a>
            </div>

            <p className="text-[0.8rem] text-text-faint">
              {lang.hero.demoNote}
            </p>
          </div>

          <Reveal delayMs={120}>
            <figure className="flex flex-col gap-3">
              <Image
                src="/img/demo-stock.png"
                alt="El asistente responde que el Betta Halfmoon cuesta $38.000"
                width={780}
                height={420}
                priority
                className="w-full rounded-2xl border border-border shadow-[0_20px_50px_rgba(13,17,22,0.12)]"
              />
              <figcaption className="text-center text-[0.75rem] font-medium text-text-faint">
                {lang.hero.screenshotCaption}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="shell py-20 max-md:py-14">
        <Reveal>
          <div className="flex flex-col gap-6">
            <SectionTitle>{lang.problem.title}</SectionTitle>

            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              {lang.problem.stats.map((stat) => (
                <div
                  key={stat.value}
                  className="flex flex-col gap-2 rounded-xl border border-border bg-paper p-6"
                >
                  <span className="text-4xl font-extrabold tabular-nums text-brand">
                    {stat.value}
                  </span>
                  <p className="text-[0.92rem] leading-snug text-text">
                    {stat.label}
                  </p>
                  <Source>{stat.source}</Source>
                </div>
              ))}
            </div>

            <p className="max-w-[640px] text-[1.05rem] font-medium leading-relaxed text-text">
              {lang.problem.body}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-ink py-20 text-white max-md:py-14">
        <div className="shell flex flex-col gap-6">
          <Reveal>
            <SectionTitle>
              <span className="text-white">{lang.trust.title}</span>
            </SectionTitle>
          </Reveal>

          <Reveal delayMs={80}>
            <p className="max-w-[640px] text-[1.02rem] leading-relaxed text-white/70">
              {lang.trust.body}
            </p>
          </Reveal>

          <Reveal delayMs={140}>
            <div className="mt-4 grid grid-cols-2 gap-6 max-lg:grid-cols-1">
              <figure className="flex flex-col gap-2.5">
                <Image
                  src="/img/demo-nose.png"
                  alt="Ante una pregunta que no está en su catálogo, el asistente responde que no tiene esa información"
                  width={780}
                  height={300}
                  className="w-full rounded-2xl border border-white/15"
                />
                <figcaption className="text-[0.75rem] text-white/50">
                  {lang.trust.exampleCaption}
                </figcaption>
              </figure>

              <div className="flex flex-col gap-2 rounded-2xl border border-white/15 p-6">
                <h3 className="text-[1rem] font-bold text-white">
                  {lang.trust.caseTitle}
                </h3>
                <p className="text-[0.9rem] leading-relaxed text-white/70">
                  {lang.trust.caseBody}
                </p>
                <span className="mt-1 text-[0.7rem] uppercase tracking-wide text-white/40">
                  {lang.trust.caseSource}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell py-20 max-md:py-14">
        <Reveal>
          <div className="flex flex-col gap-5">
            <SectionTitle>{lang.human.title}</SectionTitle>
            <p className="max-w-[640px] text-[1.02rem] leading-relaxed text-text-muted">
              {lang.human.body}
            </p>
            <Source>{lang.human.source}</Source>
            <p className="mt-2 w-fit rounded-lg border border-brand/25 bg-brand-soft px-4 py-3 text-[0.95rem] font-semibold text-brand-dark">
              {lang.human.handoff}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-paper py-20 max-md:py-14">
        <div className="shell flex flex-col gap-8">
          <Reveal>
            <div className="flex flex-col gap-4">
              <SectionTitle>{lang.moat.title}</SectionTitle>
              <p className="max-w-[640px] text-[1.02rem] leading-relaxed text-text-muted">
                {lang.moat.body}
              </p>
              <Source>{lang.moat.source}</Source>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {lang.moat.steps.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 90}>
                <div className="flex h-full flex-col gap-2.5 rounded-xl border border-border bg-white p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[0.9rem] font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-[1rem] font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="text-[0.88rem] leading-relaxed text-text-muted">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-20 max-md:py-14">
        <div className="flex flex-col gap-8">
          <Reveal>
            <div className="flex flex-col gap-4">
              <SectionTitle>{lang.transform.title}</SectionTitle>
              <p className="max-w-[660px] text-[1.02rem] leading-relaxed text-text-muted">
                {lang.transform.body}
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={90}>
            <CatalogTransform />
          </Reveal>
        </div>
      </section>

      <section className="shell py-20 max-md:py-14">
        <Reveal>
          <div className="flex flex-col gap-5">
            <SectionTitle>{lang.niche.title}</SectionTitle>
            <p className="max-w-[660px] text-[1.02rem] leading-relaxed text-text-muted">
              {lang.niche.body}
            </p>
            <ul className="mt-2 flex flex-col gap-2">
              {lang.niche.examples.map((example) => (
                <li
                  key={example}
                  className="flex items-start gap-2.5 text-[0.95rem] text-text"
                >
                  <span className="mt-0.5 font-bold text-brand">→</span>
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-paper-warm py-20 max-md:py-14">
        <div className="shell flex flex-col gap-8">
          <Reveal>
            <SectionTitle>{lang.pricing.title}</SectionTitle>
          </Reveal>

          <div className="grid grid-cols-[1.1fr_0.9fr] gap-5 max-lg:grid-cols-1">
            <Reveal>
              <div className="flex h-full flex-col gap-5 rounded-2xl border-2 border-brand bg-white p-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tabular-nums text-ink">
                    {COP.format(PRODUCT.monthlyPriceCop)}
                  </span>
                  <span className="text-[0.9rem] text-text-muted">
                    {lang.pricing.monthlyLabel}
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {lang.pricing.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.92rem] text-text"
                    >
                      <span className="mt-0.5 font-bold text-brand">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-auto text-[0.8rem] text-text-faint">
                  {lang.pricing.monthlyNote}
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={90}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-white p-8">
                <h3 className="text-[1.1rem] font-bold text-ink">
                  {lang.pricing.setupTitle}
                </h3>
                <span className="text-2xl font-extrabold tabular-nums text-signal">
                  desde {COP.format(PRODUCT.setupFromCop)}
                </span>
                <p className="text-[0.9rem] leading-relaxed text-text-muted">
                  {lang.pricing.setupBody}
                </p>
                <p className="mt-auto text-[0.8rem] text-text-faint">
                  {lang.pricing.setupNote}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="cupo" className="shell scroll-mt-20 py-20 max-md:py-14">
        <div className="grid grid-cols-[0.85fr_1.15fr] items-start gap-12 max-lg:grid-cols-1 max-lg:gap-8">
          <Reveal>
            <div className="flex flex-col gap-4">
              <SectionTitle>{lang.form.title}</SectionTitle>
              <p className="text-[1rem] leading-relaxed text-text-muted">
                {lang.form.subtitle}
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={90}>
            <LeadForm initialCount={leads} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-paper py-20 max-md:py-14">
        <div className="shell flex flex-col gap-6">
          <Reveal>
            <SectionTitle>{lang.faq.title}</SectionTitle>
          </Reveal>

          <div className="flex flex-col gap-3">
            {lang.faq.items.map((item, index) => (
              <Reveal key={item.question} delayMs={index * 60}>
                <details className="group rounded-xl border border-border bg-white px-5 py-4 transition-colors hover:border-brand-dark/30">
                  <summary className="cursor-pointer list-none text-[0.98rem] font-bold text-ink marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {item.question}
                      <span className="text-brand transition-transform group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-text-muted">
                    {item.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-ink py-12 text-white">
        <div className="shell flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[520px] text-[0.82rem] leading-relaxed text-white/50">
            {lang.footer.builtWith}
          </p>

          <a
            href={PRODUCT.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/25 px-4 py-2.5 text-[0.85rem] font-semibold text-white transition-colors hover:bg-white/10"
          >
            {lang.footer.demoLink}
          </a>
        </div>
      </footer>
    </div>
  );
}
