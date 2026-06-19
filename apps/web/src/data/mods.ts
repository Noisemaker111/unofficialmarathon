// Weapon mod data for the 2026 Marathon extraction shooter
// Source: https://marathonthegame.fandom.com/wiki/Mods

import type { ModSlot, Rarity } from "@/data/types";
import { generateBulkMods } from "@/data/mods-bulk";
import { extendedMods } from "@/data/mods-extended";

export interface Mod {
  id: string;
  name: string;
  slot: ModSlot;
  rarity: Rarity;
  price: number;
  description: string;
  statChanges: string[];
  compatibleWeaponIds: string[];
  wikiUrl: string;
}

export const modSlots: { value: ModSlot; label: string }[] = [
  { value: "barrel", label: "Barrel" },
  { value: "chip", label: "Chip" },
  { value: "generator", label: "Generator" },
  { value: "grip", label: "Grip" },
  { value: "magazine", label: "Magazine" },
  { value: "optic", label: "Optic" },
  { value: "shield", label: "Shield" },
];

function mod(
  id: string,
  name: string,
  slot: ModSlot,
  rarity: Rarity,
  price: number,
  description: string,
  statChanges: string[],
  compatibleWeaponIds: string[],
): Mod {
  return {
    id,
    name,
    slot,
    rarity,
    price,
    description,
    statChanges,
    compatibleWeaponIds,
    wikiUrl: "https://marathonthegame.fandom.com/wiki/Mods",
  };
}

const arWeapons = ["impact-h-ar", "m77-assault-rifle", "overrun-ar", "v75-scar"];
const prWeapons = ["br33-volley-rifle", "hardline-pr", "repeater-hpr", "stryder-m1t", "twin-tap-hbr", "v66-lookout"];
const smgWeapons = ["bully-smg", "brrt-smg", "copperhead-rf", "v22-volt-thrower"];
const allBallistic = [...arWeapons, ...prWeapons, ...smgWeapons, "ce-tactical-sidearm", "magnum-mc", "longshot"];

const baseMods: Mod[] = [
  mod("stopping-mag", "Stopping Mag", "magazine", "prestige", 1620, "Custom mod for Impact HAR. Increases magazine size and reload speed.", ["Magazine +", "Reload -"], ["impact-h-ar"]),
  mod("combat-mag", "Combat Mag", "magazine", "superior", 621, "Standard combat magazine for ballistic weapons.", ["Magazine +6", "Range +20", "Reload -"], allBallistic),
  mod("hi-cap-mag", "Hi-cap Mag", "magazine", "superior", 702, "Increases magazine capacity.", ["Magazine +9"], allBallistic),
  mod("drum-mag", "Drum Mag", "magazine", "deluxe", 234, "Large drum magazine.", ["Magazine +33"], smgWeapons),
  mod("stabilizing-mag", "Stabilizing Mag", "magazine", "deluxe", 207, "Heavier mag with better stability.", ["Magazine +24", "Recoil -31%"], arWeapons),

  mod("far-reach-optic", "Far Reach Optic", "optic", "superior", 621, "Increases zoom and ADS accuracy.", ["Zoom +", "ADS +"], prWeapons),
  mod("hi-zoom-optic", "Hi-Zoom Optic", "optic", "superior", 621, "Long-range precision optic.", ["ADS Spread -", "Zoom +1.6", "Range +18"], ["longshot", "outland", "v99-channel-rifle"]),
  mod("rangefinder-optic", "Rangefinder Optic", "optic", "deluxe", 207, "Mid-range rangefinder lens.", ["ADS Spread -", "Zoom +0.6"], prWeapons),
  mod("vigilant-lens", "Vigilant Lens", "optic", "deluxe", 153, "Precision ADS optic.", ["ADS Speed -", "ADS Spread -", "Zoom +"], prWeapons),

  mod("steady-barrel", "Steady Barrel", "barrel", "enhanced", 60, "Reduces recoil.", ["Recoil -9%"], arWeapons),
  mod("long-range-barrel", "Long-range Barrel", "barrel", "deluxe", 180, "Extends effective range.", ["Range +2", "Hipfire -"], arWeapons),
  mod("mips-slug-converter", "Mips Slug Converter", "barrel", "prestige", 1620, "Converts weapon to high-damage slugs.", ["Fire Rate +57", "Range +1", "Aim Assist +"], ["impact-h-ar", "hardline-pr"]),

  mod("vigilant-grip", "Vigilant Grip", "grip", "superior", 540, "Improves handling under fire.", ["Equip -", "Recoil -29%"], allBallistic),
  mod("combat-grip", "Combat Grip", "grip", "deluxe", 180, "Balanced combat grip.", ["ADS Speed -", "Equip +"], allBallistic),
  mod("full-auto-selector", "Full-Auto Selector", "grip", "prestige", 1620, "Enables full-auto fire mode.", ["RPM +92", "Hipfire -"], ["impact-h-ar", "m77-assault-rifle"]),

  mod("insurrection", "Insurrection", "chip", "standard", 23, "Increased damage against UESC forces.", ["Anti-UESC damage +"], allBallistic),
  mod("stack-overflow", "Stack Overflow", "chip", "enhanced", 69, "Empty reload overflows magazine.", ["Overflow on empty reload"], allBallistic),
  mod("swarm-directive", "Swarm Directive", "chip", "superior", 621, "Precision kills spawn flechette seekers that heal.", ["Flechette seekers on precision kill"], prWeapons),
  mod("see-ya", "See Ya", "chip", "superior", 621, "Empty reload grants brief invisibility.", ["Invisibility on empty reload"], smgWeapons),
  mod("trigger-discipline", "Trigger Discipline", "chip", "enhanced", 69, "First rounds of burst are more accurate.", ["Accuracy on trigger pull"], allBallistic),

  mod("balanced-shield", "Balanced Shield", "shield", "enhanced", 69, "Lightweight weapon shield.", ["Equip +", "Weight -"], allBallistic),
  mod("circuit-shield", "Circuit Shield", "shield", "prestige", 1620, "Volt weapon shield mod.", ["Recoil -10%"], ["v75-scar", "v66-lookout", "v22-volt-thrower", "v00-zeus-rg"]),
];

const baseModIds = new Set(baseMods.map((entry) => entry.id));
const dedupedExtended = extendedMods.filter((entry) => !baseModIds.has(entry.id));
const mergedIds = new Set([...baseModIds, ...dedupedExtended.map((entry) => entry.id)]);
const bulkMods: Mod[] = generateBulkMods(mergedIds)
  .filter((entry) => !mergedIds.has(entry.id))
  .map((entry) => ({
    ...entry,
    wikiUrl: entry.wikiUrl ?? "https://marathonthegame.fandom.com/wiki/Mods",
  }));

export const mods: Mod[] = [...baseMods, ...dedupedExtended, ...bulkMods];

export function getModById(id: string): Mod | undefined {
  return mods.find((entry) => entry.id === id);
}

export function getModsForWeapon(weaponId: string): Mod[] {
  return mods.filter((entry) => entry.compatibleWeaponIds.includes(weaponId));
}

export function getModsBySlot(slot: ModSlot): Mod[] {
  return mods.filter((entry) => entry.slot === slot);
}
