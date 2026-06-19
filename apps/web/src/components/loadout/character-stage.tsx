import { Zap } from "lucide-react";

import { abilityTypeLabels, getRunnerHudStats, getRunnerPortraitUrl } from "@/components/loadout/loadout-utils";
import type { Runner } from "@/data/runners";
import { cn } from "@unofficialmarathon/ui/lib/utils";

interface CharacterStageProps {
  runner?: Runner;
  className?: string;
}

export function CharacterStage({ runner, className }: CharacterStageProps) {
  const stats = getRunnerHudStats(runner);
  const portrait = runner?.imageUrl ? getRunnerPortraitUrl(runner.imageUrl, 800) : undefined;

  return (
    <div
      className={cn(
        "relative flex min-h-[380px] flex-col overflow-hidden border border-primary/25 bg-black/60 marathon-glow marathon-scanlines",
        className,
      )}
    >
      {/* Ambient layers */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,oklch(0.88_0.23_120/14%),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center_bottom,oklch(0.55_0.12_200/8%),transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-40"
        style={{
          background:
            "linear-gradient(to top, oklch(0.88 0.23 120 / 8%), transparent), repeating-linear-gradient(90deg, oklch(0.88 0.23 120 / 12%) 0 1px, transparent 1px 48px)",
          transform: "perspective(400px) rotateX(55deg) scale(1.4)",
          transformOrigin: "center bottom",
        }}
      />

      {/* HUD header */}
      <div className="relative z-20 flex items-center justify-between border-b border-primary/20 bg-background/60 px-4 py-2 backdrop-blur-sm">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/70">Runner Shell</p>
          <p className="font-mono text-sm font-black uppercase tracking-tight text-primary">
            {runner ? `// "${runner.name}"` : "// NO SHELL"}
          </p>
        </div>
        {runner ? (
          <div className="text-right">
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Lvl.1</p>
            <p className="font-mono text-[10px] uppercase text-primary/80">{runner.archetype}</p>
          </div>
        ) : null}
      </div>

      {/* Character portrait */}
      <div className="relative z-10 flex flex-1 items-end justify-center px-4 pb-2 pt-4">
        {portrait ? (
          <img
            src={portrait}
            alt={runner?.name ?? "Runner"}
            className="h-[min(52vh,420px)] w-auto max-w-full object-contain object-bottom drop-shadow-[0_8px_48px_oklch(0.88_0.23_120/35%)] transition-transform duration-500"
          />
        ) : (
          <div className="flex h-[280px] flex-col items-center justify-center gap-3 text-center">
            <div className="h-24 w-24 border border-dashed border-primary/30 bg-primary/5" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Select Shell</p>
          </div>
        )}
      </div>

      {/* Stats strip */}
      {runner && stats.length > 0 ? (
        <div className="relative z-20 border-t border-primary/20 bg-background/85 px-3 py-3 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {stats.map((stat) => (
              <div key={stat.key} className="border border-border/30 bg-black/50 px-2 py-1.5 text-center">
                <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">{stat.short}</p>
                <p className="font-mono text-sm font-bold tabular-nums text-primary">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {runner.abilities.map((ability) => (
              <div
                key={ability.name}
                className="border border-border/25 bg-black/40 px-2 py-1.5 transition-colors hover:border-primary/30"
              >
                <p className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-wider text-primary/80">
                  <Zap className="h-2.5 w-2.5" />
                  {abilityTypeLabels[ability.type] ?? ability.type}
                </p>
                <p className="mt-0.5 line-clamp-1 font-mono text-[10px] font-bold uppercase text-foreground">
                  {ability.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Corner brackets */}
      <div className="pointer-events-none absolute left-2 top-12 h-6 w-6 border-l-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute right-2 top-12 h-6 w-6 border-r-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-primary/40" />
    </div>
  );
}
