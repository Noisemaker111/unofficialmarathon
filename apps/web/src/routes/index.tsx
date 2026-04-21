import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";
import { Badge } from "@unofficialmarathon/ui/components/badge";
import { buttonVariants } from "@unofficialmarathon/ui/components/button";
import { MapPin, Users, Swords, Compass, ExternalLink, ChevronRight, Shield, Crosshair } from "lucide-react";

import { weapons } from "@/data/weapons";
import { runners } from "@/data/runners";
import { factions } from "@/data/factions";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  // Select a few featured weapons
  const featuredWeapons = [
    weapons.find((w) => w.id === "v75-scar"),
    weapons.find((w) => w.id === "ares-rg"),
    weapons.find((w) => w.id === "longshot"),
  ].filter(Boolean) as typeof weapons;

  return (
    <div className="min-h-full bg-background text-foreground selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 bg-black px-4 py-24 md:py-32 marathon-lattice">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" style={{ animation: "marathon-glow-pulse 6s ease-in-out infinite" }}></div>
        <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-marathon-cyan/50 z-10">TC4-SYS://HOME.DAT</div>
        
        <div className="container relative z-10 mx-auto max-w-5xl">
          <div className="flex flex-col items-start gap-6 md:w-2/3">
            <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 uppercase tracking-widest font-mono rounded-none">
              Tau Ceti IV Database
            </Badge>
            <h1 className="text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl uppercase text-foreground">
              Marathon
            </h1>
            <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl font-mono">
              The unofficial community hub for Bungie's 2026 extraction shooter. 
              Survive the colony, secure the artifacts, and extract alive.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/guides" className={buttonVariants({ size: "lg", className: "rounded-none font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90" })}>
                Explore Database
              </Link>
              <Link to="/lfg" className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-none font-bold uppercase tracking-wider border-primary/50 text-primary hover:bg-primary/10" })}>
                Find a Squad
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="marathon-data-label mb-6">TC4-SYS://NAV.LOG</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/lfg" className="group block">
            <Card className="h-full rounded-none border-muted-foreground/20 bg-card/50 transition-colors hover:border-primary/50 hover:bg-card">
              <CardHeader>
                <Users className="mb-2 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <CardTitle className="uppercase tracking-wider">LFG</CardTitle>
                <CardDescription className="font-mono text-xs">Find runners for your next extraction.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/maps" className="group block">
            <Card className="h-full rounded-none border-muted-foreground/20 bg-card/50 transition-colors hover:border-primary/50 hover:bg-card">
              <CardHeader>
                <MapPin className="mb-2 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <CardTitle className="uppercase tracking-wider">Maps</CardTitle>
                <CardDescription className="font-mono text-xs">Interactive maps of Tau Ceti IV zones.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/guides" className="group block">
            <Card className="h-full rounded-none border-muted-foreground/20 bg-card/50 transition-colors hover:border-primary/50 hover:bg-card">
              <CardHeader>
                <Swords className="mb-2 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <CardTitle className="uppercase tracking-wider">Guides</CardTitle>
                <CardDescription className="font-mono text-xs">Weapon stats, runner builds, and more.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/tips" className="group block">
            <Card className="h-full rounded-none border-muted-foreground/20 bg-card/50 transition-colors hover:border-primary/50 hover:bg-card">
              <CardHeader>
                <Compass className="mb-2 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <CardTitle className="uppercase tracking-wider">Tips</CardTitle>
                <CardDescription className="font-mono text-xs">Survival strategies for the colony.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>

      {/* Featured Weapons */}
      <section className="border-t border-border/40 bg-muted/20 py-16 marathon-dither">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="marathon-data-label mb-3">TC4-SYS://ARSENAL.DAT</div>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-primary">Arsenal</h2>
              <p className="text-muted-foreground font-mono text-sm">Featured weaponry for your next run.</p>
            </div>
            <Link to="/guides" className={buttonVariants({ variant: "ghost", className: "hidden sm:flex rounded-none text-primary hover:text-primary hover:bg-primary/10 uppercase tracking-wider font-bold" })}>
              View All <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredWeapons.map((weapon) => (
              <Card key={weapon.id} className="flex flex-col rounded-none border-muted-foreground/20 bg-background">
                <CardHeader className="border-b border-border/40 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-mono text-lg uppercase text-primary">{weapon.name}</CardTitle>
                      <CardDescription className="mt-1 font-mono text-xs">{weapon.category.replace('_', ' ').toUpperCase()}</CardDescription>
                    </div>
                    <Crosshair className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pt-4">
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2 font-mono">{weapon.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="block text-xs text-muted-foreground uppercase tracking-wider">Firepower</span>
                      <span className="font-mono font-medium text-primary">{weapon.firepower || "—"}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-muted-foreground uppercase tracking-wider">Range</span>
                      <span className="font-mono font-medium text-primary">{weapon.range || "—"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Runner Showcase */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="marathon-data-label mb-3">TC4-SYS://SHELLS.007</div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-primary">Runner Shells</h2>
            <p className="text-muted-foreground font-mono text-sm">Cybernetic chassis available for deployment.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {runners.map((runner) => (
              <Card key={runner.id} className="group relative overflow-hidden rounded-none border-muted-foreground/20 bg-card/50">
                <div className="absolute inset-0 z-0">
                  <img src={runner.imageUrl} alt={runner.name} loading="lazy" className="w-full h-full object-cover opacity-40 transition-opacity group-hover:opacity-60 grayscale group-hover:grayscale-0" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
                <CardHeader className="relative z-20 h-48 flex flex-col justify-end">
                  <Shield className="mb-2 h-6 w-6 text-primary" />
                  <CardTitle className="uppercase tracking-wider text-xl">{runner.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit rounded-none text-[10px] uppercase tracking-widest font-mono bg-primary/20 text-primary border border-primary/30">
                    {runner.archetype}
                  </Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Faction Index */}
      <section className="border-t border-border/40 bg-black py-16 marathon-scanlines">
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="marathon-data-label mb-3">TC4-SYS://FACTIONS.006</div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-primary">Corporate Factions</h2>
            <p className="text-muted-foreground font-mono text-sm">The powers vying for control of Tau Ceti IV.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {factions.map((faction) => (
              <div key={faction.id} className="group relative border border-muted-foreground/20 bg-background/80 backdrop-blur p-6 transition-colors hover:border-muted-foreground/40 flex items-start gap-4">
                <div className={`absolute left-0 top-0 h-full w-1 ${faction.bgColor}`} />
                <div className="shrink-0">
                  <img src={faction.imageUrl} alt={faction.name} loading="lazy" className="w-12 h-12 object-contain" />
                </div>
                <div>
                  <h3 className={`mb-2 text-xl font-bold uppercase tracking-wider ${faction.textColor}`}>
                    {faction.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono line-clamp-3">{faction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background py-12">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary font-mono">
            Unofficial Marathon Fan Site
          </p>
          <p className="mx-auto max-w-2xl text-xs text-muted-foreground/60 font-mono">
            This is a community-created fan site and is not affiliated with, endorsed by, or connected to Bungie. 
            Marathon and all related properties are trademarks of Bungie, Inc. 
            Data and lore sourced from the{" "}
            <a 
              href="https://marathonthegame.fandom.com/wiki/Marathon_Wiki" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-primary transition-colors"
            >
              Marathon Wiki on Fandom <ExternalLink className="ml-1 h-3 w-3" />
            </a>.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-muted-foreground/30">
            <div className="marathon-pulse h-2 w-2 rounded-full bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-widest">TC4 Database Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
