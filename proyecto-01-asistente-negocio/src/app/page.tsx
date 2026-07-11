import CatalogPanel from "@/components/CatalogPanel";
import ChatWidget from "@/components/ChatWidget";
import Hero from "@/components/Hero";
import { FishIcon, ShieldIcon, TruckIcon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import StoreMap from "@/components/StoreMap";
import Testimonials from "@/components/Testimonials";
import { lang } from "@/lang";
import { knowledgeBase } from "@/services/knowledge-base.loader";

function TrustCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-plant hover:shadow-[0_14px_34px_rgba(29,43,33,0.10)]">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-plant/12 text-plant-dark">
        {icon}
      </span>
      <h3 className="text-[0.95rem] font-semibold text-water-dark">{title}</h3>
      <p className="text-[0.82rem] leading-relaxed text-text-muted">{body}</p>
    </article>
  );
}

export default function HomePage() {
  const { business, contact } = knowledgeBase;
  const whatsappUrl = `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="min-h-screen">
      <div className="bg-sale py-2 text-center text-[0.76rem] font-medium text-white">
        {lang.landing.promoBanner}
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 py-3 max-md:px-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-water text-white animate-sway">
              <FishIcon />
            </span>
            <span className="text-[1.05rem] font-bold tracking-tight text-water-dark">
              {business.name}
            </span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-whatsapp px-3.5 py-2 text-[0.8rem] font-semibold text-white transition-all hover:scale-[1.03] hover:opacity-95 max-sm:hidden"
          >
            {contact.whatsapp}
          </a>
        </div>
      </header>

      <Hero />

      <main className="mx-auto max-w-[1180px] px-6 py-20 max-md:px-4 max-md:py-12">
        <CatalogPanel />

        <section className="mt-20">
          <Reveal>
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-water-dark">
              <span className="h-6 w-1 rounded-full bg-plant" />
              {lang.landing.trustTitle}
            </h2>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            <Reveal delayMs={0}>
              <TrustCard
                icon={<FishIcon />}
                title={lang.landing.trustLiveFishTitle}
                body={lang.landing.trustLiveFishBody}
              />
            </Reveal>
            <Reveal delayMs={90}>
              <TrustCard
                icon={<ShieldIcon />}
                title={lang.landing.trustGuaranteeTitle}
                body={lang.landing.trustGuaranteeBody}
              />
            </Reveal>
            <Reveal delayMs={180}>
              <TrustCard
                icon={<TruckIcon />}
                title={lang.landing.trustShippingTitle}
                body={lang.landing.trustShippingBody}
              />
            </Reveal>
          </div>
        </section>

        <section className="mt-20">
          <Reveal>
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-water-dark">
              <span className="h-6 w-1 rounded-full bg-plant" />
              {lang.landing.testimonialsTitle}
            </h2>
          </Reveal>

          <Testimonials />
        </section>

        <section className="mt-20">
          <Reveal>
            <StoreMap />
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-border bg-water-dark py-12 text-white">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-start justify-between gap-6 px-6 max-md:px-4">
          <div>
            <p className="text-[1.05rem] font-bold">{business.name}</p>
            <p className="mt-1 text-[0.82rem] text-white/60">
              {contact.address}, {contact.neighborhood} · {contact.city}
            </p>
          </div>

          <div className="text-[0.82rem] text-white/70">
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
            <p>{contact.instagram}</p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
