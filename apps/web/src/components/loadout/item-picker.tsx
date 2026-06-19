import { useMemo, useState, type ReactNode } from "react";
import { Search, X } from "lucide-react";

import { RarityBadge } from "@/components/database/rarity-badge";
import { rarityBarClass } from "@/components/loadout/loadout-utils";
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
  vaultStyle?: boolean;
}

export function ItemPicker({
  title,
  items,
  selectedId,
  selectedIds = [],
  multi = false,
  onSelect,
  onClose,
  vaultStyle = false,
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
    <div
      className={cn(
        "flex h-full flex-col",
        vaultStyle ? "bg-black" : "border border-primary/30 bg-background/98 backdrop-blur-md marathon-hud-frame",
      )}
    >
      <div className={cn("flex items-center justify-between px-4 py-3", vaultStyle ? "border-b border-white/10" : "border-b border-border/40")}>
        <div>
          <p className={cn("font-mono text-[10px] uppercase tracking-widest", vaultStyle ? "text-white/40" : "text-primary")}>
            {vaultStyle ? "Vault" : "Configure"}
          </p>
          <h3 className="font-bold uppercase tracking-wider">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("font-mono text-[10px] tabular-nums", vaultStyle ? "text-white/35" : "text-muted-foreground")}>
            {filtered.length}/{items.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "p-1.5 transition-colors",
              vaultStyle
                ? "border border-white/15 text-white/50 hover:border-white/30 hover:text-white"
                : "border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary",
            )}
            aria-label="Close picker"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className={cn("space-y-2 p-3", vaultStyle ? "border-b border-white/10" : "border-b border-border/40")}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search..."
            className={cn(
              "rounded-none pl-9 font-mono text-sm",
              vaultStyle ? "border-white/15 bg-black text-white" : "border-border/50 bg-black/40",
            )}
          />
        </div>

        {availableRarities.length > 1 ? (
          <div className="flex flex-wrap gap-1">
            <FilterChip active={rarityFilter === "all"} onClick={() => setRarityFilter("all")} vaultStyle={vaultStyle}>
              All
            </FilterChip>
            {availableRarities.map((rarity) => (
              <FilterChip
                key={rarity}
                active={rarityFilter === rarity}
                onClick={() => setRarityFilter(rarity)}
                vaultStyle={vaultStyle}
              >
                {rarityLabels[rarity]}
              </FilterChip>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {filtered.map((item) => {
            const isSelected = multi ? selectedIds.includes(item.id) : selectedId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={cn(
                  "flex flex-col overflow-hidden border text-left transition-all",
                  vaultStyle
                    ? cn(
                        "border-white/10 bg-black/80",
                        isSelected && "border-white/40 ring-1 ring-white/20",
                        !isSelected && "hover:border-white/25",
                      )
                    : cn(
                        "bg-black/45 marathon-hud-frame",
                        isSelected ? "border-primary bg-primary/10" : "border-border/40 hover:border-primary/40",
                      ),
                )}
              >
                {item.rarity ? (
                  <div className={cn("h-1 w-full", rarityBarClass(item.rarity))} />
                ) : (
                  <div className="h-1 w-full bg-white/10" />
                )}
                <div className="flex flex-1 flex-col p-1.5">
                  <div className="mb-1.5 flex h-14 items-center justify-center bg-white/[0.03]">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="max-h-12 max-w-full object-contain" />
                    ) : (
                      <div className="text-white/50">{item.icon}</div>
                    )}
                  </div>
                  <p className="line-clamp-2 font-mono text-[8px] font-bold uppercase leading-tight">{item.name}</p>
                  {!vaultStyle && item.rarity ? <RarityBadge rarity={item.rarity} className="mt-1 scale-[0.8]" /> : null}
                </div>
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <p className="py-8 text-center font-mono text-xs uppercase text-white/25">No matches</p>
        )}
      </div>

      {multi ? (
        <div className={cn("px-4 py-2", vaultStyle ? "border-t border-white/10" : "border-t border-border/40")}>
          <p className="font-mono text-[9px] uppercase tracking-wider text-white/35">
            {selectedIds.length} equipped — tap to toggle
          </p>
        </div>
      ) : null}
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
  vaultStyle,
}: {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
  vaultStyle?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider transition-colors",
        vaultStyle
          ? active
            ? "border-white bg-white text-black"
            : "border-white/20 text-white/40 hover:border-white/35"
          : active
            ? "border-primary bg-primary/10 text-primary"
            : "border-border/40 text-muted-foreground hover:border-primary/40",
      )}
    >
      {children}
    </button>
  );
}
