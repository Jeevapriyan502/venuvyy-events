"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useHomeSection } from "@/components/HomeWorkspace";

export const PLANNING_FORM_HASH = "#planning";

type PlanningLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export default function PlanningLink({ children, onClick, href, className, ...props }: PlanningLinkProps) {
  const homeNav = useHomeSection();
  const isActive = homeNav?.activeSection === "planning";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (homeNav) {
      e.preventDefault();
      homeNav.navigate("planning");
      return;
    }

    if (window.location.pathname === "/") {
      e.preventDefault();
      window.location.href = `/${PLANNING_FORM_HASH}`;
    }
  };

  return (
    <a
      href={href ?? `/${PLANNING_FORM_HASH}`}
      onClick={handleClick}
      className={`${className ?? ""}${isActive ? " home-nav-active" : ""}`}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
