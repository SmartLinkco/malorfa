export const books = [
  {
    slug: "the-quiet-ledger",
    title: "[PLACEHOLDER: The Quiet Ledger]",
    subtitle: "Essays on judgment, risk, and what we leave unsaid",
    year: "2024",
    status: "Published",
    coverLabel: "Book cover placeholder",
    blurb:
      "A collection of essays bridging boardroom clarity with the slower intelligence of gardens and roads.",
    excerpt:
      "We treat risk as a spreadsheet until it becomes a story. The spreadsheet is necessary. The story is what people remember when the numbers stop moving.",
    buyLinks: [
      { label: "Publisher", href: "#" },
      { label: "Bookstore placeholder", href: "#" },
    ],
    themes: ["Risk culture", "Decision-making", "Essays"],
  },
  {
    slug: "leaves-on-the-windowsill",
    title: "[PLACEHOLDER: Leaves on the Windowsill]",
    subtitle: "A plant-tropist’s field notes for city apartments",
    year: "2022",
    status: "Published",
    coverLabel: "Book cover placeholder",
    blurb:
      "Practical care paired with short essays on attention, growth, and traveling without abandoning what you tend.",
    excerpt:
      "A plant is a standing appointment with yourself. Miss enough of them and the leaves tell on you—gently at first.",
    buyLinks: [
      { label: "Publisher", href: "#" },
      { label: "Bookstore placeholder", href: "#" },
    ],
    themes: ["Plants", "Home", "Attention"],
  },
  {
    slug: "one-seat-at-the-table",
    title: "[PLACEHOLDER: One Seat at the Table]",
    subtitle: "Solo travel dispatches",
    year: "2021",
    status: "Published",
    coverLabel: "Book cover placeholder",
    blurb:
      "Dispatches from solo journeys—how to move through a place with curiosity and without apology.",
    excerpt:
      "Eating alone in a new city is a skill. So is asking for directions without outsourcing your courage.",
    buyLinks: [
      { label: "Publisher", href: "#" },
      { label: "Bookstore placeholder", href: "#" },
    ],
    themes: ["Travel", "Memoir", "Independence"],
  },
] as const;

export const speakingPress = [
  {
    type: "Speaking",
    title: "[PLACEHOLDER: Conference or podcast name]",
    detail: "Topic placeholder — risk culture / solo travel / author talk",
  },
  {
    type: "Press",
    title: "[PLACEHOLDER: Publication name]",
    detail: "Feature or interview placeholder — link TBD",
  },
  {
    type: "Award",
    title: "[PLACEHOLDER: Recognition]",
    detail: "Optional accolade placeholder — remove if unused",
  },
] as const;

export function getBook(slug: string) {
  return books.find((b) => b.slug === slug);
}
