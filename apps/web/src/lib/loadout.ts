import type { ImplantSlot } from "@/data/types";

export interface LoadoutState {
  runnerId?: string;
  primaryWeaponId?: string;
  secondaryWeaponId?: string;
  coreId?: string;
  secondaryCoreId?: string;
  implants: Partial<Record<ImplantSlot, string>>;
  modIds: string[];
  backpackId?: string;
  equipmentId?: string;
  label?: string;
}

export const emptyLoadout = (): LoadoutState => ({
  implants: {},
  modIds: [],
});

export function encodeLoadout(loadout: LoadoutState): string {
  return btoa(JSON.stringify(loadout));
}

export function decodeLoadout(code: string): LoadoutState | null {
  try {
    const parsed = JSON.parse(atob(code)) as LoadoutState;
    if (!parsed || typeof parsed !== "object") return null;
    return normalizeLoadout(parsed);
  } catch {
    return null;
  }
}

export function normalizeLoadout(parsed: LoadoutState): LoadoutState {
  return {
    implants: parsed.implants ?? {},
    modIds: parsed.modIds ?? [],
    runnerId: parsed.runnerId,
    primaryWeaponId: parsed.primaryWeaponId,
    secondaryWeaponId: parsed.secondaryWeaponId,
    coreId: parsed.coreId,
    secondaryCoreId: parsed.secondaryCoreId,
    backpackId: parsed.backpackId,
    equipmentId: parsed.equipmentId,
    label: parsed.label,
  };
}

export function generateLoadoutId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 10);
  }
  return Math.random().toString(36).slice(2, 12);
}

export function buildLoadoutShareUrl(
  loadout: LoadoutState,
  origin = "",
  options?: { cloudId?: string; inlineCode?: string },
): string {
  if (options?.cloudId) {
    return `${origin}/loadout?id=${encodeURIComponent(options.cloudId)}`;
  }
  const code = options?.inlineCode ?? encodeLoadout(loadout);
  return `${origin}/loadout?code=${encodeURIComponent(code)}`;
}

export function isCloudLoadoutId(value: string): boolean {
  return /^[a-z0-9]{8,12}$/i.test(value);
}
