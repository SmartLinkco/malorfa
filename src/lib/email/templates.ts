import { site } from "@/content/site";
import {
  emailColors as c,
  emailFonts as f,
  emailMarkUrl,
  emailSiteUrl,
  emailSocials,
} from "@/lib/email/brand";
import { escapeHtml, formatSubmittedAt, headerSafe, htmlWithBreaks, plainText } from "@/lib/email/format";
import type { ContactInput } from "@/lib/forms/validate";

export type RenderedEmail = {
  subject: string;
  html: string;
  text: string;
};

export type ContactMail = ContactInput & {
  submittedAt: Date;
};

type ShellInput = {
  preheader: string;
  eyebrow: string;
  title: string;
  intro: string;
  bodyHtml: string;
  footerNote: string;
};

function socialHtml(): string {
  return emailSocials
    .map(
      (item) =>
        `<a href="${escapeHtml(item.href)}" style="color:${c.forest};text-decoration:underline;">${escapeHtml(item.label)}</a>`,
    )
    .join(`<span style="color:${c.sand};"> &nbsp;·&nbsp; </span>`);
}

function socialText(): string {
  return emailSocials.map((item) => `${item.label}: ${item.href}`).join("\n");
}

function shell({ preheader, eyebrow, title, intro, bodyHtml, footerNote }: ShellInput): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Source+Sans+3:wght@400;600&display=swap">
</head>
<body style="margin:0;padding:0;background:${c.canvas};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${c.canvas};">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.canvas};margin:0;padding:0;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;border-collapse:collapse;">
          <tr>
            <td style="background:${c.forest};padding:28px 32px 24px;border-radius:10px 10px 0 0;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <img src="${emailMarkUrl}" width="48" height="48" alt="Malorfa" style="display:block;border:0;border-radius:12px;width:48px;height:48px;">
                  </td>
                  <td style="vertical-align:middle;padding-left:14px;">
                    <p style="margin:0;font-family:${f.sans};font-size:12px;line-height:1;letter-spacing:0.16em;text-transform:uppercase;color:${c.moss};">Aryee</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:${c.brass};height:3px;line-height:3px;font-size:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="background:${c.ivory};padding:36px 32px 12px;border-left:1px solid ${c.stone};border-right:1px solid ${c.stone};">
              <p style="margin:0 0 10px;font-family:${f.sans};font-size:12px;line-height:1.4;letter-spacing:0.16em;text-transform:uppercase;color:${c.sage};">${escapeHtml(eyebrow)}</p>
              <h1 style="margin:0 0 14px;font-family:${f.display};font-size:34px;line-height:1.15;font-weight:500;color:${c.ink};">${escapeHtml(title)}</h1>
              <p style="margin:0 0 22px;font-family:${f.sans};font-size:16px;line-height:1.6;color:${c.inkSoft};">${escapeHtml(intro)}</p>
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="background:${c.ivory};padding:8px 32px 28px;border-left:1px solid ${c.stone};border-right:1px solid ${c.stone};">
              <p style="margin:0;font-family:${f.display};font-size:18px;line-height:1.4;font-style:italic;color:${c.forest};">${escapeHtml(site.name)}</p>
            </td>
          </tr>
          <tr>
            <td style="background:${c.stone};padding:22px 32px 24px;border-radius:0 0 10px 10px;">
              <p style="margin:0 0 8px;font-family:${f.sans};font-size:13px;line-height:1.5;color:${c.inkSoft};">${escapeHtml(footerNote)}</p>
              <p style="margin:0 0 8px;font-family:${f.sans};font-size:13px;line-height:1.5;">
                <a href="${emailSiteUrl}" style="color:${c.forest};text-decoration:underline;">malorfa.com</a>
              </p>
              <p style="margin:0;font-family:${f.sans};font-size:13px;line-height:1.6;">${socialHtml()}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailTable(rows: Array<{ label: string; valueHtml: string }>): string {
  const body = rows
    .map(
      (row) => `<tr>
        <td style="padding:7px 16px 7px 0;vertical-align:top;width:108px;font-family:${f.sans};font-size:11px;line-height:1.4;letter-spacing:0.12em;text-transform:uppercase;color:${c.sage};">${escapeHtml(row.label)}</td>
        <td style="padding:7px 0;vertical-align:top;font-family:${f.sans};font-size:16px;line-height:1.5;color:${c.ink};">${row.valueHtml}</td>
      </tr>`,
    )
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${c.stone};border-bottom:1px solid ${c.stone};margin:0 0 22px;">${body}</table>`;
}

