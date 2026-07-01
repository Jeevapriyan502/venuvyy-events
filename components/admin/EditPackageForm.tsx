"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EventTypeSelect from "@/components/EventTypeSelect";

type Package = {
  id: string;
  title: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  eventType: string | null;
  isActive: boolean;
};

export default function EditPackageForm({
  pkg,
  onSuccess,
  onCancel,
}: {
  pkg: Package;
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
      const res = await fetch(`/api/packages/${pkg.id}`, {
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
      setError(err instanceof Error ? err.message : "Failed to update package");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!confirm(`Hide "${pkg.title}" from the website?`)) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/packages/${pkg.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Remove failed");

      onSuccess();
      onCancel();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="admin-form-grid-2">
        <label>
          <span>Package title</span>
          <input name="title" required defaultValue={pkg.title} />
        </label>
        <label>
          <span>Price (₹)</span>
          <input
            name="price"
            type="number"
            min={1}
            step={0.01}
            required
            defaultValue={Number(pkg.price)}
          />
        </label>
      </div>

      <label>
        <span>Event type</span>
        <EventTypeSelect name="eventType" defaultValue={pkg.eventType || "Wedding"} />
      </label>

      <label>
        <span>Description</span>
        <textarea
          name="description"
          rows={3}
          defaultValue={pkg.description || ""}
          placeholder="What's included in this package..."
        />
      </label>

      <div>
        <span className="admin-field-label">Current image</span>
        {pkg.imageUrl ? (
          <Image
            src={pkg.imageUrl}
            alt={pkg.title}
            width={96}
            height={96}
            className="mt-2 h-24 w-24 rounded-lg object-cover"
          />
        ) : (
          <p className="mt-1 text-xs text-muted">No image uploaded</p>
        )}
      </div>

      <label>
        <span>Replace image (optional)</span>
        <input name="image" type="file" accept="image/*" />
      </label>

      <label className="admin-checkbox-row">
        <input type="checkbox" name="isActive" defaultChecked={pkg.isActive} />
        Show on website
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
          onClick={handleRemove}
          disabled={loading}
          className="admin-btn admin-btn-danger"
        >
          Hide from site
        </button>
      </div>

      {success && <p className="admin-alert-success">Package updated.</p>}
      {error && <p className="admin-alert-error">{error}</p>}
    </form>
  );
}
