import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Cpu,
  Crosshair,
  Layers,
  Package,
  Palette,
  Puzzle,
  Shield,
  Users,
  Wrench,
} from "lucide-react";

import { cores } from "@/data/cores";
import { cosmetics } from "@/data/cosmetics";
import { implants } from "@/data/implants";
import { items } from "@/data/items";
import { mods } from "@/data/mods";
import { runners } from "@/data/runners";
import { weapons } from "@/data/weapons";
import { DatabasePageShell } from "@/components/database/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";

export const Route = createFileRoute("/database")({
  component: DatabaseHubPage,
});

const sections = [
  { to: "/weapons", title: "Weapons", count: weapons.length, icon: Crosshair },
  { to: "/runners", title: "Runners", count: runners.length, icon: Users },
  { to: "/cores", title: "Cores", count: cores.length, icon: Cpu },
  { to: "/implants", title: "Implants", count: implants.length, icon: Shield },
  { to: "/mods", title: "Mods", count: mods.length, icon: Wrench },
  { to: "/items", title: "Items", count: items.length, icon: Package },
  { to: "/cosmetics", title: "Cosmetics", count: cosmetics.length, icon: Palette },
  { to: "/loadout", title: "Loadout Builder", count: null, icon: Layers },
  { to: "/tier-lists", title: "Tier Lists", count: null, icon: Puzzle },
] as const;

function DatabaseHubPage() {
  return (
    <DatabasePageShell
      title="Marathon Database"
      description="Weapons, runners, implants, cores, mods, items, and cosmetics."
    >
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-none border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-primary">Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black text-primary">
              {weapons.length + runners.length + cores.length + implants.length + mods.length + items.length + cosmetics.length}
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/50 bg-background/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-primary">Weapons</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black">{weapons.length}</p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/50 bg-background/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-primary">Build Pieces</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black">{cores.length + implants.length + mods.length}</p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/50 bg-background/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-primary">Loot & Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black">{items.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.to} to={section.to} className="group block">
            <Card className="h-full rounded-none border-border/50 bg-background/80 transition-colors hover:border-primary/50 hover:bg-primary/5">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <section.icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                  {section.count !== null && (
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {section.count} entries
                    </span>
                  )}
                </div>
                <CardTitle className="uppercase tracking-wider">{section.title}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </DatabasePageShell>
  );
}
