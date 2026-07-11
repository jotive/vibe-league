import { lang } from "@/lang";
import { StarIcon } from "@/components/Icons";
import { getTestimonials } from "@/services/catalog";

import Reveal from "./Reveal";

export default function Testimonials() {
  const testimonials = getTestimonials();

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
      {testimonials.map((testimonial, index) => (
        <Reveal key={testimonial.author} delayMs={index * 90}>
          <article className="flex h-full flex-col gap-3 rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-[0_14px_34px_rgba(29,43,33,0.10)]">
            <div className="flex gap-0.5 text-coral">
              {Array.from({ length: testimonial.rating }).map((_, star) => (
                <StarIcon key={star} className="h-4 w-4" />
              ))}
            </div>

            <p className="flex-1 text-[0.86rem] leading-relaxed text-text-muted">
              “{testimonial.text}”
            </p>

            <footer className="flex items-center gap-2.5 border-t border-border pt-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-plant/15 text-[0.8rem] font-bold text-plant-dark">
                {testimonial.author.charAt(0)}
              </span>
              <div>
                <p className="text-[0.82rem] font-semibold text-text">
                  {testimonial.author}
                </p>
                <p className="text-[0.72rem] text-text-faint">
                  {testimonial.location}
                </p>
              </div>
            </footer>
          </article>
        </Reveal>
      ))}

      <p className="col-span-3 text-[0.7rem] italic text-text-faint max-md:col-span-1">
        {lang.landing.testimonialsDisclaimer}
      </p>
    </div>
  );
}
