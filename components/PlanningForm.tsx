"use client";

import { FormEvent, useEffect, useState } from "react";
import EventTypeSelect from "@/components/EventTypeSelect";
import EventDateInput from "@/components/EventDateInput";
import TextReveal from "@/components/TextReveal";
import { DEFAULT_EVENT_TYPE, isEventType } from "@/lib/event-types";
import {
  consumePlanningEventType,
  PLANNING_EVENT_TYPE_EVENT,
} from "@/lib/planning-preset";
import {
  GMAIL_VALIDATION_MESSAGE,
  isValidGmail,
  isValidIndianPhone,
  PHONE_DIGIT_LIMIT,
  PHONE_VALIDATION_MESSAGE,
  sanitizePhoneInput,
} from "@/lib/contact-validation";

const TERMS = [
  "Custom props & décor are priced based on your design.",
  "Setup, styling & on-site labour are billed per scope.",
  "Planning covers consultation, vendors & day-of coordination.",
  "We'll send a clear proposal once we know your brief.",
];

export default function PlanningForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: DEFAULT_EVENT_TYPE,
    eventDate: "",
    guestCount: "",
    eventPlan: "",
    message: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsOpen, setTermsOpen] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const applyEventType = (eventType: string | null) => {
      if (eventType && isEventType(eventType)) {
        setForm((current) => ({ ...current, eventType }));
        setTermsOpen(true);
      }
    };

    const openForPlanningHash = () => {
      const hash = window.location.hash;
      if (hash === "#planning" || hash === "#planning-form") {
        setTermsOpen(true);
      }
    };

    openForPlanningHash();
    applyEventType(consumePlanningEventType());

    const onPreset = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      applyEventType(detail);
    };

    window.addEventListener("hashchange", openForPlanningHash);
    window.addEventListener(PLANNING_EVENT_TYPE_EVENT, onPreset);
    return () => {
      window.removeEventListener("hashchange", openForPlanningHash);
      window.removeEventListener(PLANNING_EVENT_TYPE_EVENT, onPreset);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "phone" ? sanitizePhoneInput(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setErrorMessage("Tick the box above to continue — takes two seconds.");
      setStatus("error");
      return;
    }

    if (!isValidGmail(form.email)) {
      setErrorMessage(GMAIL_VALIDATION_MESSAGE);
      setStatus("error");
      return;
    }

    if (!isValidIndianPhone(form.phone)) {
      setErrorMessage(PHONE_VALIDATION_MESSAGE);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const summary = [
      "[Event Planning Enquiry]",
      form.phone ? `Phone: ${form.phone}` : null,
      form.eventPlan ? `Event plan: ${form.eventPlan}` : null,
      form.message ? `Notes: ${form.message}` : null,
      "Terms accepted: Yes (props, labour, and planning charges acknowledged)",
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
          phone: form.phone,
          eventType: form.eventType,
          eventDate: form.eventDate,
          guestCount: Number(form.guestCount),
          message: summary,
          termsAccepted: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        eventType: DEFAULT_EVENT_TYPE,
        eventDate: "",
        guestCount: "",
        eventPlan: "",
        message: "",
      });
      setAcceptedTerms(false);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Submission failed.");
    }
  };

  return (
    <section id="planning" className="scroll-mt-28 border-b border-border section-tone-b py-20 md:scroll-mt-24 md:py-24">
      <div className="section-wrap max-w-4xl">
        <TextReveal>
          <p className="section-label">Plan with us</p>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Tell us what you&apos;re celebrating
          </h2>
        </TextReveal>
        <TextReveal delay={0.18}>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
            Drop your details — we&apos;ll get back within 24 hours with ideas tailored to you.
          </p>
        </TextReveal>

        <div id="planning-form" className="planning-shell mt-10 scroll-mt-28 p-6 md:p-9">
          <form onSubmit={handleSubmit} className="grid gap-8">
            <div className={`planning-terms ${termsOpen ? "is-open" : ""}`}>
              <button
                type="button"
                className="planning-terms-toggle"
                onClick={() => setTermsOpen((open) => !open)}
                aria-expanded={termsOpen}
                aria-controls="planning-terms-panel"
              >
                <span>Quick heads-up before you start</span>
                <span className="planning-terms-hint">
                  {termsOpen ? "tap to hide" : "tap to expand"}
                </span>
              </button>
              {termsOpen && (
              <div id="planning-terms-panel" className="planning-terms-body">
                <ul className="planning-terms-list">
                  {TERMS.map((term) => (
                    <li key={term}>{term}</li>
                  ))}
                </ul>
                <label className="planning-accept">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => {
                      setAcceptedTerms(e.target.checked);
                      if (e.target.checked) {
                        setErrorMessage("");
                        if (status === "error") setStatus("idle");
                      }
                    }}
                  />
                  <span className="text-sm leading-snug text-muted">
                    Got it — I&apos;m cool with props, labour &amp; planning being quoted separately.
                  </span>
                </label>
              </div>
              )}
            </div>

            <fieldset
              disabled={!acceptedTerms}
              className={`grid gap-8 border-0 p-0 transition-all duration-300 ${
                acceptedTerms ? "opacity-100" : "pointer-events-none opacity-45 blur-[0.3px]"
              }`}
            >
              {!acceptedTerms && (
                <p className="planning-lock-hint">
                  <span aria-hidden>🔒</span>
                  Accept the quick heads-up above to unlock the form
                </p>
              )}

              <div className="grid gap-5">
                <p className="planning-step-label">01 · About you</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <label className="block sm:col-span-2 lg:col-span-1">
                    <span className="sr-only">Your name</span>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="planning-field"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className="sr-only">Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="planning-field"
                      placeholder="you@gmail.com"
                      autoComplete="email"
                      inputMode="email"
                    />
                  </label>
                  <label className="block">
                    <span className="sr-only">Phone</span>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="planning-field"
                      placeholder="10-digit mobile"
                      autoComplete="tel"
                      inputMode="numeric"
                      maxLength={PHONE_DIGIT_LIMIT}
                      pattern="[6-9][0-9]{9}"
                      title={PHONE_VALIDATION_MESSAGE}
                    />
                  </label>
                </div>
              </div>

              <div className="grid gap-5">
                <p className="planning-step-label">02 · The event</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="block sm:col-span-2">
                    <span className="sr-only">Event type</span>
                    <EventTypeSelect
                      name="eventType"
                      value={form.eventType}
                      onChange={handleChange}
                      className="planning-field"
                    />
                  </label>
                  <label className="block">
                    <span className="sr-only">Guest count</span>
                    <input
                      required
                      type="number"
                      min={1}
                      name="guestCount"
                      value={form.guestCount}
                      onChange={handleChange}
                      className="planning-field"
                      placeholder="Guests"
                    />
                  </label>
                  <label className="block sm:col-span-3 sm:max-w-xs">
                    <span className="mb-1 block text-xs font-medium text-muted">Event date</span>
                    <EventDateInput
                      required
                      name="eventDate"
                      value={form.eventDate}
                      onChange={handleChange}
                      className="planning-field planning-field-date"
                    />
                  </label>
                </div>
              </div>

              <div className="grid gap-5">
                <p className="planning-step-label">03 · Your vision</p>
                <label className="block">
                  <span className="sr-only">What&apos;s the vibe</span>
                  <textarea
                    required
                    name="eventPlan"
                    value={form.eventPlan}
                    onChange={handleChange}
                    rows={4}
                    className="planning-field resize-y min-h-[7rem]"
                    placeholder="What's the vibe? Theme, venue, décor, surprises — dream big."
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Anything else</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={2}
                    className="planning-field resize-y"
                    placeholder="Anything else we should know? (optional)"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={!acceptedTerms || status === "loading"}
                className="planning-submit"
              >
                {status === "loading" ? "Sending…" : "Send my plan"}
                {status !== "loading" && <span aria-hidden>→</span>}
              </button>
            </fieldset>

            {status === "success" && (
              <div className="planning-success">
                <span className="text-xl" aria-hidden>
                  🎉
                </span>
                <p>
                  <strong className="font-medium">You&apos;re on the list!</strong> We&apos;ll reach
                  out within 24 hours to start shaping your celebration.
                </p>
              </div>
            )}
            {status === "error" && (
              <p className="rounded-xl border border-red-300/60 bg-red-100/80 px-4 py-3 text-sm text-red-900">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
