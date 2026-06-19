import type { Mod } from "@/data/mods";
import type { Weapon } from "@/data/weapons";
import { GearTypeIcon } from "@/components/loadout/item-icons";
import { formatCredits, rarityBarClass } from "@/components/loadout/loadout-utils";
import { cn } from "@unofficialmarathon/ui/lib/utils";

import { SquareSlot } from "./square-slot";

interface WeaponLoadoutCardProps {
  index: 1 | 2;
  weapon?: Weapon;
  mods?: (Mod | undefined)[];
  active?: boolean;
  isActiveWeapon?: boolean;
  modSlotActive?: boolean;
  onWeaponClick: () => void;
  onModClick: () => void;
  onClear?: () => void;
}

const MOD_SLOTS = 4;

export function WeaponLoadoutCard({
  index,
  weapon,
  mods = [],
  active,
  isActiveWeapon,
  modSlotActive,
  onWeaponClick,
  onModClick,
}: WeaponLoadoutCardProps) {
  const filledMods = mods.filter(Boolean) as Mod[];

  return (
    <div className="relative flex gap-2">
      {isActiveWeapon ? (
        <div className="absolute -left-3 top-1/2 z-10 -translate-y-1/2">
          <div className="h-0 w-0 border-y-[6px] border-l-[8px] border-y-transparent border-l-emerald-400" />
        </div>
      ) : null}

      {/* Mod grid — 2x2 like in-game */}
      <div className="grid w-[72px] shrink-0 grid-cols-2 gap-px bg-white/10">
        {Array.from({ length: MOD_SLOTS }, (_, i) => {
          const mod = filledMods[i];
          return (
            <SquareSlot
              key={i}
              size="sm"
              empty={!mod}
              rarity={mod?.rarity}
              icon={<GearTypeIcon type="mod" className="h-3.5 w-3.5" />}
              active={modSlotActive}
              onClick={onModClick}
              className="!h-[35px] !w-full !min-w-0 rounded-none"
            />
          );
        })}
      </div>

      {/* Weapon card */}
      <button
        type="button"
        onClick={onWeaponClick}
        className={cn(
          "relative flex min-h-[76px] flex-1 flex-col border border-white/10 bg-black/80 text-left transition-colors",
          active && "border-white/35 ring-1 ring-white/15",
          !active && "hover:border-white/20",
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-2 py-1">
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">Weapon {index}</span>
          {isActiveWeapon ? (
            <span className="font-mono text-[8px] uppercase tracking-wider text-emerald-400">Active</span>
          ) : null}
        </div>

        {weapon ? (
          <>
            <div className={cn("absolute inset-x-0 top-6 h-0.5", rarityBarClass())} />
            <div className="flex flex-1 items-center gap-3 px-3 py-2">
              {weapon.imageUrl ? (
                <img src={weapon.imageUrl} alt="" className="h-12 w-auto max-w-[45%] object-contain" />
              ) : (
                <GearTypeIcon type="weapon" className="h-8 w-8 text-white/30" />
              )}
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 font-mono text-[11px] font-bold uppercase leading-tight text-white">
                  {weapon.name}
                </p>
                <p className="mt-0.5 font-mono text-[9px] uppercase text-white/40">{weapon.ammoType}</p>
              </div>
              <span className="shrink-0 font-mono text-[10px] tabular-nums text-white/60">
                {formatCredits(1200 - index * 200)}
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-1 py-4">
            <GearTypeIcon type="weapon" className="h-8 w-8 text-white/15" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/25">+ Select</span>
          </div>
        )}
      </button>
    </div>
  );
}
