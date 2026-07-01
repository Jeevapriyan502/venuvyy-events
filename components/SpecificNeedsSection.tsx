import { SPECIFIC_NEEDS } from "@/lib/specific-needs";
import PlanningLink from "@/components/PlanningLink";
import { CONTACT_PHONE_HREF } from "@/lib/site-config";

export default function SpecificNeedsSection() {
  return (
    <section id="needs" className="scroll-mt-20 border-b border-border section-tone-c py-20 md:py-24">
      <div className="section-wrap">
        <p className="section-label">Add-on services</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Need something specific?
        </h2>
        <p className="font-description mt-4 max-w-2xl text-muted">
          Photography, catering, décor, bouncers, and more — call us or send an enquiry and we will
          tailor everything to your event.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={CONTACT_PHONE_HREF} className="btn-warm">
            Call Us Today
          </a>
          <PlanningLink className="btn-outline">
            Contact Online
          </PlanningLink>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIFIC_NEEDS.map((need) => (
            <article
              key={need.id}
              className="card p-6 md:p-8 transition hover:border-gold/40 hover:shadow-sm"
            >
              <span className="text-2xl" aria-hidden>
                {need.icon}
              </span>
              <h3 className="mt-3 font-medium text-foreground">{need.title}</h3>
              <p className="font-description mt-3 text-sm leading-relaxed text-muted">
                {need.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
