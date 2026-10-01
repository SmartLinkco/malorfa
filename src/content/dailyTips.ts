import { media } from "@/content/media";

export type DailyPlantTip = {
  plant: string;
  tip: string;
  image?: string;
  imageAlt?: string;
};

/** Tips keyed to generated plant / shop imagery where available. */
export const dailyPlantTips: DailyPlantTip[] = [
  {
    plant: "Monstera starter",
    tip: "Water when the pot feels light—calendars lie, weight rarely does.",
    image: media.shopPlantA.src,
    imageAlt: media.shopPlantA.alt,
  },
  {
    plant: "Fiddle-leaf fig",
    tip: "Rotate a quarter-turn weekly so growth stays even toward the light.",
    image: media.plantFiddleLeaf.src,
    imageAlt: media.plantFiddleLeaf.alt,
  },
  {
    plant: "Calathea",
    tip: "Group humidity lovers; a shared tray beats misting theater.",
    image: media.plantCalathea.src,
    imageAlt: media.plantCalathea.alt,
  },
  {
    plant: "Snake plant",
    tip: "Skip the winter watering urge—this one prefers a dry spell.",
    image: media.plantSnake.src,
    imageAlt: media.plantSnake.alt,
  },
  {
    plant: "Pothos",
    tip: "A yellow leaf is often overwatering, not under-love.",
    image: media.plantPothos.src,
    imageAlt: media.plantPothos.alt,
  },
  {
    plant: "Olive (container)",
    tip: "Full sun and sharp drainage; treat it like a Mediterranean guest.",
    image: media.plantOlive.src,
    imageAlt: media.plantOlive.alt,
  },
  {
    plant: "Studio orchid",
    tip: "Bright indirect light and a thorough soak—then wait until the bark dries.",
    image: media.plantOrchidDetail.src,
    imageAlt: media.plantOrchidDetail.alt,
  },
  {
    plant: "ZZ plant",
    tip: "Low light is fine; wet feet are not. Err on dry.",
    image: media.shopPlantC.src,
    imageAlt: media.shopPlantC.alt,
  },
  {
    plant: "Statement Alocasia",
    tip: "Wipe dust monthly—leaves photosynthesize better when they can breathe.",
    image: media.shopPlantB.src,
    imageAlt: media.shopPlantB.alt,
  },
  {
    plant: "Living collection",
    tip: "Deep water the night before a trip; ask a friend only for the fussy ones.",
    image: media.plantsCollectionWide.src,
    imageAlt: media.plantsCollectionWide.alt,
  },
  {
    plant: "Nursery shelf",
    tip: "Match light before you buy fertilizer—most mystery decline is light mismatch.",
    image: media.partnerNurseryStorefront.src,
    imageAlt: media.partnerNurseryStorefront.alt,
  },
  {
    plant: "Propagation jar",
    tip: "Change water weekly and keep cuttings in bright, indirect light.",
    image: media.plantPothos.src,
    imageAlt: media.plantPothos.alt,
  },
  {
    plant: "Corner sentinel",
    tip: "Keep the soil evenly moist only if the plant asks—most prefer a dry beat.",
    image: media.plantFiddleLeaf.src,
    imageAlt: media.plantFiddleLeaf.alt,
  },
  {
    plant: "Balcony olive",
    tip: "More light, less water, and a pot with a real drainage hole.",
    image: media.plantOlive.src,
    imageAlt: media.plantOlive.alt,
  },
];

/** Stable daily index from YYYY-MM-DD (local timezone). */
export function tipIndexForDate(date = new Date()): number {
  const key = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash % dailyPlantTips.length;
}

export function getTodayTip(date = new Date()) {
  const index = tipIndexForDate(date);
  const key = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
  return { key, index, ...dailyPlantTips[index] };
}
