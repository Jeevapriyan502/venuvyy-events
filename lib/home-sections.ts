export const HOME_SECTIONS = [
  { id: "home", label: "Home", icon: "◈" },
  { id: "packages", label: "Packages", icon: "📦" },
  { id: "needs", label: "Add-ons", icon: "✨" },
  { id: "planning", label: "Plan", icon: "📝" },
  { id: "faq", label: "FAQ", icon: "❓" },
] as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[number]["id"];

/** Sections embedded on the home overview — scroll targets, not separate views. */
export const HOME_INLINE_SECTIONS = ["gallery"] as const;

export type HomeInlineSectionId = (typeof HOME_INLINE_SECTIONS)[number];

export function isHomeInlineSection(value: string): value is HomeInlineSectionId {
  return (HOME_INLINE_SECTIONS as readonly string[]).includes(value);
}

export const HOME_NAV_SECTIONS = HOME_SECTIONS.filter((s) => s.id !== "home");

export function isHomeSectionId(value: string): value is HomeSectionId {
  return HOME_SECTIONS.some((section) => section.id === value);
}

export function resolveHomeSection(hash: string): HomeSectionId {
  const id = hash.replace("#", "").trim();
  if (!id || id === "home" || id === "gallery") return "home";
  if (id === "planning-form" || id === "planning") return "planning";
  if (isHomeSectionId(id)) return id;
  return "home";
}

export function sectionIdToHomeSection(sectionId: string): HomeSectionId | null {
  if (sectionId === "planning-form" || sectionId === "planning") return "planning";
  return isHomeSectionId(sectionId) ? sectionId : null;
}

export const HOME_OVERVIEW_SEGMENTS = [
  {
    id: "packages" as const,
    label: "Packages",
    description: "Curated event packages you can explore and tailor.",
    icon: "📦",
  },
  {
    id: "events" as const,
    label: "Events",
    description: "Browse weddings, birthdays, surprises, and more.",
    icon: "🎉",
    href: "/events",
  },
  {
    id: "needs" as const,
    label: "Add-ons",
    description: "Extra services to elevate your celebration.",
    icon: "✨",
  },
  {
    id: "planning" as const,
    label: "Plan your event",
    description: "Share your vision — we respond within one business day.",
    icon: "📝",
  },
  {
    id: "faq" as const,
    label: "FAQ",
    description: "Answers to common planning questions.",
    icon: "❓",
  },
];
