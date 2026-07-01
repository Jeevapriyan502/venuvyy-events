export const PHONE_DIGIT_LIMIT = 10;

const GMAIL_DOMAIN = "@gmail.com";

export function sanitizePhoneInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, PHONE_DIGIT_LIMIT);
}

export function normalizeIndianPhone(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return digits;
}

export function isValidIndianPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizeIndianPhone(phone));
}

export function isValidGmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  if (!normalized.endsWith(GMAIL_DOMAIN)) return false;

  const local = normalized.slice(0, -GMAIL_DOMAIN.length);
  if (!local || local.length > 64) return false;
  if (local.startsWith(".") || local.endsWith(".")) return false;
  if (local.includes("..")) return false;
  if (!/^[a-z0-9](?:[a-z0-9.]*[a-z0-9])?$/.test(local)) return false;

  return true;
}

export const GMAIL_VALIDATION_MESSAGE = "Enter a valid Gmail address (e.g. you@gmail.com).";
export const PHONE_VALIDATION_MESSAGE = `Enter a valid ${PHONE_DIGIT_LIMIT}-digit mobile number.`;
