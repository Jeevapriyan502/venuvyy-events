import { isEventType, PLANNING_EVENT_TYPE_KEY } from "@/lib/event-types";

export const PLANNING_EVENT_TYPE_EVENT = "venuvyy:set-planning-event-type";

export function presetPlanningEventType(eventType: string) {
  if (!isEventType(eventType)) return;
  sessionStorage.setItem(PLANNING_EVENT_TYPE_KEY, eventType);
  window.dispatchEvent(new CustomEvent(PLANNING_EVENT_TYPE_EVENT, { detail: eventType }));
}

export function consumePlanningEventType(): string | null {
  if (typeof window === "undefined") return null;

  const stored = sessionStorage.getItem(PLANNING_EVENT_TYPE_KEY);
  if (stored) {
    sessionStorage.removeItem(PLANNING_EVENT_TYPE_KEY);
    return stored;
  }

  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("eventType");
  if (fromQuery && isEventType(fromQuery)) return fromQuery;

  return null;
}
