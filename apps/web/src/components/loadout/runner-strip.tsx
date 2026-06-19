import type { Runner } from "@/data/runners";
import { cn } from "@unofficialmarathon/ui/lib/utils";

interface RunnerStripProps {
  runners: Runner[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function RunnerStrip({ runners, selectedId, onSelect }: RunnerStripProps) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max gap-2">
        {runners.map((entry) => {
          const selected = selectedId === entry.id;
          const portrait = entry.imageUrl;

          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSelect(entry.id)}
              className={cn(
                "group relative h-28 w-[88px] shrink-0 overflow-hidden border transition-all duration-200",
                selected
                  ? "border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  : "border-white/15 opacity-75 hover:border-white/35 hover:opacity-100",
              )}
            >
              {portrait ? (
                <img
                  src={portrait}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-muted/20" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              {selected ? (
                <div className="absolute inset-x-0 top-0 h-0.5 bg-primary shadow-[0_0_8px_var(--primary)]" />
              ) : null}
              <span className="absolute inset-x-0 bottom-1.5 text-center font-mono text-[9px] font-bold uppercase tracking-wider">
                {entry.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
