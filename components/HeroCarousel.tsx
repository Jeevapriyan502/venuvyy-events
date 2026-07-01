"use client";

import { useEffect, useState } from "react";
import CelebrationBackground from "./CelebrationBackground";
import PlanningLink from "./PlanningLink";
import SectionLink from "./SectionLink";

const slides = [
  {
    eyebrow: "We create memories",
    title: "That last forever.",
    cta: "Start Planning",
    planning: true,
  },
  {
    eyebrow: "We turn ordinary occasions",
    title: "Into extraordinary experiences.",
    cta: "Explore Packages",
    sectionId: "packages",
    planning: false,
  },
  {
    eyebrow: "Your unforgettable moments",
    title: "Start here.",
    cta: "Book Consultation",
    planning: true,
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="section-tone-hero relative min-h-[min(85vh,780px)] overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-[#e0d5c9]/88 via-[#d4c9bc]/78 to-[#c8bbb0]/82" />
      <CelebrationBackground />
      <div className="pointer-events-none absolute -left-24 top-1/4 z-[1] h-72 w-72 rounded-full bg-[#c4a9a2]/35 blur-3xl" />
      <div className="section-wrap relative z-10 flex min-h-[min(85vh,780px)] flex-col items-start justify-center py-16 text-left md:py-20">
        <div key={index} className="w-full max-w-3xl text-left">
          <p className="section-label text-reveal text-reveal-d1 text-violet-text">{slide.eyebrow}</p>
          <h1 className="text-reveal text-reveal-d2 mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {slide.title}
          </h1>
          <p className="text-reveal text-reveal-d3 mt-6 max-w-xl font-description text-lg leading-relaxed text-muted">
            Premium event planning for weddings, surprises, and celebrations — tailored to your
            vision, wherever you are.
          </p>
          <div className="text-reveal text-reveal-d4 mt-10 flex flex-wrap justify-start gap-3">
            {slide.planning ? (
              <PlanningLink className="btn-warm">{slide.cta}</PlanningLink>
            ) : (
              <SectionLink sectionId={slide.sectionId!} className="btn-warm">
                {slide.cta}
              </SectionLink>
            )}
            {!slide.sectionId && (
              <SectionLink sectionId="packages" className="btn-outline">
                Explore Packages
              </SectionLink>
            )}
          </div>
        </div>

        <div className="text-reveal text-reveal-d5 mt-10 flex justify-start gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-violet-mid" : "w-4 bg-border-strong hover:bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
