"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EVENT_TYPE_GROUPS } from "@/lib/event-types";
import { eventTypeToSlug } from "@/lib/event-slug";

function formatProductCount(count: number): string {
  if (count === 0) return "0 products";
  if (count === 1) return "1 product";
  return `${count} products`;
}

export default function EventCategoriesGrid({
  packageCounts,
}: {
  packageCounts: Record<string, number>;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="event-categories-section scroll-mt-20 border-b border-border py-10 md:py-12"
    >
      <div className="section-wrap">
        <div
          className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div>
            <p className="section-label">Event categories</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              What we offer
            </h2>
            <p className="font-description mt-2 max-w-2xl text-sm text-muted md:text-base">
              From weddings to surprises — tap any event to open its own page with packages
              and planning options.
            </p>
          </div>
          <Link
            href="/events"
            className="shrink-0 text-sm font-medium text-warm hover:text-warm-hover"
          >
            Browse all events →
          </Link>
        </div>
      </div>

      <div
        className={`event-categories-rows mt-6 transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
        style={{ transitionDelay: visible ? "80ms" : "0ms" }}
      >
        {EVENT_TYPE_GROUPS.map((group, groupIndex) => {
          const groupTotal = group.types.reduce(
            (sum, type) => sum + (packageCounts[type.value] ?? 0),
            0
          );

          return (
            <div key={group.label} className="event-categories-row">
              <div className="event-categories-row-label">
                <span className="event-categories-row-icon" aria-hidden>
                  {group.icon}
                </span>
                <div className="min-w-0">
                  <span className="event-categories-row-title">{group.label}</span>
                  <span className="event-categories-row-count">
                    {formatProductCount(groupTotal)}
                  </span>
                </div>
              </div>

              <div className="event-categories-row-track-wrap">
                <div
                  className="event-categories-row-track"
                  style={{ transitionDelay: visible ? `${100 + groupIndex * 60}ms` : "0ms" }}
                >
                  {group.types.map((type) => {
                    const count = packageCounts[type.value] ?? 0;
                    const slug = eventTypeToSlug(type.value);

                    return (
                      <Link
                        key={type.value}
                        href={`/events/${slug}`}
                        className="event-category-pill"
                        title={formatProductCount(count)}
                      >
                        <span className="event-category-pill-emoji" aria-hidden>
                          {type.emoji}
                        </span>
                        <span className="event-category-pill-label">{type.value}</span>
                        <span
                          className={`event-category-pill-count ${
                            count > 0 ? "event-category-pill-count-active" : ""
                          }`}
                        >
                          {count}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
