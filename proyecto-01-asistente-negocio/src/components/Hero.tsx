"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ArrowRightIcon, ChatIcon, WhatsappIcon } from "@/components/Icons";
import { CHAT_OPEN_EVENT } from "@/constants/chat";
import { lang } from "@/lang";
import { countAvailableSpecies, getStarterKits } from "@/services/catalog";
import { knowledgeBase } from "@/services/knowledge-base.loader";

const BUBBLES = [
  { left: "8%", size: 10, delay: 0, duration: 11 },
  { left: "18%", size: 6, delay: 2.4, duration: 9 },
  { left: "31%", size: 14, delay: 1.1, duration: 13 },
  { left: "47%", size: 7, delay: 3.6, duration: 10 },
  { left: "63%", size: 11, delay: 0.7, duration: 12 },
  { left: "76%", size: 5, delay: 4.2, duration: 8.5 },
  { left: "88%", size: 13, delay: 1.9, duration: 14 },
];

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-3xl font-bold tabular-nums text-white">{value}</span>
      <span className="text-[0.72rem] leading-tight text-white/70">{label}</span>
    </div>
  );
}

function openAssistant() {
  window.dispatchEvent(new Event(CHAT_OPEN_EVENT));
}

export default function Hero() {
  const { business, contact } = knowledgeBase;
  const whatsappUrl = `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`;
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setOffsetY(window.scrollY));
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 -z-20 scale-110"
        style={{ transform: `translate3d(0, ${offsetY * 0.32}px, 0) scale(1.15)` }}
      >
        <Image
          src="/img/hero-aquascape.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-water-dark/92 via-water-dark/80 to-plant-dark/70" />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {BUBBLES.map((bubble) => (
          <span
            key={bubble.left}
            className="absolute bottom-0 rounded-full border border-white/40 bg-white/15 animate-bubble"
            style={{
              left: bubble.left,
              width: bubble.size,
              height: bubble.size,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="mx-auto flex max-w-[1180px] flex-col gap-7 px-6 py-28 max-md:px-4 max-md:py-20">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-plant">
          {lang.landing.heroKicker}
        </p>

        <h1 className="max-w-[760px] text-[clamp(2.4rem,5.4vw,3.9rem)] font-bold leading-[1.04] tracking-tight text-white">
          {business.tagline}
        </h1>

        <p className="max-w-[560px] leading-relaxed text-white/75">
          {lang.landing.buildDescription(business.ownerExperienceYears)}
        </p>

        <div className="mt-1 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={openAssistant}
            className="group flex cursor-pointer items-center gap-2 rounded-xl bg-plant px-5 py-3 text-[0.9rem] font-semibold text-white shadow-[0_10px_28px_rgba(122,169,60,0.35)] transition-all hover:-translate-y-0.5 hover:bg-plant-dark"
          >
            <ChatIcon className="h-4.5 w-4.5" />
            {lang.landing.heroCta}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-[0.9rem] font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/20"
          >
            <WhatsappIcon className="h-4.5 w-4.5" />
            {lang.landing.whatsappCta}
          </a>
        </div>

        <div className="mt-4 flex gap-10">
          <Stat
            value={business.ownerExperienceYears}
            label={lang.landing.statYearsLabel}
          />
          <Stat
            value={countAvailableSpecies()}
            label={lang.landing.statSpeciesLabel}
          />
          <Stat
            value={getStarterKits().length}
            label={lang.landing.statKitsLabel}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
