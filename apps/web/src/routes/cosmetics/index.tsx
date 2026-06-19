import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { DatabasePageShell } from "@/components/database/page-shell";
import { FilterBar, FilterPill } from "@/components/database/filter-bar";
import { RarityBadge } from "@/components/database/rarity-badge";
import {
  cosmeticSources,
  cosmeticTypes,
  cosmetics,
  type CosmeticSource,
  type CosmeticType,
} from "@/data/cosmetics";
import { runners } from "@/data/runners";
import { weapons } from "@/data/weapons";
import { matchesSearch, sortByRarity } from "@/lib/database";
import type { Rarity } from "@/data/types";
import { rarityOrder } from "@/data/types";
import { Badge } from "@unofficialmarathon/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";

export const Route = createFileRoute("/cosmetics/")({
  component: CosmeticsPage,
});

function CosmeticsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<CosmeticType | "all">("all");
  const [source, setSource] = useState<CosmeticSource | "all">("all");
  const [rarity, setRarity] = useState<Rarity | "all">("all");
  const [runnerId, setRunnerId] = useState<string | "all">("all");

  const filtered = useMemo(() => {
    const results = cosmetics.filter((entry) => {
      if (type !== "all" && entry.type !== type) return false;
      if (source !== "all" && entry.source !== source) return false;
      if (rarity !== "all" && entry.rarity !== rarity) return false;
      if (runnerId !== "all" && entry.runnerId !== runnerId) return false;
      return matchesSearch(search, entry.name, entry.description, entry.type, entry.source);
    });
    return sortByRarity(results);
  }, [search, type, source, rarity, runnerId]);

  const showRunnerFilter = type === "all" || type === "runner-skin";

  return (
    <DatabasePageShell
      title="Cosmetics"
      description="Skins, emblems, charms, backgrounds."
    >
      <FilterBar search={search} onSearchChange={setSearch} placeholder="Search cosmetics..." onClear={() => setSearch("")}>
        <FilterPill active={type === "all"} onClick={() => setType("all")}>All Types</FilterPill>
        {cosmeticTypes.map((entry) => (
          <FilterPill key={entry.value} active={type === entry.value} onClick={() => setType(entry.value)}>
            {entry.label}
          </FilterPill>
        ))}
      </FilterBar>

      <div className="mb-4 flex flex-wrap gap-2">
        <FilterPill active={source === "all"} onClick={() => setSource("all")}>All Sources</FilterPill>
        {cosmeticSources.map((entry) => (
          <FilterPill key={entry.value} active={source === entry.value} onClick={() => setSource(entry.value)}>
            {entry.label}
          </FilterPill>
        ))}
      </div>

      {showRunnerFilter && (
        <div className="mb-4 flex flex-wrap gap-2">
          <FilterPill active={runnerId === "all"} onClick={() => setRunnerId("all")}>All Runners</FilterPill>
          {runners.map((runner) => (
            <FilterPill key={runner.id} active={runnerId === runner.id} onClick={() => setRunnerId(runner.id)}>
              {runner.name}
            </FilterPill>
          ))}
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        <FilterPill active={rarity === "all"} onClick={() => setRarity("all")}>All Rarities</FilterPill>
        {rarityOrder.map((entry) => (
          <FilterPill key={entry} active={rarity === entry} onClick={() => setRarity(entry)}>
            {entry}
          </FilterPill>
        ))}
      </div>

      <p className="mb-4 text-xs text-muted-foreground">{filtered.length} results</p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((cosmetic) => {
          const runner = cosmetic.runnerId ? runners.find((r) => r.id === cosmetic.runnerId) : undefined;
          const weapon = cosmetic.weaponId ? weapons.find((w) => w.id === cosmetic.weaponId) : undefined;
          return (
            <Card key={cosmetic.id} className="rounded-none border-border/50 bg-background/80">
              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-mono text-base uppercase">{cosmetic.name}</CardTitle>
                  <RarityBadge rarity={cosmetic.rarity} />
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="rounded-none font-mono text-[10px] uppercase">
                    {cosmetic.type.replace("-", " ")}
                  </Badge>
                  <Badge variant="secondary" className="rounded-none font-mono text-[10px] uppercase">
                    {cosmetic.source.replace("-", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-mono text-xs text-muted-foreground">{cosmetic.description}</p>
                {runner && (
                  <p className="font-mono text-[10px] uppercase tracking-wider text-primary">Runner: {runner.name}</p>
                )}
                {weapon && (
                  <p className="font-mono text-[10px] uppercase tracking-wider text-primary">Weapon: {weapon.name}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DatabasePageShell>
  );
}
