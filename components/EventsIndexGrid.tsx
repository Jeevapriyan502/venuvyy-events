import Link from "next/link";
import { EVENT_TYPE_GROUPS } from "@/lib/event-types";
import { eventTypeToSlug } from "@/lib/event-slug";

function formatProductCount(count: number): string {
  if (count === 0) return "Plan with us";
  if (count === 1) return "1 package";
  return `${count} packages`;
}

export default function EventsIndexGrid({
  packageCounts,
}: {
  packageCounts: Record<string, number>;
}) {
  return (
    <div className="events-index">
      {EVENT_TYPE_GROUPS.map((group) => (
        <section key={group.label} className="events-index-group">
          <div className="events-index-group-header">
            <span className="events-index-group-icon" aria-hidden>
              {group.icon}
            </span>
            <div>
              <h2 className="events-index-group-title">{group.label}</h2>
              <p className="events-index-group-desc">{group.description}</p>
            </div>
          </div>

          <div className="events-index-grid">
            {group.types.map((type) => {
              const count = packageCounts[type.value] ?? 0;
              const slug = eventTypeToSlug(type.value);

              return (
                <Link
                  key={type.value}
                  href={`/events/${slug}`}
                  className="event-segment-card"
                >
                  <span className="event-segment-card-emoji" aria-hidden>
                    {type.emoji}
                  </span>
                  <div className="event-segment-card-body">
                    <h3 className="event-segment-card-title">{type.value}</h3>
                    <p
                      className={`event-segment-card-meta ${
                        count > 0 ? "event-segment-card-meta-active" : ""
                      }`}
                    >
                      {formatProductCount(count)}
                    </p>
                  </div>
                  <span className="event-segment-card-arrow" aria-hidden>
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
