/**
 * Site-wide placeholder content.
 * Replace [PLACEHOLDER: ...] values with real details before launch.
 */

export const site = {
  name: "[PLACEHOLDER: Full Name]",
  shortName: "[PLACEHOLDER: First Name]",
  brand: "Malorfa",
  tagline:
    "Risk counsel by day. Plants, pages, and solo roads when the week opens.",
  positioning:
    "Corporate risk & insurance advisor · plant-tropist · solo traveler · published author",
  email: "[PLACEHOLDER: hello@yourdomain.com]",
  phone: "[PLACEHOLDER: +1 (555) 000-0000]",
  location: "[PLACEHOLDER: City, Region]",
  calendarUrl: "#", // TODO: replace with Calendly / booking link
  social: {
    linkedin: "#", // PLACEHOLDER
    instagram: "#", // PLACEHOLDER
    goodreads: "#", // PLACEHOLDER
    substack: "#", // PLACEHOLDER
  },
  newsletterNote:
    "Notes on risk, travel, books & plants — occasional, never noisy.",
  ogImage: "/og-placeholder.svg",
} as const;

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/plants", label: "Plants" },
  { href: "/travel", label: "Travel" },
  { href: "/books", label: "Books" },
  { href: "/contact", label: "Contact" },
] as const;

export const facets = [
  {
    id: "risk",
    label: "Risk & Insurance",
    href: "/services",
    blurb:
      "Boardroom-ready counsel for corporate agents and growing organizations.",
  },
  {
    id: "plants",
    label: "Plant-tropist",
    href: "/plants",
    blurb: "A living collection, care notes, and nursery partnerships.",
  },
  {
    id: "travel",
    label: "Solo Travel",
    href: "/travel",
    blurb: "Editorial field notes from roads walked alone—and well.",
  },
  {
    id: "books",
    label: "Author",
    href: "/books",
    blurb: "Published work on judgment, place, and quiet growth.",
  },
] as const;
