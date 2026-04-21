import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { weapons, weaponCategories, type WeaponCategory } from "@/data/weapons";
import { runners } from "@/data/runners";
import { factions } from "@/data/factions";
import { Badge } from "@unofficialmarathon/ui/components/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@unofficialmarathon/ui/components/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unofficialmarathon/ui/components/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";

export const Route = createFileRoute("/guides")({
  component: GuidesPage,
});

function WeaponTable() {
  const [category, setCategory] = useState<WeaponCategory | "all">("all");
  const filtered = category === "all" ? weapons : weapons.filter((w) => w.category === category);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("all")}
          className={`rounded-none px-3 py-1.5 text-sm font-mono font-medium transition-colors uppercase tracking-wider border ${
            category === "all"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary"
          }`}
        >
          All Weapons
        </button>
        {weaponCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`rounded-none px-3 py-1.5 text-sm font-mono font-medium transition-colors uppercase tracking-wider border ${
              category === cat.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="rounded-none border border-border/50 overflow-x-auto bg-background/80 backdrop-blur">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="min-w-[160px] font-mono uppercase tracking-wider text-primary">Name</TableHead>
              <TableHead className="min-w-[200px] font-mono uppercase tracking-wider text-primary">Description</TableHead>
              <TableHead className="text-right font-mono uppercase tracking-wider text-primary">FP</TableHead>
              <TableHead className="text-right font-mono uppercase tracking-wider text-primary">ACC</TableHead>
              <TableHead className="text-right font-mono uppercase tracking-wider text-primary">HND</TableHead>
              <TableHead className="text-right font-mono uppercase tracking-wider text-primary">RNG</TableHead>
              <TableHead className="text-right font-mono uppercase tracking-wider text-primary">Mag</TableHead>
              <TableHead className="font-mono uppercase tracking-wider text-primary">Ammo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((weapon) => (
              <TableRow key={weapon.id} className="border-border/50 hover:bg-primary/5">
                <TableCell className="font-medium font-mono uppercase">
                  <a
                    href={weapon.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {weapon.name}
                  </a>
                  {weapon.special && (
                    <span className="ml-1.5 text-xs text-primary" title={weapon.special}>★</span>
                  )}
                </TableCell>
                <TableCell className="max-w-[280px] text-sm text-muted-foreground truncate font-mono">
                  {weapon.description}
                </TableCell>
                <TableCell className="text-right font-mono text-sm text-primary/80">{weapon.firepower}</TableCell>
                <TableCell className="text-right font-mono text-sm text-primary/80">{weapon.accuracy}</TableCell>
                <TableCell className="text-right font-mono text-sm text-primary/80">{weapon.handling}</TableCell>
                <TableCell className="text-right font-mono text-sm text-primary/80">{weapon.range}</TableCell>
                <TableCell className="text-right font-mono text-sm text-primary/80">{weapon.magazine}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px] rounded-none font-mono border-primary/30 text-primary bg-primary/10">
                    {weapon.ammoType}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function RunnerCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {runners.map((runner) => (
        <Card key={runner.id} className="flex flex-col rounded-none border-border/50 bg-background/80 backdrop-blur overflow-hidden">
          <div className="h-48 relative overflow-hidden border-b border-border/50">
            <img src={runner.imageUrl} alt={runner.name} loading="lazy" className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <CardTitle className="text-2xl uppercase tracking-wider text-primary">{runner.name}</CardTitle>
              <Badge variant="secondary" className="rounded-none font-mono text-[10px] uppercase tracking-widest bg-primary/20 text-primary border border-primary/30">
                {runner.archetype}
              </Badge>
            </div>
          </div>
          <CardHeader className="pt-4 pb-2">
            <CardDescription className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              {runner.manufacturer} • {runner.tech || "—"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground mb-4 font-mono">{runner.description}</p>
            {runner.quote && (
              <blockquote className="border-l-2 border-primary/50 pl-3 text-xs italic text-muted-foreground line-clamp-3 font-mono mb-4">
                "{runner.quote}"
              </blockquote>
            )}
            {runner.abilities.length > 0 && (
              <div className="mt-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary border-b border-border/50 pb-1">Abilities</h4>
                {runner.abilities.map((ability) => (
                  <div key={ability.name} className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold uppercase tracking-wider text-foreground">{ability.name}</span>
                      <Badge variant="outline" className="text-[9px] rounded-none font-mono uppercase tracking-widest border-muted-foreground/30 text-muted-foreground">
                        {ability.type === "prime" ? "Prime" : ability.type === "tactical" ? "Tactical" : "Trait"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">{ability.description}</p>
                  </div>
                ))}
              </div>
            )}
            {runner.defaultStats && Object.keys(runner.defaultStats).length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary border-b border-border/50 pb-1">Base Stats</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {Object.entries(runner.defaultStats).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground uppercase">{stat}</span>
                      <span className="text-primary">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6 pt-4 border-t border-border/50">
              <a
                href={runner.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono uppercase tracking-wider text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                Full details <span className="text-lg leading-none">→</span>
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FactionGrid() {
  return (
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
  );
}

function GuidesPage() {
  return (
    <div className="min-h-full bg-background marathon-dither">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mb-12 border-b border-border/50 pb-8 marathon-fiducial relative">
          <div className="marathon-data-label mb-3">TC4-SYS://GUIDES.DAT</div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-primary">Guides</h1>
          <p className="mt-2 text-muted-foreground font-mono">
            Comprehensive database for Marathon (2026). Weapons, runners, factions, and more.
          </p>
        </div>

        <Tabs defaultValue="weapons" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-none bg-muted/20 p-1 border border-border/50">
            <TabsTrigger value="weapons" className="rounded-none font-mono uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Weapons</TabsTrigger>
            <TabsTrigger value="runners" className="rounded-none font-mono uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Runners</TabsTrigger>
            <TabsTrigger value="factions" className="rounded-none font-mono uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Factions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weapons" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-foreground mb-2">Weapons</h2>
              <p className="text-sm text-muted-foreground font-mono">
                All weapons in Marathon (2026) organized by category. Stats sourced from the{" "}
                <a
                  href="https://marathonthegame.fandom.com/wiki/Weapons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Marathon Wiki
                </a>
                . ★ indicates special mechanics.
              </p>
            </div>
            <WeaponTable />
          </TabsContent>
          
          <TabsContent value="runners" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-foreground mb-2">Runner Shells</h2>
              <p className="text-sm text-muted-foreground font-mono">
                The 7 runner shell models available in Marathon (2026). Each has unique abilities, stats, and cores.
                Data from the{" "}
                <a
                  href="https://marathonthegame.fandom.com/wiki/Runners"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Marathon Wiki
                </a>
                .
              </p>
            </div>
            <RunnerCards />
          </TabsContent>
          
          <TabsContent value="factions" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-foreground mb-2">Factions</h2>
              <p className="text-sm text-muted-foreground font-mono">
                The 6 corporate factions competing for control of Tau Ceti IV. Each faction offers unique gear,
                implants, and contracts. Data from the{" "}
                <a
                  href="https://marathonthegame.fandom.com/wiki/Factions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Marathon Wiki
                </a>
                .
              </p>
            </div>
            <FactionGrid />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
