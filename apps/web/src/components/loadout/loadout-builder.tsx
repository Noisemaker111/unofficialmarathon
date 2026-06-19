import { useMemo, useState } from "react";
import {
  Cloud,
  Copy,
  Cpu,
  Loader2,
  Save,
  Share2,
} from "lucide-react";

import { CharacterStage } from "@/components/loadout/character-stage";
import { ItemPicker } from "@/components/loadout/item-picker";
import { GearTypeIcon, ImplantSlotIcon } from "@/components/loadout/item-icons";
import { LoadoutSlot } from "@/components/loadout/loadout-slot";
import { RunnerStrip } from "@/components/loadout/runner-strip";
import type { LoadoutSlotId, PickerItem } from "@/components/loadout/types";
import { WeaponSlotPanel } from "@/components/loadout/weapon-slot-panel";
import { getCoreById, cores } from "@/data/cores";
import { getImplantById, implants } from "@/data/implants";
import { getItemById, items } from "@/data/items";
import { getModById, mods } from "@/data/mods";
import { playableRunners } from "@/data/runners";
import { weapons } from "@/data/weapons";
import type { ImplantSlot } from "@/data/types";
import type { LoadoutState } from "@/lib/loadout";
import { Button } from "@unofficialmarathon/ui/components/button";
import { Input } from "@unofficialmarathon/ui/components/input";
import { cn } from "@unofficialmarathon/ui/lib/utils";

const slotTitles: Record<LoadoutSlotId, string> = {
  runner: "Runner Shell",
  core: "Core Slot 1",
  "core-secondary": "Core Slot 2",
  "primary-weapon": "Primary Weapon",
  "secondary-weapon": "Secondary Weapon",
  "implant-head": "Head Implant",
  "implant-torso": "Torso Implant",
  "implant-legs": "Legs Implant",
  "implant-shield": "Shield Implant",
  backpack: "Backpack",
  equipment: "Equipment",
  mods: "Weapon Mods",
};

interface LoadoutBuilderProps {
  loadout: LoadoutState;
  label: string;
  cloudId?: string;
  saving?: boolean;
  onLabelChange: (value: string) => void;
  onChange: (patch: Partial<LoadoutState>) => void;
  onSave: () => void;
  onShare: () => void;
  onCopyCode: () => void;
}