function messageBlock(message: string): string {
  return `<p style="margin:0 0 8px;font-family:${f.sans};font-size:11px;line-height:1.4;letter-spacing:0.12em;text-transform:uppercase;color:${c.sage};">Message</p>
  <div style="margin:0 0 8px;border-left:3px solid ${c.sage};padding:2px 0 2px 16px;font-family:${f.sans};font-size:16px;line-height:1.65;color:${c.ink};">${htmlWithBreaks(message)}</div>`;
}

export function renderAdminNotification(input: ContactMail): RenderedEmail {
  const when = formatSubmittedAt(input.submittedAt);
  const subject = headerSafe(`New note · ${input.topicLabel} — ${input.name}`);
  const html = shell({
    preheader: `${input.name} wrote about ${input.topicLabel}.`,
    eyebrow: "Contact form",
    title: "A new note arrived",
    intro: "Reply to this email and it will go straight to the person who wrote.",
    footerNote: `Sent from the contact form on ${emailSiteUrl.replace("https://", "")}.`,
    bodyHtml: `${detailTable([
      { label: "Name", valueHtml: escapeHtml(input.name) },
      {
        label: "Email",
        valueHtml: `<a href="mailto:${escapeHtml(input.email)}" style="color:${c.forest};text-decoration:underline;">${escapeHtml(input.email)}</a>`,
      },
      { label: "Topic", valueHtml: escapeHtml(input.topicLabel) },
      { label: "Received", valueHtml: escapeHtml(when) },
    ])}${messageBlock(input.message)}`,
  });

  const text = [
    "A new note arrived",
    "",
    `Name: ${plainText(input.name)}`,
    `Email: ${input.email}`,
    `Topic: ${input.topicLabel}`,
    `Received: ${when}`,
    "",
    "Message:",
    plainText(input.message),
    "",
    "Reply to this email to reach the sender.",
    "",
    site.name,
    emailSiteUrl,
    socialText(),
  ].join("\n");

  return { subject, html, text };
}

export function renderClientConfirmation(input: ContactMail): RenderedEmail {
  const when = formatSubmittedAt(input.submittedAt);
  const subject = "I received your note";
  const html = shell({
    preheader: `Thank you, ${input.name}. I'll be in touch about ${input.topicLabel}.`,
    eyebrow: "Message received",
    title: `Thank you, ${input.name}`,
    intro: "I have your note and I'll be in touch. A copy of what you sent is below.",
    footerNote: "You received this because you wrote through malorfa.com.",
    bodyHtml: `${detailTable([
      { label: "Topic", valueHtml: escapeHtml(input.topicLabel) },
      { label: "Sent", valueHtml: escapeHtml(when) },
    ])}${messageBlock(input.message)}
    <p style="margin:18px 0 0;font-family:${f.sans};font-size:15px;line-height:1.6;color:${c.inkSoft};">If you need to add anything, reply to this email and it comes to me.</p>`,
  });

  const text = [
    `Thank you, ${plainText(input.name)}`,
    "",
    "I have your note and I'll be in touch. A copy of what you sent is below.",
    "",
    `Topic: ${input.topicLabel}`,
    `Sent: ${when}`,
    "",
    "Message:",
    plainText(input.message),
    "",
    "If you need to add anything, reply to this email.",
    "",
    site.name,
    emailSiteUrl,
    socialText(),
  ].join("\n");

  return { subject, html, text };
}

export type ResendPayload = {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  html: string;
  text: string;
};

export function contactPayloads(
  input: ContactMail,
  addresses: { from: string; admin: string },
): { admin: ResendPayload; confirmation: ResendPayload } {
  const adminMail = renderAdminNotification(input);
  const confirmation = renderClientConfirmation(input);

  return {
    admin: {
      from: addresses.from,
      to: [addresses.admin],
      reply_to: input.email,
      subject: adminMail.subject,
      html: adminMail.html,
      text: adminMail.text,
    },
    confirmation: {
      from: addresses.from,
      to: [input.email],
      reply_to: addresses.admin,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    },
  };
}
