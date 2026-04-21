import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Day-by-day history stored in IndexedDB.
 *
 * Each entry is keyed by date (YYYY-MM-DD) and stores a list of
 * timestamped items. Used for remembering previous inputs, filter
 * selections, searches, etc.
 *
 * The DB is lazily created on first use and stays open for the session.
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export interface HistoryEntry<T = string> {
  /** ISO timestamp when this entry was recorded */
  timestamp: string;
  /** The stored value */
  data: T;
}

export interface DayRecord<T = string> {
  /** Date key in YYYY-MM-DD format */
  date: string;
  /** Entries recorded on this day, newest first */
  entries: HistoryEntry<T>[];
}

// ─── IndexedDB Helpers ───────────────────────────────────────────────────────

const DB_NAME = "marathon-history";
const DB_VERSION = 1;
const STORE_NAME = "daily-history";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "date" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getDayRecord<T>(date: string): Promise<DayRecord<T> | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(date);
    request.onsuccess = () => resolve(request.result as DayRecord<T> | undefined);
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
  });
}

async function putDayRecord<T>(record: DayRecord<T>): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put(record);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

async function getAllDayKeys(): Promise<string[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAllKeys();
    request.onsuccess = () => resolve(request.result as string[]);
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
  });
}

// ─── Date Utilities ──────────────────────────────────────────────────────────

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

// ─── React Hook ──────────────────────────────────────────────────────────────

/**
 * Hook for storing and retrieving day-by-day history.
 *
 * @param key - A namespace for this history (e.g., "lfg-filters", "search-queries")
 * @param maxEntriesPerDay - Maximum entries to keep per day (default 50, older entries pruned)
 *
 * @returns Object with:
 *   - today: entries for today (newest first)
 *   - recentDays: entries from the last N days
 *   - record: function to add a new entry to today's record
 *   - clearDay: function to clear entries for a specific date
 *
 * The key is stored as `key:YYYY-MM-DD` so different namespaces don't collide.
 */
export function useLocalHistory<T = string>(
  key: string,
  maxEntriesPerDay: number = 50,
) {
  const [todayEntries, setTodayEntries] = useState<HistoryEntry<T>[]>([]);
  const [loading, setLoading] = useState(true);
  const dbRef = useRef<IDBDatabase | null>(null);
  const todayDate = todayKey();
  // Composite key: namespace + date
  const compositeKey = `${key}:${todayDate}`;

  // Load today's entries on mount
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const record = await getDayRecord<T>(compositeKey);
        if (!cancelled) {
          setTodayEntries(record?.entries ?? []);
        }
      } catch {
        // IndexedDB not available (SSR, private browsing) — just use empty
        if (!cancelled) setTodayEntries([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => { cancelled = true; };
  }, [compositeKey]);

  const record = useCallback(
    async (data: T) => {
      const entry: HistoryEntry<T> = {
        timestamp: new Date().toISOString(),
        data,
      };

      try {
        const existing = await getDayRecord<T>(compositeKey);
        const entries = [entry, ...(existing?.entries ?? [])].slice(0, maxEntriesPerDay);
        const newRecord: DayRecord<T> = { date: compositeKey, entries };
        await putDayRecord(newRecord);
        setTodayEntries(entries);
      } catch {
        // Fail silently — history is a nice-to-have, not critical
      }
    },
    [compositeKey, maxEntriesPerDay],
  );

  const clearDay = useCallback(
    async (date?: string) => {
      const targetKey = date ? `${key}:${date}` : compositeKey;
      try {
        await putDayRecord({ date: targetKey, entries: [] });
        if (targetKey === compositeKey) {
          setTodayEntries([]);
        }
      } catch {
        // Fail silently
      }
    },
    [key, compositeKey],
  );

  /**
   * Get entries for specific past days.
   * Returns records for the last `days` days, newest first.
   */
  const getRecentDays = useCallback(
    async (days: number = 7): Promise<DayRecord<T>[]> => {
      const allKeys = await getAllDayKeys();
      const prefix = `${key}:`;
      const matchingKeys = allKeys
        .filter((k) => k.startsWith(prefix))
        .sort()
        .reverse()
        .slice(0, days);

      const records: DayRecord<T>[] = [];
      for (const k of matchingKeys) {
        const rec = await getDayRecord<T>(k);
        if (rec) records.push(rec);
      }
      return records;
    },
    [key],
  );

  return { today: todayEntries, loading, record, clearDay, getRecentDays } as const;
}