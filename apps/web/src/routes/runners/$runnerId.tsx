import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { DatabasePageShell } from "@/components/database/page-shell";
import { RarityBadge } from "@/components/database/rarity-badge";
import { getCoresByRunner } from "@/data/cores";
import { getRunnerById } from "@/data/runners";
import { Badge } from "@unofficialmarathon/ui/components/badge";
import { buttonVariants } from "@unofficialmarathon/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";
import { cn } from "@unofficialmarathon/ui/lib/utils";

export const Route = createFileRoute("/runners/$runnerId")({
  component: RunnerDetailPage,
});

function RunnerDetailPage() {
  const { runnerId } = Route.useParams();
  const runner = getRunnerById(runnerId);
  const runnerCores = runner ? getCoresByRunner(runner.id) : [];

  if (!runner) {
    return (
      <DatabasePageShell
        title="Runner Not Found"
        description="Not in database."
      >
        <Link to="/runners" className={cn(buttonVariants({ variant: "outline" }), "rounded-none font-mono uppercase")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Runners
        </Link>
      </DatabasePageShell>
    );
  }

  return (
    <DatabasePageShell
      title={runner.name}
      description={runner.archetype}
      actions={
        <Link to="/runners" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-none font-mono uppercase")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> All Runners
        </Link>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="rounded-none border-border/50 bg-background/80">
          <CardContent className="space-y-4 pt-6">
            {runner.imageUrl ? (
              <img src={runner.imageUrl} alt={runner.name} className="w-full object-cover" />
            ) : (
              <div className="flex h-48 items-center justify-center border border-dashed border-border/50 font-mono text-xs text-muted-foreground">
                Season {runner.season ?? 1} runner
              </div>
            )}
            <div className="space-y-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <p>{runner.archetype}</p>
              <p>{runner.manufacturer}</p>
              <p>{runner.tech || "—"}</p>
            </div>
            {runner.quote && (
              <blockquote className="border-l-2 border-primary/50 pl-3 text-xs italic text-muted-foreground font-mono">
                "{runner.quote}"
              </blockquote>
            )}
            <a
              href={runner.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-primary hover:underline"
            >
              Marathon Wiki <ExternalLink className="h-3 w-3" />
            </a>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-none border-border/50 bg-background/80">
            <CardHeader>
              <CardTitle className="font-mono uppercase tracking-wider text-primary">Abilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {runner.abilities.map((ability) => (
                <div key={ability.name} className="border-b border-border/30 pb-4 last:border-0">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-mono text-sm font-bold uppercase">{ability.name}</span>
                    <Badge variant="outline" className="rounded-none font-mono text-[9px] uppercase">
                      {ability.type === "prime" ? "Prime" : ability.type === "tactical" ? "Tactical" : "Trait"}
                    </Badge>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">{ability.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-none border-border/50 bg-background/80">
            <CardHeader>
              <CardTitle className="font-mono uppercase tracking-wider text-primary">Base Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2">
              {Object.entries(runner.defaultStats).map(([stat, value]) => (
                <div key={stat} className="flex justify-between border-b border-border/20 pb-2 font-mono text-xs">
                  <span className="text-muted-foreground uppercase">{stat}</span>
                  <span className="text-primary">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-none border-border/50 bg-background/80">
            <CardHeader>
              <CardTitle className="font-mono uppercase tracking-wider text-primary">
                Compatible Cores ({runnerCores.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {runnerCores.map((core) => (
                <div key={core.id} className="border border-border/40 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm uppercase">{core.name}</span>
                    <RarityBadge rarity={core.rarity} />
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{core.description}</p>
                  <p className="mt-2 font-mono text-[10px] text-primary">{core.price.toLocaleString()} credits</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DatabasePageShell>
  );
}
