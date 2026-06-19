import { Shield } from "lucide-react";

import { SquareSlot } from "@/components/loadout/square-slot";
import type { GameItem } from "@/data/items";
import type { Implant } from "@/data/implants";
import { getImplantSlotIcon, vaultAmmoIcons } from "@/lib/gear-images";
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

/** Demo vault tiles shown when backpack is equipped — mimics in-game stash grid. */
const demoVaultTiles = [
  { imageUrl: vaultAmmoIcons[0], label: "x80" },
  { imageUrl: vaultAmmoIcons[0], label: "x80" },
  { imageUrl: vaultAmmoIcons[1], label: "x80" },
  { imageUrl: vaultAmmoIcons[1], label: "x80" },
  { imageUrl: "/assets/consumables/patch-kit.png", label: "x3" },
  { imageUrl: "/assets/consumables/shield-charge.png", label: "x3" },
  { imageUrl: "/assets/consumables/energy-amp.png", label: "x3" },
];

export function BackpackPanel({
  backpack,
  shield,
  activeSlot,
  onBackpackClick,
  onShieldClick,
  className,
}: BackpackPanelProps) {
  const filledSlots = backpack ? 1 + demoVaultTiles.length : 0;

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
                  imageUrl={backpack?.imageUrl}
                  active={activeSlot === "backpack"}
                  onClick={onBackpackClick}
                  className="!aspect-square !min-h-0"
                />
              );
            }

            const demo = backpack ? demoVaultTiles[i - 1] : undefined;
            if (demo) {
              return (
                <div
                  key={i}
                  className="relative flex aspect-square items-center justify-center border border-white/10 bg-black/80"
                >
                  <img src={demo.imageUrl} alt="" className="max-h-[70%] max-w-[70%] object-contain opacity-90" />
                  <span className="absolute bottom-0.5 right-1 font-mono text-[8px] tabular-nums text-white/50">{demo.label}</span>
                </div>
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
              imageUrl={shield ? getImplantSlotIcon("shield") : undefined}
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
            <span className="font-mono text-sm text-white/10">+</span>
          </div>
        ))}
      </div>
    </div>
  );
}
