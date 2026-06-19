import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

import { DatabasePageShell } from "@/components/database/page-shell";
import { FilterBar } from "@/components/database/filter-bar";
import { matchesSearch } from "@/lib/database";
import { runners } from "@/data/runners";
import { getCoresByRunner } from "@/data/cores";
import { Badge } from "@unofficialmarathon/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";

export const Route = createFileRoute("/runners/")({
  component: RunnersPage,
});

function RunnersPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return runners.filter((runner) =>
      matchesSearch(search, runner.name, runner.archetype, runner.tech, runner.manufacturer, runner.description),
    );
  }, [search]);

  return (
    <DatabasePageShell
      title="Runners"
      description="Abilities, stats, and cores."
    >
      <FilterBar search={search} onSearchChange={setSearch} placeholder="Search runners..." onClear={() => setSearch("")} />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((runner) => {
          const coreCount = getCoresByRunner(runner.id).length;
          return (
            <Card key={runner.id} className="overflow-hidden rounded-none border-border/50 bg-background/80">
              <div className="relative h-48 border-b border-border/50">
                {runner.imageUrl ? (
                  <img src={runner.imageUrl} alt={runner.name} loading="lazy" className="h-full w-full object-cover object-top grayscale hover:grayscale-0 transition-all" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted/20 font-mono text-xs text-muted-foreground">
                    Season {runner.season ?? 1}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <CardTitle className="text-2xl uppercase tracking-wider text-primary">
                    <Link to="/runners/$runnerId" params={{ runnerId: runner.id }} className="hover:underline">
                      {runner.name}
                    </Link>
                  </CardTitle>
                  <Badge variant="secondary" className="rounded-none font-mono text-[10px] uppercase">{runner.archetype}</Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardDescription className="font-mono text-xs uppercase tracking-wider">
                  {runner.manufacturer} • {runner.tech || "—"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="line-clamp-3 font-mono text-xs text-muted-foreground">{runner.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-none font-mono text-[10px]">{coreCount} cores</Badge>
                  <Badge variant="outline" className="rounded-none font-mono text-[10px]">{runner.abilities.length} abilities</Badge>
                  {runner.season && (
                    <Badge variant="outline" className="rounded-none font-mono text-[10px] text-primary border-primary/40">
                      Season {runner.season}
                    </Badge>
                  )}
                </div>
                <a
                  href={runner.wikiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-primary hover:underline"
                >
                  Wiki <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DatabasePageShell>
  );
}
