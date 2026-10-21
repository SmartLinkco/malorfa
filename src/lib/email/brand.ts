import { site } from "@/content/site";

/**
 * Origin used inside emails.
 * src/lib/seo.ts still points at the Vercel hostname; that constant is left
 * alone here so mail links stay on the connected domain.
 */
export const emailSiteUrl = "https://malorfa.com";

/** PNG mark served from the site. SVG is unreliable in email clients. */
export const emailMarkUrl = `${emailSiteUrl}/icons/icon-192.png`;

export const emailColors = {
  canvas: "#f5f4f1",
  ivory: "#fcfcfa",
  stone: "#ebe8e2",
  sand: "#d9d4c8",
  ink: "#1a1f1c",
  inkSoft: "#3d4640",
  forest: "#2c4a3e",
  sage: "#5c7a6a",
  moss: "#8fa892",
  brass: "#9a8560",
} as const;

export const emailFonts = {
  display: "'Cormorant Garamond', Georgia, 'Times New Roman', Times, serif",
  sans: "'Source Sans 3', 'Segoe UI', Helvetica, Arial, sans-serif",
} as const;

export const emailSocials = [
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Instagram", href: site.social.instagram },
  { label: "Goodreads", href: site.social.goodreads },
].filter((item) => item.href.startsWith("https://"));

export const defaultFromEmail = "Malorfa Aryee <hello@notifications.malorfa.com>";
export const defaultAdminEmail = site.email;
