import Link from "next/link";
import PlanningLink from "@/components/PlanningLink";
import SectionLink from "@/components/SectionLink";
import { CONTACT_CALL_LABEL, CONTACT_PHONE_HREF } from "@/lib/site-config";

export default function SiteFooter() {
  return (
    <footer className="section-tone-c border-t border-border py-14">
      <div className="section-wrap grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-foreground">About</p>
          <p className="font-description mt-3 text-sm leading-relaxed text-muted">
            Thoughtful event planning for weddings, surprises, and celebrations near and far —
            warm hospitality and flawless execution.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Quick links</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/events" className="hover:text-foreground">
                Event Categories
              </Link>
            </li>
            <li>
              <SectionLink sectionId="gallery" className="hover:text-foreground">
                Memory Gallery
              </SectionLink>
            </li>
            <li>
              <SectionLink sectionId="needs" className="hover:text-foreground">
                Add-on Services
              </SectionLink>
            </li>
            <li>
              <SectionLink sectionId="packages" className="hover:text-foreground">
                Packages
              </SectionLink>
            </li>
            <li>
              <PlanningLink className="hover:text-foreground">Start Planning</PlanningLink>
            </li>
            <li>
              <SectionLink sectionId="faq" className="hover:text-foreground">
                FAQ
              </SectionLink>
            </li>
            <li>
              <Link href="/sign-in" className="hover:text-foreground">
                Admin Sign in
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Call Us Today</p>
          <p className="font-description mt-3 text-sm text-muted">
            Speak with our team for surprises, packages, or custom event planning.
          </p>
          <a href={CONTACT_PHONE_HREF} className="btn-warm mt-4 text-sm">
            {CONTACT_CALL_LABEL}
          </a>
        </div>
      </div>
      <div className="section-wrap mt-10 border-t border-border pt-6 text-sm text-muted">
        © {new Date().getFullYear()} Venuvyy Events. All rights reserved.
      </div>
    </footer>
  );
}
