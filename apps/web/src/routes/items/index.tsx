import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useMemo, useState } from "react";

import { DatabasePageShell } from "@/components/database/page-shell";
import { FilterBar, FilterPill } from "@/components/database/filter-bar";
import { RarityBadge } from "@/components/database/rarity-badge";
import { items, itemTypes } from "@/data/items";
import { matchesSearch } from "@/lib/database";
import type { ItemType } from "@/data/types";
import { Badge } from "@unofficialmarathon/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";

export const Route = createFileRoute("/items/")({
  component: ItemsPage,
});

function ItemsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<ItemType | "all">("all");

  const filtered = useMemo(() => {
    return items.filter((entry) => {
      if (type !== "all" && entry.type !== type) return false;
      return matchesSearch(search, entry.name, entry.description, entry.zone, entry.location, entry.unlocks);
    });
  }, [search, type]);

  return (
    <DatabasePageShell
      label="TC4-SYS://ITEMS.DAT"
      title="Items"
      description="Consumables, keys, salvage, valuables, backpacks, and extraction loot across Tau Ceti IV."
    >
      <FilterBar search={search} onSearchChange={setSearch} placeholder="Search items..." onClear={() => setSearch("")}>
        <FilterPill active={type === "all"} onClick={() => setType("all")}>All Types</FilterPill>
        {itemTypes.map((entry) => (
          <FilterPill key={entry.value} active={type === entry.value} onClick={() => setType(entry.value)}>
            {entry.label}
          </FilterPill>
        ))}
      </FilterBar>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((entry) => (
          <Card key={entry.id} className="rounded-none border-border/50 bg-background/80">
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="font-mono text-base uppercase">{entry.name}</CardTitle>
                {entry.rarity && <RarityBadge rarity={entry.rarity} />}
              </div>
              <Badge variant="outline" className="w-fit rounded-none font-mono text-[10px] uppercase">{entry.type}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-mono text-xs text-muted-foreground">{entry.description}</p>
              {entry.zone && (
                <div className="flex items-start gap-2 font-mono text-[10px] text-primary">
                  <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                  <span>{entry.zone}{entry.location ? ` — ${entry.location}` : ""}</span>
                </div>
              )}
              {entry.unlocks && (
                <p className="font-mono text-[10px] text-muted-foreground">Unlocks: {entry.unlocks}</p>
              )}
              {entry.value !== undefined && (
                <p className="font-mono text-[10px] text-primary">{entry.value.toLocaleString()} credits</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </DatabasePageShell>
  );
}
