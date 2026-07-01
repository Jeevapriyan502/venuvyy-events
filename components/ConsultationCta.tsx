import PlanningLink from "@/components/PlanningLink";
import TextReveal from "@/components/TextReveal";
import { CONTACT_PHONE_HREF } from "@/lib/site-config";

export default function ConsultationCta() {
  return (
    <section className="border-y border-border section-tone-b py-14">
      <div className="section-wrap flex flex-col items-start gap-6">
        <div>
          <TextReveal>
            <p className="section-label">Consultation</p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Ready to plan your event?
            </h2>
          </TextReveal>
          <TextReveal delay={0.18}>
            <p className="font-description mt-2 max-w-lg text-muted">
              Call us or share your brief — we will respond within one business day.
            </p>
          </TextReveal>
        </div>
        <TextReveal delay={0.26} className="flex shrink-0 flex-wrap gap-3">
          <a href={CONTACT_PHONE_HREF} className="btn-outline">
            Call Us Today
          </a>
          <PlanningLink className="btn-warm">Book Consultation</PlanningLink>
        </TextReveal>
      </div>
    </section>
  );
}
