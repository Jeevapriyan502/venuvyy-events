"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-[#d4af37]/20 bg-[#0a1018] px-4 py-3.5 text-white placeholder:text-slate-500 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50";

export default function ConsultationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          eventType: "Consultation",
          eventDate: form.preferredDate || new Date().toISOString().slice(0, 10),
          guestCount: 1,
          message: [
            "[Consultation Request]",
            form.phone ? `Phone: ${form.phone}` : null,
            form.preferredDate ? `Preferred call date: ${form.preferredDate}` : null,
            form.message || null,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", preferredDate: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Submission failed.");
    }
  };

  return (
    <section id="consultation" className="bg-[#111827] py-24">
      <div className="mx-auto max-w-3xl px-6 text-left">
        <p className="font-tagline text-sm uppercase tracking-[0.35em] text-[#d4af37]">
          Free Consultation
        </p>
        <h2 className="mt-4 font-logo text-4xl text-white">Book a Consultation</h2>
        <p className="mt-3 max-w-xl text-slate-400">
          Schedule a call with our team. We will discuss your event goals and answer any questions.
        </p>

        <div className="mt-10 rounded-2xl border border-[#d4af37]/15 bg-[#151c2c] p-8 md:p-12">
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm text-[#d4af37]">Full Name</span>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-[#d4af37]">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="you@email.com"
                />
              </label>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm text-[#d4af37]">Phone</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="+91 ..."
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-[#d4af37]">Preferred Call Date</span>
                <input
                  type="date"
                  name="preferredDate"
                  value={form.preferredDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm text-[#d4af37]">What would you like to discuss?</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className={inputClass}
                placeholder="Brief overview of your event or questions..."
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 w-full rounded-full bg-gradient-to-b from-[#f0d78c] to-[#9a7b2e] py-4 font-medium text-[#1a1a1b] transition hover:opacity-90 disabled:opacity-60 md:w-auto md:px-12"
            >
              {status === "loading" ? "Booking..." : "Book Consultation"}
            </button>
            {status === "success" && (
              <p className="rounded-xl bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300">
                Thank you! We will contact you shortly to schedule your consultation.
              </p>
            )}
            {status === "error" && (
              <p className="rounded-xl bg-red-950/40 px-4 py-3 text-sm text-red-300">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
