import { media } from "@/content/media";

export const travelStories = [
  {
    slug: "barcelona-plaza-light",
    title: "Barcelona Plaza Light",
    destination: "Barcelona, Spain",
    date: "2024",
    excerpt:
      "Plaça de Catalunya pigeons, a denim skirt, and the quiet confidence of walking a European square alone.",
    plantsNoted: ["Plaza trees", "Balcony geraniums along the Rambla"],
    readTime: "7 min",
    featured: false,
    image: media.travelBarcelonaPlaza.src,
    imageAlt: media.travelBarcelonaPlaza.alt,
    body: [
      "Solo travel is not loneliness with better lighting. It is choosing your own pace—and noticing what a shared itinerary would rush past.",
      "In Barcelona, the plaza became a studio: light, motion, and the small courage of standing still while the city moved.",
      "Pigeons, white stone, and a sky that asked nothing of you except attention.",
    ],
  },
  {
    slug: "paris-pages-and-green",
    title: "Paris: Pages and Green",
    destination: "Paris, France",
    date: "2024",
    excerpt:
      "Café ritual between pages—foam, wood grain, and the soft pace of a city that rewards lingering.",
    plantsNoted: ["Café greenery", "Street trees along Haussmann blocks"],
    readTime: "8 min",
    featured: false,
    image: media.lifestyleCoffee.src,
    imageAlt: media.lifestyleCoffee.alt,
    body: [
      "Paris held both the book and the pause—proof that authorship and attention can share one table.",
      "A coffee becomes a bookmark for the day: small, warm, enough.",
      "Travel, for me, is often a reading room with better architecture.",
    ],
  },
  {
    slug: "east-africa-on-the-road",
    title: "East Africa on the Road",
    destination: "East Africa",
    date: "2023",
    excerpt:
      "Giraffes at the rail, long light on the grass, and a tote bag that has seen more borders than most suitcases.",
    plantsNoted: ["Savanna grasses", "Lush browse along the viewing decks"],
    readTime: "10 min",
    featured: false,
    image: media.travelGiraffe.src,
    imageAlt: media.travelGiraffe.alt,
    body: [
      "East Africa taught scale—animals that rewrite your sense of size, and roads that reward patience.",
      "A giraffe leaning in for a bite is a better metaphor for curiosity than any workshop icebreaker.",
      "Countries visited so far include Côte d’Ivoire, Ethiopia, Kenya, Benin, Togo, and South Africa—more roads ahead.",
    ],
  },
  {
    slug: "tram-window-notes",
    title: "Tram Window Notes",
    destination: "European cities",
    date: "2024",
    excerpt:
      "Looking out the glass between stops—phone in hand, bag on lap, city façades sliding past.",
    plantsNoted: ["Street trees glimpsed between shutters"],
    readTime: "5 min",
    featured: false,
    image: media.travelTram.src,
    imageAlt: media.travelTram.alt,
    body: [
      "Some of the best travel notes happen between destinations—on a tram, in a coat pocket, before the next café.",
      "The window frames the city the way a plant pot frames a leaf: limited, intentional, enough.",
    ],
  },
  {
    slug: "safari-zebra-hour",
    title: "Safari: Zebra Hour",
    destination: "East Africa",
    date: "2023",
    excerpt:
      "Peace-sign selfie, green sweater, and zebras grazing like the day had nowhere else to be.",
    plantsNoted: ["Tall grassland"],
    readTime: "6 min",
    featured: true,
    image: media.travelZebras.src,
    imageAlt: media.travelZebras.alt,
    body: [
      "The van window framed both wildlife and wonder—proof that solo travel can be loud with joy.",
      "Zebras held the middle distance; the rest was sky and grass.",
    ],
  },
  {
    slug: "african-countries-so-far",
    title: "African Countries So Far",
    destination: "Across Africa",
    date: "2023",
    excerpt:
      "Hills, a green top, a striped tote—and a running list of countries that keep growing.",
    plantsNoted: ["Hillside vegetation"],
    readTime: "6 min",
    featured: true,
    image: media.travelAfricaCountries.src,
    imageAlt: media.travelAfricaCountries.alt,
    body: [
      "Côte d’Ivoire, Ethiopia, Kenya, Benin, Togo, South Africa—and the road still open.",
      "Each border is a chapter; each viewpoint a comma before the next sentence.",
    ],
  },
] as const;

export function getTravelStory(slug: string) {
  return travelStories.find((s) => s.slug === slug);
}
