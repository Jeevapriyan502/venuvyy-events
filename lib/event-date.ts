/** Minimum selectable event date (today) for date inputs. */
export function minEventDateInput(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Normalise stored dates to yyyy-MM-dd for `<input type="date" />`. */
export function toDateInputValue(value: string | null | undefined): string {
  if (!value?.trim()) return "";

  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Friendly label for ISO or legacy text dates. */
export function formatEventDateForDisplay(value: string | null | undefined): string {
  if (!value?.trim()) return "";

  const iso = toDateInputValue(value);
  if (!iso) return value.trim();

  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
