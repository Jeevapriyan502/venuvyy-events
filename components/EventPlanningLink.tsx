"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { PLANNING_FORM_HASH } from "@/components/PlanningLink";
import { presetPlanningEventType } from "@/lib/planning-preset";
import { isEventType } from "@/lib/event-types";

type EventPlanningLinkProps = {
  eventType: string;
  children: ReactNode;
  className?: string;
};

export default function EventPlanningLink({
  eventType,
  children,
  className,
}: EventPlanningLinkProps) {
  const href = isEventType(eventType)
    ? `/?eventType=${encodeURIComponent(eventType)}${PLANNING_FORM_HASH}`
    : `/${PLANNING_FORM_HASH}`;

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        if (isEventType(eventType)) presetPlanningEventType(eventType);
      }}
    >
      {children}
    </Link>
  );
}
