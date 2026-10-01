import { media } from "@/content/media";

export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  status: string;
  coverLabel: string;
  image?: string;
  imageAlt?: string;
  blurb: string;
  excerpt: string;
  buyLinks: { label: string; href: string }[];
  themes: string[];
};

export const books: Book[] = [
  {
    slug: "i-walked-away",
    title: "I Walked Away",
    subtitle: "A story of choosing yourself — and what comes after",
    year: "2024",
    status: "Published",
    coverLabel: "I Walked Away — Malorfa Aryee",
    image: media.authorParisBook.src,
    imageAlt: media.authorParisBook.alt,
    blurb:
      "Malorfa Aryee’s published work — read at a Paris café with the Eiffel Tower behind you, or wherever you need courage to begin again.",
    excerpt: "The conversation starts the moment you open the first page.",
    buyLinks: [
      {
        label: "Amazon",
        href: "https://www.amazon.com/s?k=I+Walked+Away+Malorfa+Aryee",
      },
      { label: "Ghana orders (WhatsApp)", href: "https://wa.me/233243554423" },
    ],
    themes: ["Memoir", "Courage", "Self-trust"],
  },
  {
    slug: "leaves-on-the-windowsill",
    title: "[PLACEHOLDER: Next title — plants]",
    subtitle: "A plant-tropist’s field notes for city apartments",
    year: "TBD",
    status: "In progress",
    coverLabel: "Book cover placeholder",
    blurb:
      "Practical care paired with short essays on attention, growth, and traveling without abandoning what you tend.",
    excerpt:
      "A plant is a standing appointment with yourself. Miss enough of them and the leaves tell on you—gently at first.",
    buyLinks: [{ label: "Notify me", href: "/contact" }],
    themes: ["Plants", "Home", "Attention"],
  },
  {
    slug: "one-seat-at-the-table",
    title: "[PLACEHOLDER: Next title — travel]",
    subtitle: "Solo travel dispatches",
    year: "TBD",
    status: "In progress",
    coverLabel: "Book cover placeholder",
    blurb:
      "Dispatches from solo journeys—Barcelona plazas, East African roads, and the confidence of a table set for one.",
    excerpt:
      "Eating alone in a new city is a skill. So is asking for directions without outsourcing your courage.",
    buyLinks: [{ label: "Notify me", href: "/contact" }],
    themes: ["Travel", "Memoir", "Independence"],
  },
];

export const speakingPress = [
  {
    type: "Author",
    title: "I Walked Away",
    detail: "Available on Amazon · Ghana orders via WhatsApp",
  },
  {
    type: "Credential",
    title: "APR",
    detail: "Accreditation in Public Relations — listed on author materials",
  },
  {
    type: "Press",
    title: "[PLACEHOLDER: Publication or podcast]",
    detail: "Feature or interview placeholder — link TBD",
  },
] as const;

export function getBook(slug: string) {
  return books.find((b) => b.slug === slug);
}
