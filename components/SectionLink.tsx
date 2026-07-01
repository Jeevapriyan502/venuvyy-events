"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useHomeSection } from "@/components/HomeWorkspace";
import { isHomeInlineSection, sectionIdToHomeSection } from "@/lib/home-sections";

const SCROLL_OFFSET = 96;

type SectionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  sectionId: string;
  children: ReactNode;
};

export function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return false;

  const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  window.history.replaceState(null, "", `/#${sectionId}`);
  return true;
}

export default function SectionLink({
  sectionId,
  children,
  onClick,
  href,
  className,
  ...props
}: SectionLinkProps) {
  const homeNav = useHomeSection();
  const homeSection = sectionIdToHomeSection(sectionId);
  const targetHref = href ?? (homeSection ? `/#${homeSection}` : `/#${sectionId}`);
  const isActive = homeNav && homeSection ? homeNav.activeSection === homeSection : false;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (homeNav && isHomeInlineSection(sectionId)) {
      e.preventDefault();
      if (homeNav.activeSection !== "home") {
        homeNav.navigate("home");
        requestAnimationFrame(() => {
          setTimeout(() => scrollToSection(sectionId), 120);
        });
      } else {
        scrollToSection(sectionId);
      }
      return;
    }

    if (homeNav && homeSection) {
      e.preventDefault();
      homeNav.navigate(homeSection);
      return;
    }

    if (window.location.pathname === "/") {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  return (
    <a
      href={targetHref}
      onClick={handleClick}
      className={`${className ?? ""}${isActive ? " home-nav-active" : ""}`}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
