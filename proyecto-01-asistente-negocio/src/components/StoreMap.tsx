import { PinIcon } from "@/components/Icons";
import { lang } from "@/lang";
import { knowledgeBase } from "@/services/knowledge-base.loader";

const MAP_BBOX = "-75.6015,6.2385,-75.5875,6.2495";
const MAP_MARKER = "6.2440,-75.5945";

export default function StoreMap() {
  const { contact, hours } = knowledgeBase;
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${MAP_BBOX}&layer=mapnik&marker=${MAP_MARKER}`;

  return (
    <div className="grid grid-cols-[0.9fr_1.1fr] gap-6 overflow-hidden rounded-2xl border border-border bg-white max-lg:grid-cols-1">
      <div className="flex flex-col gap-4 p-7">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-water/10 text-water">
          <PinIcon />
        </span>

        <h2 className="text-xl font-semibold text-water-dark">
          {lang.landing.mapTitle}
        </h2>

        <div className="flex flex-col gap-1 text-[0.88rem] text-text-muted">
          <p className="font-medium text-text">{contact.address}</p>
          <p>
            {contact.neighborhood} · {contact.city}
          </p>
          <p className="mt-2">{contact.phone}</p>
        </div>

        <div className="rounded-lg bg-cream p-3">
          <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-plant-dark">
            {lang.landing.livePickupLabel}
          </p>
          <p className="mt-0.5 text-[0.78rem] leading-snug text-text-muted">
            {hours.liveFishPickupBestTimes}
          </p>
        </div>

        <p className="mt-auto text-[0.7rem] italic text-text-faint">
          {lang.landing.mapDisclaimer}
        </p>
      </div>

      <div className="relative min-h-[320px] bg-cream">
        <iframe
          src={embedUrl}
          title={lang.landing.mapTitle}
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0 grayscale-[0.15]"
        />
      </div>
    </div>
  );
}
