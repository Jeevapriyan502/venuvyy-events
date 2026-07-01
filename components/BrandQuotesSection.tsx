"use client";

import { useEffect, useState } from "react";
import { BRAND_QUOTES, BRAND_TAGLINE } from "@/lib/brand-quotes";

export default function BrandQuotesSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % BRAND_QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = BRAND_QUOTES[index];

  return (
    <section className="border-b border-border section-tone-d py-16 md:py-20">
      <div className="section-wrap">
        <div className="section-wrap-narrow">
        <p className="section-label">Our promise</p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-violet-border bg-violet-soft px-3 py-1 text-xs font-medium text-violet-text">
          🇮🇳 Indian brand · Global events
        </p>
        <p className="font-description mt-5 text-lg text-muted">{BRAND_TAGLINE}</p>

        <blockquote
          key={index}
          className="brand-quote-in mt-10 border-l-2 border-violet-mid pl-6"
        >
          <p className="text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-3xl">
            &ldquo;{current.quote}&rdquo;
          </p>
          <p className="font-description mt-4 text-base text-muted">{current.sub}</p>
        </blockquote>

        <div className="mt-8 flex gap-2">
          {BRAND_QUOTES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show quote ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-violet-mid" : "w-4 bg-border-strong hover:bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {BRAND_QUOTES.map((item) => (
            <figure
              key={item.quote}
              className="card border-violet-border/60 bg-surface/80 p-5"
            >
              <blockquote className="text-sm font-medium text-foreground">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="font-description mt-2 text-xs text-muted">
                {item.sub}
              </figcaption>
            </figure>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
