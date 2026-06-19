// Implant data for the 2026 Marathon extraction shooter
// Source: https://marathonthegame.fandom.com/wiki/Implants

import type { ImplantSlot } from "@/data/types";
import { generateImplantCatalog } from "@/data/implant-families";

export interface Implant {
  id: string;
  name: string;
  slot: ImplantSlot;
  rarity: import("@/data/types").Rarity;
  price: number;
  description: string;
  statModifiers: string[];
  unique?: boolean;
  family?: string;
  version?: number;
  wikiUrl: string;
}

export const implantSlots: { value: ImplantSlot; label: string }[] = [
  { value: "head", label: "Head" },
  { value: "torso", label: "Torso" },
  { value: "legs", label: "Legs" },
  { value: "shield", label: "Shield" },
];

export const implants: Implant[] = generateImplantCatalog();

export function getImplantById(id: string): Implant | undefined {
  return implants.find((implant) => implant.id === id);
}

export function getImplantsBySlot(slot: ImplantSlot): Implant[] {
  return implants.filter((implant) => implant.slot === slot);
}

export function getImplantFamily(family: string): Implant[] {
  return implants
    .filter((implant) => implant.family === family)
    .sort((a, b) => (a.version ?? 0) - (b.version ?? 0));
}
