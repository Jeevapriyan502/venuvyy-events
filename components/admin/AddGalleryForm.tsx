"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddGalleryForm({ onSuccess }: { onSuccess: () => void }) {
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
      const res = await fetch("/api/gallery", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      onSuccess();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <label>
        <span>Title (optional)</span>
        <input name="title" placeholder="Wedding celebration" />
      </label>

      <label>
        <span>Caption (optional)</span>
        <input name="caption" placeholder="Happy couple surprise reveal" />
      </label>

      <label>
        <span>Gallery image</span>
        <input name="image" type="file" accept="image/*" required />
      </label>

      <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">
        {loading ? "Uploading..." : "Add to gallery"}
      </button>

      {success && <p className="admin-alert-success">Gallery image added.</p>}
      {error && <p className="admin-alert-error">{error}</p>}
    </form>
  );
}
