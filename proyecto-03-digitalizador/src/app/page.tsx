import Digitizer from "@/components/Digitizer";
import HeroVisual from "@/components/HeroVisual";
import { ChatIcon, SparkIcon } from "@/components/Icons";
import { TOOL } from "@/config/product";
import { lang } from "@/lang";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/85 backdrop-blur-md">
        <div className="shell flex items-center justify-between gap-4 py-3">
          <span className="flex items-center gap-2 text-[1rem] font-extrabold tracking-tight text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
              <SparkIcon className="h-4 w-4" />
            </span>
            {TOOL.name}
          </span>

          <a
            href={TOOL.landingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-hairline-strong bg-surface-high px-3 py-1.5 text-[0.8rem] font-semibold text-ink-mute transition-colors hover:border-accent hover:text-accent"
          >
            <ChatIcon className="h-4 w-4" />
            {lang.footer.landing}
          </a>
        </div>
      </header>

      <section className="border-b border-hairline">
        <div className="shell flex flex-col gap-10 py-14 max-md:py-10">
          <div className="flex flex-col gap-4">
            <span className="flex w-fit items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-accent">
              <SparkIcon className="h-3.5 w-3.5" />
              {lang.hero.badge}
            </span>

            <h1 className="max-w-[820px] text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold leading-[1.06] tracking-tight text-ink">
              {lang.hero.title}{" "}
              <span className="text-accent">{lang.hero.titleAccent}</span>
            </h1>

            <p className="max-w-[620px] text-[1.02rem] leading-relaxed text-ink-mute">
              {lang.hero.subtitle}
            </p>
          </div>

          <HeroVisual />
        </div>
      </section>

      <main className="shell py-14 max-md:py-10">
        <Digitizer />
      </main>

      <footer className="border-t border-hairline bg-ink py-10 text-white">
        <div className="shell flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[440px] text-[0.82rem] leading-relaxed text-white/50">
            {lang.footer.note}
          </p>

          <div className="flex gap-2">
            <a
              href={TOOL.assistantDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/20 px-4 py-2.5 text-[0.82rem] font-semibold text-white transition-colors hover:bg-surface-high/10"
            >
              {lang.footer.demo}
            </a>
            <a
              href={TOOL.landingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-accent px-4 py-2.5 text-[0.82rem] font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              {lang.footer.landing}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
