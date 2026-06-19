import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink, Star } from "lucide-react";

import { DatabasePageShell } from "@/components/database/page-shell";
import { FilterBar, FilterPill } from "@/components/database/filter-bar";
import { WeaponCompareTray } from "@/components/database/weapon-compare-tray";
import { useWeaponCompare } from "@/hooks/use-weapon-compare";
import { matchesSearch } from "@/lib/database";
import {
  weapons,
  weaponCategories,
  type WeaponCategory,
} from "@/data/weapons";
import { Badge } from "@unofficialmarathon/ui/components/badge";
import { buttonVariants } from "@unofficialmarathon/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";
import { cn } from "@unofficialmarathon/ui/lib/utils";

export const Route = createFileRoute("/weapons/")({
  component: WeaponsPage,
});

function WeaponsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<WeaponCategory | "all">("all");
  const compare = useWeaponCompare();

  const filtered = useMemo(() => {
    return weapons.filter((weapon) => {
      if (category !== "all" && weapon.category !== category) return false;
      return matchesSearch(search, weapon.name, weapon.description, weapon.ammoType, weapon.special);
    });
  }, [search, category]);

  return (
    <>
      <DatabasePageShell
        label="TC4-SYS://WEAPONS.DAT"
        title="Weapons"
        description="Browse all Marathon weapons with stats, categories, and side-by-side comparison."
        actions={
          <Link
            to="/weapons/compare"
            search={compare.selectedIds.length > 0 ? { ids: compare.selectedIds.join(",") } : {}}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-none font-mono uppercase tracking-wider")}
          >
            Compare ({compare.selectedIds.length}/4)
          </Link>
        }
      >
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          placeholder="Search weapons..."
          onClear={() => setSearch("")}
        >
          <FilterPill active={category === "all"} onClick={() => setCategory("all")}>
            All
          </FilterPill>
          {weaponCategories.map((entry) => (
            <FilterPill
              key={entry.value}
              active={category === entry.value}
              onClick={() => setCategory(entry.value)}
            >
              {entry.label}
            </FilterPill>
          ))}
        </FilterBar>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((weapon) => {
            const selected = compare.isSelected(weapon.id);
            const disabled = !selected && compare.isFull;
            return (
              <Card key={weapon.id} className="rounded-none border-border/50 bg-background/80 overflow-hidden">
                <CardHeader className="border-b border-border/40 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="font-mono text-lg uppercase">
                        <Link to="/weapons/$weaponId" params={{ weaponId: weapon.id }} className="hover:text-primary">
                          {weapon.name}
                        </Link>
                      </CardTitle>
                      <CardDescription className="mt-1 font-mono text-[10px] uppercase tracking-widest">
                        {weaponCategories.find((c) => c.value === weapon.category)?.label}
                      </CardDescription>
                    </div>
                    {weapon.unique && <Star className="h-4 w-4 text-primary" />}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  {weapon.imageUrl ? (
                    <img
                      src={weapon.imageUrl}
                      alt={weapon.name}
                      loading="lazy"
                      className="mx-auto h-24 object-contain"
                    />
                  ) : (
                    <div className="flex h-24 items-center justify-center border border-dashed border-border/50 font-mono text-xs text-muted-foreground">
                      Image pending
                    </div>
                  )}
                  <p className="line-clamp-2 font-mono text-xs text-muted-foreground">{weapon.description}</p>
                  <div className="grid grid-cols-3 gap-2 font-mono text-[10px] uppercase">
                    <div><span className="text-muted-foreground">FP</span> {weapon.firepower || "—"}</div>
                    <div><span className="text-muted-foreground">ACC</span> {weapon.accuracy || "—"}</div>
                    <div><span className="text-muted-foreground">RNG</span> {weapon.range || "—"}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="rounded-none font-mono text-[10px]">{weapon.ammoType}</Badge>
                    {weapon.zone && (
                      <Badge variant="outline" className="rounded-none font-mono text-[10px]">{weapon.zone}</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => compare.toggle(weapon.id)}
                      className={cn(
                        "rounded-none border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50 disabled:opacity-40",
                      )}
                    >
                      {selected ? "Selected" : "Compare"}
                    </button>
                    <a
                      href={weapon.wikiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-none border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider hover:border-primary/50"
                    >
                      Wiki <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DatabasePageShell>
      <WeaponCompareTray
        selectedIds={compare.selectedIds}
        onRemove={compare.remove}
        onClear={compare.clear}
      />
    </>
  );
}