export function LoadoutBuilder({
  loadout,
  label,
  cloudId,
  saving,
  onLabelChange,
  onChange,
  onSave,
  onShare,
  onCopyCode,
}: LoadoutBuilderProps) {
  const [activeSlot, setActiveSlot] = useState<LoadoutSlotId | null>(null);
  const [modWeaponContext, setModWeaponContext] = useState<"primary" | "secondary" | null>(null);

  const runner = playableRunners.find((entry) => entry.id === loadout.runnerId);
  const primary = weapons.find((entry) => entry.id === loadout.primaryWeaponId);
  const secondary = weapons.find((entry) => entry.id === loadout.secondaryWeaponId);
  const core = loadout.coreId ? getCoreById(loadout.coreId) : undefined;
  const secondaryCore = loadout.secondaryCoreId ? getCoreById(loadout.secondaryCoreId) : undefined;
  const backpack = loadout.backpackId ? getItemById(loadout.backpackId) : undefined;
  const equipment = loadout.equipmentId ? getItemById(loadout.equipmentId) : undefined;
  const selectedMods = loadout.modIds.map((id) => getModById(id)).filter(Boolean);

  const compatibleCores = loadout.runnerId ? cores.filter((entry) => entry.runnerId === loadout.runnerId) : cores;

  const modContextWeapon = modWeaponContext === "secondary" ? secondary : primary;
  const compatibleMods = modContextWeapon
    ? mods.filter((mod) => mod.compatibleWeaponIds.includes(modContextWeapon.id))
    : primary
      ? mods.filter((mod) => mod.compatibleWeaponIds.includes(primary.id))
      : secondary
        ? mods.filter((mod) => mod.compatibleWeaponIds.includes(secondary.id))
        : mods;

  const primaryMods = primary
    ? selectedMods.filter((mod) => mod && mod.compatibleWeaponIds.includes(primary.id))
    : [];
  const secondaryMods = secondary
    ? selectedMods.filter((mod) => mod && mod.compatibleWeaponIds.includes(secondary.id))
    : [];

  const pickerItems = useMemo((): PickerItem[] => {
    if (!activeSlot) return [];

    switch (activeSlot) {
      case "runner":
        return playableRunners.map((entry) => ({
          id: entry.id,
          name: entry.name,
          subtitle: entry.archetype,
          imageUrl: entry.imageUrl || undefined,
        }));
      case "core":
      case "core-secondary":
        return compatibleCores.map((entry) => ({
          id: entry.id,
          name: entry.name,
          subtitle: entry.description,
          rarity: entry.rarity,
          icon: <Cpu className="h-8 w-8" />,
        }));
      case "primary-weapon":
      case "secondary-weapon":
        return weapons.map((entry) => ({
          id: entry.id,
          name: entry.name,
          subtitle: entry.ammoType,
          imageUrl: entry.imageUrl || undefined,
        }));
      case "backpack":
        return items
          .filter((entry) => entry.type === "backpack")
          .map((entry) => ({
            id: entry.id,
            name: entry.name,
            subtitle: entry.description,
            rarity: entry.rarity,
            icon: <GearTypeIcon type="backpack" className="h-8 w-8" />,
          }));
      case "equipment":
        return items
          .filter((entry) => entry.type === "equipment")
          .map((entry) => ({
            id: entry.id,
            name: entry.name,
            subtitle: entry.description,
            rarity: entry.rarity,
            icon: <GearTypeIcon type="equipment" className="h-8 w-8" />,
          }));
      case "mods":
        return compatibleMods.map((entry) => ({
          id: entry.id,
          name: entry.name,
          subtitle: entry.slot,
          rarity: entry.rarity,
          icon: <GearTypeIcon type="mod" className="h-8 w-8" />,
        }));
      default:
        if (activeSlot.startsWith("implant-")) {
          const slot = activeSlot.replace("implant-", "") as ImplantSlot;
          return implants
            .filter((entry) => entry.slot === slot)
            .map((entry) => ({
              id: entry.id,
              name: entry.name,
              subtitle: entry.family,
              rarity: entry.rarity,
              icon: <ImplantSlotIcon slot={slot} className="h-8 w-8" />,
            }));
        }
        return [];
    }
  }, [activeSlot, compatibleCores, compatibleMods]);

  const openModsForWeapon = (context: "primary" | "secondary") => {
    setModWeaponContext(context);
    setActiveSlot("mods");
  };

  const handleSelect = (id: string) => {
    if (!activeSlot) return;

    switch (activeSlot) {
      case "runner":
        onChange({ runnerId: id, coreId: undefined, secondaryCoreId: undefined });
        break;
      case "core":
        onChange({ coreId: id });
        break;
      case "core-secondary":
        onChange({ secondaryCoreId: id });
        break;
      case "primary-weapon":
        onChange({ primaryWeaponId: id });
        break;
      case "secondary-weapon":
        onChange({ secondaryWeaponId: id });
        break;
      case "backpack":
        onChange({ backpackId: id });
        break;
      case "equipment":
        onChange({ equipmentId: id });
        break;
      case "mods": {
        const next = loadout.modIds.includes(id)
          ? loadout.modIds.filter((entry) => entry !== id)
          : [...loadout.modIds, id];
        onChange({ modIds: next });
        return;
      }
      default:
        if (activeSlot.startsWith("implant-")) {
          const slot = activeSlot.replace("implant-", "") as ImplantSlot;
          onChange({ implants: { ...loadout.implants, [slot]: id } });
        }
    }
    setActiveSlot(null);
  };

  const closePicker = () => {
    setActiveSlot(null);
    setModWeaponContext(null);
  };

  const clearSlot = (slot: LoadoutSlotId) => {
    switch (slot) {
      case "runner":
        onChange({ runnerId: undefined, coreId: undefined, secondaryCoreId: undefined });
        break;
      case "core":
        onChange({ coreId: undefined });
        break;
      case "core-secondary":
        onChange({ secondaryCoreId: undefined });
        break;
      case "primary-weapon":
        onChange({ primaryWeaponId: undefined });
        break;
      case "secondary-weapon":
        onChange({ secondaryWeaponId: undefined });
        break;
      case "backpack":
        onChange({ backpackId: undefined });
        break;
      case "equipment":
        onChange({ equipmentId: undefined });
        break;
      case "mods":
        onChange({ modIds: [] });
        break;
      default:
        if (slot.startsWith("implant-")) {
          const implantSlot = slot.replace("implant-", "") as ImplantSlot;
          const next = { ...loadout.implants };
          delete next[implantSlot];
          onChange({ implants: next });
        }
    }
  };

  const getImplant = (slot: ImplantSlot) => {
    const id = loadout.implants[slot];
    return id ? getImplantById(id) : undefined;
  };

  const pickerSelectedId =
    activeSlot === "runner" ? loadout.runnerId
    : activeSlot === "core" ? loadout.coreId
    : activeSlot === "core-secondary" ? loadout.secondaryCoreId
    : activeSlot === "primary-weapon" ? loadout.primaryWeaponId
    : activeSlot === "secondary-weapon" ? loadout.secondaryWeaponId
    : activeSlot === "backpack" ? loadout.backpackId
    : activeSlot === "equipment" ? loadout.equipmentId
    : activeSlot?.startsWith("implant-")
      ? loadout.implants[activeSlot.replace("implant-", "") as ImplantSlot]
      : undefined;

  const pickerTitle =
    activeSlot === "mods" && modWeaponContext
      ? `${slotTitles.mods} — ${modWeaponContext === "primary" ? "Primary" : "Secondary"}`
      : activeSlot
        ? slotTitles[activeSlot]
        : "";

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border border-border/40 bg-black/40 p-3 sm:flex-row sm:items-center sm:justify-between marathon-hud-frame">
        <Input
          value={label}
          onChange={(event) => onLabelChange(event.target.value)}
          placeholder="Build name"
          className="max-w-md rounded-none border-border/50 bg-background/80 font-mono uppercase"
        />
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" className="rounded-none font-mono uppercase" onClick={onSave} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save
          </Button>
          <Button type="button" variant="outline" size="sm" className="rounded-none font-mono uppercase" onClick={onShare}>
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button type="button" variant="outline" size="sm" className="rounded-none font-mono uppercase" onClick={onCopyCode}>
            <Copy className="mr-2 h-4 w-4" /> Code
          </Button>
        </div>
        {cloudId ? (
          <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-primary sm:ml-auto">
            <Cloud className="h-3 w-3" /> {cloudId}
          </p>
        ) : null}
      </div>

      <div className="border border-border/30 bg-black/25 px-3 py-2 marathon-hud-frame">
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-primary/70">Select Runner</p>
        <RunnerStrip
          runners={playableRunners}
          selectedId={loadout.runnerId}
          onSelect={(id) => onChange({ runnerId: id, coreId: undefined, secondaryCoreId: undefined })}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        {/* Main rig */}
        <div className="space-y-3">
          <div className="grid gap-3 lg:grid-cols-[112px_1fr_112px]">
            {/* Weapons column */}
            <div className="flex flex-col gap-3 lg:col-start-1">
              <WeaponSlotPanel
                slotCode="WPN_01"
                label="Primary"
                weapon={primary}
                mods={primaryMods}
                active={activeSlot === "primary-weapon"}
                modActive={activeSlot === "mods" && modWeaponContext === "primary"}
                onClick={() => setActiveSlot("primary-weapon")}
                onModClick={() => openModsForWeapon("primary")}
                onClear={() => clearSlot("primary-weapon")}
              />
              <WeaponSlotPanel
                slotCode="WPN_02"
                label="Secondary"
                weapon={secondary}
                mods={secondaryMods}
                active={activeSlot === "secondary-weapon"}
                modActive={activeSlot === "mods" && modWeaponContext === "secondary"}
                onClick={() => setActiveSlot("secondary-weapon")}
                onModClick={() => openModsForWeapon("secondary")}
                onClear={() => clearSlot("secondary-weapon")}
              />
            </div>

            {/* Character */}
            <div className="lg:col-start-2">
              <CharacterStage runner={runner} />
            </div>

            {/* Implants + cores column */}
            <div className="grid grid-cols-2 gap-2 lg:col-start-3 lg:grid-cols-1 lg:gap-1.5">
              <LoadoutSlot
                slotCode="HEAD"
                label="Head"
                active={activeSlot === "implant-head"}
                empty={!getImplant("head")}
                name={getImplant("head")?.name}
                rarity={getImplant("head")?.rarity}
                icon={<ImplantSlotIcon slot="head" className="h-5 w-5" />}
                onClick={() => setActiveSlot("implant-head")}
                onClear={() => clearSlot("implant-head")}
                size="implant"
              />
              <LoadoutSlot
                slotCode="TORSO"
                label="Torso"
                active={activeSlot === "implant-torso"}
                empty={!getImplant("torso")}
                name={getImplant("torso")?.name}
                rarity={getImplant("torso")?.rarity}
                icon={<ImplantSlotIcon slot="torso" className="h-5 w-5" />}
                onClick={() => setActiveSlot("implant-torso")}
                onClear={() => clearSlot("implant-torso")}
                size="implant"
              />
              <LoadoutSlot
                slotCode="LEGS"
                label="Legs"
                active={activeSlot === "implant-legs"}
                empty={!getImplant("legs")}
                name={getImplant("legs")?.name}
                rarity={getImplant("legs")?.rarity}
                icon={<ImplantSlotIcon slot="legs" className="h-5 w-5" />}
                onClick={() => setActiveSlot("implant-legs")}
                onClear={() => clearSlot("implant-legs")}
                size="implant"
              />
              <LoadoutSlot
                slotCode="SHIELD"
                label="Shield"
                active={activeSlot === "implant-shield"}
                empty={!getImplant("shield")}
                name={getImplant("shield")?.name}
                rarity={getImplant("shield")?.rarity}
                icon={<ImplantSlotIcon slot="shield" className="h-5 w-5" />}
                onClick={() => setActiveSlot("implant-shield")}
                onClear={() => clearSlot("implant-shield")}
                size="implant"
              />
              <LoadoutSlot
                slotCode="CORE_01"
                label="Core"
                active={activeSlot === "core"}
                empty={!core}
                name={core?.name}
                rarity={core?.rarity}
                icon={<Cpu className="h-5 w-5" />}
                onClick={() => setActiveSlot("core")}
                onClear={() => clearSlot("core")}
                size="core"
              />
              <LoadoutSlot
                slotCode="CORE_02"
                label="Core"
                active={activeSlot === "core-secondary"}
                empty={!secondaryCore}
                name={secondaryCore?.name}
                rarity={secondaryCore?.rarity}
                icon={<Cpu className="h-5 w-5" />}
                onClick={() => setActiveSlot("core-secondary")}
                onClear={() => clearSlot("core-secondary")}
                size="core"
              />
            </div>
          </div>

          {/* Bottom gear */}
          <div className="grid gap-2 sm:grid-cols-2">
            <LoadoutSlot
              slotCode="EQUIP"
              label="Equipment"
              active={activeSlot === "equipment"}
              empty={!equipment}
              name={equipment?.name}
              rarity={equipment?.rarity}
              icon={<GearTypeIcon type="equipment" className="h-6 w-6" />}
              onClick={() => setActiveSlot("equipment")}
              onClear={() => clearSlot("equipment")}
              size="gear"
            />
            <LoadoutSlot
              slotCode="PACK"
              label="Backpack"
              active={activeSlot === "backpack"}
              empty={!backpack}
              name={backpack?.name}
              rarity={backpack?.rarity}
              icon={<GearTypeIcon type="backpack" className="h-6 w-6" />}
              onClick={() => setActiveSlot("backpack")}
              onClear={() => clearSlot("backpack")}
              size="gear"
            />
          </div>
        </div>

        {/* Desktop picker sidebar */}
        <div className="hidden min-h-[420px] xl:block xl:sticky xl:top-4 xl:h-[calc(100vh-8rem)]">
          {activeSlot ? (
            <ItemPicker
              title={pickerTitle}
              items={pickerItems}
              selectedId={pickerSelectedId}
              selectedIds={activeSlot === "mods" ? loadout.modIds : undefined}
              multi={activeSlot === "mods"}
              onSelect={handleSelect}
              onClose={closePicker}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center border border-dashed border-border/40 bg-black/20 p-6 text-center marathon-hud-frame">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Configure Loadout</p>
              <p className="mt-2 max-w-[220px] font-mono text-[10px] leading-relaxed text-muted-foreground/70">
                Click any slot on the rig to browse gear with previews and rarity filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile picker overlay */}
      {activeSlot ? (
        <div className="fixed inset-0 z-50 flex flex-col xl:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={closePicker}
            aria-label="Close picker"
          />
          <div className={cn("relative mt-auto flex max-h-[88vh] flex-col px-2 pb-4 pt-2")}>
            <ItemPicker
              title={pickerTitle}
              items={pickerItems}
              selectedId={pickerSelectedId}
              selectedIds={activeSlot === "mods" ? loadout.modIds : undefined}
              multi={activeSlot === "mods"}
              onSelect={handleSelect}
              onClose={closePicker}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
