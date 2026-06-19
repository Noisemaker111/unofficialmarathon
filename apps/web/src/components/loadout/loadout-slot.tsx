import type { ReactNode } from "react";
import { Plus, X } from "lucide-react";

import { rarityBorderClass } from "@/components/loadout/loadout-utils";
import { RarityBadge } from "@/components/database/rarity-badge";
import type { Rarity } from "@/data/types";
import { cn } from "@unofficialmarathon/ui/lib/utils";

interface LoadoutSlotProps {
  slotCode?: string;
  label: string;
  sublabel?: string;
  subtitle?: string;
  active?: boolean;
  empty?: boolean;
  imageUrl?: string;
  icon?: ReactNode;
  name?: string;
  rarity?: Rarity;
  onClick: () => void;
  onClear?: () => void;
  size?: "implant" | "gear" | "weapon" | "core";
  className?: string;
}

const sizeClasses: Record<NonNullable<LoadoutSlotProps["size"]>, string> = {
  implant: "h-[76px] min-w-[76px]",
  core: "h-[76px] min-w-[76px]",
  gear: "h-[96px] w-full",
  weapon: "h-[120px] w-full min-w-[100px]",
};

export function LoadoutSlot({
  slotCode,
  label,
  sublabel,
  subtitle,
  active,
  empty = true,
  imageUrl,
  icon,
  name,
  rarity,
  onClick,
  onClear,
  size = "implant",
  className,
}: LoadoutSlotProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col border bg-black/55 text-left transition-all marathon-hud-frame",
        sizeClasses[size],
        empty ? "border-border/45" : rarityBorderClass(rarity),
        active
          ? "border-primary shadow-[0_0_24px_oklch(0.88_0.23_120/22%)] ring-1 ring-primary/40"
          : "hover:border-primary/45 hover:bg-primary/5",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-1 border-b border-border/35 bg-black/30 px-2 py-1">
        <div className="flex min-w-0 items-center gap-1.5">
          {slotCode ? (
            <span className="shrink-0 font-mono text-[8px] uppercase tracking-wider text-primary/60">{slotCode}</span>
          ) : null}
          <span className="truncate font-mono text-[9px] uppercase tracking-widest text-primary">{label}</span>
        </div>
        {sublabel ? (
          <span className="truncate font-mono text-[8px] uppercase tracking-wider text-muted-foreground">{sublabel}</span>
        ) : null}
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center gap-1 p-2">
        {empty ? (
          <>
            <div className="flex h-9 w-9 items-center justify-center border border-dashed border-border/55 text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-primary">
              {icon ?? <Plus className="h-4 w-4" />}
            </div>
            <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">+ Select</span>
          </>
        ) : (
          <>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt=""
                className={cn(
                  "w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]",
                  size === "weapon" ? "max-h-14" : "max-h-9",
                )}
              />
            ) : icon ? (
              <div className="text-primary">{icon}</div>
            ) : null}
            {name ? (
              <p className="line-clamp-2 text-center font-mono text-[9px] font-bold uppercase leading-tight text-foreground">
                {name}
              </p>
            ) : null}
            {subtitle ? (
              <p className="line-clamp-1 text-center font-mono text-[7px] uppercase text-muted-foreground">{subtitle}</p>
            ) : null}
            {rarity ? <RarityBadge rarity={rarity} className="scale-[0.85]" /> : null}
          </>
        )}

        {!empty && onClear ? (
          <span
            role="button"
            tabIndex={0}
            onClick={(event) => {
              event.stopPropagation();
              onClear();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.stopPropagation();
                onClear();
              }
            }}
            className="absolute right-1 top-1 border border-border/40 bg-background/90 p-0.5 text-muted-foreground opacity-0 transition-opacity hover:text-primary group-hover:opacity-100"
            aria-label={`Clear ${label}`}
          >
            <X className="h-3 w-3" />
          </span>
        ) : null}
      </div>
    </button>
  );
}
