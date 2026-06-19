import type { Mod } from "@/data/mods";
import type { Weapon } from "@/data/weapons";
import { cn } from "@unofficialmarathon/ui/lib/utils";

import { LoadoutSlot } from "./loadout-slot";

interface WeaponSlotPanelProps {
  slotCode: string;
  label: string;
  weapon?: Weapon;
  mods?: (Mod | undefined)[];
  active?: boolean;
  modActive?: boolean;
  onClick: () => void;
  onModClick: () => void;
  onClear: () => void;
}

export function WeaponSlotPanel({
  slotCode,
  label,
  weapon,
  mods = [],
  active,
  modActive,
  onClick,
  onModClick,
  onClear,
}: WeaponSlotPanelProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <LoadoutSlot
        slotCode={slotCode}
        label={label}
        active={active}
        empty={!weapon}
        name={weapon?.name}
        imageUrl={weapon?.imageUrl || undefined}
        subtitle={weapon?.ammoType}
        onClick={onClick}
        onClear={onClear}
        size="weapon"
      />
      <button
        type="button"
        onClick={onModClick}
        className={cn(
          "flex h-9 items-center justify-between border px-2 font-mono text-[9px] uppercase tracking-widest transition-all marathon-hud-frame",
          modActive
            ? "border-primary bg-primary/10 text-primary shadow-[0_0_16px_oklch(0.88_0.23_120/15%)]"
            : "border-border/40 bg-black/40 text-muted-foreground hover:border-primary/40 hover:text-primary",
        )}
      >
        <span>Mod</span>
        <span className={cn("tabular-nums", mods.length > 0 && "text-primary")}>
          {mods.filter(Boolean).length > 0 ? `${mods.filter(Boolean).length} eq` : "+ Select"}
        </span>
      </button>
    </div>
  );
}
