import type { Rarity } from "@/data/types";
import { rarityOrder } from "@/data/types";

export function normalizeSearch(value: string): string {
  return value.trim().toLowerCase();
}

export function matchesSearch(query: string, ...fields: Array<string | undefined>): boolean {
  if (!query) return true;
  const needle = normalizeSearch(query);
  return fields.some((field) => field && normalizeSearch(field).includes(needle));
}

export function sortByRarity<T extends { rarity: Rarity }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity),
  );
}

export function sortByName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

export function parseNumericStat(value: string): number | null {
  if (!value) return null;
  const parsed = Number.parseFloat(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}
