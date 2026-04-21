import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";
import { Badge } from "@unofficialmarathon/ui/components/badge";

export const Route = createFileRoute("/tips")({
  component: TipsPage,
});

interface Tip {
  title: string;
  content: string;
  tags: string[];
  category: "extraction" | "combat" | "runner";
}

const extractionTips: Tip[] = [
  {
    title: "Know Your Extraction Points",
    content: "Every map has multiple extraction points. Before running, identify at least two routes to your nearest exfil — if one is camped, you need an alternative. Check the map before loading in.",
    tags: ["extraction", "basics"],
    category: "extraction",
  },
  {
    title: "Loot Speed Matters",
    content: "Invest in Loot Speed early. Faster looting means less time exposed while searching containers. Runners with high base Loot Speed (like Assassin at 35) have a natural advantage for quick hits.",
    tags: ["loot", "runners"],
    category: "extraction",
  },
  {
    title: "Heat Management Is Survival",
    content: "Every ability generates heat. Watch your heat bar — when it fills, you're locked out of movement abilities. The Assassin's Close And Personal core reduces heat from melee, and the Thief's glass cannon core gives ability regen on shield break.",
    tags: ["combat", "runners"],
    category: "extraction",
  },
  {
    title: "Vault Your Valuables",
    content: "Anything not in your secure container is lost on death. Prioritize high-value items for your secure slots and keep your risk tolerance in mind — you can't lose what's vaulted.",
    tags: ["loot", "basics"],
    category: "extraction",
  },
  {
    title: "Listen for Audio Cues",
    content: "Other runners make noise — footsteps, ability activations, weapon fire. Use headphones and learn to distinguish directional audio. A charging railgun has a distinct sound that gives you seconds to react.",
    tags: ["combat", "awareness"],
    category: "extraction",
  },
];

const combatTips: Tip[] = [
  {
    title: "Volt Weapons Track — Use Cover",
    content: "The V75 SCAR, V22 Volt Thrower, and V66 Lookout fire tracking projectiles. Don't try to outrun them in the open — break line of sight immediately. Hard cover beats movement against tracking.",
    tags: ["combat", "weapons"],
    category: "combat",
  },
  {
    title: "Charge Weapons Are High-Risk, High-Reward",
    content: "The V85 Circuit Breaker, V11 Punch, ARES RG, V00 ZEUS RG, and V99 Channel Rifle all have charge mechanics. Use corners to charge safely — you're vulnerable while charging, but the damage payoff is massive.",
    tags: ["combat", "weapons"],
    category: "combat",
  },
  {
    title: "Respect Shotgun Range",
    content: "The Misriah 2442 and WSTR Combat Shotgun are devastating up close but ineffective beyond 11-15M. If you're using one, play tight angles. If facing one, create distance before engaging.",
    tags: ["combat", "weapons"],
    category: "combat",
  },
  {
    title: "MIPS Rounds Hit Hardest",
    content: "MIPS Rounds are the heaviest ballistic ammo type. The Misriah 2442 (168 FP), WSTR Combat Shotgun (172.5 FP), Longshot (63.8 FP), and ARES RG (159.9 FP) all use them. Reserve MIPS ammo for critical fights.",
    tags: ["ammo", "weapons"],
    category: "combat",
  },
  {
    title: "Railguns Change the Fight",
    content: "The ARES RG (159.9 FP, 100% accuracy) and V00 ZEUS RG (150 FP) are fight-ending weapons. If you hear one charging, reposition immediately. If you're using one, charge behind cover and peek only to fire.",
    tags: ["combat", "weapons"],
    category: "combat",
  },
];

const runnerTips: Tip[] = [
  {
    title: "Assassin: Smoke Is Your Best Friend",
    content: "The Assassin's Shroud trait automatically activates Active Camo when entering smoke — including smoke from your Smoke Screen. Deploy smoke, go invisible, reposition. The Guerrilla core recharges abilities faster while in smoke.",
    tags: ["assassin", "runners"],
    category: "runner",
  },
  {
    title: "Assassin: Shadow Dive for Quick Escapes",
    content: "Shadow Dive lets you slam a smoke disc from the air. Use it to break line of sight mid-gunfight, create a smoke field for Shroud activation, and reposition while invisible. Safe Landings core adds knockback to nearby enemies.",
    tags: ["assassin", "runners"],
    category: "runner",
  },
  {
    title: "Runner Choice Changes Your Playstyle",
    content: "Each runner shell has different base stats that affect your entire build. Choose based on your intended role: high Agility for speed, high Firewall for anti-hack, high Loot Speed for quick extractions.",
    tags: ["runners", "basics"],
    category: "runner",
  },
  {
    title: "Don't Sleep on Melee",
    content: "Every runner has a knife. In tight spaces or when out of ammo, melee can finish downed opponents. The Assassin's Shadow Strike core increases melee damage from invisibility.",
    tags: ["combat", "runners"],
    category: "runner",
  },
  {
    title: "Self-Repair Speed Keeps You in the Fight",
    content: "Self-Repair Speed determines how fast your shields recharge. Runners like the Triage (Field Medic) likely prioritize this stat, but every runner benefits from faster shield regen during combat pauses.",
    tags: ["survival", "runners"],
    category: "runner",
  },
];

