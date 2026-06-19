import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { RarityBadge } from "@/components/database/rarity-badge";
import type { PickerItem } from "@/components/loadout/types";
import { matchesSearch } from "@/lib/database";
import type { Rarity } from "@/data/types";
import { rarityLabels, rarityOrder } from "@/data/types";
import { Input } from "@unofficialmarathon/ui/components/input";
import { cn } from "@unofficialmarathon/ui/lib/utils";

interface ItemPickerProps {
  title: string;
  items: PickerItem[];
  selectedId?: string;
  selectedIds?: string[];
  multi?: boolean;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export function ItemPicker({
  title,
  items,
  selectedId,
  selectedIds = [],
  multi = false,
  onSelect,
  onClose,
}: ItemPickerProps) {
  const [search, setSearch] = useState("");
  const [rarityFilter, setRarityFilter] = useState<Rarity | "all">("all");

  const availableRarities = useMemo(() => {
    const set = new Set<Rarity>();
    for (const item of items) {
      if (item.rarity) set.add(item.rarity);
    }
    return rarityOrder.filter((r) => set.has(r));
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (rarityFilter !== "all" && item.rarity !== rarityFilter) return false;
      return matchesSearch(search, item.name, item.subtitle);
    });
  }, [items, search, rarityFilter]);

  return (
    <div className="flex h-full max-h-[85vh] flex-col border border-primary/30 bg-background/98 backdrop-blur-md marathon-hud-frame xl:max-h-none">
      <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary">Configure</p>
          <h3 className="font-bold uppercase tracking-wider text-foreground">{title}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="border border-border/50 p-1.5 text-muted-foreground hover:border-primary/40 hover:text-primary"
          aria-label="Close picker"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2 border-b border-border/40 p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search gear..."
            className="rounded-none border-border/50 bg-black/40 pl-9 font-mono text-sm"
          />
        </div>

        {availableRarities.length > 1 ? (
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setRarityFilter("all")}
              className={cn(
                "border px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider transition-colors",
                rarityFilter === "all"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/40 text-muted-foreground hover:border-primary/40",
              )}
            >
              All
            </button>
            {availableRarities.map((rarity) => (
              <button
                key={rarity}
                type="button"
                onClick={() => setRarityFilter(rarity)}
                className={cn(
                  "border px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider transition-colors",
                  rarityFilter === rarity
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/40 text-muted-foreground hover:border-primary/40",
                )}
              >
                {rarityLabels[rarity]}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {filtered.map((item) => {
            const isSelected = multi ? selectedIds.includes(item.id) : selectedId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={cn(
                  "flex flex-col border bg-black/45 p-2 text-left transition-all marathon-hud-frame",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-[0_0_16px_oklch(0.88_0.23_120/12%)]"
                    : "border-border/40 hover:border-primary/40 hover:bg-primary/5",
                )}
              >
                <div className="mb-2 flex h-[72px] items-center justify-center border border-border/20 bg-black/35">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="max-h-16 max-w-full object-contain" />
                  ) : (
                    <div className="text-primary opacity-80">{item.icon}</div>
                  )}
                </div>
                <p className="line-clamp-2 min-h-[2rem] font-mono text-[10px] font-bold uppercase leading-tight">
                  {item.name}
                </p>
                {item.subtitle ? (
                  <p className="mt-1 line-clamp-1 font-mono text-[8px] uppercase text-muted-foreground">{item.subtitle}</p>
                ) : null}
                {item.rarity ? <RarityBadge rarity={item.rarity} className="mt-2 scale-90" /> : null}
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <p className="py-8 text-center font-mono text-xs uppercase text-muted-foreground">No matches</p>
        )}
      </div>

      {multi ? (
        <div className="border-t border-border/40 px-4 py-2">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            {selectedIds.length} mod{selectedIds.length === 1 ? "" : "s"} equipped — tap to toggle
          </p>
        </div>
      ) : null}
    </div>
  );
}
