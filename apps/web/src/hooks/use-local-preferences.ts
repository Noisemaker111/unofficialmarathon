import { useCallback, useSyncExternalStore } from "react";

/**
 * localStorage-backed preferences with React reactivity.
 *
 * Uses `useSyncExternalStore` for tear-free reads and subscribe-on-write.
 * All values are JSON-serialized, so any serializable type works.
 *
 * Usage:
 *   const [runner, setRunner] = useLocalPreference("preferredRunner", "Assassin");
 *   const [filters, setFilters] = useLocalPreference("lfgFilters", defaultFilters);
 */

const STORAGE_PREFIX = "marathon-pref-";

function getKey(key: string): string {
  return `${STORAGE_PREFIX}${key}`;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(getKey(key));
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function getServerSnapshot<T>(fallback: T): T {
  return fallback;
}

/**
 * Hook for reading and writing a localStorage-backed preference.
 * Falls back to `defaultValue` if nothing is stored.
 * Re-renders when the value changes (including from other tabs via `storage` event).
 */
export function useLocalPreference<T>(
  key: string,
  defaultValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const fullKey = getKey(key);

  const value = useSyncExternalStore(
    subscribe,
    () => getSnapshot(key, defaultValue),
    () => getServerSnapshot(defaultValue),
  );

  const setValue = useCallback(
    (updater: T | ((prev: T) => T)) => {
      const current = getSnapshot(key, defaultValue);
      const next = typeof updater === "function" ? (updater as (prev: T) => T)(current) : updater;
      localStorage.setItem(fullKey, JSON.stringify(next));
      // Dispatch storage event so other hooks in same tab update
      window.dispatchEvent(new StorageEvent("storage", { key: fullKey }));
    },
    [fullKey, key, defaultValue],
  );

  return [value, setValue];
}

/**
 * Non-hook utility for reading a preference outside React.
 * Returns `undefined` if nothing is stored (no fallback applied).
 */
export function readLocalPreference<T>(key: string): T | undefined {
  const raw = localStorage.getItem(getKey(key));
  if (raw === null) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

/**
 * Non-hook utility for writing a preference outside React.
 */
export function writeLocalPreference<T>(key: string, value: T): void {
  const fullKey = getKey(key);
  localStorage.setItem(fullKey, JSON.stringify(value));
  window.dispatchEvent(new StorageEvent("storage", { key: fullKey }));
}