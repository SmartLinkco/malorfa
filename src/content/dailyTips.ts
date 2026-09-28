export const dailyPlantTips = [
  {
    plant: "[PLACEHOLDER: Monstera]",
    tip: "Water when the pot feels light—calendars lie, weight rarely does.",
  },
  {
    plant: "[PLACEHOLDER: Fiddle-leaf fig]",
    tip: "Rotate a quarter-turn weekly so growth stays even toward the light.",
  },
  {
    plant: "[PLACEHOLDER: Calathea]",
    tip: "Group humidity lovers; a shared tray beats misting theater.",
  },
  {
    plant: "[PLACEHOLDER: Snake plant]",
    tip: "Skip the winter watering urge—this one prefers a dry spell.",
  },
  {
    plant: "[PLACEHOLDER: Pothos]",
    tip: "A yellow leaf is often overwatering, not under-love.",
  },
  {
    plant: "[PLACEHOLDER: Olive (container)]",
    tip: "Full sun and sharp drainage; treat it like a Mediterranean guest.",
  },
  {
    plant: "[PLACEHOLDER: Peace lily]",
    tip: "Droop is a polite reminder—water thoroughly, then let it recover.",
  },
  {
    plant: "[PLACEHOLDER: ZZ plant]",
    tip: "Low light is fine; wet feet are not. Err on dry.",
  },
  {
    plant: "[PLACEHOLDER: Rubber plant]",
    tip: "Wipe dust monthly—leaves photosynthesize better when they can breathe.",
  },
  {
    plant: "[PLACEHOLDER: String of pearls]",
    tip: "Bright light and sparse water; plump beads mean you’re on track.",
  },
  {
    plant: "[PLACEHOLDER: Herb window box]",
    tip: "Harvest often—pinching tips keeps basil branching instead of bolting.",
  },
  {
    plant: "[PLACEHOLDER: Travel protocol]",
    tip: "Deep water the night before a trip; ask a friend only for the fussy ones.",
  },
  {
    plant: "[PLACEHOLDER: Fern]",
    tip: "Keep the soil evenly moist and away from blasting AC vents.",
  },
  {
    plant: "[PLACEHOLDER: Succulent mix]",
    tip: "More light, less water, and a pot with a real drainage hole.",
  },
] as const;

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
