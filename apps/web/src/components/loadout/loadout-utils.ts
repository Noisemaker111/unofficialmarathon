import type { Rarity } from "@/data/types";
import { rarityColors } from "@/data/types";
import type { Runner } from "@/data/runners";

/** Upgrade wiki thumbnail URLs to a larger portrait size. */
export function getRunnerPortraitUrl(url: string, size: 400 | 800 | 1200 = 800): string {
  if (!url) return "";
  return url.replace(/\/\d+px-/g, `/${size}px-`).replace(/\d+px-/g, `${size}px-`);
}

export function rarityBorderClass(rarity?: Rarity): string {
  if (!rarity) return "border-border/50";
  const color = rarityColors[rarity];
  const border = color.split(" ").find((c) => c.startsWith("border-"));
  return border ?? "border-border/50";
}

export function rarityGlowClass(rarity?: Rarity): string {
  switch (rarity) {
    case "prestige":
      return "shadow-[0_0_20px_oklch(0.82_0.15_75/35%)]";
    case "superior":
      return "shadow-[0_0_18px_oklch(0.65_0.2_300/30%)]";
    case "deluxe":
      return "shadow-[0_0_16px_oklch(0.7_0.15_230/28%)]";
    case "enhanced":
      return "shadow-[0_0_14px_oklch(0.72_0.17_155/25%)]";
    case "contraband":
      return "shadow-[0_0_20px_oklch(0.65_0.22_15/35%)]";
    default:
      return "";
  }
}

/** Key stats shown on the in-game runner card HUD. */
export const runnerHudStats = [
  { key: "Heat Capacity", label: "Heat", short: "HEAT" },
  { key: "Agility", label: "Agil", short: "AGIL" },
  { key: "Loot Speed", label: "Loot", short: "LOOT" },
  { key: "Melee Damage", label: "Mele", short: "MELE" },
  { key: "Prime Recovery", label: "Prim", short: "PRIM" },
  { key: "Tactical Recovery", label: "Tact", short: "TACT" },
] as const;

export function getRunnerHudStats(runner?: Runner) {
  if (!runner) return [];
  return runnerHudStats.map((stat) => ({
    ...stat,
    value: runner.defaultStats[stat.key] ?? 0,
  }));
}

export const abilityTypeLabels: Record<string, string> = {
  prime: "Prime",
  tactical: "Tactical",
  trait1: "Trait",
  trait2: "Trait",
};
