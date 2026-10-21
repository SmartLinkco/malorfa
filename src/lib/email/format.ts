/** Escape text that will be inserted into HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Keep newlines. Drop other control characters so headers and text stay single-purpose. */
export function plainText(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

export function headerSafe(value: string, max = 120): string {
  return plainText(value).replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

export function htmlWithBreaks(value: string): string {
  return escapeHtml(plainText(value).replace(/\r\n/g, "\n").replace(/\r/g, "\n")).replace(/\n/g, "<br>");
}

export function formatSubmittedAt(date: Date): string {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Accra",
    hourCycle: "h23",
  }).format(date);

  return `${formatted} Ghana time`;
}
