import { CONTACT_PHONE_HREF } from "@/lib/site-config";
import SectionLink from "./SectionLink";

export default function TopBanner() {
  return (
    <div className="border-b border-border bg-accent text-left text-sm text-white">
      <div className="section-wrap text-reveal text-reveal-d1 flex flex-wrap items-center justify-start gap-x-2 gap-y-1 py-2.5">
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium tracking-wide">
          🇮🇳 Indian brand · Events worldwide
        </span>
        <span className="hidden text-white/40 sm:inline">|</span>
        <span>Let&apos;s plan your event together —</span>
        <a href={CONTACT_PHONE_HREF} className="font-semibold underline underline-offset-2 hover:text-rose-200">
          Call Us Today!
        </a>
        <span className="hidden text-white/50 sm:inline">|</span>
        <SectionLink sectionId="gallery" className="hidden text-white/90 hover:text-white sm:inline">
          Memory Gallery
        </SectionLink>
        <span className="hidden text-white/50 sm:inline">|</span>
        <SectionLink sectionId="needs" className="hidden text-white/90 hover:text-white sm:inline">
          Add-on Services
        </SectionLink>
        <span className="hidden text-white/50 sm:inline">|</span>
        <SectionLink sectionId="packages" className="hidden text-white/90 hover:text-white sm:inline">
          Packages
        </SectionLink>
      </div>
    </div>
  );
}
