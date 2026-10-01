import { media } from "@/content/media";

export type Plant = {
  id: string;
  name: string;
  light: string;
  care: string;
  note: string;
  featured: boolean;
  image: string;
  imageAlt: string;
};

export const plantCollection: Plant[] = [
  {
    id: "orchid",
    name: "Orchid (studio)",
    light: "Bright indirect",
    care: "Moderate",
    note: "The plant in the pink pot—tended between client calls and travel packing.",
    featured: true,
    image: media.plantOrchidDetail.src,
    imageAlt: media.plantOrchidDetail.alt,
  },
  {
    id: "fiddle",
    name: "Ficus lyrata",
    light: "Bright indirect",
    care: "Fussy",
    note: "Corner sentinel in the studio. Rotate weekly; wipe leaves monthly.",
    featured: true,
    image: media.plantFiddleLeaf.src,
    imageAlt: media.plantFiddleLeaf.alt,
  },
  {
    id: "calathea",
    name: "Calathea ornata",
    light: "Medium",
    care: "Moderate",
    note: "Thrives with humidity tray. Dramatic when happy; honest when not.",
    featured: false,
    image: media.plantCalathea.src,
    imageAlt: media.plantCalathea.alt,
  },
  {
    id: "snake",
    name: "Sansevieria trifasciata",
    light: "Low to bright",
    care: "Easy",
    note: "Travel companion plant—survives absences with dignity.",
    featured: false,
    image: media.plantSnake.src,
    imageAlt: media.plantSnake.alt,
  },
  {
    id: "pothos",
    name: "Epipremnum aureum",
    light: "Low to medium",
    care: "Easy",
    note: "Propagation experiments and gifts for friends who ask.",
    featured: true,
    image: media.plantPothos.src,
    imageAlt: media.plantPothos.alt,
  },
  {
    id: "olive",
    name: "Olea europaea (container)",
    light: "Full sun",
    care: "Moderate",
    note: "Balcony olive—reminder that slow growth is still growth.",
    featured: false,
    image: media.plantOlive.src,
    imageAlt: media.plantOlive.alt,
  },
];

export const careTips = [
  {
    id: "tip-1",
    title: "Water by weight, not by calendar",
    body: "Lift the pot. Light means thirsty; heavy means wait. Calendars lie; weight rarely does.",
    level: "Beginner",
  },
  {
    id: "tip-2",
    title: "Match light before you buy fertilizer",
    body: "Most ‘mystery decline’ is light mismatch. Move the plant before you feed it.",
    level: "Beginner",
  },
  {
    id: "tip-3",
    title: "Travel watering protocol",
    body: "Deep water the night before departure. Group plants; ask a friend only for the fussy ones.",
    level: "Traveler",
  },
  {
    id: "tip-4",
    title: "Journal what you change",
    body: "Note light moves, repots, and pests. Patterns appear faster than intuition alone.",
    level: "Collector",
  },
] as const;

export type ShopPlant = {
  id: string;
  name: string;
  price: string;
  tag: string;
  blurb: string;
  image: string;
  imageAlt: string;
};

export const shopPlants: ShopPlant[] = [
  {
    id: "shop-1",
    name: "Monstera starter",
    price: "$48",
    tag: "Partner pick",
    blurb: "Starter-friendly; bright indirect light.",
    image: media.shopPlantA.src,
    imageAlt: media.shopPlantA.alt,
  },
  {
    id: "shop-2",
    name: "Statement Alocasia",
    price: "$72",
    tag: "Collector",
    blurb: "Statement foliage for a sunlit corner.",
    image: media.shopPlantB.src,
    imageAlt: media.shopPlantB.alt,
  },
  {
    id: "shop-3",
    name: "ZZ plant",
    price: "$36",
    tag: "Easy care",
    blurb: "Forgiving for first-time plant parents.",
    image: media.shopPlantC.src,
    imageAlt: media.shopPlantC.alt,
  },
];

export const partnerNursery = {
  name: "Partner nursery shelf",
  blurb:
    "A curated shelf of plants I actually grow—fulfilled by a local partner. Showcase only; no live checkout in this MVP.",
  cta: "Visit partner nursery",
  href: "#",
  image: media.partnerNurseryStorefront.src,
  imageAlt: media.partnerNurseryStorefront.alt,
};
