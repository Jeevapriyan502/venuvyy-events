import Image from "next/image";
import Link from "next/link";
import PlanningLink from "@/components/PlanningLink";
import { redirect } from "next/navigation";
import BrandName from "@/components/BrandName";
import { UserButton } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { getSessionUser } from "@/lib/auth";
import { formatEventDateForDisplay } from "@/lib/event-date";
import { prisma } from "@/lib/prisma";

const STATUS_LABELS: Record<string, string> = {
  PLANNED: "Planned",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const STATUS_STYLES: Record<string, string> = {
  PLANNED: "bg-violet-soft text-violet-text",
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  IN_PROGRESS: "bg-amber-100 text-amber-900",
  COMPLETED: "bg-slate-200 text-slate-700",
  CANCELLED: "bg-red-100 text-red-800",
};

export default async function MyEventsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/sign-in");

  const email = user.emailAddresses[0]?.emailAddress?.toLowerCase();
  if (!email) redirect("/sign-in");

  const events = await prisma.customerEvent.findMany({
    where: {
      OR: [{ customerEmail: email }, { clerkUserId: user.id }],
    },
    orderBy: { createdAt: "desc" },
  });

  const firstName = user.firstName || user.emailAddresses[0]?.emailAddress?.split("@")[0] || "there";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface/95 backdrop-blur-md">
        <div className="section-wrap flex items-center justify-between gap-4 py-4">
          <Link href="/">
            <BrandName />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-muted transition hover:text-foreground">
              Home
            </Link>
            <UserButton
              appearance={{
                ...clerkAppearance,
                elements: { avatarBox: "h-8 w-8" },
              }}
            />
          </div>
        </div>
      </header>

      <div className="section-wrap py-10 sm:py-14">
        <p className="section-label">Your bookings</p>
        <h1 className="mt-2 font-logo text-3xl tracking-wide sm:text-4xl">Your Events</h1>
        <p className="mt-3 max-w-xl font-description text-muted">
          Hi {firstName} — here are the celebrations we&apos;re planning for you. Each event
          includes a preview image and the latest status from our team.
        </p>

        {events.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-border bg-surface p-10 text-center">
            <p className="text-4xl">🎉</p>
            <h2 className="mt-4 font-logo text-xl">No events yet</h2>
            <p className="mt-2 font-description text-muted">
              Once you book with us, your events will appear here with photos and updates.
            </p>
            <PlanningLink className="btn-warm mt-6 inline-flex text-sm">
              Plan an Event
            </PlanningLink>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full bg-surface-muted">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl">🎊</div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h2 className="font-logo text-lg tracking-wide">{event.title}</h2>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[event.status] ?? STATUS_STYLES.PLANNED}`}
                    >
                      {STATUS_LABELS[event.status] ?? event.status}
                    </span>
                  </div>
                  {event.eventType && (
                    <p className="mt-1 text-sm text-violet-mid">{event.eventType}</p>
                  )}
                  {event.eventDate && (
                    <p className="mt-2 text-sm text-muted">
                      <span className="font-medium text-foreground">Date:</span>{" "}
                      {formatEventDateForDisplay(event.eventDate)}
                    </p>
                  )}
                  {event.guestCount != null && (
                    <p className="mt-1 text-sm text-muted">
                      <span className="font-medium text-foreground">Guests:</span>{" "}
                      {event.guestCount}
                    </p>
                  )}
                  {event.description && (
                    <p className="mt-3 font-description text-sm text-muted line-clamp-3">
                      {event.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
