"use client";

import { FormEvent, useState } from "react";
import EventTypeSelect from "@/components/EventTypeSelect";
import EventDateInput from "@/components/EventDateInput";
import { DEFAULT_EVENT_TYPE } from "@/lib/event-types";

type FormState = {
  name: string;
  email: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  eventType: DEFAULT_EVENT_TYPE,
  eventDate: "",
  guestCount: "",
  message: "",
};

const inputClass =
  "w-full rounded-xl border border-[#d4af37]/20 bg-[#0f0f10] px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50";

export default function CustomerEnquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guestCount: Number(form.guestCount) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Submission failed.");
    }
  };

  return (
    <section id="enquiry" className="bg-[#141415] py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="font-tagline text-sm uppercase tracking-[0.35em] text-[#d4af37]">
            Get In Touch
          </p>
          <h2 className="mt-4 font-logo text-4xl text-white">Plan Your Event</h2>
          <p className="mt-3 text-slate-400">
            Tell us about your vision. Our team will reach out within 24 hours.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-[#d4af37]/15 bg-[#1a1a1b] p-8 shadow-2xl shadow-black/30 md:p-12">
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm text-[#d4af37]">Full Name</span>
                <input required name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-[#d4af37]">Email</span>
                <input required type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="you@email.com" />
              </label>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm text-[#d4af37]">Event Type</span>
                <EventTypeSelect name="eventType" value={form.eventType} onChange={handleChange} className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-[#d4af37]">Event Date</span>
                <EventDateInput
                  required
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm text-[#d4af37]">Guest Count</span>
              <input required type="number" min={1} name="guestCount" value={form.guestCount} onChange={handleChange} className={inputClass} placeholder="e.g. 150" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-[#d4af37]">Message</span>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} className={inputClass} placeholder="Share your ideas, theme, or special requests..." />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 rounded-full bg-gradient-to-b from-[#f0d78c] to-[#9a7b2e] py-4 font-medium text-[#1a1a1b] transition hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Submit Enquiry"}
            </button>
            {status === "success" && (
              <p className="rounded-xl bg-emerald-950/40 px-4 py-3 text-center text-sm text-emerald-300">
                Thank you! Your enquiry has been received. We will be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="rounded-xl bg-red-950/40 px-4 py-3 text-center text-sm text-red-300">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
