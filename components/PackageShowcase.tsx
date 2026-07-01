import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import EventPlanningLink from "@/components/EventPlanningLink";
import PlanningLink from "@/components/PlanningLink";
import { isEventType } from "@/lib/event-types";

export const dynamic = "force-dynamic";

export default async function PackageShowcase({
  eventType,
  variant = "home",
  backHref,
}: {
  eventType?: string;
  variant?: "home" | "event";
  backHref?: string;
}) {
  const activeFilter = eventType && isEventType(eventType) ? eventType : undefined;

  const packages = await prisma.package.findMany({
    where: {
      isActive: true,
      ...(activeFilter ? { eventType: activeFilter } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  const useEventPlanning = variant === "event" && activeFilter;

  return (
    <section
      id={variant === "home" ? "packages" : undefined}
      className={`${variant === "home" ? "scroll-mt-20" : ""} border-b border-border section-tone-a py-12 md:py-16`}
    >
      <div className="section-wrap">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">Featured collection</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              {activeFilter ? `${activeFilter} packages` : "Event packages"}
            </h2>
            <p className="font-description mt-3 max-w-xl text-muted">
              {activeFilter
                ? packages.length > 0
                  ? `${packages.length} package${packages.length === 1 ? "" : "s"} for ${activeFilter.toLowerCase()}.`
                  : `No packages listed for ${activeFilter} yet — start planning with us.`
                : packages.length > 0
                  ? "Curated packages for unforgettable celebrations. Each can be tailored."
                  : "Packages appear here as you add them in admin. Scroll to explore soon."}
            </p>
          </div>
          {activeFilter && backHref && (
            <Link
              href={backHref}
              className="shrink-0 text-sm font-medium text-warm hover:text-warm-hover"
            >
              ← Back to events
            </Link>
          )}
          {activeFilter && variant === "home" && (
            <Link
              href="/#packages"
              className="shrink-0 text-sm font-medium text-warm hover:text-warm-hover"
            >
              View all packages →
            </Link>
          )}
        </div>

        {packages.length > 0 ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <article key={pkg.id} className="card group overflow-hidden">
                <div className="relative h-48 overflow-hidden bg-surface">
                  {pkg.imageUrl ? (
                    <Image
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-surface-muted text-sm text-muted">
                      Package image
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-md bg-warm px-2.5 py-1 text-xs font-medium text-white">
                    Gift a memory
                  </span>
                  {pkg.eventType && (
                    <span className="absolute bottom-3 left-3 rounded-md border border-border bg-surface/95 px-2 py-1 text-xs text-muted backdrop-blur-sm">
                      {pkg.eventType}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-foreground">{pkg.title}</h3>
                  {pkg.description && (
                    <p className="font-description mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {pkg.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <p className="text-lg font-semibold text-foreground">
                      ₹{Number(pkg.price).toLocaleString("en-IN")}
                    </p>
                    {useEventPlanning ? (
                      <EventPlanningLink
                        eventType={activeFilter}
                        className="text-sm font-medium text-warm hover:text-warm-hover"
                      >
                        Explore Package →
                      </EventPlanningLink>
                    ) : (
                      <PlanningLink className="text-sm font-medium text-warm hover:text-warm-hover">
                        Explore Package →
                      </PlanningLink>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="card mt-12 border-dashed p-12 text-left">
            <p className="text-muted">
              {activeFilter
                ? `No packages for ${activeFilter} yet — tell us your vision and we'll build one.`
                : "No packages yet — add them from the admin dashboard."}
            </p>
            {useEventPlanning ? (
              <EventPlanningLink eventType={activeFilter} className="btn-warm mt-6">
                Start Planning
              </EventPlanningLink>
            ) : (
              <PlanningLink className="btn-warm mt-6">Start Planning</PlanningLink>
            )}
          </div>
        )}

        <article className="card mt-6 flex flex-col p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-lg">
            <h3 className="font-semibold text-foreground">Custom package</h3>
            <p className="font-description mt-2 text-sm text-muted">
              Bespoke events built from scratch — props, labour, and planning scoped to your vision.
            </p>
          </div>
          {useEventPlanning ? (
            <EventPlanningLink eventType={activeFilter} className="btn-outline mt-6 shrink-0 md:mt-0">
              Start Planning
            </EventPlanningLink>
          ) : (
            <PlanningLink className="btn-outline mt-6 shrink-0 md:mt-0">
              Start Planning
            </PlanningLink>
          )}
        </article>
      </div>
    </section>
  );
}
