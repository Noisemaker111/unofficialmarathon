import type { ImplantSlot } from "@/data/types";

import type { ReactNode } from "react";

export type LoadoutSlotId =
  | "runner"
  | "core"
  | "core-secondary"
  | "primary-weapon"
  | "secondary-weapon"
  | `implant-${ImplantSlot}`
  | "backpack"
  | "equipment"
  | "mods";

export interface PickerItem {
  id: string;
  name: string;
  subtitle?: string;
  imageUrl?: string;
  rarity?: import("@/data/types").Rarity;
  icon?: ReactNode;
}
