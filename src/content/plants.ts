export const plantCollection = [
  {
    id: "monstera",
    name: "[PLACEHOLDER: Monstera deliciosa ‘Albo’]",
    light: "Bright indirect",
    care: "Moderate",
    note: "Collected after a trip to [PLACEHOLDER: Region]. Prefers consistent moisture, never soggy.",
    featured: true,
  },
  {
    id: "fiddle",
    name: "[PLACEHOLDER: Ficus lyrata]",
    light: "Bright indirect",
    care: "Fussy",
    note: "Corner sentinel in the studio. Rotate weekly; wipe leaves monthly.",
    featured: true,
  },
  {
    id: "calathea",
    name: "[PLACEHOLDER: Calathea ornata]",
    light: "Medium",
    care: "Moderate",
    note: "Thrives with humidity tray. Dramatic when happy; honest when not.",
    featured: false,
  },
  {
    id: "snake",
    name: "[PLACEHOLDER: Sansevieria trifasciata]",
    light: "Low to bright",
    care: "Easy",
    note: "Travel companion plant—survives absences with dignity.",
    featured: false,
  },
  {
    id: "pothos",
    name: "[PLACEHOLDER: Epipremnum aureum]",
    light: "Low to medium",
    care: "Easy",
    note: "Propagation experiments and gifts for friends who ask.",
    featured: true,
  },
  {
    id: "olive",
    name: "[PLACEHOLDER: Olea europaea (container)]",
    light: "Full sun",
    care: "Moderate",
    note: "Balcony olive—reminder that slow growth is still growth.",
    featured: false,
  },
] as const;

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

export const shopPlants = [
  {
    id: "shop-1",
    name: "[PLACEHOLDER: Featured cultivar A]",
    price: "[PLACEHOLDER: $48]",
    tag: "Partner pick",
    blurb: "Starter-friendly; bright indirect light.",
  },
  {
    id: "shop-2",
    name: "[PLACEHOLDER: Featured cultivar B]",
    price: "[PLACEHOLDER: $72]",
    tag: "Collector",
    blurb: "Statement foliage for a sunlit corner.",
  },
  {
    id: "shop-3",
    name: "[PLACEHOLDER: Featured cultivar C]",
    price: "[PLACEHOLDER: $36]",
    tag: "Easy care",
    blurb: "Forgiving for first-time plant parents.",
  },
] as const;

export const partnerNursery = {
  name: "[PLACEHOLDER: Partner Nursery Name]",
  blurb:
    "A curated shelf of plants I actually grow—fulfilled by a local partner. Showcase only; no live checkout in this MVP.",
  cta: "Visit partner nursery",
  href: "#", // PLACEHOLDER
};
