import Link from "next/link";
import { notFound } from "next/navigation";
import EventPlanningLink from "@/components/EventPlanningLink";
import Navbar from "@/components/Navbar";
import PackageShowcase from "@/components/PackageShowcase";
import SiteFooter from "@/components/SiteFooter";
import TopBanner from "@/components/TopBanner";
import { CONTACT_PHONE_HREF } from "@/lib/site-config";
import { getEventTypeMeta, getAllEventTypeSlugs, slugToEventType } from "@/lib/event-slug";

export function generateStaticParams() {
  return getAllEventTypeSlugs().map((slug) => ({ slug }));
}

export default async function EventTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const eventType = slugToEventType(slug);
  if (!eventType) notFound();

  const meta = getEventTypeMeta(eventType);
  if (!meta) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopBanner />
      <Navbar />

      <section className="event-type-hero border-b border-border section-tone-a py-12 md:py-16">
        <div className="section-wrap">
          <Link
            href="/events"
            className="inline-flex items-center gap-1 text-sm font-medium text-warm hover:text-warm-hover"
          >
            ← All events
          </Link>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
            <span className="event-type-hero-emoji" aria-hidden>
              {meta.emoji}
            </span>
            <div className="max-w-2xl">
              <p className="section-label">{meta.groupLabel}</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                {meta.value}
              </h1>
              <p className="font-description mt-3 text-muted">{meta.groupDescription}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <EventPlanningLink eventType={eventType} className="btn-warm">
                  Plan this event
                </EventPlanningLink>
                <a href={CONTACT_PHONE_HREF} className="btn-outline">
                  Call us today
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PackageShowcase eventType={eventType} variant="event" backHref="/events" />

      <section className="border-t border-border section-tone-c py-12">
        <div className="section-wrap flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Ready to begin?</h2>
            <p className="font-description mt-1 text-sm text-muted">
              Share your vision for {meta.value.toLowerCase()} — we respond within one business day.
            </p>
          </div>
          <EventPlanningLink eventType={eventType} className="btn-warm shrink-0">
            Start planning →
          </EventPlanningLink>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
