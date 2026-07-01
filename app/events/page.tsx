import EventsIndexGrid from "@/components/EventsIndexGrid";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import TopBanner from "@/components/TopBanner";
import { getActivePackageCountsByEventType } from "@/lib/package-counts";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const packageCounts = await getActivePackageCountsByEventType();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopBanner />
      <Navbar />
      <section className="border-b border-border section-tone-a py-12 md:py-16">
        <div className="section-wrap">
          <p className="section-label">Browse events</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Every celebration, one tap away
          </h1>
          <p className="font-description mt-3 max-w-2xl text-muted">
            Choose an event type to explore packages, see what we offer, and start
            planning your celebration.
          </p>
        </div>
      </section>

      <section className="section-tone-b py-10 md:py-14">
        <div className="section-wrap">
          <EventsIndexGrid packageCounts={packageCounts} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
