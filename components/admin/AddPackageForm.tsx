"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import EventTypeSelect from "@/components/EventTypeSelect";

export default function AddPackageForm({ onSuccess }: { onSuccess: () => void }) {
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
      const res = await fetch("/api/packages", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      onSuccess();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="admin-form-grid-2">
        <label>
          <span>Package title</span>
          <input name="title" required placeholder="Royal Wedding Package" />
        </label>
        <label>
          <span>Price (₹)</span>
          <input name="price" type="number" min={1} step={0.01} required placeholder="150000" />
        </label>
      </div>

      <label>
        <span>Event type</span>
        <EventTypeSelect name="eventType" />
      </label>

      <label>
        <span>Description</span>
        <textarea name="description" rows={3} placeholder="What's included in this package..." />
      </label>

      <label>
        <span>Package image</span>
        <input name="image" type="file" accept="image/*" />
      </label>

      <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">
        {loading ? "Uploading..." : "Upload package"}
      </button>

      {success && <p className="admin-alert-success">Package uploaded successfully.</p>}
      {error && <p className="admin-alert-error">{error}</p>}
    </form>
  );
}
