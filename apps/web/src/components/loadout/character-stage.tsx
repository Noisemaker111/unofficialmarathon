import { getRunnerPortraitUrl } from "@/components/loadout/loadout-utils";
import type { Runner } from "@/data/runners";
import { cn } from "@unofficialmarathon/ui/lib/utils";

interface CharacterStageProps {
  runner?: Runner;
  onSelectShell?: () => void;
  className?: string;
}

export function CharacterStage({ runner, className }: CharacterStageProps) {
  const portrait = runner?.imageUrl ? getRunnerPortraitUrl(runner.imageUrl, 800) : undefined;
  const seasonNum = runner?.season ?? 1;

  return (
    <div className={cn("relative flex min-h-[480px] items-end justify-center overflow-hidden bg-black", className)}>
      {/* Large season number behind character */}
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none font-serif text-[min(28vw,220px)] font-bold leading-none text-violet-500/[0.12]"
        aria-hidden
      >
        {seasonNum}
      </span>

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_85%)]" />

      {portrait ? (
        <img
          src={portrait}
          alt={runner?.name ?? "Runner"}
          className="relative z-10 h-[min(58vh,520px)] w-auto max-w-full object-contain object-bottom drop-shadow-[0_12px_60px_rgba(112,0,255,0.25)]"
        />
      ) : (
        <div className="relative z-10 flex h-[400px] flex-col items-center justify-center gap-4">
          <div className="h-32 w-24 border border-white/10 bg-white/[0.02]" />
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25">No Shell Selected</p>
        </div>
      )}
    </div>
  );
}
