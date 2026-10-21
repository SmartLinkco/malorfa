import { contactTopics, fieldLimits, type ContactTopic } from "@/lib/forms/constants";

export type ContactInput = {
  name: string;
  email: string;
  topic: ContactTopic;
  topicLabel: string;
  message: string;
};

export type ContactField = "name" | "email" | "topic" | "message";
export type FieldErrors = Partial<Record<ContactField, string>>;

const emailPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Trimmed, lowercased address, or null when it is not a single safe email. */
export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length === 0 || email.length > fieldLimits.email.max) return null;
  if (email.includes("..") || /[\s<>]/.test(email)) return null;
  const [local, domain] = email.split("@");
  if (!local || !domain || local.length > 64) return null;
  if (!emailPattern.test(email)) return null;
  return email;
}

export function topicLabel(value: string): string | null {
  return contactTopics.find((topic) => topic.value === value)?.label ?? null;
}

function cleanLine(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  if (trimmed.length === 0 || trimmed.length > max) return null;
  return trimmed;
}

export function validateContact(
  body: unknown,
): { ok: true; value: ContactInput } | { ok: false; fieldErrors: FieldErrors } {
  const source = isRecord(body) ? body : {};
  const fieldErrors: FieldErrors = {};

  const name = cleanLine(source.name, fieldLimits.name.max);
  if (!name || name.length < fieldLimits.name.min) {
    fieldErrors.name = `Enter your name (up to ${fieldLimits.name.max} characters).`;
  }

  const email = normalizeEmail(source.email);
  if (!email) {
    fieldErrors.email = "Enter a valid email address.";
  }

  const topicValue = typeof source.topic === "string" ? source.topic : "";
  const label = topicLabel(topicValue);
  if (!label) {
    fieldErrors.topic = "Choose a topic.";
  }

  const message =
    typeof source.message === "string"
      ? source.message.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim()
      : "";
  if (message.length < fieldLimits.message.min) {
    fieldErrors.message = `Write at least ${fieldLimits.message.min} characters.`;
  } else if (message.length > fieldLimits.message.max) {
    fieldErrors.message = `Keep the message under ${fieldLimits.message.max} characters.`;
  }

  if (Object.keys(fieldErrors).length > 0 || !name || !email || !label) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      topic: topicValue as ContactTopic,
      topicLabel: label,
      message,
    },
  };
}

export function validateNewsletterEmail(
  body: unknown,
): { ok: true; email: string } | { ok: false; message: string } {
  const source = isRecord(body) ? body : {};
  const email = normalizeEmail(source.email);
  if (!email) {
    return { ok: false, message: "Enter a valid email address." };
  }
  return { ok: true, email };
}
