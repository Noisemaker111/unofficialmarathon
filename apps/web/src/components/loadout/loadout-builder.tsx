import { useMemo, useState } from "react";
import {
  Cloud,
  Copy,
  Cpu,
  Loader2,
  Save,
  Share2,
} from "lucide-react";

import { BackpackPanel } from "@/components/loadout/backpack-panel";
import { CharacterStage } from "@/components/loadout/character-stage";
import { GearCluster } from "@/components/loadout/gear-cluster";
import { ItemPicker } from "@/components/loadout/item-picker";
import { GearTypeIcon, ImplantSlotIcon } from "@/components/loadout/item-icons";
import { RunnerStatsPanel } from "@/components/loadout/runner-stats-panel";
import { RunnerStrip } from "@/components/loadout/runner-strip";
import type { LoadoutSlotId, PickerItem } from "@/components/loadout/types";
import { calculateLoadoutValue, formatCredits } from "@/components/loadout/loadout-utils";
import { WeaponLoadoutCard } from "@/components/loadout/weapon-loadout-card";
import { getCoreImageUrl, getImplantSlotIcon, getItemImageUrl, getModImageUrl } from "@/lib/gear-images";
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
  const [showShellPicker, setShowShellPicker] = useState(false);

  const runner = playableRunners.find((entry) => entry.id === loadout.runnerId);
  const primary = weapons.find((entry) => entry.id === loadout.primaryWeaponId);
  const secondary = weapons.find((entry) => entry.id === loadout.secondaryWeaponId);
  const core = loadout.coreId ? getCoreById(loadout.coreId) : undefined;
  const secondaryCore = loadout.secondaryCoreId ? getCoreById(loadout.secondaryCoreId) : undefined;
  const backpack = loadout.backpackId ? getItemById(loadout.backpackId) : undefined;
  const equipment = loadout.equipmentId ? getItemById(loadout.equipmentId) : undefined;
  const selectedMods = loadout.modIds.map((id) => getModById(id)).filter(Boolean);
  const loadoutValue = calculateLoadoutValue(loadout);

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

  const getImplant = (slot: ImplantSlot) => {
    const id = loadout.implants[slot];
    return id ? getImplantById(id) : undefined;
  };

  const pickerItems = useMemo((): PickerItem[] => {
    const slot = showShellPicker ? "runner" : activeSlot;
    if (!slot) return [];

    switch (slot) {
      case "runner":
        return playableRunners.map((entry) => ({
          id: entry.id,
          name: entry.name,
          subtitle: entry.archetype,
          imageUrl: entry.renderUrl || entry.imageUrl || undefined,
        }));
      case "core":
      case "core-secondary":
        return compatibleCores.map((entry) => ({
          id: entry.id,
          name: entry.name,
          subtitle: entry.description,
          rarity: entry.rarity,
          imageUrl: getCoreImageUrl(entry.runnerId),
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
            imageUrl: entry.imageUrl ?? getItemImageUrl(entry.id),
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
            imageUrl: entry.imageUrl ?? getItemImageUrl(entry.id),
            icon: <GearTypeIcon type="equipment" className="h-8 w-8" />,
          }));
      case "mods":
        return compatibleMods.map((entry) => ({
          id: entry.id,
          name: entry.name,
          subtitle: entry.slot,
          rarity: entry.rarity,
          imageUrl: getModImageUrl(entry.id),
          icon: <GearTypeIcon type="mod" className="h-8 w-8" />,
        }));
      default:
        if (slot.startsWith("implant-")) {
          const implantSlot = slot.replace("implant-", "") as ImplantSlot;
          return implants
            .filter((entry) => entry.slot === implantSlot)
            .map((entry) => ({
              id: entry.id,
              name: entry.name,
              subtitle: entry.family,
              rarity: entry.rarity,
              imageUrl: getImplantSlotIcon(implantSlot),
              icon: <ImplantSlotIcon slot={implantSlot} className="h-8 w-8" />,
            }));
        }
        return [];
    }
  }, [activeSlot, showShellPicker, compatibleCores, compatibleMods]);

  const openModsForWeapon = (context: "primary" | "secondary") => {
    setModWeaponContext(context);
    setShowShellPicker(false);
    setActiveSlot("mods");
  };

  const openSlot = (slot: LoadoutSlotId) => {
    setShowShellPicker(false);
    setActiveSlot(slot);
  };

  const handleSelect = (id: string) => {
    const slot = showShellPicker ? "runner" : activeSlot;
    if (!slot) return;

    switch (slot) {
      case "runner":
        onChange({ runnerId: id, coreId: undefined, secondaryCoreId: undefined });
        setShowShellPicker(false);
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
        if (slot.startsWith("implant-")) {
          const implantSlot = slot.replace("implant-", "") as ImplantSlot;
          onChange({ implants: { ...loadout.implants, [implantSlot]: id } });
        }
    }
    closePicker();
  };

  const closePicker = () => {
    setActiveSlot(null);
    setModWeaponContext(null);
    setShowShellPicker(false);
  };

  const pickerOpen = Boolean(activeSlot || showShellPicker);
  const currentSlot = showShellPicker ? "runner" : activeSlot;

  const pickerSelectedId =
    currentSlot === "runner" ? loadout.runnerId
    : currentSlot === "core" ? loadout.coreId
    : currentSlot === "core-secondary" ? loadout.secondaryCoreId
    : currentSlot === "primary-weapon" ? loadout.primaryWeaponId
    : currentSlot === "secondary-weapon" ? loadout.secondaryWeaponId
    : currentSlot === "backpack" ? loadout.backpackId
    : currentSlot === "equipment" ? loadout.equipmentId
    : currentSlot?.startsWith("implant-")
      ? loadout.implants[currentSlot.replace("implant-", "") as ImplantSlot]
      : undefined;

  const pickerTitle =
    currentSlot === "mods" && modWeaponContext
      ? `${slotTitles.mods} — ${modWeaponContext === "primary" ? "Weapon 1" : "Weapon 2"}`
      : currentSlot
        ? slotTitles[currentSlot]
        : "Vault";

  return (
    <div className="space-y-0 bg-black text-white">
      {/* Top bar — matches in-game header */}
      <div className="flex flex-col gap-3 border-b border-white/10 px-1 py-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => {
              setShowShellPicker(true);
              setActiveSlot(null);
            }}
            className="text-left"
          >
            <h2 className="font-serif text-4xl font-normal uppercase tracking-wide text-white sm:text-5xl">
              {runner?.name ?? "Select Shell"}
            </h2>
          </button>
          {runner ? (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/40">{runner.archetype}</p>
          ) : null}
        </div>
        <div className="text-left sm:text-right">
          <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">Loadout Value</p>
          <p className="font-mono text-2xl font-medium tabular-nums text-white">
            {formatCredits(loadoutValue)}
            <span className="ml-1 text-sm text-white/40">¢</span>
          </p>
        </div>
      </div>

      {/* Actions row */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 py-3">
        <Input
          value={label}
          onChange={(event) => onLabelChange(event.target.value)}
          placeholder="Build name"
          className="max-w-[200px] rounded-none border-white/15 bg-black font-mono text-xs uppercase"
        />
        <Button type="button" size="sm" variant="outline" className="rounded-none border-white/20 bg-transparent font-mono text-xs uppercase hover:bg-white/5" onClick={onSave} disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-2 h-3.5 w-3.5" />}
          Save
        </Button>
        <Button type="button" size="sm" variant="outline" className="rounded-none border-white/20 bg-transparent font-mono text-xs uppercase hover:bg-white/5" onClick={onShare}>
          <Share2 className="mr-2 h-3.5 w-3.5" /> Share
        </Button>
        <Button type="button" size="sm" variant="outline" className="rounded-none border-white/20 bg-transparent font-mono text-xs uppercase hover:bg-white/5" onClick={onCopyCode}>
          <Copy className="mr-2 h-3.5 w-3.5" /> Code
        </Button>
        {cloudId ? (
          <span className="ml-auto flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-white/35">
            <Cloud className="h-3 w-3" /> {cloudId}
          </span>
        ) : null}
      </div>

      <div className="grid gap-px bg-white/10 lg:grid-cols-[180px_1fr_280px_200px] xl:grid-cols-[200px_minmax(280px,1fr)_minmax(300px,360px)_220px]">
        {/* Left — stats */}
        <div className="bg-black p-4">
          <RunnerStatsPanel
            runner={runner}
            onSelectShell={() => {
              setShowShellPicker(true);
              setActiveSlot(null);
            }}
          />
        </div>

        {/* Center — character */}
        <div className="bg-black">
          <CharacterStage runner={runner} />
        </div>

        {/* Center-right — weapons + gear */}
        <div className="flex flex-col gap-4 bg-black p-4">
          <WeaponLoadoutCard
            index={1}
            weapon={primary}
            mods={primaryMods}
            active={activeSlot === "primary-weapon"}
            isActiveWeapon
            modSlotActive={activeSlot === "mods" && modWeaponContext === "primary"}
            onWeaponClick={() => openSlot("primary-weapon")}
            onModClick={() => openModsForWeapon("primary")}
          />
          <WeaponLoadoutCard
            index={2}
            weapon={secondary}
            mods={secondaryMods}
            active={activeSlot === "secondary-weapon"}
            modSlotActive={activeSlot === "mods" && modWeaponContext === "secondary"}
            onWeaponClick={() => openSlot("secondary-weapon")}
            onModClick={() => openModsForWeapon("secondary")}
          />
          <GearCluster
            equipment={equipment}
            core={core}
            secondaryCore={secondaryCore}
            implants={{
              head: getImplant("head"),
              torso: getImplant("torso"),
              legs: getImplant("legs"),
            }}
            activeSlot={activeSlot ?? undefined}
            onEquipmentClick={() => openSlot("equipment")}
            onCoreClick={() => openSlot("core")}
            onSecondaryCoreClick={() => openSlot("core-secondary")}
            onImplantClick={(slot) => openSlot(`implant-${slot}`)}
          />
        </div>

        {/* Right — backpack + shield */}
        <div className="bg-black p-4">
          <BackpackPanel
            backpack={backpack}
            shield={getImplant("shield")}
            activeSlot={activeSlot ?? undefined}
            onBackpackClick={() => openSlot("backpack")}
            onShieldClick={() => openSlot("implant-shield")}
          />
        </div>
      </div>

      {/* Vault / picker — desktop */}
      <div className="mt-px hidden border-t border-white/10 bg-black xl:block">
        {pickerOpen ? (
          <div className="h-[340px]">
            {showShellPicker ? (
              <div className="border-b border-white/10 p-3">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-white/40">Shell Select</p>
                <RunnerStrip
                  runners={playableRunners}
                  selectedId={loadout.runnerId}
                  onSelect={(id) => {
                    onChange({ runnerId: id, coreId: undefined, secondaryCoreId: undefined });
                    setShowShellPicker(false);
                  }}
                />
              </div>
            ) : null}
            <ItemPicker
              title={pickerTitle}
              items={pickerItems}
              selectedId={pickerSelectedId}
              selectedIds={activeSlot === "mods" ? loadout.modIds : undefined}
              multi={activeSlot === "mods"}
              onSelect={handleSelect}
              onClose={closePicker}
              vaultStyle
            />
          </div>
        ) : (
          <div className="flex h-24 items-center justify-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">
              Click any slot to open the vault
            </p>
          </div>
        )}
      </div>

      {/* Mobile picker */}
      {pickerOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col xl:hidden">
          <button type="button" className="absolute inset-0 bg-black/85" onClick={closePicker} aria-label="Close" />
          <div className="relative mt-auto flex max-h-[90vh] flex-col bg-black px-2 pb-4 pt-2">
            {showShellPicker ? (
              <div className="mb-2 border border-white/10 p-3">
                <RunnerStrip
                  runners={playableRunners}
                  selectedId={loadout.runnerId}
                  onSelect={(id) => {
                    onChange({ runnerId: id, coreId: undefined, secondaryCoreId: undefined });
                    setShowShellPicker(false);
                  }}
                />
              </div>
            ) : null}
            <ItemPicker
              title={pickerTitle}
              items={pickerItems}
              selectedId={pickerSelectedId}
              selectedIds={activeSlot === "mods" ? loadout.modIds : undefined}
              multi={activeSlot === "mods"}
              onSelect={handleSelect}
              onClose={closePicker}
              vaultStyle
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
