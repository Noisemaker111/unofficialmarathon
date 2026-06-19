import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { DatabasePageShell } from "@/components/database/page-shell";
import { FilterBar, FilterPill } from "@/components/database/filter-bar";
import { RarityBadge } from "@/components/database/rarity-badge";
import { cores } from "@/data/cores";
import { runners } from "@/data/runners";
import { matchesSearch, sortByRarity } from "@/lib/database";
import type { Rarity } from "@/data/types";
import { rarityOrder } from "@/data/types";
import { Badge } from "@unofficialmarathon/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";

export const Route = createFileRoute("/cores/")({
  component: CoresPage,
});

function CoresPage() {
  const [search, setSearch] = useState("");
  const [runnerId, setRunnerId] = useState<string | "all">("all");
  const [rarity, setRarity] = useState<Rarity | "all">("all");

  const filtered = useMemo(() => {
    const results = cores.filter((core) => {
      if (runnerId !== "all" && core.runnerId !== runnerId) return false;
      if (rarity !== "all" && core.rarity !== rarity) return false;
      return matchesSearch(search, core.name, core.description);
    });
    return sortByRarity(results);
  }, [search, runnerId, rarity]);

  return (
    <DatabasePageShell
      title="Cores"
      description="Runner-specific ability upgrades."
    >
      <FilterBar search={search} onSearchChange={setSearch} placeholder="Search cores..." onClear={() => setSearch("")}>
        <FilterPill active={runnerId === "all"} onClick={() => setRunnerId("all")}>All Runners</FilterPill>
        {runners.map((runner) => (
          <FilterPill key={runner.id} active={runnerId === runner.id} onClick={() => setRunnerId(runner.id)}>
            {runner.name}
          </FilterPill>
        ))}
      </FilterBar>

      <div className="mb-6 flex flex-wrap gap-2">
        <FilterPill active={rarity === "all"} onClick={() => setRarity("all")}>All Rarities</FilterPill>
        {rarityOrder.filter((r) => r !== "contraband").map((entry) => (
          <FilterPill key={entry} active={rarity === entry} onClick={() => setRarity(entry)}>
            {entry}
          </FilterPill>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((core) => {
          const runner = runners.find((entry) => entry.id === core.runnerId);
          return (
            <Card key={core.id} className="rounded-none border-border/50 bg-background/80">
              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-mono text-base uppercase">{core.name}</CardTitle>
                  <RarityBadge rarity={core.rarity} />
                </div>
                <Badge variant="outline" className="w-fit rounded-none font-mono text-[10px] uppercase">
                  {runner?.name ?? core.runnerId}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-mono text-xs text-muted-foreground">{core.description}</p>
                <p className="font-mono text-[10px] text-primary">{core.price.toLocaleString()} credits</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DatabasePageShell>
  );
}
