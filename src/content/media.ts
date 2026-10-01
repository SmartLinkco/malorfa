/**
 * Each photo is assigned to exactly one primary surface.
 * Story/book detail may reuse its own card image (teaser → detail).
 */
export const media = {
  portraitOrchid: {
    src: "/media/portrait-orchid.jpg",
    alt: "Malorfa Aryee in a pink blazer tending an orchid at home",
  },
  portraitBarcelona: {
    src: "/media/portrait-barcelona.jpg",
    alt: "Malorfa in Plaça de Catalunya, Barcelona",
  },
  travelBarcelonaPlaza: {
    src: "/media/travel-barcelona-plaza.jpg",
    alt: "Malorfa among pigeons in a Barcelona plaza",
  },
  travelBarcelonaPigeon: {
    src: "/media/travel-barcelona-pigeon.jpg",
    alt: "Malorfa in a trench coat as a pigeon flies past in Barcelona",
  },
  authorParisBook: {
    src: "/media/author-paris-book.jpg",
    alt: "Malorfa reading I Walked Away at a café near the Eiffel Tower",
  },
  travelAfricaCountries: {
    src: "/media/travel-africa-countries.jpg",
    alt: "Malorfa overlooking hills — African countries visited",
  },
  travelGiraffe: {
    src: "/media/travel-east-africa-giraffe.jpg",
    alt: "Malorfa feeding a giraffe in East Africa",
  },
  travelZebras: {
    src: "/media/travel-safari-zebras.jpg",
    alt: "Malorfa on safari with zebras in the background",
  },
  corporateSkyline: {
    src: "/media/corporate-skyline.jpg",
    alt: "Urban skyline framed by tree branches — boardroom and nature",
  },
  corporateLaptop: {
    src: "/media/corporate-laptop.jpg",
    alt: "Malorfa in a white suit working on a laptop",
  },
  travelTram: {
    src: "/media/travel-tram.jpg",
    alt: "Malorfa looking out a tram window while traveling",
  },
  travelUrbanRed: {
    src: "/media/travel-urban-red.jpg",
    alt: "Malorfa with a red bag in an urban transit setting",
  },
  travelMustard: {
    src: "/media/travel-mustard.jpg",
    alt: "Malorfa in a yellow top on a sunny city street",
  },
  lifestyleCoffee: {
    src: "/media/lifestyle-coffee.jpg",
    alt: "A Lavazza coffee on a wooden café table",
  },
  aboutCasual: {
    src: "/media/about-casual-collage.jpg",
    alt: "Casual portrait moments of Malorfa at home",
  },
  aboutWings: {
    src: "/media/about-wings.jpg",
    alt: "Black-and-white portrait of Malorfa with mural angel wings",
  },
  aboutBlackDress: {
    src: "/media/about-black-dress.jpg",
    alt: "Malorfa in a black dress seated at home",
  },
} as const;

export type MediaKey = keyof typeof media;

/** Ordered list of every photo (for audits / galleries). */
export const allMediaKeys = Object.keys(media) as MediaKey[];
