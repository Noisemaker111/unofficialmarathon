import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";
import { buttonVariants } from "@unofficialmarathon/ui/components/button";
import { MapPin, Users, Swords, Compass, ExternalLink, ChevronRight, Crosshair, Layers, Database } from "lucide-react";

import { weapons } from "@/data/weapons";
import { runners } from "@/data/runners";
import { factions } from "@/data/factions";
import { implants } from "@/data/implants";
import { cores } from "@/data/cores";
import { mods } from "@/data/mods";
import { items } from "@/data/items";
import { cosmetics } from "@/data/cosmetics";
import { LiveStatusWidget } from "@/components/live-status-widget";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const quickLinks = [
  { to: "/database" as const, label: "Database", icon: Database },
  { to: "/loadout" as const, label: "Loadout", icon: Layers },
  { to: "/lfg" as const, label: "LFG", icon: Users },
  { to: "/maps" as const, label: "Maps", icon: MapPin },
  { to: "/tier-lists" as const, label: "Tiers", icon: Swords },
  { to: "/tips" as const, label: "Tips", icon: Compass },
] as const;

const stats = [
  { label: "Weapons", count: weapons.length, to: "/weapons" as const },
  { label: "Runners", count: runners.length, to: "/runners" as const },
  { label: "Cores", count: cores.length, to: "/cores" as const },
  { label: "Implants", count: implants.length, to: "/implants" as const },
  { label: "Mods", count: mods.length, to: "/mods" as const },
  { label: "Items", count: items.length, to: "/items" as const },
  { label: "Cosmetics", count: cosmetics.length, to: "/cosmetics" as const },
] as const;

function HomeComponent() {
  const featuredWeapons = [
    weapons.find((w) => w.id === "v75-scar"),
    weapons.find((w) => w.id === "ares-rg"),
    weapons.find((w) => w.id === "longshot"),
  ].filter(Boolean) as typeof weapons;

  return (
    <div className="min-h-full bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border/40 bg-black px-4 py-16 sm:py-24 marathon-lattice">
        <div className="container relative z-10 mx-auto max-w-5xl">
          <h1 className="text-4xl font-black uppercase tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Marathon
          </h1>
          <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
            Unofficial database, loadouts, and LFG for Tau Ceti IV.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/database" className={buttonVariants({ size: "lg", className: "rounded-none font-bold uppercase tracking-wider" })}>
              Database
            </Link>
            <Link to="/lfg" className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-none font-bold uppercase tracking-wider border-primary/50 text-primary hover:bg-primary/10" })}>
              Find Squad
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quickLinks.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className="group block">
              <Card className="h-full rounded-none border-border/40 bg-card/40 transition-colors hover:border-primary/40">
                <CardHeader className="p-4">
                  <Icon className="mb-2 h-5 w-5 text-primary" />
                  <CardTitle className="text-sm uppercase tracking-wider">{label}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border/40 bg-black/30 py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Live</h2>
          <LiveStatusWidget />
        </div>
      </section>

      <section className="border-t border-border/40 py-12 marathon-dither">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-primary">Database</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {stats.map((entry) => (
              <Link key={entry.to} to={entry.to}>
                <Card className="rounded-none border-border/40 bg-background/80 transition-colors hover:border-primary/40">
                  <CardHeader className="p-4 pb-1">
                    <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground">{entry.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-2xl font-black text-primary">{entry.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Arsenal</h2>
            <Link to="/weapons" className={buttonVariants({ variant: "ghost", size: "sm", className: "rounded-none text-primary uppercase" })}>
              All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredWeapons.map((weapon) => (
              <Link key={weapon.id} to="/weapons/$weaponId" params={{ weaponId: weapon.id }}>
                <Card className="rounded-none border-border/40 bg-background/80 transition-colors hover:border-primary/40">
                  <CardHeader className="p-4">
                    <CardTitle className="font-mono text-sm uppercase text-primary">{weapon.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-3 p-4 pt-0 text-sm">
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground">Firepower</span>
                      <p className="font-mono text-primary">{weapon.firepower || "—"}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-muted-foreground">Range</span>
                      <p className="font-mono text-primary">{weapon.range || "—"}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-primary">Runners</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {runners.map((runner) => (
              <Link key={runner.id} to="/runners/$runnerId" params={{ runnerId: runner.id }}>
                <Card className="group relative h-36 overflow-hidden rounded-none border-border/40 sm:h-40">
                  {runner.imageUrl ? (
                    <img
                      src={runner.imageUrl}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-35 grayscale transition-all group-hover:opacity-55 group-hover:grayscale-0"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                  <CardHeader className="relative flex h-full flex-col justify-end p-4">
                    <CardTitle className="text-base uppercase tracking-wider sm:text-lg">{runner.name}</CardTitle>
                    <p className="font-mono text-[10px] uppercase text-muted-foreground">{runner.archetype}</p>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 bg-black/40 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-primary">Factions</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {factions.map((faction) => (
              <div key={faction.id} className="flex items-start gap-3 border border-border/40 bg-background/60 p-4">
                <img src={faction.imageUrl} alt="" loading="lazy" className="h-10 w-10 shrink-0 object-contain" />
                <div className="min-w-0">
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${faction.textColor}`}>{faction.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{faction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Unofficial fan site · Not affiliated with Bungie
          </p>
          <a
            href="https://marathonthegame.fandom.com/wiki/Marathon_Wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center text-xs text-muted-foreground/70 hover:text-primary"
          >
            Fandom Wiki <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </footer>
    </div>
  );
}
