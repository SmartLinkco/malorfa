export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  facet: "Services" | "Books" | "Plants" | "Travel";
  /** Only set true for a real quote, with the person's permission to publish it. */
  published: boolean;
};

/**
 * DRAFTS. These quotes are sample wording, not things anyone has said, so they stay
 * hidden. To publish one: replace the quote, name, and role with the real person's
 * words and details, then set `published: true`. The section appears on its own.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "She translated a messy renewal into language our board actually understood. Calm, precise, no theater.",
    name: "Replace with client's name",
    role: "Chief Operating Officer, manufacturing company",
    facet: "Services",
    published: false,
  },
  {
    id: "t2",
    quote:
      "We finally knew who does what when a claim lands. The workshop paid for itself in clarity alone.",
    name: "Replace with client's name",
    role: "Finance Lead, professional services firm",
    facet: "Services",
    published: false,
  },
  {
    id: "t3",
    quote:
      "I Walked Away found me at exactly the right time. I finished it in two sittings and passed it to my sister.",
    name: "Replace with reader's name",
    role: "Reader, Accra",
    facet: "Books",
    published: false,
  },
  {
    id: "t4",
    quote:
      "Her plant notes are the opposite of influencer noise: short, tested, and kind to beginners.",
    name: "Replace with name",
    role: "Plant enthusiast",
    facet: "Plants",
    published: false,
  },
  {
    id: "t5",
    quote:
      "I booked my first solo trip after reading her Lisbon notes. The practical courage in those pages stuck.",
    name: "Replace with reader's name",
    role: "Traveler",
    facet: "Travel",
    published: false,
  },
];
