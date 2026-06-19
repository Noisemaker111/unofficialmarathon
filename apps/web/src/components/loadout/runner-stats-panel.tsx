import { getRunnerStatList } from "@/components/loadout/loadout-utils";
import type { Runner } from "@/data/runners";
import { cn } from "@unofficialmarathon/ui/lib/utils";

interface RunnerStatsPanelProps {
  runner?: Runner;
  onSelectShell?: () => void;
  className?: string;
}

export function RunnerStatsPanel({ runner, onSelectShell, className }: RunnerStatsPanelProps) {
  const stats = getRunnerStatList(runner);

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={onSelectShell}
          className="flex-1 border border-white bg-white px-2 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-90"
        >
          Select Shell
        </button>
        <button
          type="button"
          disabled
          className="flex-1 border border-white/20 px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/30"
        >
          Customize
        </button>
      </div>

      <div className="flex-1 space-y-0">
        {stats.length > 0 ? (
          stats.map((stat) => (
            <div key={stat.key} className="border-b border-white/10 py-1.5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wide text-white/55">{stat.key}</span>
                <span className="font-mono text-sm font-medium tabular-nums text-white">{stat.value}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="py-8 text-center font-mono text-[10px] uppercase tracking-wider text-white/25">
            Select a shell
          </p>
        )}
      </div>
    </div>
  );
}
