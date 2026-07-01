/** Dial number — not shown on the page; used only for tel:/WhatsApp links */
const CONTACT_PHONE_RAW =
  process.env.CONTACT_PHONE?.trim() ||
  process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() ||
  "+918148531390";

function normalizePhoneDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

const CONTACT_PHONE_DIGITS = normalizePhoneDigits(CONTACT_PHONE_RAW);

export const CONTACT_PHONE_HREF = `tel:+${CONTACT_PHONE_DIGITS}`;

export const WHATSAPP_HREF = `https://wa.me/${CONTACT_PHONE_DIGITS}`;

/** Label shown on buttons — never the raw number */
export const CONTACT_CALL_LABEL = "Call Us Today";
