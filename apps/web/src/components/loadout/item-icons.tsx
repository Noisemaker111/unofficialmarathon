import {
  Backpack,
  Box,
  Brain,
  Cpu,
  Crosshair,
  Footprints,
  Shield,
  Shirt,
  Wrench,
} from "lucide-react";
import type { ImplantSlot } from "@/data/types";

export function ImplantSlotIcon({ slot, className }: { slot: ImplantSlot; className?: string }) {
  const props = { className };
  switch (slot) {
    case "head":
      return <Brain {...props} />;
    case "torso":
      return <Shirt {...props} />;
    case "legs":
      return <Footprints {...props} />;
    case "shield":
      return <Shield {...props} />;
  }
}

export function GearTypeIcon({ type, className }: { type: string; className?: string }) {
  const props = { className };
  switch (type) {
    case "backpack":
      return <Backpack {...props} />;
    case "equipment":
      return <Box {...props} />;
    case "core":
      return <Cpu {...props} />;
    case "weapon":
      return <Crosshair {...props} />;
    case "mod":
      return <Wrench {...props} />;
    default:
      return <Box {...props} />;
  }
}
