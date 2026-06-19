import type { Rarity } from "@/data/types";
import { rarityColors } from "@/data/types";
import type { Runner } from "@/data/runners";
import type { LoadoutState } from "@/lib/loadout";
import { getCoreById } from "@/data/cores";
import { getImplantById } from "@/data/implants";
import { getItemById } from "@/data/items";
import { getModById } from "@/data/mods";

/** Upgrade wiki thumbnail URLs to a larger portrait size. */
export function getRunnerPortraitUrl(url: string, size: 400 | 800 | 1200 = 800): string {
  if (!url) return "";
  return url.replace(/\/\d+px-/g, `/${size}px-`).replace(/\d+px-/g, `${size}px-`);
}

export function rarityBorderClass(rarity?: Rarity): string {
  if (!rarity) return "border-white/10";
  const color = rarityColors[rarity];
  const border = color.split(" ").find((c) => c.startsWith("border-"));
  return border ?? "border-white/10";
}

/** Top rarity bar on vault-style item tiles. */
export function rarityBarClass(rarity?: Rarity): string {
  switch (rarity) {
    case "prestige":
      return "bg-amber-500/90";
    case "contraband":
      return "bg-rose-500/90";
    case "superior":
      return "bg-violet-500/90";
    case "deluxe":
      return "bg-sky-500/90";
    case "enhanced":
      return "bg-emerald-500/90";
    default:
      return "bg-white/20";
  }
}

export function formatCredits(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(value);
}

export function calculateLoadoutValue(loadout: LoadoutState): number {
  let total = 0;
  const add = (price?: number) => {
    if (price) total += price;
  };

  if (loadout.coreId) add(getCoreById(loadout.coreId)?.price);
  if (loadout.secondaryCoreId) add(getCoreById(loadout.secondaryCoreId)?.price);

  for (const id of Object.values(loadout.implants)) {
    if (id) add(getImplantById(id)?.price);
  }

  if (loadout.backpackId) add(getItemById(loadout.backpackId)?.value);
  if (loadout.equipmentId) add(getItemById(loadout.equipmentId)?.value);

  for (const modId of loadout.modIds) {
    add(getModById(modId)?.price);
  }

  return total;
}

/** All runner stats in loadout-menu order. */
export const runnerStatOrder = [
  "Heat Capacity",
  "Agility",
  "Loot Speed",
  "Melee Damage",
  "Prime Recovery",
  "Tactical Recovery",
  "Self-Repair Speed",
  "Finisher Siphon",
  "Revive Speed",
  "Hardware",
  "Firewall",
  "Fall Resistance",
  "Ping Duration",
] as const;

export function getRunnerStatList(runner?: Runner) {
  if (!runner) return [];
  return runnerStatOrder.map((key) => ({
    key,
    value: runner.defaultStats[key] ?? 0,
  }));
}

export const abilityTypeLabels: Record<string, string> = {
  prime: "Prime",
  tactical: "Tactical",
  trait1: "Trait",
  trait2: "Trait",
};
