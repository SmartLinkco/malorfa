import { media } from "@/content/media";

export type TravelStory = {
  slug: string;
  title: string;
  destination: string;
  date: string;
  excerpt: string;
  plantsNoted: string[];
  readTime: string;
  featured: boolean;
  image: string;
  imageAlt: string;
  midImage?: string;
  midImageAlt?: string;
  body: string[];
};

/**
 * Countries named in Rooted (“The Traveler’s Eye”) plus destinations
 * evidenced in the travel photo set and earlier dispatches.
 * Update this list as new borders are crossed.
 */
export const countriesVisited = [
  { name: "Ghana", region: "Africa", note: "Home — Accra, Kotoka, the compound" },
  { name: "Spain", region: "Europe", note: "Barcelona, Zaragoza, and the Spain chapter" },
  { name: "Netherlands", region: "Europe", note: "Amsterdam, Schiphol, tulips & sunflowers" },
  { name: "France", region: "Europe", note: "Paris, Charles de Gaulle, courtyard roses" },
  { name: "Germany", region: "Europe", note: "Hamburg & Bonn — roses carried home" },
  { name: "Switzerland", region: "Europe", note: "Geneva — flower clock & alpine gardens" },
  { name: "United States", region: "Americas", note: "Washington, D.C., New York, the Bronx" },
  { name: "Eswatini", region: "Africa", note: "King Mswati III International Airport" },
  { name: "Côte d’Ivoire", region: "Africa", note: "West African roads" },
  { name: "Ethiopia", region: "Africa", note: "East African chapter" },
  { name: "Kenya", region: "Africa", note: "Safari light & giraffes at the rail" },
  { name: "Benin", region: "Africa", note: "West African chapter" },
  { name: "Togo", region: "Africa", note: "West African chapter" },
  { name: "South Africa", region: "Africa", note: "Southern routes" },
] as const;

export const countriesVisitedCount = countriesVisited.length;

export const travelerEyeInterlude = {
  title: "The Traveler’s Eye",
  source: "Rooted — Interlude",
  excerpt:
    "I do not think I fully understood, until I sat down to write this chapter, quite how many countries I have now measured, at least in part, by their flowers. Tulips in Amsterdam. Roses in Hamburg, in Bonn, in Paris, in Geneva. … I used to think I traveled to see cities. I have come to suspect, more honestly, that I travel to see what is growing in them — and that everything else, however famous, however worth seeing, has simply been the frame around that particular kind of looking.",
  href: "/books/rooted",
};

