import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { DatabasePageShell } from "@/components/database/page-shell";
import { FilterBar, FilterPill } from "@/components/database/filter-bar";
import { RarityBadge } from "@/components/database/rarity-badge";
import { mods, modSlots } from "@/data/mods";
import { weapons } from "@/data/weapons";
import { matchesSearch, sortByRarity } from "@/lib/database";
import type { ModSlot, Rarity } from "@/data/types";
import { rarityOrder } from "@/data/types";
import { Badge } from "@unofficialmarathon/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";

export const Route = createFileRoute("/mods/")({
  component: ModsPage,
});

function ModsPage() {
  const [search, setSearch] = useState("");
  const [slot, setSlot] = useState<ModSlot | "all">("all");
  const [weaponId, setWeaponId] = useState<string | "all">("all");
  const [rarity, setRarity] = useState<Rarity | "all">("all");

  const filtered = useMemo(() => {
    const results = mods.filter((mod) => {
      if (slot !== "all" && mod.slot !== slot) return false;
      if (rarity !== "all" && mod.rarity !== rarity) return false;
      if (weaponId !== "all" && !mod.compatibleWeaponIds.includes(weaponId)) return false;
      return matchesSearch(search, mod.name, mod.description, ...mod.statChanges);
    });
    return sortByRarity(results);
  }, [search, slot, weaponId, rarity]);

  return (
    <DatabasePageShell
      title="Weapon Mods"
      description="Barrel, chip, grip, magazine, optic, shield."
    >
      <FilterBar search={search} onSearchChange={setSearch} placeholder="Search mods..." onClear={() => setSearch("")}>
        <FilterPill active={slot === "all"} onClick={() => setSlot("all")}>All Slots</FilterPill>
        {modSlots.map((entry) => (
          <FilterPill key={entry.value} active={slot === entry.value} onClick={() => setSlot(entry.value)}>
            {entry.label}
          </FilterPill>
        ))}
      </FilterBar>

      <div className="mb-4 flex flex-wrap gap-2">
        <FilterPill active={weaponId === "all"} onClick={() => setWeaponId("all")}>All Weapons</FilterPill>
        {weapons.slice(0, 8).map((weapon) => (
          <FilterPill key={weapon.id} active={weaponId === weapon.id} onClick={() => setWeaponId(weapon.id)}>
            {weapon.name}
          </FilterPill>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <FilterPill active={rarity === "all"} onClick={() => setRarity("all")}>All Rarities</FilterPill>
        {rarityOrder.filter((r) => r !== "contraband").map((entry) => (
          <FilterPill key={entry} active={rarity === entry} onClick={() => setRarity(entry)}>
            {entry}
          </FilterPill>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((mod) => (
          <Card key={mod.id} className="rounded-none border-border/50 bg-background/80">
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="font-mono text-base uppercase">{mod.name}</CardTitle>
                <RarityBadge rarity={mod.rarity} />
              </div>
              <Badge variant="outline" className="w-fit rounded-none font-mono text-[10px] uppercase">{mod.slot}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-mono text-xs text-muted-foreground">{mod.description}</p>
              <div className="flex flex-wrap gap-1">
                {mod.statChanges.map((change) => (
                  <Badge key={change} variant="secondary" className="rounded-none font-mono text-[10px]">{change}</Badge>
                ))}
              </div>
              <p className="font-mono text-[10px] text-muted-foreground">
                Compatible with {mod.compatibleWeaponIds.length} weapon(s)
              </p>
              <p className="font-mono text-[10px] text-primary">{mod.price.toLocaleString()} credits</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DatabasePageShell>
  );
}
