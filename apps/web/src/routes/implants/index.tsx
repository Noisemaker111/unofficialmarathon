import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { DatabasePageShell } from "@/components/database/page-shell";
import { FilterBar, FilterPill } from "@/components/database/filter-bar";
import { RarityBadge } from "@/components/database/rarity-badge";
import { implants, implantSlots, getImplantFamily } from "@/data/implants";
import { matchesSearch, sortByRarity } from "@/lib/database";
import type { ImplantSlot, Rarity } from "@/data/types";
import { rarityOrder } from "@/data/types";
import { Badge } from "@unofficialmarathon/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";

export const Route = createFileRoute("/implants/")({
  component: ImplantsPage,
});

function ImplantsPage() {
  const [search, setSearch] = useState("");
  const [slot, setSlot] = useState<ImplantSlot | "all">("all");
  const [rarity, setRarity] = useState<Rarity | "all">("all");

  const filtered = useMemo(() => {
    const results = implants.filter((implant) => {
      if (slot !== "all" && implant.slot !== slot) return false;
      if (rarity !== "all" && implant.rarity !== rarity) return false;
      return matchesSearch(
        search,
        implant.name,
        implant.description,
        implant.family,
        ...implant.statModifiers,
      );
    });
    return sortByRarity(results);
  }, [search, slot, rarity]);

  return (
    <DatabasePageShell
      label="TC4-SYS://IMPLANTS.DAT"
      title="Implants"
      description="Universal upgrades for Head, Torso, Legs, and Shield slots. Each implant modifies stats and adds unique traits."
    >
      <FilterBar search={search} onSearchChange={setSearch} placeholder="Search implants..." onClear={() => setSearch("")}>
        <FilterPill active={slot === "all"} onClick={() => setSlot("all")}>All Slots</FilterPill>
        {implantSlots.map((entry) => (
          <FilterPill key={entry.value} active={slot === entry.value} onClick={() => setSlot(entry.value)}>
            {entry.label}
          </FilterPill>
        ))}
      </FilterBar>

      <div className="mb-6 flex flex-wrap gap-2">
        <FilterPill active={rarity === "all"} onClick={() => setRarity("all")}>All Rarities</FilterPill>
        {rarityOrder.map((entry) => (
          <FilterPill key={entry} active={rarity === entry} onClick={() => setRarity(entry)}>
            {entry}
          </FilterPill>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((implant) => (
          <Card key={implant.id} className="rounded-none border-border/50 bg-background/80">
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="font-mono text-base uppercase">{implant.name}</CardTitle>
                <RarityBadge rarity={implant.rarity} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="rounded-none font-mono text-[10px] uppercase">{implant.slot}</Badge>
                {implant.unique && (
                  <Badge variant="outline" className="rounded-none font-mono text-[10px] text-primary border-primary/40">Unique</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-mono text-xs text-muted-foreground">{implant.description}</p>
              <div className="flex flex-wrap gap-1">
                {implant.statModifiers.map((modifier) => (
                  <Badge key={modifier} variant="secondary" className="rounded-none font-mono text-[10px]">{modifier}</Badge>
                ))}
              </div>
              <p className="font-mono text-[10px] text-primary">{implant.price.toLocaleString()} credits</p>
              {implant.family && (
                <p className="font-mono text-[10px] text-muted-foreground">
                  Family: {implant.family} ({getImplantFamily(implant.family).length} versions)
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </DatabasePageShell>
  );
}
