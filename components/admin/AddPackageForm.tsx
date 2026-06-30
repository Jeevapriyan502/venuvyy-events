"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm text-[#d4af37]">Package Title</span>
          <input
            name="title"
            required
            className="w-full rounded-lg border border-[#d4af37]/30 bg-[#0f0f10] px-4 py-3 text-white outline-none focus:border-[#d4af37]"
            placeholder="Royal Wedding Package"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-[#d4af37]">Price (₹)</span>
          <input
            name="price"
            type="number"
            min={1}
            step={0.01}
            required
            className="w-full rounded-lg border border-[#d4af37]/30 bg-[#0f0f10] px-4 py-3 text-white outline-none focus:border-[#d4af37]"
            placeholder="150000"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm text-[#d4af37]">Event Type</span>
        <select
          name="eventType"
          className="w-full rounded-lg border border-[#d4af37]/30 bg-[#0f0f10] px-4 py-3 text-white outline-none focus:border-[#d4af37]"
        >
          <option>Wedding</option>
          <option>Corporate Event</option>
          <option>Private Party</option>
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm text-[#d4af37]">Description</span>
        <textarea
          name="description"
          rows={3}
          className="w-full rounded-lg border border-[#d4af37]/30 bg-[#0f0f10] px-4 py-3 text-white outline-none focus:border-[#d4af37]"
          placeholder="What's included in this package..."
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm text-[#d4af37]">Package Image</span>
        <input
          name="image"
          type="file"
          accept="image/*"
          className="w-full rounded-lg border border-dashed border-[#d4af37]/40 bg-[#0f0f10] px-4 py-3 text-slate-400 file:mr-4 file:rounded file:border-0 file:bg-[#d4af37] file:px-4 file:py-1 file:text-[#1a1a1b]"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-gradient-to-b from-[#f0d78c] to-[#9a7b2e] px-8 py-3 font-medium text-[#1a1a1b] transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Uploading..." : "Upload Package"}
      </button>

      {success && (
        <p className="rounded-lg bg-emerald-950/50 px-4 py-3 text-sm text-emerald-300">
          Package uploaded successfully!
        </p>
      )}
      {error && (
        <p className="rounded-lg bg-red-950/50 px-4 py-3 text-sm text-red-300">{error}</p>
      )}
    </form>
  );
}
