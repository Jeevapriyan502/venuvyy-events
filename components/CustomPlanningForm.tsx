"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-[#d4af37]/20 bg-[#0a1018] px-4 py-3.5 text-white placeholder:text-slate-500 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50";

const serviceOptions = [
  "Venue & Decor",
  "Catering",
  "Photography & Videography",
  "Entertainment",
  "Floral Design",
  "Guest Management",
];

export default function CustomPlanningForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Wedding",
    eventDate: "",
    guestCount: "",
    budget: "",
    theme: "",
    venue: "",
    services: [] as string[],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const preferenceSummary = [
      "[Custom Package — Start Planning]",
      form.phone ? `Phone: ${form.phone}` : null,
      form.budget ? `Budget: ${form.budget}` : null,
      form.theme ? `Theme / Style: ${form.theme}` : null,
      form.venue ? `Venue preference: ${form.venue}` : null,
      form.services.length ? `Services: ${form.services.join(", ")}` : null,
      form.message ? `Additional notes: ${form.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          eventType: form.eventType,
          eventDate: form.eventDate,
          guestCount: Number(form.guestCount),
          message: preferenceSummary,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        eventType: "Wedding",
        eventDate: "",
        guestCount: "",
        budget: "",
        theme: "",
        venue: "",
        services: [],
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Submission failed.");
    }
  };

  return (
    <section id="custom-planning" className="bg-[#0c1220] py-24">
      <div className="mx-auto max-w-3xl px-6 text-left">
        <p className="font-tagline text-sm uppercase tracking-[0.35em] text-[#d4af37]">
          Bespoke Experience
        </p>
        <h2 className="mt-4 font-logo text-4xl text-white">Start Planning Your Custom Event</h2>
        <p className="mt-3 max-w-xl text-slate-400">
          Tell us your preferences and we will craft a tailored package just for you.
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
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm text-[#d4af37]">Event Type</span>
                <select
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Wedding</option>
                  <option>Corporate Event</option>
                  <option>Private Party</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-[#d4af37]">Event Date</span>
                <input
                  required
                  type="date"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </label>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm text-[#d4af37]">Guest Count</span>
                <input
                  required
                  type="number"
                  min={1}
                  name="guestCount"
                  value={form.guestCount}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. 150"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-[#d4af37]">Budget Range</span>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select budget</option>
                  <option>Under ₹5 Lakhs</option>
                  <option>₹5 – 15 Lakhs</option>
                  <option>₹15 – 30 Lakhs</option>
                  <option>₹30 Lakhs+</option>
                </select>
              </label>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm text-[#d4af37]">Theme / Style</span>
                <input
                  name="theme"
                  value={form.theme}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. Rustic, Royal, Minimalist"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-[#d4af37]">Venue Preference</span>
                <input
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Indoor, outdoor, city..."
                />
              </label>
            </div>
            <fieldset>
              <legend className="mb-3 text-sm text-[#d4af37]">Services You Need</legend>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      form.services.includes(service)
                        ? "border-[#d4af37] bg-[#d4af37]/20 text-[#f0d78c]"
                        : "border-[#d4af37]/30 text-slate-400 hover:border-[#d4af37]/60"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="block">
              <span className="mb-1.5 block text-sm text-[#d4af37]">Additional Preferences</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className={inputClass}
                placeholder="Dietary needs, colour palette, special requests..."
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 w-full rounded-full border border-[#d4af37]/50 bg-transparent py-4 font-medium text-[#d4af37] transition hover:bg-[#d4af37]/10 disabled:opacity-60 md:w-auto md:px-12"
            >
              {status === "loading" ? "Sending..." : "Send My Preferences"}
            </button>
            {status === "success" && (
              <p className="rounded-xl bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300">
                Your preferences have been received. Our team will prepare a custom proposal for you.
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
