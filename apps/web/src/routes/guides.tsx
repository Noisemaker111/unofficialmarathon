import { createFileRoute, Link } from "@tanstack/react-router";

import { factions } from "@/data/factions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";
import { buttonVariants } from "@unofficialmarathon/ui/components/button";

export const Route = createFileRoute("/guides")({
  component: GuidesPage,
});

function GuidesPage() {
  return (
    <div className="min-h-full bg-background marathon-dither">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mb-12 border-b border-border/50 pb-8 marathon-fiducial relative">
          <div className="marathon-data-label mb-3">TC4-SYS://GUIDES.DAT</div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-primary">Guides</h1>
          <p className="mt-2 text-muted-foreground font-mono">
            Faction reference. Weapons, runners, implants, cores, mods, and items now live in the dedicated database.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/database" className={buttonVariants({ className: "rounded-none font-mono uppercase tracking-wider" })}>
              Open Database Hub
            </Link>
            <Link to="/weapons" className={buttonVariants({ variant: "outline", className: "rounded-none font-mono uppercase tracking-wider" })}>
              Weapons
            </Link>
            <Link to="/loadout" className={buttonVariants({ variant: "outline", className: "rounded-none font-mono uppercase tracking-wider" })}>
              Loadout Builder
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-foreground mb-2">Factions</h2>
          <p className="text-sm text-muted-foreground font-mono">
            The 6 corporate factions competing for control of Tau Ceti IV.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {factions.map((faction) => (
            <Card key={faction.id} className="rounded-none border-border/50 bg-background/80 backdrop-blur relative overflow-hidden group">
              <div className={`absolute left-0 top-0 h-full w-1 ${faction.bgColor}`} />
              <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <div className="shrink-0 bg-muted/20 p-2 rounded-none border border-border/50">
                  <img src={faction.imageUrl} alt={faction.name} loading="lazy" className="w-12 h-12 object-contain" />
                </div>
                <div>
                  <CardTitle className={`text-xl uppercase tracking-wider ${faction.textColor}`}>{faction.name}</CardTitle>
                  <CardDescription className="font-mono text-xs uppercase tracking-wider">Corporate Faction</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground font-mono">{faction.description}</p>
                <div className="mt-6 pt-4 border-t border-border/50">
                  <a
                    href={faction.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-mono uppercase tracking-wider hover:opacity-80 transition-opacity flex items-center gap-1 ${faction.textColor}`}
                  >
                    Wiki page <span className="text-lg leading-none">→</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
