// Cosmetics data for the 2026 Marathon extraction shooter
// Source: https://marathonthegame.fandom.com/wiki/Cosmetics

import type { Rarity } from "@/data/types";
import { generateCosmeticCatalog } from "@/data/cosmetics-catalog";

export type CosmeticType =
  | "runner-skin"
  | "weapon-skin"
  | "emblem"
  | "charm"
  | "background"
  | "sticker";

export type CosmeticSource =
  | "free"
  | "store"
  | "rewards-pass"
  | "codex"
  | "ranked"
  | "event"
  | "faction"
  | "mastery"
  | "pre-order";

export interface Cosmetic {
  id: string;
  name: string;
  type: CosmeticType;
  rarity: Rarity;
  source: CosmeticSource;
  description: string;
  runnerId?: string;
  weaponId?: string;
  imageUrl?: string;
  wikiUrl: string;
}

export const cosmeticTypes: { value: CosmeticType; label: string }[] = [
  { value: "runner-skin", label: "Runner Skins" },
  { value: "weapon-skin", label: "Weapon Skins" },
  { value: "emblem", label: "Emblems" },
  { value: "charm", label: "Charms" },
  { value: "background", label: "Backgrounds" },
  { value: "sticker", label: "Stickers" },
];

export const cosmeticSources: { value: CosmeticSource; label: string }[] = [
  { value: "free", label: "Free" },
  { value: "store", label: "Store" },
  { value: "rewards-pass", label: "Rewards Pass" },
  { value: "codex", label: "Codex" },
  { value: "ranked", label: "Ranked" },
  { value: "event", label: "Event" },
  { value: "faction", label: "Faction" },
  { value: "mastery", label: "Mastery" },
  { value: "pre-order", label: "Pre-Order" },
];

export const cosmetics: Cosmetic[] = generateCosmeticCatalog();

export function getCosmeticById(id: string): Cosmetic | undefined {
  return cosmetics.find((entry) => entry.id === id);
}

export function getCosmeticsByType(type: CosmeticType): Cosmetic[] {
  return cosmetics.filter((entry) => entry.type === type);
}

export function getCosmeticsByRunner(runnerId: string): Cosmetic[] {
  return cosmetics.filter((entry) => entry.runnerId === runnerId);
}

export function getCosmeticsByWeapon(weaponId: string): Cosmetic[] {
  return cosmetics.filter((entry) => entry.weaponId === weaponId);
}

export function getCosmeticCounts(): Record<CosmeticType, number> {
  return cosmeticTypes.reduce(
    (acc, { value }) => {
      acc[value] = getCosmeticsByType(value).length;
      return acc;
    },
    {} as Record<CosmeticType, number>,
  );
}
