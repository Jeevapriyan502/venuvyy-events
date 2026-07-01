"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type GalleryImageItem = {
  id: string;
  title: string | null;
  caption: string | null;
  imageUrl: string;
  isActive: boolean;
};

export default function EditGalleryForm({
  image,
  onSuccess,
  onCancel,
}: {
  image: GalleryImageItem;
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
      const res = await fetch(`/api/gallery/${image.id}`, {
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
      setError(err instanceof Error ? err.message : "Failed to update gallery image");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!confirm(`Remove "${image.title || "this image"}" from the homepage gallery?`)) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/gallery/${image.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Remove failed");

      onSuccess();
      onCancel();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove gallery image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <label>
        <span>Title</span>
        <input name="title" defaultValue={image.title || ""} placeholder="Wedding celebration" />
      </label>

      <label>
        <span>Caption</span>
        <input
          name="caption"
          defaultValue={image.caption || ""}
          placeholder="Happy couple surprise reveal"
        />
      </label>

      <div>
        <span className="admin-field-label">Current image</span>
        <Image
          src={image.imageUrl}
          alt={image.title || "Gallery"}
          width={160}
          height={120}
          className="mt-2 h-28 w-full max-w-[200px] rounded-lg object-cover"
        />
      </div>

      <label>
        <span>Replace image (optional)</span>
        <input name="image" type="file" accept="image/*" />
      </label>

      <label className="admin-checkbox-row">
        <input type="checkbox" name="isActive" defaultChecked={image.isActive} />
        Show on homepage gallery
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
          Remove from site
        </button>
      </div>

      {success && <p className="admin-alert-success">Gallery image updated.</p>}
      {error && <p className="admin-alert-error">{error}</p>}
    </form>
  );
}
