import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { getWeaponById } from "@/data/weapons";
import { buttonVariants } from "@unofficialmarathon/ui/components/button";
import { cn } from "@unofficialmarathon/ui/lib/utils";

interface WeaponCompareTrayProps {
  selectedIds: string[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function WeaponCompareTray({ selectedIds, onRemove, onClear }: WeaponCompareTrayProps) {
  if (selectedIds.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/30 bg-background/95 backdrop-blur">
      <div className="container mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            Compare ({selectedIds.length}/4)
          </span>
          {selectedIds.map((id) => {
            const weapon = getWeaponById(id);
            if (!weapon) return null;
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1 rounded-none border border-border/50 bg-muted/30 px-2 py-1 font-mono text-xs uppercase"
              >
                {weapon.name}
                <button type="button" onClick={() => onRemove(id)} aria-label={`Remove ${weapon.name}`}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClear}
            className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-primary"
          >
            Clear
          </button>
          <Link
            to="/weapons/compare"
            search={{ ids: selectedIds.join(",") }}
            className={cn(buttonVariants({ size: "sm" }), "rounded-none font-mono uppercase tracking-wider")}
          >
            Compare Now
          </Link>
        </div>
      </div>
    </div>
  );
}
