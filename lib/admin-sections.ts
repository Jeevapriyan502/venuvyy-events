export const ADMIN_SECTIONS = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "packages-admin", label: "Packages", icon: "📦" },
  { id: "gallery-admin", label: "Gallery", icon: "🖼" },
  { id: "bookings-admin", label: "Bookings", icon: "📅" },
] as const;

export type AdminSectionId = (typeof ADMIN_SECTIONS)[number]["id"];

export function isAdminSectionId(value: string): value is AdminSectionId {
  return ADMIN_SECTIONS.some((section) => section.id === value);
}

export function resolveAdminSection(hash: string): AdminSectionId {
  const id = hash.replace("#", "").trim();
  return isAdminSectionId(id) ? id : "overview";
}