const allTips = [...extractionTips, ...combatTips, ...runnerTips];
const allTags = [...new Set(allTips.flatMap((t) => t.tags))].sort();

const categoryConfig: Record<Tip["category"], { label: string; accent: string }> = {
  extraction: { label: "EXTRACTION", accent: "border-marathon-cyan text-marathon-cyan" },
  combat: { label: "COMBAT", accent: "border-marathon-pink text-marathon-pink" },
  runner: { label: "RUNNER", accent: "border-marathon-amber text-marathon-amber" },
};

function TipsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = selectedTag
    ? allTips.filter((t) => t.tags.includes(selectedTag))
    : allTips;

  return (
    <div className="min-h-full bg-background marathon-lattice">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Page header with Marathon terminal aesthetic */}
        <div className="mb-12 border-b border-border/50 pb-8 marathon-fiducial relative">
          <div className="marathon-data-label mb-3">TC4-SYS://TIPS.DAT</div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-primary">Tips & Strategies</h1>
          <p className="mt-2 text-muted-foreground font-mono">
            Field-tested survival protocols for Tau Ceti IV operations. Extract alive.
          </p>
        </div>

        {/* Category legend */}
        <div className="mb-6 flex flex-wrap gap-4 text-xs font-mono uppercase tracking-widest">
          <span className="flex items-center gap-2 text-marathon-cyan">
            <span className="inline-block h-2 w-2 bg-marathon-cyan rounded-none" />
            Extraction
          </span>
          <span className="flex items-center gap-2 text-marathon-pink">
            <span className="inline-block h-2 w-2 bg-marathon-pink rounded-none" />
            Combat
          </span>
          <span className="flex items-center gap-2 text-marathon-amber">
            <span className="inline-block h-2 w-2 bg-marathon-amber rounded-none" />
            Runner
          </span>
        </div>

        {/* Tag filters */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-border/30 pb-4">
          <button
            onClick={() => setSelectedTag(null)}
            className={`rounded-none px-3 py-1.5 text-xs font-mono uppercase tracking-widest font-medium transition-colors border ${
              selectedTag === null
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background/50 text-muted-foreground border-border/50 hover:border-primary/50 hover:text-primary"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`rounded-none px-3 py-1.5 text-xs font-mono uppercase tracking-widest font-medium transition-colors border capitalize ${
                selectedTag === tag
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background/50 text-muted-foreground border-border/50 hover:border-primary/50 hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Tips list */}
        <div className="space-y-4">
          {filtered.map((tip, i) => {
            const config = categoryConfig[tip.category];
            return (
              <Card
                key={tip.title}
                className="rounded-none border-border/50 bg-background/80 backdrop-blur relative overflow-hidden group hover:border-primary/30 transition-colors"
              >
                {/* Category left accent */}
                <div className={`absolute left-0 top-0 h-full w-1 border-r ${config.accent.split(' ')[0]}`} style={{ backgroundColor: 'var(--foreground)', opacity: 0.1 }} />
                <div className={`absolute left-0 top-0 h-full w-1 ${config.accent.split(' ')[0].replace('border-', 'bg-')}`} />
                <CardHeader className="pb-2 pl-6">
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-base uppercase tracking-wider font-bold">{tip.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className={`rounded-none text-[9px] font-mono uppercase tracking-widest shrink-0 ${config.accent}`}
                    >
                      {config.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pl-6">
                  <p className="text-sm text-muted-foreground font-mono">{tip.content}</p>
                  <div className="mt-3 flex gap-1.5">
                    {tip.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] rounded-none capitalize border-border/50 text-muted-foreground bg-background/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {/* Serial number in bottom-right */}
                  <div className="absolute bottom-1.5 right-3 font-mono text-[9px] tracking-widest text-muted-foreground/20 uppercase">
                    TIP-{String(i + 1).padStart(3, "0")}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer with data-stream accent */}
        <div className="mt-16 pt-8 border-t border-border/30">
          <div className="flex items-center gap-3 text-muted-foreground/40">
            <div className="marathon-pulse h-2 w-2 rounded-full bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-widest">TC4 Database Active — {allTips.length} protocols loaded</span>
          </div>
        </div>
      </div>
    </div>
  );
}