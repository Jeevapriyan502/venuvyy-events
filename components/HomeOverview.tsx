"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import { HOME_OVERVIEW_SEGMENTS } from "@/lib/home-sections";
import { useHomeSection } from "@/components/HomeWorkspace";
import type { HomeSectionId } from "@/lib/home-sections";

export default function HomeOverview({ gallery }: { gallery: ReactNode }) {
  const homeNav = useHomeSection();

  const openSection = (id: HomeSectionId) => {
    homeNav?.navigate(id);
  };

  return (
    <>
      <HeroCarousel />

      {gallery}

      <section className="border-b border-border section-tone-b py-12 md:py-16">
        <div className="section-wrap">
          <p className="section-label">Explore</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Everything in one place
          </h2>
          <p className="font-description mt-2 max-w-2xl text-muted">
            Choose a section to explore packages, add-ons, planning, and more.
          </p>

          <div className="home-overview-segments">
            {HOME_OVERVIEW_SEGMENTS.map((segment) => {
              if (segment.id === "events" && "href" in segment) {
                return (
                  <Link key={segment.id} href={segment.href} className="home-overview-segment">
                    <span className="home-overview-segment-icon" aria-hidden>
                      {segment.icon}
                    </span>
                    <div className="home-overview-segment-body">
                      <h3 className="home-overview-segment-title">{segment.label}</h3>
                      <p className="home-overview-segment-desc">{segment.description}</p>
                    </div>
                    <span className="home-overview-segment-arrow" aria-hidden>
                      →
                    </span>
                  </Link>
                );
              }

              return (
                <button
                  key={segment.id}
                  type="button"
                  onClick={() => openSection(segment.id as HomeSectionId)}
                  className="home-overview-segment"
                >
                  <span className="home-overview-segment-icon" aria-hidden>
                    {segment.icon}
                  </span>
                  <div className="home-overview-segment-body">
                    <h3 className="home-overview-segment-title">{segment.label}</h3>
                    <p className="home-overview-segment-desc">{segment.description}</p>
                  </div>
                  <span className="home-overview-segment-arrow" aria-hidden>
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
