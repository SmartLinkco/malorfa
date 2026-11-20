/**
 * Site-wide content for Malorfa Aryee.
 */

/** Current expertise. Used for role lines, chips, and structured data. */
export const roles = [
  "Risk Advisor",
  "PR Strategist",
  "Author",
  "Traveler",
  "Plant lover",
] as const;

/** Middot-separated roles for the hero, footer, and about name line. */
export const roleLine = roles.join(" · ");

/** Prose list for sentences, metadata, and JSON-LD jobTitle. */
export const roleList =
  "Risk Advisor, PR Strategist, Author, Traveler, and Plant lover";

/** Display this string exactly. Institute of Public Relations, Ghana. */
export const accreditation = "IPR Ghana Accredited";

export const site = {
  name: "Malorfa Aryee",
  shortName: "Malorfa",
  brand: "Malorfa",
  credentials: roleLine,
  tagline:
    "Risk counsel by day. Plants, pages, and open roads when the week opens.",
  positioning: roleLine,
  email: "hello@malorfa.com",
  phone: "+233 24 355 4423",
  location: "Ghana · on the road",
  calendarUrl: "https://calendly.com/hellomalorfa/30min",
  /**
   * Inline embed — brand tokens from globals.css (no # in Calendly params):
   * canvas #f5f4f1 · ink #1a1f1c · forest #2c4a3e
   */
  calendlyEmbedUrl:
    "https://calendly.com/hellomalorfa/30min?hide_event_type_details=1&background_color=f5f4f1&text_color=1a1f1c&primary_color=2c4a3e",
  social: {
    linkedin: "https://www.linkedin.com/in/malorfa-bsc-mpr-apr-a52754114/",
    instagram: "https://www.instagram.com/call_me_malorfa/",
    goodreads: "https://www.goodreads.com/book/show/254752922-i-walked-away",
  },
  newsletterNote:
    "Notes on risk, travel, books & plants — occasional, never noisy.",
  ogImage: "/media/og-default.jpg",
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
      "Boardroom-ready risk advisory for corporate agents and growing organizations.",
    image: "/media/corporate-skyline.jpg",
    imageAlt: "Urban skyline framed by tree branches — boardroom and nature",
    cue: "Counsel",
  },
  {
    id: "plants",
    label: "Plant lover",
    href: "/plants",
    blurb: "A living collection, care notes, and nursery partnerships.",
    image: "/media/plant-orchid-detail.jpg",
    imageAlt: "Close-up of a pink orchid in a ceramic pot",
    cue: "Collection",
  },
  {
    id: "travel",
    label: "Travel",
    href: "/travel",
    blurb: "Editorial field notes from roads walked alone—and well.",
    image: "/media/travel-detail-barcelona-2.jpg",
    imageAlt: "Tree-lined boulevard on La Rambla, Barcelona",
    cue: "Journal",
  },
  {
    id: "books",
    label: "Author",
    href: "/books",
    blurb: "Published work on judgment, place, and quiet growth.",
    image: "/media/book-cover-i-walked-away.jpg",
    imageAlt: "Cover of I Walked Away by Malorfa Aryee, APR",
    cue: "Pages",
  },
] as const;
