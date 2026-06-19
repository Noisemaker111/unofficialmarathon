import { equipmentAssets } from "@/data/equipment-assets";
import { itemAssets } from "@/data/item-assets";
import { modAssets } from "@/data/mod-assets";
import type { ImplantSlot } from "@/data/types";

/** Manual fallbacks when MarathonDB slug differs from our item id. */
const itemAliases: Record<string, string> = {
  "8xs-med-pack": "8xs-med",
  "8xs-base-pack": "8xs-base",
  "16xs-ammo-backpack": "16xs-ammo",
  "24xs-base-pack": "24xs-base",
  "24xs-sneak-pack-plus": "24xs-sneak-plus",
  "ammo-crate": "std-ammo",
  "enhanced-ammo-crate": "enh-ammo",
  "chem-grenade": "chem",
  "heat-grenade": "heat",
  "flechette-grenade": "flechette",
  "trap-pack": "trap-pack",
  "advanced-patch-kit": "patch-kit",
  "advanced-shield-charge": "adv-shield-charge",
  "advanced-mechanics-kit": "adv-mechanics",
  "advanced-os-debug": "adv-os-debug",
  "os-reboot": "os-debug",
  "shield-booster": "shield-charge",
  "medium-med-kit": "patch-kit",
  "large-med-kit": "patch-kit",
  hec: "energy-amp",
  "frag-grenade": "frag",
  "emp-grenade": "emp",
  "smoke-grenade": "smoke-grenade",
  "16xs-base-pack": "16xs-base",
  "24xs-med-pack-plus": "24xs-med-plus",
  "patch-kit": "patch-kit",
  "panacea-kit": "panacea-kit",
  "shield-charge": "shield-charge",
  "self-revive": "self-revive",
  "energy-amp": "energy-amp",
  "cardio-kick": "cardio-kick",
  "mechanics-kit": "mechanics-kit",
  mips: "mips-rounds",
  "volt-cell": "volt-cells",
  "bubble-shield": "bubble-shield",
  "proximity-sensor": "proximity",
  "claymore-mine": "claymore",
};

const implantSlotIcons: Record<ImplantSlot, string> = {
  head: "/assets/implants/head.png",
  torso: "/assets/implants/torso.png",
  legs: "/assets/implants/legs.png",
  shield: "/assets/implants/shield.png",
};

const coreRunnerIcons: Record<string, string> = {
  assassin: "/assets/cores/assassin-96x96.png",
  destroyer: "/assets/cores/destroyer-96x96.png",
  recon: "/assets/cores/recon-96x96.png",
  thief: "/assets/cores/thief-96x96.png",
  triage: "/assets/cores/triage-96x96.png",
  vandal: "/assets/cores/vandal-96x96.png",
  universal: "/assets/cores/core-72x72.png",
};

/** Vault-style ammo icons for backpack grid decoration. */
export const vaultAmmoIcons = [
  "/assets/items/light-rounds.webp",
  "/assets/items/heavy-rounds.webp",
  "/assets/items/mips-rounds.webp",
  "/assets/items/volt-battery.webp",
];

function resolveFromMaps(id: string, maps: Record<string, string>[]): string | undefined {
  for (const map of maps) {
    if (map[id]) return map[id];
  }
  const alias = itemAliases[id];
  if (alias && equipmentAssets[alias]) return equipmentAssets[alias];
  if (alias && itemAssets[alias]) return itemAssets[alias];
  return undefined;
}

export function getItemImageUrl(id: string): string | undefined {
  return resolveFromMaps(id, [itemAssets, equipmentAssets]);
}

export function getModImageUrl(id: string): string | undefined {
  return modAssets[id];
}

export function getImplantSlotIcon(slot: ImplantSlot): string {
  return implantSlotIcons[slot];
}

export function getCoreImageUrl(runnerId?: string): string {
  if (runnerId && coreRunnerIcons[runnerId]) return coreRunnerIcons[runnerId];
  return coreRunnerIcons.universal;
}
