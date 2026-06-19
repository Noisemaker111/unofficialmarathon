// Item data for the 2026 Marathon extraction shooter
// Source: https://marathonthegame.fandom.com/wiki/Items

import type { ItemType, Rarity } from "@/data/types";
import { extendedItems } from "@/data/items-extended";

export interface GameItem {
  id: string;
  name: string;
  type: ItemType;
  rarity?: Rarity;
  description: string;
  value?: number;
  zone?: string;
  location?: string;
  unlocks?: string;
  wikiUrl: string;
}

export const itemTypes: { value: ItemType; label: string }[] = [
  { value: "ammo", label: "Ammo" },
  { value: "backpack", label: "Backpacks" },
  { value: "consumable", label: "Consumables" },
  { value: "equipment", label: "Equipment" },
  { value: "key", label: "Keys" },
  { value: "salvage", label: "Salvage" },
  { value: "valuable", label: "Valuables" },
  { value: "contract", label: "Contracts" },
  { value: "sponsored-kit", label: "Sponsored Kits" },
  { value: "currency", label: "Currency" },
  { value: "priority", label: "Priority Items" },
];

function item(
  id: string,
  name: string,
  type: ItemType,
  description: string,
  extras?: Partial<GameItem>,
): GameItem {
  return {
    id,
    name,
    type,
    description,
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Items",
    ...extras,
  };
}