export const travelStories: TravelStory[] = [
  {
    slug: "barcelona-plaza-light",
    title: "Barcelona Plaza Light",
    destination: "Barcelona, Spain",
    date: "2024",
    excerpt:
      "Sagrada Família spires, harbor light, and the quiet confidence of walking a European square alone.",
    plantsNoted: ["Plaza trees", "Balcony geraniums along the Rambla"],
    readTime: "7 min",
    featured: true,
    image: media.travelSagradaFull.src,
    imageAlt: media.travelSagradaFull.alt,
    midImage: media.travelBarcelonaHarbor.src,
    midImageAlt: media.travelBarcelonaHarbor.alt,
    body: [
      "Travel is not loneliness with better lighting. It is choosing your own pace—and noticing what a shared itinerary would rush past.",
      "In Barcelona, the plaza became a studio: light, motion, and the small courage of standing still while the city moved.",
      "From Plaça de Catalunya to the Arc de Triomf and the harbor, Spain held both monument and pause.",
    ],
  },
  {
    slug: "paris-pages-and-green",
    title: "Paris: Pages and Green",
    destination: "Paris, France",
    date: "2024",
    excerpt:
      "Eiffel Tower nights, café tables, and the roses that pulled the itinerary off the guidebook path.",
    plantsNoted: ["Café greenery", "Courtyard roses", "Window boxes"],
    readTime: "8 min",
    featured: true,
    image: media.travelParisEiffelNight.src,
    imageAlt: media.travelParisEiffelNight.alt,
    midImage: media.travelCafeCake.src,
    midImageAlt: media.travelCafeCake.alt,
    body: [
      "Paris held both the book and the pause—proof that authorship and attention can share one table.",
      "Between monuments, the detours were toward window boxes and ordinary roses in ordinary afternoon light.",
      "A coffee becomes a bookmark for the day: small, warm, enough.",
    ],
  },
  {
    slug: "amsterdam-trams-and-tulips",
    title: "Amsterdam: Trams & Tulips",
    destination: "Amsterdam, Netherlands",
    date: "2024",
    excerpt:
      "Canal bikes, blue trams, Leidseplein flower chaos—and Schiphol greenery photographed on repeat.",
    plantsNoted: ["Tulips", "Sunflowers", "Airport planters at Schiphol"],
    readTime: "7 min",
    featured: true,
    image: media.travelAmsterdamBike.src,
    imageAlt: media.travelAmsterdamBike.alt,
    midImage: media.travelAmsterdamTram.src,
    midImageAlt: media.travelAmsterdamTram.alt,
    body: [
      "Amsterdam has given some of the favourite reasons to stop—buckets of tulips, canal bridges, and a city that moves by bicycle.",
      "Schiphol’s walkway greenery has been photographed on more than twenty layovers, each time as if for the first time.",
      "The Netherlands measured, at least in part, by what is blooming between gates.",
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
    image: media.travelGiraffeFeeding.src,
    imageAlt: media.travelGiraffeFeeding.alt,
    midImage: media.travelGiraffe.src,
    midImageAlt: media.travelGiraffe.alt,
    body: [
      "East Africa taught scale—animals that rewrite your sense of size, and roads that reward patience.",
      "A giraffe leaning in for a bite is a better metaphor for curiosity than any workshop icebreaker.",
      "Kenya and Ethiopia sit on the same growing list as the West African roads that came before.",
    ],
  },
  {
    slug: "airports-between-countries",
    title: "Airports Between Countries",
    destination: "On the road",
    date: "Ongoing",
    excerpt:
      "Kotoka at dusk, KLM departures, Airlink tarmac—the noticing often starts before the city does.",
    plantsNoted: ["Airport planters", "Departure-hall greenery"],
    readTime: "5 min",
    featured: false,
    image: media.travelKotokaNight.src,
    imageAlt: media.travelKotokaNight.alt,
    midImage: media.travelAirlinkTarmac.src,
    midImageAlt: media.travelAirlinkTarmac.alt,
    body: [
      "It starts, most of the time, before leaving the airport—Schiphol walkways, Charles de Gaulle planters, Accra dusk.",
      "Friends have learned to keep walking when the camera slows near an airport planter.",
      "Even in the most transient spaces, somewhere between one country and the next, there is still something green to admire.",
    ],
  },
  {
    slug: "americas-street-light",
    title: "Americas: Street Light",
    destination: "United States",
    date: "2023",
    excerpt:
      "17th Street NW, Times Square neon, and the Bronx kitchen where a snake plant needed emergency surgery.",
    plantsNoted: ["Street trees", "Kitchen snake plants"],
    readTime: "6 min",
    featured: false,
    image: media.travelTimesSquare.src,
    imageAlt: media.travelTimesSquare.alt,
    midImage: media.travelDcStreet.src,
    midImageAlt: media.travelDcStreet.alt,
    body: [
      "Washington sidewalks and New York avenues held their own versions of attention—denim, daylight, and billboard glow.",
      "The United States is on the list not only for monuments, but for friends’ kitchens and plants that needed saving mid-visit.",
    ],
  },
  {
    slug: "zaragoza-tram-light",
    title: "Zaragoza Tram Light",
    destination: "Zaragoza, Spain",
    date: "2024",
    excerpt:
      "Cathedral plaza, a red tram wave, and Spain beyond Barcelona’s postcard edges.",
    plantsNoted: ["Plaza trees", "Street plantings"],
    readTime: "5 min",
    featured: false,
    image: media.travelZaragozaCathedral.src,
    imageAlt: media.travelZaragozaCathedral.alt,
    midImage: media.travelBarcelonaPlaza.src,
    midImageAlt: media.travelBarcelonaPlaza.alt,
    body: [
      "Spain is not only Barcelona—Zaragoza held cathedral stone, tram windows, and another pace of looking.",
      "The relocation chapter made Spain a home as much as a destination.",
    ],
  },
  {
    slug: "countries-so-far",
    title: "Countries So Far",
    destination: "Across continents",
    date: "Ongoing",
    excerpt:
      "A growing tally—measured, as Rooted puts it, at least in part by their flowers.",
    plantsNoted: ["Whatever is blooming where the suitcase lands"],
    readTime: "4 min",
    featured: true,
    image: media.travelAfricaCountries.src,
    imageAlt: media.travelAfricaCountries.alt,
    midImage: media.travelMapPassport.src,
    midImageAlt: media.travelMapPassport.alt,
    body: [
      `So far: ${countriesVisited.map((c) => c.name).join(", ")}—and the road still open.`,
      "Each border is a chapter; each viewpoint a comma before the next sentence.",
      "From The Traveler’s Eye in Rooted: cities became the frame; what was growing inside them became the looking.",
    ],
  },
];

export function getTravelStory(slug: string) {
  return travelStories.find((s) => s.slug === slug);
}
