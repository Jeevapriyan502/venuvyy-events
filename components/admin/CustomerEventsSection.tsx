"use client";

import { useState } from "react";
import Image from "next/image";
import { formatEventDateForDisplay } from "@/lib/event-date";
import AddCustomerEventForm from "./AddCustomerEventForm";
import EditCustomerEventForm, { type CustomerEventItem } from "./EditCustomerEventForm";

const STATUS_LABELS: Record<string, string> = {
  PLANNED: "Planned",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export default function CustomerEventsSection({
  initialEvents,
}: {
  initialEvents: CustomerEventItem[];
}) {
  const [events, setEvents] = useState(initialEvents);
  const [editingId, setEditingId] = useState<string | null>(null);

  const refreshEvents = async () => {
    const res = await fetch("/api/customer-events?all=true");
    const data = await res.json();
    if (Array.isArray(data)) setEvents(data);
  };

  return (
    <div className="admin-split">
      <div className="admin-panel admin-panel-fill">
        <h3 className="text-sm font-semibold">All bookings ({events.length})</h3>
        <p className="mt-1 text-sm text-muted">Client events shown on My Events after sign-in.</p>
        <div className="admin-list mt-4">
          {events.length === 0 ? (
            <p className="text-sm text-muted">No customer events yet.</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className="admin-list-item">
                <div className="admin-list-item-row-reverse">
                  <div className="admin-list-body">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="admin-list-title">{event.title}</h3>
                        <p className="admin-list-meta">{event.customerEmail}</p>
                        <p className="admin-list-meta">
                          {STATUS_LABELS[event.status] ?? event.status}
                          {event.eventDate
                            ? ` · ${formatEventDateForDisplay(event.eventDate)}`
                            : ""}
                        </p>
                        {event.eventType && (
                          <p className="admin-list-meta">{event.eventType}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingId(editingId === event.id ? null : event.id)}
                        className="admin-btn admin-btn-ghost shrink-0"
                      >
                        {editingId === event.id ? "Close" : "Edit"}
                      </button>
                    </div>
                  </div>
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      width={104}
                      height={80}
                      className="admin-list-thumb-right"
                    />
                  ) : (
                    <div className="admin-list-thumb-placeholder admin-list-thumb-right">🎉</div>
                  )}
                </div>

                {editingId === event.id && (
                  <div className="mt-4 w-full border-t border-border pt-4">
                    <EditCustomerEventForm
                      event={event}
                      onSuccess={refreshEvents}
                      onCancel={() => setEditingId(null)}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="admin-panel admin-panel-sticky">
        <h3 className="text-sm font-semibold">Add customer event</h3>
        <p className="mt-1 text-sm text-muted">
          Use the client&apos;s sign-in email so they can see it on My Events.
        </p>
        <div className="mt-5">
          <AddCustomerEventForm onSuccess={refreshEvents} />
        </div>
      </div>
    </div>
  );
}
