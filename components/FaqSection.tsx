"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How do I book an event with Venuvyy?",
    a: "Fill out the Start Planning form below or click Book Consultation. Our team will contact you within one business day.",
  },
  {
    q: "Can I customize a package?",
    a: "Yes. Every package can be tailored. For fully bespoke events, use the custom planning form with your requirements.",
  },
  {
    q: "Are props and labour charged separately?",
    a: "Freshly made props, décor, and labour for setup and coordination are billed based on scope. Full details are in our terms when you submit an enquiry.",
  },
  {
    q: "Which areas do you serve?",
    a: "We plan events across cities and countries worldwide — including destination weddings, international surprises, virtual celebrations, and on-ground coordination abroad. Share your city or country in the enquiry form.",
  },
  {
    q: "Do you plan events internationally?",
    a: "Yes. Our team coordinates local partners, vendors, and timelines so your celebration feels personal — no matter the distance.",
  },
  {
    q: "Do you offer virtual surprise services?",
    a: "Yes. We plan virtual surprises including live video reveals, coordinated online celebrations, and remote gift deliveries for friends and family anywhere.",
  },
  {
    q: "Can you plan prank-style or romantic surprises?",
    a: "Absolutely. From romantic candlelight setups and proposal surprises to fun prank experiences — share your idea in the enquiry form and we will customize the plan.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-b border-border section-tone-d py-20">
      <div className="section-wrap">
        <div className="section-wrap-narrow">
        <p className="section-label">FAQ</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Having doubts?</h2>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {faqs.map((item, i) => (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left text-sm font-medium text-foreground"
              >
                {item.q}
                <span className="text-muted">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <p className="font-description pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
              )}
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