export const items: GameItem[] = [
  // Currency & ammo
  item("credits", "Credits", "currency", "Money ... obviously"),
  item("light-rounds", "Light Rounds", "ammo", "Small-calibre compact ammunition used for a variety of ballistic weapon types."),
  item("heavy-rounds", "Heavy Rounds", "ammo", "Heavy-caliber ammunition for high-damage weapons."),
  item("mips", "MIPS", "ammo", "Specialized ammunition for high damage ballistic weaponry."),
  item("volt-battery", "Volt Battery", "ammo", "Compact batteries for volt weapons. Sprinting slowly regenerates charge."),
  item("volt-cell", "Volt Cells", "ammo", "High-capacity volt ammunition for railguns and heavy volt weapons."),

  // Backpacks
  item("8xs-base-pack", "8XS Base Pack", "backpack", "+8 slots", { rarity: "standard" }),
  item("16xs-base-pack", "16XS Base Pack", "backpack", "+16 slots", { rarity: "enhanced" }),
  item("24xs-med-pack-plus", "24XS Med Pack+", "backpack", "+24 slots. Faster consumable usage. Health consumables recharge shields.", { rarity: "superior" }),
  item("32xl-sneakpack", "32XL Sneakpack++", "backpack", "+32 slots. Invisibility when opening containers and doors.", { rarity: "prestige" }),

  // Consumables
  item("small-med-kit", "Small Med Kit", "consumable", "Restores a small amount of health.", { rarity: "standard" }),
  item("patch-kit", "Patch Kit", "consumable", "Restores health.", { rarity: "standard" }),
  item("panacea-kit", "Panacea Kit", "consumable", "Fully restores health, recharges shields, and removes hazardous status effects.", { rarity: "prestige" }),
  item("shield-charge", "Shield Charge", "consumable", "Gradually recharges shields to full.", { rarity: "standard" }),
  item("self-revive", "Self Revive", "consumable", "Allows self-revive when downed.", { rarity: "superior" }),
  item("energy-amp", "Energy Amp", "consumable", "Temporary combat amplifier.", { rarity: "deluxe" }),
  item("cardio-kick", "Cardio Kick", "consumable", "Boosts sprint speed for a duration.", { rarity: "deluxe" }),
  item("mechanics-kit", "Mechanics Kit", "consumable", "Removes mechanical status effects and maximizes Hardware.", { rarity: "standard" }),
  item("os-debug", "OS Debug", "consumable", "Removes OS status effects like EMP and Hack.", { rarity: "standard" }),

  // Equipment
  item("frag-grenade", "Frag Grenade", "equipment", "Hand grenade that bursts into shrapnel.", { rarity: "standard" }),
  item("emp-grenade", "EMP Grenade", "equipment", "Creates lingering electromagnetic blasts.", { rarity: "deluxe" }),
  item("smoke-grenade", "Smoke Grenade", "equipment", "Tossable smoke screen that breaks sightlines.", { rarity: "standard" }),
  item("proximity-sensor", "Proximity Sensor", "equipment", "Deployable scanner that pings nearby hostiles.", { rarity: "enhanced" }),
  item("bubble-shield", "Bubble Shield", "equipment", "Spherical energy shield that absorbs damage.", { rarity: "superior" }),
  item("claymore-mine", "Claymore Mine", "equipment", "Detonates when hostiles cross its path.", { rarity: "enhanced" }),

  // Keys
  item("lockbox-key", "Lockbox Key", "key", "Opens lockboxes across Tau Ceti IV."),
  item("master-clearance-code", "Master Clearance Code", "key", "High security clearance for valuable chests and exfil sites.", { rarity: "contraband" }),
  item("ai-uplink-servers", "AI Uplink Servers", "key", "Unlocks subterranean server hub in Dire Marsh.", {
    zone: "Dire Marsh",
    location: "AI Uplink — Basement",
    unlocks: "Subterranean server hub",
  }),
  item("greenhouse-operations", "Greenhouse Operations", "key", "Unlocks secure research closets.", {
    zone: "Dire Marsh",
    location: "Greenhouse — Central tend, rooftop",
    unlocks: "Secure research closets",
  }),
  item("cryo-archive-scrambled-doorkey", "Cryo Archive Scrambled Doorkey", "key", "Contains data to access locked rooms in Cryo Archive.", {
    zone: "Cryo Archive",
    unlocks: "Locked rooms aboard the Marathon",
    rarity: "contraband",
  }),

  // Salvage
  item("synapse-cube", "Synapse Cube", "salvage", "Essential for integrating electrical signals within a cyborg shell."),
  item("paradox-circuit", "Paradox Circuit", "salvage", "Processor capable of creating a more powerful version of itself."),
  item("alien-alloy", "Alien Alloy", "salvage", "Unusual material with metallic and biological properties."),
  item("compiler-ganglion", "Compiler Ganglion", "salvage", "A piece of a Compiler's nervous system.", { rarity: "contraband" }),

  // Valuables
  item("uesc-tactical-records", "UESC Tactical Records", "valuable", "Encrypted data from clandestine UESC operations.", { rarity: "contraband" }),
  item("expedition-manifest", "Expedition Manifest", "valuable", "Selection interviews from UESC Marathon mission applicants."),
  item("uesc-marathon-model", "UESC Marathon Model", "valuable", "Scale model of the generational colony ship."),
  item("mod-delivery-reroute", "Mod Delivery Reroute", "valuable", "Grants a mod for equipped weapons on exfil.", { rarity: "contraband" }),

  // Contracts & kits
  item("lost-contract-traxus", "Lost Contract: Traxus", "contract", "Recovered contract offering Traxus reputation."),
  item("enhanced-arachne-kit", "Enhanced Arachne Sponsored Kit", "sponsored-kit", "Emergency package from Arachne. Completing a run grants Arachne reputation.", { rarity: "enhanced" }),
  item("deluxe-mida-kit", "Deluxe MIDA Sponsored Kit", "sponsored-kit", "Emergency package from MIDA with deluxe gear.", { rarity: "deluxe" }),

  // Priority
  item("ai-subroutine-cryo-01", "AI SUBROUTINE [CRYO 01]", "priority", "Grants partial access to the Cryo DNA Network.", {
    zone: "Cryo Archive",
    rarity: "contraband",
  }),
];

const existingIds = new Set(items.map((entry) => entry.id));
for (const seed of extendedItems) {
  if (existingIds.has(seed.id)) continue;
  items.push({
    ...seed,
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Items",
  });
}

export function getItemById(id: string): GameItem | undefined {
  return items.find((entry) => entry.id === id);
}

export function getItemsByType(type: ItemType): GameItem[] {
  return items.filter((entry) => entry.type === type);
}

export function getKeysByZone(zone: string): GameItem[] {
  return items.filter((entry) => entry.type === "key" && entry.zone === zone);
}
