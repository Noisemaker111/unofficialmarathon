import type { ImplantSlot, Rarity } from "@/data/types";

export interface GeneratedImplant {
  id: string;
  name: string;
  slot: ImplantSlot;
  rarity: Rarity;
  price: number;
  description: string;
  statModifiers: string[];
  unique?: boolean;
  family?: string;
  version?: number;
  wikiUrl: string;
}

const rarityPrices: Record<Rarity, number> = {
  standard: 25,
  enhanced: 70,
  deluxe: 200,
  superior: 600,
  prestige: 2400,
  contraband: 3000,
};

const versionRarities: Rarity[] = ["standard", "enhanced", "deluxe", "superior", "prestige"];

interface ImplantFamilyDef {
  family: string;
  slot: ImplantSlot;
  slug: string;
  description: string;
  statByVersion: string[][];
  uniqueAtV5?: boolean;
  prestigePrice?: number;
}

const families: ImplantFamilyDef[] = [
  {
    family: "Augmented Capacitors",
    slot: "head",
    slug: "augmented-capacitors",
    description: "Boosts Prime Recovery.",
    statByVersion: [["+10 PRIME"], ["-10 HW", "+20 PRIME"], ["-10 HW", "+30 PRIME"], ["-5 HW", "+40 PRIME"], ["-5 HW", "+40 PRIME"]],
    uniqueAtV5: true,
  },
  {
    family: "Energy Harvesting",
    slot: "head",
    slug: "energy-harvesting",
    description: "Boosts Tactical Recovery.",
    statByVersion: [["+10 TAC"], ["-10 FW", "+20 TAC"], ["-10 FW", "+15 TAC"], ["-5 FW", "+40 TAC"], ["-5 HW", "+40 TAC"]],
  },
  {
    family: "Ping+",
    slot: "head",
    slug: "ping-plus",
    description: "Extends ping duration and awareness.",
    statByVersion: [["+5 HW", "+30 PING"], ["+10 HW", "+30 PING"], ["-10 FALL", "-40 FW"], ["+20 HW", "+15 LOOT"], ["Ping trait enhanced"]],
  },
  {
    family: "Regen",
    slot: "head",
    slug: "regen",
    description: "Improves repair and recovery after ability use.",
    statByVersion: [["+15 REPAIR"], ["+10 REVIVE", "+25 REPAIR"], ["+15 REVIVE", "+40 REPAIR"], ["+20 REVIVE", "+50 REPAIR"], ["+20 REVIVE", "+50 REPAIR"]],
    uniqueAtV5: true,
  },
  {
    family: "Sprint Kit",
    slot: "head",
    slug: "sprint-kit",
    description: "Improves sprint mobility and heat management.",
    statByVersion: [["+5 AGI", "+5 FALL"], ["+10 AGI", "+10 FALL"], ["Sprint trait"], ["Sprint trait"], ["Sprint trait"]],
  },
  {
    family: "Thick Skull",
    slot: "head",
    slug: "thick-skull",
    description: "Improves fall resistance and firewall.",
    statByVersion: [["+20 FW"], ["+30 FW", "+5 HEAT"], ["+10 FALL", "+40 FW"], ["+10 FALL", "+50 FW"], ["+10 FALL", "+50 FW"]],
    uniqueAtV5: true,
  },
  {
    family: "Helping Hands",
    slot: "torso",
    slug: "helping-hands",
    description: "Improves revive speed and support utility.",
    statByVersion: [["+15 REVIVE"], ["+10 HW", "+25 REVIVE"], ["+15 HW", "+35 REVIVE"], ["+20 HW", "+50 REVIVE"], ["+20 HW", "+50 REVIVE"]],
    uniqueAtV5: true,
  },
  {
    family: "Hurting Hands",
    slot: "torso",
    slug: "hurting-hands",
    description: "Boosts finisher siphon and aggression.",
    statByVersion: [["+15 SIPHON"], ["+25 SIPHON", "+10 FW"], ["+35 SIPHON", "+15 FW"], ["+50 SIPHON", "+20 FW"], ["+50 SIPHON", "+20 FW"]],
    uniqueAtV5: true,
  },
  {
    family: "Knife Fight",
    slot: "torso",
    slug: "knife-fight",
    description: "Melee-focused torso implant.",
    statByVersion: [["+10 MELEE"], ["+10 FALL", "-10 HW"], ["+15 FALL", "-10 HW"], ["+20 FALL", "-10 HW"], ["Melee kills restore shields"]],
    uniqueAtV5: true,
  },
  {
    family: "Nimble Fingers",
    slot: "torso",
    slug: "nimble-fingers",
    description: "Improves loot speed and handling.",
    statByVersion: [["+15 LOOT"], ["+5 AGI", "+25 LOOT"], ["+10 AGI", "-10 FALL"], ["+10 AGI", "+25 LOOT"], ["+5 AGI", "+50 LOOT"]],
  },
  {
    family: "Survival Kit",
    slot: "torso",
    slug: "survival-kit",
    description: "Balanced survivability implant.",
    statByVersion: [["+5 FW", "+5 HW"], ["+10 FW", "+10 HW"], ["+15 FW", "+15 HW"], ["+20 FW", "+20 HW"], ["+25 FW", "+25 HW"]],
  },
  {
    family: "Bionic Leg Upgrades",
    slot: "legs",
    slug: "bionic-leg-upgrades",
    description: "Improves agility and siphon.",
    statByVersion: [["+10 AGI"], ["+25 AGI", "+10 SIPHON"], ["+35 AGI", "+15 SIPHON"], ["+50 AGI", "+20 SIPHON"], ["+50 AGI", "+20 SIPHON"]],
    prestigePrice: 1800,
  },
  {
    family: "Distance Runner",
    slot: "legs",
    slug: "distance-runner",
    description: "Improves heat capacity at the cost of handling.",
    statByVersion: [["+5 HEAT"], ["+10 HEAT"], ["+25 HEAT"], ["+50 HEAT"], ["+50 HEAT"]],
    prestigePrice: 1800,
  },
  {
    family: "Graceful Landings",
    slot: "legs",
    slug: "graceful-landings",
    description: "Reduces fall damage and improves aerial control.",
    statByVersion: [["+10 FALL"], ["+10 AGI", "+20 FALL"], ["+15 AGI", "+35 FALL"], ["+20 AGI", "+50 FALL"], ["+20 AGI", "+50 FALL"]],
    uniqueAtV5: true,
  },
  {
    family: "Solid Stance",
    slot: "legs",
    slug: "solid-stance",
    description: "Improves stability while aiming and crouching.",
    statByVersion: [["+5 HEAT"], ["-10 HW", "-5 HEAT"], ["-20 AGI", "-50 FALL"], ["+50 HW", "+20 HEAT"], ["Stability trait"]],
    prestigePrice: 1800,
  },
  {
    family: "Strike Kit",
    slot: "legs",
    slug: "strike-kit",
    description: "Melee mobility and finisher support.",
    statByVersion: [["Melee trait"], ["+15 SIPHON", "+15 MELEE"], ["+15 SIPHON", "+15 MELEE"], ["Melee trait"], ["Melee trait"]],
    prestigePrice: 1800,
  },
  {
    family: "Firewall",
    slot: "shield",
    slug: "firewall",
    description: "Boosts Firewall stat.",
    statByVersion: [["+10 FW"], ["+15 FW"], ["+20 FW"], ["Firewall trait"], ["Firewall trait"]],
  },
  {
    family: "Protector",
    slot: "shield",
    slug: "protector",
    description: "Grants additional shield slots.",
    statByVersion: [["+1 Shield Slot", "-5 AGI", "-5 HEAT"], ["+1 Shield Slot", "-5 AGI", "-5 HEAT"], ["+2 Shield Slots", "-10 AGI", "-10 HEAT"], ["+3 Shield Slots", "-15 AGI", "-15 HEAT"], ["+3 Shield Slots", "-15 AGI", "-15 HEAT"]],
    prestigePrice: 3000,
  },
  {
    family: "Reinforced Shields",
    slot: "shield",
    slug: "reinforced-shields",
    description: "Reinforced shields take reduced damage.",
    statByVersion: [["Reinforced trait"], ["Reinforced trait"], ["Reinforced trait"], ["+1 Reinforced Slot"], ["+1 Reinforced Slot", "-15 PRIME", "-15 TAC"]],
    uniqueAtV5: true,
    prestigePrice: 3000,
  },
  {
    family: "Volt Resistance",
    slot: "shield",
    slug: "volt-resistance",
    description: "Shield slot with volt recovery bonuses.",
    statByVersion: [["+1 Shield Slot", "+10 PRIME", "+10 TAC"], ["Volt trait"], ["Volt trait"], ["Volt trait"], ["Volt trait"]],
  },
];

export function generateImplantCatalog(): GeneratedImplant[] {
  const generated: GeneratedImplant[] = [];

  for (const family of families) {
    versionRarities.forEach((rarity, index) => {
      const version = index + 1;
      const price =
        version === 5 && family.prestigePrice
          ? family.prestigePrice
          : rarityPrices[rarity];

      generated.push({
        id: `${family.slug}-v${version}`,
        name: `${family.family} V${version}`,
        slot: family.slot,
        rarity,
        price,
        description: family.description,
        statModifiers: family.statByVersion[index] ?? [],
        family: family.family,
        version,
        unique: version === 5 && family.uniqueAtV5,
        wikiUrl: "https://marathonthegame.fandom.com/wiki/Implants",
      });
    });
  }

  generated.push({
    id: "spectre-armor",
    name: "Spectre Armor",
    slot: "shield",
    rarity: "prestige",
    price: 3000,
    description: "When shields are depleted, briefly gain invisibility.",
    statModifiers: ["-15 AGI", "-15 HEAT"],
    unique: true,
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Implants",
  });

  return generated;
}

export function getImplantFamilies(): string[] {
  return families.map((family) => family.family);
}
