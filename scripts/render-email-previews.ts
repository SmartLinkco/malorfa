/**
 * Write the contact-email HTML and plain text so they can be opened in a browser.
 *
 *   npx tsx scripts/render-email-previews.ts [output-dir]
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderAdminNotification, renderClientConfirmation } from "../src/lib/email/templates";
import type { ContactMail } from "../src/lib/email/templates";

const outputDir = resolve(process.argv[2] ?? "email-previews");
mkdirSync(outputDir, { recursive: true });

const submittedAt = new Date("2026-10-21T18:26:00.000Z");

const sample: ContactMail = {
  name: "Abena Owusu",
  email: "abena@example.com",
  topic: "consulting",
  topicLabel: "Consulting / risk & insurance",
  message:
    "Hello Malorfa,\n\nI'm looking for underwriting support ahead of a renewal for a mid-size manufacturer in Accra. Could we talk through the risk programme, and whether a short board briefing would help?\n\nI'm free later this month.",
  submittedAt,
};

const hostile: ContactMail = {
  name: 'Abena <script>alert("x")</script>',
  email: "abena@example.com",
  topic: "other",
  topicLabel: "Other",
  message: 'Hello & welcome.\n<script>alert(1)</script>\nShe said "thanks".',
  submittedAt,
};

function write(name: string, rendered: { html: string; text: string }) {
  writeFileSync(resolve(outputDir, `${name}.html`), rendered.html);
  writeFileSync(resolve(outputDir, `${name}.txt`), rendered.text);
}

write("contact-admin", renderAdminNotification(sample));
write("contact-confirmation", renderClientConfirmation(sample));
write("contact-admin-escaped", renderAdminNotification(hostile));

console.log(outputDir);
