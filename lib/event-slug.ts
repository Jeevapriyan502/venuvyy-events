import {
  EVENT_TYPE_GROUPS,
  EVENT_TYPES,
  isEventType,
  type EventType,
  type EventTypeEntry,
} from "@/lib/event-types";

export function eventTypeToSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const SLUG_TO_EVENT_TYPE = new Map<string, EventType>(
  EVENT_TYPES.map((type) => [eventTypeToSlug(type), type])
);

export function slugToEventType(slug: string): EventType | null {
  const value = SLUG_TO_EVENT_TYPE.get(slug);
  return value && isEventType(value) ? value : null;
}

export type EventTypeMeta = EventTypeEntry & {
  groupLabel: string;
  groupDescription: string;
  groupIcon: string;
};

export function getEventTypeMeta(value: string): EventTypeMeta | null {
  for (const group of EVENT_TYPE_GROUPS) {
    const entry = group.types.find((type) => type.value === value);
    if (entry) {
      return {
        ...entry,
        groupLabel: group.label,
        groupDescription: group.description,
        groupIcon: group.icon,
      };
    }
  }
  return null;
}

export function getAllEventTypeSlugs(): string[] {
  return EVENT_TYPES.map(eventTypeToSlug);
}
