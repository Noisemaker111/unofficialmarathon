import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "marathon-weapon-compare";
const MAX_COMPARE = 4;

export function useWeaponCompare() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        if (Array.isArray(parsed)) setSelectedIds(parsed.slice(0, MAX_COMPARE));
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
  }, [selectedIds]);

  const toggle = useCallback((weaponId: string) => {
    setSelectedIds((current) => {
      if (current.includes(weaponId)) {
        return current.filter((id) => id !== weaponId);
      }
      if (current.length >= MAX_COMPARE) return current;
      return [...current, weaponId];
    });
  }, []);

  const remove = useCallback((weaponId: string) => {
    setSelectedIds((current) => current.filter((id) => id !== weaponId));
  }, []);

  const clear = useCallback(() => setSelectedIds([]), []);

  const isSelected = useCallback(
    (weaponId: string) => selectedIds.includes(weaponId),
    [selectedIds],
  );

  return {
    selectedIds,
    toggle,
    remove,
    clear,
    isSelected,
    isFull: selectedIds.length >= MAX_COMPARE,
    max: MAX_COMPARE,
  };
}
