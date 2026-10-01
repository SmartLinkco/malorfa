/**
 * Site-wide content for Malorfa Aryee.
 */

export const site = {
  name: "Malorfa Aryee",
  shortName: "Malorfa",
  brand: "Malorfa",
  credentials: "APR",
  tagline:
    "Risk counsel by day. Plants, pages, and solo roads when the week opens.",
  positioning:
    "Corporate risk & insurance advisor · plant-tropist · solo traveler · published author",
  email: "[PLACEHOLDER: hello@yourdomain.com]",
  phone: "+233 24 355 4423",
  location: "Ghana · on the road",
  calendarUrl: "#", // TODO: replace with Calendly / booking link
  social: {
    linkedin: "https://www.linkedin.com/in/malorfa-bsc-mpr-apr-a52754114/",
    instagram: "https://www.instagram.com/call_me_malorfa/",
    goodreads: "https://www.goodreads.com/book/show/254752922-i-walked-away",
    substack: "#", // PLACEHOLDER
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
      "Boardroom-ready counsel for corporate agents and growing organizations.",
    image: "/media/corporate-skyline.jpg",
    imageAlt: "Urban skyline framed by tree branches — boardroom and nature",
    cue: "Counsel",
  },
  {
    id: "plants",
    label: "Plant-tropist",
    href: "/plants",
    blurb: "A living collection, care notes, and nursery partnerships.",
    image: "/media/plant-orchid-detail.jpg",
    imageAlt: "Close-up of a pink orchid in a ceramic pot",
    cue: "Collection",
  },
  {
    id: "travel",
    label: "Solo Travel",
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
