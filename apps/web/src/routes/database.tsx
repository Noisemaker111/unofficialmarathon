import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Backpack,
  Cpu,
  Crosshair,
  Layers,
  Package,
  Palette,
  Puzzle,
  Shield,
  Swords,
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";

export const Route = createFileRoute("/database")({
  component: DatabaseHubPage,
});

const sections = [
  {
    to: "/weapons",
    title: "Weapons",
    description: "Compare stats, browse mods, and plan your arsenal.",
    count: weapons.length,
    icon: Crosshair,
  },
  {
    to: "/runners",
    title: "Runners",
    description: "Abilities, stats, and compatible cores for every shell.",
    count: runners.length,
    icon: Users,
  },
  {
    to: "/cores",
    title: "Cores",
    description: "Runner-specific upgrades that modify abilities and playstyle.",
    count: cores.length,
    icon: Cpu,
  },
  {
    to: "/implants",
    title: "Implants",
    description: "Universal slot upgrades for Head, Torso, Legs, and Shield.",
    count: implants.length,
    icon: Shield,
  },
  {
    to: "/mods",
    title: "Mods",
    description: "Weapon attachments across barrel, chip, grip, optic, and more.",
    count: mods.length,
    icon: Wrench,
  },
  {
    to: "/items",
    title: "Items",
    description: "Keys, consumables, salvage, valuables, and extraction loot.",
    count: items.length,
    icon: Package,
  },
  {
    to: "/cosmetics",
    title: "Cosmetics",
    description: "Runner skins, weapon schemas, emblems, charms, and backgrounds.",
    count: cosmetics.length,
    icon: Palette,
  },
  {
    to: "/loadout",
    title: "Loadout Builder",
    description: "Plan a full build and share it with your squad.",
    count: null,
    icon: Layers,
  },
  {
    to: "/tier-lists",
    title: "Tier Lists",
    description: "Rank weapons and runners from S to F tier.",
    count: null,
    icon: Puzzle,
  },
] as const;

function DatabaseHubPage() {
  return (
    <DatabasePageShell
      label="TC4-SYS://DATABASE.HUB"
      title="Marathon Database"
      description="The complete Tau Ceti IV reference — weapons, runners, implants, cores, mods, items, cosmetics, loadouts, and tier lists."
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
                <CardDescription className="font-mono text-xs">{section.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-none border border-border/50 bg-muted/10 p-4">
        <div className="flex items-start gap-3">
          <Backpack className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-primary">Also Available</h2>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              Faction breakdowns remain in{" "}
              <Link to="/guides" className="text-primary hover:underline">
                Guides
              </Link>
              . Squad up with a shared loadout via{" "}
              <Link to="/lfg" className="text-primary hover:underline">
                LFG
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </DatabasePageShell>
  );
}
