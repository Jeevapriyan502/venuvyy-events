"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EventTypeSelect from "@/components/EventTypeSelect";
import EventDateInput from "@/components/EventDateInput";

export type CustomerEventItem = {
  id: string;
  customerEmail: string;
  title: string;
  eventType: string | null;
  eventDate: string | null;
  guestCount: number | null;
  description: string | null;
  imageUrl: string | null;
  status: string;
};

const STATUS_OPTIONS = [
  { value: "PLANNED", label: "Planned" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function EditCustomerEventForm({
  event,
  onSuccess,
  onCancel,
}: {
  event: CustomerEventItem;
  onSuccess: () => void;
  onCancel: () => void;
}) {
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
      const res = await fetch(`/api/customer-events/${event.id}`, {
        method: "PATCH",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setSuccess(true);
      onSuccess();
      onCancel();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${event.title}" for ${event.customerEmail}?`)) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/customer-events/${event.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      onSuccess();
      onCancel();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <label>
        <span>Customer email</span>
        <input name="customerEmail" type="email" required defaultValue={event.customerEmail} />
      </label>

      <label>
        <span>Event title</span>
        <input name="title" required defaultValue={event.title} />
      </label>

      <div className="admin-form-grid-2">
        <label>
          <span>Event type</span>
          <EventTypeSelect
            name="eventType"
            defaultValue={event.eventType || "Birthday Party"}
          />
        </label>
        <label>
          <span>Event date</span>
          <EventDateInput defaultValue={event.eventDate} />
        </label>
      </div>

      <div className="admin-form-grid-2">
        <label>
          <span>Guest count</span>
          <input
            name="guestCount"
            type="number"
            min={1}
            defaultValue={event.guestCount ?? ""}
          />
        </label>
        <label>
          <span>Status</span>
          <select name="status" defaultValue={event.status}>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        <span>Description</span>
        <textarea name="description" rows={3} defaultValue={event.description || ""} />
      </label>

      <div>
        <span className="admin-field-label">Current image</span>
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            width={160}
            height={120}
            className="mt-2 h-28 w-full max-w-[200px] rounded-lg object-cover"
          />
        ) : (
          <p className="mt-1 text-xs text-muted">No image uploaded</p>
        )}
      </div>

      <label>
        <span>Replace image (optional)</span>
        <input name="image" type="file" accept="image/*" />
      </label>

      <div className="admin-form-actions">
        <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">
          {loading ? "Saving..." : "Save changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="admin-btn admin-btn-secondary"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="admin-btn admin-btn-danger"
        >
          Delete
        </button>
      </div>

      {success && <p className="admin-alert-success">Event updated.</p>}
      {error && <p className="admin-alert-error">{error}</p>}
    </form>
  );
}
