import { Cpu, User } from "lucide-react";

import { GearTypeIcon, ImplantSlotIcon } from "@/components/loadout/item-icons";
import { SquareSlot } from "@/components/loadout/square-slot";
import type { Core } from "@/data/cores";
import type { Implant } from "@/data/implants";
import type { GameItem } from "@/data/items";
import type { ImplantSlot } from "@/data/types";
import { cn } from "@unofficialmarathon/ui/lib/utils";

interface GearClusterProps {
  equipment?: GameItem;
  core?: Core;
  secondaryCore?: Core;
  implants: Partial<Record<ImplantSlot, Implant | undefined>>;
  activeSlot?: string;
  onEquipmentClick: () => void;
  onCoreClick: () => void;
  onSecondaryCoreClick: () => void;
  onImplantClick: (slot: ImplantSlot) => void;
  className?: string;
}

const implantRow: ImplantSlot[] = ["head", "torso", "legs"];

export function GearCluster({
  equipment,
  core,
  secondaryCore,
  implants,
  activeSlot,
  onEquipmentClick,
  onCoreClick,
  onSecondaryCoreClick,
  onImplantClick,
  className,
}: GearClusterProps) {
  return (
    <div className={cn("flex items-end gap-3", className)}>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[8px] uppercase tracking-wider text-white/35">Equipment</span>
            <SquareSlot
              empty={!equipment}
              rarity={equipment?.rarity}
              icon={<GearTypeIcon type="equipment" className="h-4 w-4" />}
              active={activeSlot === "equipment"}
              onClick={onEquipmentClick}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[8px] uppercase tracking-wider text-white/35">Cores</span>
            <div className="flex gap-px bg-white/10">
              <SquareSlot
                empty={!core}
                rarity={core?.rarity}
                icon={<Cpu className="h-4 w-4" />}
                active={activeSlot === "core"}
                onClick={onCoreClick}
                className="!rounded-none"
              />
              <SquareSlot
                empty={!secondaryCore}
                rarity={secondaryCore?.rarity}
                icon={<Cpu className="h-4 w-4" />}
                active={activeSlot === "core-secondary"}
                onClick={onSecondaryCoreClick}
                className="!rounded-none"
              />
            </div>
          </div>
        </div>

        <div>
          <span className="mb-1 block font-mono text-[8px] uppercase tracking-wider text-white/35">Implants</span>
          <div className="flex gap-px bg-white/10">
            {implantRow.map((slot) => (
              <SquareSlot
                key={slot}
                empty={!implants[slot]}
                rarity={implants[slot]?.rarity}
                icon={<ImplantSlotIcon slot={slot} className="h-4 w-4" />}
                active={activeSlot === `implant-${slot}`}
                onClick={() => onImplantClick(slot)}
                className="!rounded-none"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Silhouette divider like in-game */}
      <div className="flex h-24 w-10 items-center justify-center border border-white/10 bg-black/40">
        <User className="h-8 w-8 text-white/15" />
      </div>
    </div>
  );
}
