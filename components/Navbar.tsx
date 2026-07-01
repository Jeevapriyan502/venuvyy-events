"use client";

import AuthButtons from "./AuthButtons";
import BrandName from "./BrandName";
import PlanningLink from "./PlanningLink";
import SectionLink from "./SectionLink";
import { CONTACT_PHONE_HREF } from "@/lib/site-config";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="navbar-inner">
        <div className="navbar-start">
          <BrandName />
          <nav className="navbar-links" aria-label="Main">
            <a href="/events" className="text-sm text-muted transition hover:text-foreground">
              Events
            </a>
            <SectionLink sectionId="gallery" className="text-sm text-muted transition hover:text-foreground">
              Gallery
            </SectionLink>
            <SectionLink sectionId="needs" className="text-sm text-muted transition hover:text-foreground">
              Add-ons
            </SectionLink>
            <SectionLink sectionId="packages" className="text-sm text-muted transition hover:text-foreground">
              Packages
            </SectionLink>
            <SectionLink sectionId="faq" className="text-sm text-muted transition hover:text-foreground">
              FAQ
            </SectionLink>
            <a
              href={CONTACT_PHONE_HREF}
              className="text-sm font-medium text-warm transition hover:text-warm-hover"
            >
              Call Us Today
            </a>
          </nav>
        </div>

        <div className="navbar-actions">
          <AuthButtons />
          <PlanningLink className="btn-warm navbar-btn-warm">
            <span className="navbar-cta-short">Book</span>
            <span className="navbar-cta-long">Book Consultation</span>
          </PlanningLink>
        </div>
      </div>
    </header>
  );
}
