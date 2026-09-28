export const travelStories = [
  {
    slug: "lisbon-alone-in-april",
    title: "Lisbon Alone in April",
    destination: "[PLACEHOLDER: Lisbon, Portugal]",
    date: "2024",
    excerpt:
      "Trams, miradouros, and the quiet confidence of a table set for one—with a notebook and a fern sighting in Alfama.",
    plantsNoted: ["[PLACEHOLDER: Street jacarandas]", "[PLACEHOLDER: Balcony geraniums]"],
    readTime: "8 min",
    featured: true,
    body: [
      "Solo travel is not loneliness with better lighting. It is choosing your own pace—and noticing what a shared itinerary would rush past.",
      "In Lisbon, mornings started with a walk to a viewpoint before the tour groups arrived. Afternoons were for bookstores and the kind of lunch that does not negotiate with a companion’s hunger.",
      "Plants appeared in the margins: geraniums spilling from Alfama windows, olive trees in courtyard cafés, a nursery stall near the river that sold cuttings wrapped in newspaper.",
      "Replace this story with your own field notes, photos, and plant encounters.",
    ],
  },
  {
    slug: "kyoto-garden-hours",
    title: "Kyoto Garden Hours",
    destination: "[PLACEHOLDER: Kyoto, Japan]",
    date: "2023",
    excerpt:
      "Temple edges and moss that taught patience. A solo week structured around opening hours and soft rain.",
    plantsNoted: ["[PLACEHOLDER: Temple moss]", "[PLACEHOLDER: Maple understory]"],
    readTime: "10 min",
    featured: true,
    body: [
      "I planned the week around gardens—not checklists. Early entry, slow loops, no photographs until the second pass.",
      "Moss does not perform. It rewards attention the way risk work rewards reading the footnotes.",
      "Evenings were for notes: what felt designed, what felt wild, what I would bring home as a principle rather than a souvenir.",
    ],
  },
  {
    slug: "patagonia-wind-and-quiet",
    title: "Patagonia: Wind and Quiet",
    destination: "[PLACEHOLDER: Chilean Patagonia]",
    date: "2022",
    excerpt:
      "Long light, longer silence, and the discipline of packing light for both gear and expectations.",
    plantsNoted: ["[PLACEHOLDER: Calafate shrub]", "[PLACEHOLDER: Alpine cushion plants]"],
    readTime: "12 min",
    featured: false,
    body: [
      "The wind edits your plans. You learn to hold an itinerary loosely and a layered jacket tightly.",
      "Solo here meant trusting trail notes, weather windows, and the kindness of shared shuttle vans.",
      "Plant life was sparse and stubborn—a useful metaphor for any practice that survives hard seasons.",
    ],
  },
  {
    slug: "marrakech-courtyard-green",
    title: "Marrakech Courtyard Green",
    destination: "[PLACEHOLDER: Marrakech, Morocco]",
    date: "2025",
    excerpt:
      "Riads that hide gardens, mint that follows every glass of tea, and evenings written in notebook ink.",
    plantsNoted: ["[PLACEHOLDER: Courtyard citrus]", "[PLACEHOLDER: Climbing bougainvillea]"],
    readTime: "7 min",
    featured: false,
    body: [
      "The medina is noise until you step into a courtyard. Then: orange trees, shade, and the sound of water.",
      "I traveled with one rule—walk until something green interrupts the pattern—and it never failed.",
      "This entry is a template. Swap in your images, dates, and the plants that marked the trip for you.",
    ],
  },
] as const;

export function getTravelStory(slug: string) {
  return travelStories.find((s) => s.slug === slug);
}
