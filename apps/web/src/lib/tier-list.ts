export type Tier = "S" | "A" | "B" | "C" | "D" | "F";
export type TierListType = "weapons" | "runners" | "cosmetics";
export type TierListState = Record<Tier, string[]>;

export const tiers: Tier[] = ["S", "A", "B", "C", "D", "F"];

export function emptyTierList(): TierListState {
  return { S: [], A: [], B: [], C: [], D: [], F: [] };
}

export function encodeTierList(type: TierListType, payload: TierListState): string {
  return btoa(JSON.stringify({ type, payload }));
}

export function decodeTierList(encoded: string): { type: TierListType; payload: TierListState } | null {
  try {
    const parsed = JSON.parse(atob(encoded)) as { type?: TierListType; payload?: TierListState };
    if (!parsed?.type || !parsed?.payload) return null;
    return {
      type: parsed.type,
      payload: normalizeTierList(parsed.payload),
    };
  } catch {
    return null;
  }
}

export function normalizeTierList(payload: TierListState): TierListState {
  const next = emptyTierList();
  for (const tier of tiers) {
    next[tier] = Array.isArray(payload[tier]) ? payload[tier] : [];
  }
  return next;
}

export function moveTierItem(state: TierListState, id: string, tier: Tier): TierListState {
  const next = emptyTierList();
  for (const entry of tiers) {
    next[entry] = state[entry].filter((itemId) => itemId !== id);
  }
  next[tier] = [...next[tier], id];
  return next;
}

export function generateTierListId(): string {
  return `tier-${Math.random().toString(36).slice(2, 10)}`;
}

export function buildTierListShareUrl(
  type: TierListType,
  payload: TierListState,
  origin: string,
  options?: { cloudId?: string; label?: string },
): string {
  if (options?.cloudId) {
    const params = new URLSearchParams({ id: options.cloudId, type });
    if (options.label) params.set("label", options.label);
    return `${origin}/tier-lists?${params.toString()}`;
  }
  return `${origin}/tier-lists?share=${encodeURIComponent(encodeTierList(type, payload))}`;
}
