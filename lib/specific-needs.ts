export const SPECIFIC_NEEDS = [
  {
    id: "photography",
    title: "Photography & Videography",
    description: "Professional photo and video coverage to capture every moment.",
    icon: "📸",
  },
  {
    id: "food",
    title: "Food & Catering",
    description: "Menus, live counters, and catering coordinated for your guest count.",
    icon: "🍽️",
  },
  {
    id: "decor",
    title: "Décor Management",
    description: "Themes, florals, props, and full venue styling from concept to setup.",
    icon: "✨",
  },
  {
    id: "bouncers",
    title: "Bouncers & Security",
    description: "Entry management, crowd control, and on-site safety for your event.",
    icon: "🛡️",
  },
  {
    id: "dj",
    title: "DJ & Music",
    description: "Sound systems, playlists, and live entertainment tailored to your vibe.",
    icon: "🎵",
  },
  {
    id: "makeup",
    title: "Makeup & Styling",
    description: "Bridal, party, and guest grooming with trusted artists.",
    icon: "💄",
  },
  {
    id: "venue",
    title: "Venue Management",
    description: "Venue sourcing, layout planning, and on-day coordination.",
    icon: "🏛️",
  },
  {
    id: "transport",
    title: "Transportation & Valet",
    description: "Guest transfers, parking, and valet services arranged end to end.",
    icon: "🚗",
  },
  {
    id: "lighting",
    title: "Lighting & Sound",
    description: "Stage lighting, ambient décor lights, and professional AV setup.",
    icon: "💡",
  },
  {
    id: "host",
    title: "Event Host / MC",
    description: "Engaging hosts to keep your programme flowing smoothly.",
    icon: "🎤",
  },
  {
    id: "cake",
    title: "Cake & Desserts",
    description: "Custom cakes, dessert tables, and sweet surprise add-ons.",
    icon: "🎂",
  },
  {
    id: "floral",
    title: "Floral Arrangements",
    description: "Bouquets, centrepieces, and fresh floral installations.",
    icon: "💐",
  },
] as const;

export type SpecificNeedId = (typeof SPECIFIC_NEEDS)[number]["id"];
