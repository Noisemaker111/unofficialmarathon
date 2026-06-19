import type { ReactNode } from "react";
import { Plus } from "lucide-react";

import { rarityBarClass } from "@/components/loadout/loadout-utils";
import type { Rarity } from "@/data/types";
import { cn } from "@unofficialmarathon/ui/lib/utils";

interface SquareSlotProps {
  label?: string;
  active?: boolean;
  empty?: boolean;
  imageUrl?: string;
  icon?: ReactNode;
  rarity?: Rarity;
  onClick: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-11 w-11",
  md: "h-14 w-14",
  lg: "h-full w-full min-h-[56px]",
};

export function SquareSlot({
  label,
  active,
  empty = true,
  imageUrl,
  icon,
  rarity,
  onClick,
  className,
  size = "md",
}: SquareSlotProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={cn(
        "group relative flex items-center justify-center border border-white/10 bg-black/80 transition-colors",
        sizes[size],
        active && "border-white/40 ring-1 ring-white/20",
        !active && "hover:border-white/25 hover:bg-white/[0.03]",
        className,
      )}
    >
      {!empty && rarity ? (
        <span className={cn("absolute inset-x-0 top-0 h-0.5", rarityBarClass(rarity))} />
      ) : null}

      {empty ? (
        <Plus className="h-4 w-4 text-white/20 transition-colors group-hover:text-white/40" />
      ) : imageUrl ? (
        <img src={imageUrl} alt="" className="max-h-[80%] max-w-[80%] object-contain" />
      ) : (
        <span className="text-white/70">{icon}</span>
      )}
    </button>
  );
}
