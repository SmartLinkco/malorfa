/** Shared by the contact form UI and the server route. */

export const contactTopics = [
  { value: "consulting", label: "Consulting / risk & insurance" },
  { value: "underwriting", label: "Underwriting" },
  { value: "pr", label: "PR" },
  { value: "speaking", label: "Speaking" },
  { value: "plants", label: "Plants / nursery partnership" },
  { value: "media", label: "Media / press" },
  { value: "other", label: "Other" },
] as const;

export type ContactTopic = (typeof contactTopics)[number]["value"];

export const fieldLimits = {
  name: { min: 1, max: 80 },
  email: { max: 254 },
  message: { min: 10, max: 4000 },
} as const;

/** Instant posts are rejected. Humans reading the form clear this easily. */
export const minSubmitMs = 2500;

/** A tab left open overnight must be refreshed so the timestamp can't be reused forever. */
export const maxSubmitMs = 24 * 60 * 60 * 1000;

export const honeypotField = "hp_field";

export const rateLimits = {
  contact: { limit: 5, windowMs: 10 * 60 * 1000 },
  newsletter: { limit: 5, windowMs: 10 * 60 * 1000 },
} as const;
