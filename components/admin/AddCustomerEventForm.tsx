"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import EventTypeSelect from "@/components/EventTypeSelect";
import EventDateInput from "@/components/EventDateInput";

const STATUS_OPTIONS = [
  { value: "PLANNED", label: "Planned" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function AddCustomerEventForm({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/customer-events", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create event");

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      onSuccess();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <label>
        <span>Customer email</span>
        <input name="customerEmail" type="email" required placeholder="client@email.com" />
        <p className="mt-1 text-xs text-muted">Must match the email they use to sign in</p>
      </label>

      <label>
        <span>Event title</span>
        <input name="title" required placeholder="Priya's Birthday Surprise" />
      </label>

      <div className="admin-form-grid-2">
        <label>
          <span>Event type</span>
          <EventTypeSelect name="eventType" />
        </label>
        <label>
          <span>Event date</span>
          <EventDateInput required />
        </label>
      </div>

      <div className="admin-form-grid-2">
        <label>
          <span>Guest count</span>
          <input name="guestCount" type="number" min={1} placeholder="50" />
        </label>
        <label>
          <span>Status</span>
          <select name="status" defaultValue="PLANNED">
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        <span>Description / notes</span>
        <textarea
          name="description"
          rows={3}
          placeholder="Details the customer will see on their events page..."
        />
      </label>

      <label>
        <span>Event image</span>
        <input name="image" type="file" accept="image/*" />
        <p className="mt-1 text-xs text-muted">Shown on the customer&apos;s My Events page</p>
      </label>

      <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">
        {loading ? "Creating..." : "Add customer event"}
      </button>

      {success && (
        <p className="admin-alert-success">Event created — customer can see it after signing in.</p>
      )}
      {error && <p className="admin-alert-error">{error}</p>}
    </form>
  );
}
