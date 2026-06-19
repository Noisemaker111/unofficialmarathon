// Shared game data types for Marathon (2026)

export type Rarity =
  | "standard"
  | "enhanced"
  | "deluxe"
  | "superior"
  | "prestige"
  | "contraband";

export type ImplantSlot = "head" | "torso" | "legs" | "shield";

export type ModSlot =
  | "barrel"
  | "chip"
  | "generator"
  | "grip"
  | "magazine"
  | "optic"
  | "shield";

export type ItemType =
  | "ammo"
  | "backpack"
  | "consumable"
  | "equipment"
  | "key"
  | "salvage"
  | "valuable"
  | "contract"
  | "sponsored-kit"
  | "currency"
  | "priority";

export const rarityOrder: Rarity[] = [
  "standard",
  "enhanced",
  "deluxe",
  "superior",
  "prestige",
  "contraband",
];

export const rarityLabels: Record<Rarity, string> = {
  standard: "Standard",
  enhanced: "Enhanced",
  deluxe: "Deluxe",
  superior: "Superior",
  prestige: "Prestige",
  contraband: "Contraband",
};

export const rarityColors: Record<Rarity, string> = {
  standard: "text-muted-foreground border-muted-foreground/40 bg-muted/20",
  enhanced: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  deluxe: "text-sky-400 border-sky-400/40 bg-sky-400/10",
  superior: "text-violet-400 border-violet-400/40 bg-violet-400/10",
  prestige: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  contraband: "text-rose-400 border-rose-400/40 bg-rose-400/10",
};

export const statAbbreviations: Record<string, string> = {
  AGI: "Agility",
  FW: "Firewall",
  HW: "Hardware",
  HEAT: "Heat Capacity",
  LOOT: "Loot Speed",
  MELEE: "Melee Damage",
  PING: "Ping Duration",
  PRIME: "Prime Recovery",
  TAC: "Tactical Recovery",
  REVIVE: "Revive Speed",
  REPAIR: "Self-Repair Speed",
  SIPHON: "Finisher Siphon",
  FALL: "Fall Resistance",
};
