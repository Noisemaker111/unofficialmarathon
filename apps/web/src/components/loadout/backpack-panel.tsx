import { Backpack, Shield } from "lucide-react";

import { GearTypeIcon } from "@/components/loadout/item-icons";
import { SquareSlot } from "@/components/loadout/square-slot";
import type { GameItem } from "@/data/items";
import type { Implant } from "@/data/implants";
import { cn } from "@unofficialmarathon/ui/lib/utils";

interface BackpackPanelProps {
  backpack?: GameItem;
  shield?: Implant;
  activeSlot?: string;
  onBackpackClick: () => void;
  onShieldClick: () => void;
  className?: string;
}

const GRID_SIZE = 16;
const COLS = 4;

export function BackpackPanel({
  backpack,
  shield,
  activeSlot,
  onBackpackClick,
  onShieldClick,
  className,
}: BackpackPanelProps) {
  const filledSlots = backpack ? 1 : 0;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Backpack */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">Backpack</span>
          <span className="font-mono text-[10px] tabular-nums text-white/40">
            {filledSlots}/{GRID_SIZE}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-px bg-white/10">
          {Array.from({ length: GRID_SIZE }, (_, i) => {
            const isBackpackSlot = i === 0;

            if (isBackpackSlot) {
              return (
                <SquareSlot
                  key={i}
                  size="lg"
                  empty={!backpack}
                  rarity={backpack?.rarity}
                  icon={<Backpack className="h-4 w-4" />}
                  active={activeSlot === "backpack"}
                  onClick={onBackpackClick}
                  className="!aspect-square !min-h-0"
                />
              );
            }

            return (
              <div
                key={i}
                className="flex aspect-square items-center justify-center border border-white/10 bg-black/80"
              >
                <span className="font-mono text-sm text-white/10">+</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shield slots */}
      <div>
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-white/50">Shield</span>
        <div className="flex flex-col gap-px bg-white/10">
          {[0, 1].map((i) => (
            <SquareSlot
              key={i}
              size="lg"
              empty={i > 0 || !shield}
              rarity={shield?.rarity}
              icon={<Shield className="h-4 w-4" />}
              active={activeSlot === "implant-shield"}
              onClick={onShieldClick}
              className="!h-14 !w-full"
            />
          ))}
        </div>
      </div>

      {/* Stash expansion grid */}
      <div className="grid grid-cols-4 gap-px bg-white/10">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center border border-white/10 bg-black/60"
          >
            <GearTypeIcon type="mod" className="h-3 w-3 text-white/8" />
          </div>
        ))}
      </div>
    </div>
  );
}
