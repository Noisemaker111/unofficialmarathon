import type { Rarity } from "@/data/types";
import { rarityColors, rarityLabels } from "@/data/types";
import { Badge } from "@unofficialmarathon/ui/components/badge";
import { cn } from "@unofficialmarathon/ui/lib/utils";

export function RarityBadge({ rarity, className }: { rarity: Rarity; className?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-none font-mono text-[10px] uppercase tracking-widest", rarityColors[rarity], className)}
    >
      {rarityLabels[rarity]}
    </Badge>
  );
}
