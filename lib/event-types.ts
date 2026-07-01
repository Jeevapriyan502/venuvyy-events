export type EventTypeEntry = {
  value: string;
  emoji: string;
};

export type EventTypeGroup = {
  label: string;
  description: string;
  icon: string;
  types: readonly EventTypeEntry[];
};

export const EVENT_TYPE_GROUPS: readonly EventTypeGroup[] = [
  {
    label: "Celebrations",
    description: "Milestone moments — weddings, birthdays, and gatherings worth remembering.",
    icon: "🎉",
    types: [
      { value: "Wedding", emoji: "💒" },
      { value: "Engagement Ceremony", emoji: "💍" },
      { value: "Birthday Party", emoji: "🎂" },
      { value: "Anniversary", emoji: "💐" },
      { value: "Baby Shower", emoji: "👶" },
      { value: "Housewarming", emoji: "🏠" },
      { value: "Graduation Party", emoji: "🎓" },
      { value: "Corporate Event", emoji: "🏢" },
      { value: "Private Party", emoji: "🥂" },
      { value: "Festival Celebration", emoji: "🪔" },
    ],
  },
  {
    label: "Surprises & Experiences",
    description: "Thoughtful surprises, romantic gestures, and unforgettable experiences.",
    icon: "✨",
    types: [
      { value: "Surprise Planning", emoji: "🎁" },
      { value: "Romantic Surprise", emoji: "❤️" },
      { value: "Prank Surprise", emoji: "😂" },
      { value: "Virtual Surprise", emoji: "💻" },
      { value: "Proposal Surprise", emoji: "💝" },
      { value: "Flash Mob Surprise", emoji: "🕺" },
      { value: "Room Decoration Surprise", emoji: "🌸" },
      { value: "Midnight Surprise", emoji: "🌙" },
      { value: "Gift A Memory Experience", emoji: "📸" },
    ],
  },
  {
    label: "Social & Milestone",
    description: "Farewells, reunions, and custom celebrations for every chapter.",
    icon: "🤝",
    types: [
      { value: "Farewell Party", emoji: "👋" },
      { value: "Retirement Party", emoji: "🎖️" },
      { value: "Reunion", emoji: "🫂" },
      { value: "Friends Surprise", emoji: "🫶" },
      { value: "Couple Surprise", emoji: "💑" },
      { value: "Custom Event", emoji: "⭐" },
    ],
  },
] as const;

export const EVENT_TYPES = EVENT_TYPE_GROUPS.flatMap((group) =>
  group.types.map((type) => type.value)
);

export type EventType = (typeof EVENT_TYPES)[number];

export const DEFAULT_EVENT_TYPE: EventType = "Wedding";

export const PLANNING_EVENT_TYPE_KEY = "venuvyy-planning-event-type";

export function isEventType(value: string): value is EventType {
  return (EVENT_TYPES as readonly string[]).includes(value);
}

export function getEventTypeEmoji(value: string): string {
  for (const group of EVENT_TYPE_GROUPS) {
    const match = group.types.find((type) => type.value === value);
    if (match) return match.emoji;
  }
  return "🎊";
}
