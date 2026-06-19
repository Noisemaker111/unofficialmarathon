import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Cloud, Copy, History, Link2, Loader2, Save, Share2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";
import { api } from "@unofficialmarathon/backend/convex/_generated/api";

import { DatabasePageShell } from "@/components/database/page-shell";
import { getCoreById, cores } from "@/data/cores";
import { getImplantById, implants } from "@/data/implants";
import { getItemById, items } from "@/data/items";
import { getModById, mods } from "@/data/mods";
import { runners } from "@/data/runners";
import { weapons } from "@/data/weapons";
import type { ImplantSlot } from "@/data/types";
import {
  buildLoadoutShareUrl,
  decodeLoadout,
  emptyLoadout,
  encodeLoadout,
  generateLoadoutId,
  normalizeLoadout,
  type LoadoutState,
} from "@/lib/loadout";
import { Badge } from "@unofficialmarathon/ui/components/badge";
import { Button } from "@unofficialmarathon/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";
import { Input } from "@unofficialmarathon/ui/components/input";
import { Label } from "@unofficialmarathon/ui/components/label";

const loadoutSearchSchema = z.object({
  code: z.string().optional(),
  id: z.string().optional(),
});

export const Route = createFileRoute("/loadout/")({
  validateSearch: loadoutSearchSchema,
  component: LoadoutBuilderPage,
});

const implantSlotList: ImplantSlot[] = ["head", "torso", "legs", "shield"];

function SlotSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value?: string;
  options: { id: string; name: string }[];
  onChange: (value: string | undefined) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="font-mono text-xs uppercase tracking-wider text-primary">{label}</Label>
      <select
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value || undefined)}
        className="w-full rounded-none border border-border/50 bg-background px-3 py-2 font-mono text-sm"
      >
        <option value="">— None —</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
}

function LoadoutBuilderPage() {
  const { code, id } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [loadout, setLoadout] = useState<LoadoutState>(emptyLoadout());
  const [label, setLabel] = useState("");
  const [cloudId, setCloudId] = useState<string | undefined>(id);
  const [saving, setSaving] = useState(false);

  const cloudLoadout = useQuery(
    api.loadouts.getLoadoutByCode,
    id ? { code: id } : "skip",
  );
  const recentLoadouts = useQuery(api.loadouts.listRecentLoadouts, { limit: 8 });
  const saveLoadout = useMutation(api.loadouts.saveLoadout);

  useEffect(() => {
    if (code) {
      const decoded = decodeLoadout(code);
      if (decoded) {
        setLoadout(decoded);
        setLabel(decoded.label ?? "");
        setCloudId(undefined);
      }
    }
  }, [code]);

  useEffect(() => {
    if (!id || !cloudLoadout) return;
    const decoded = decodeLoadout(cloudLoadout.payload);
    if (decoded) {
      setLoadout(decoded);
      setLabel(cloudLoadout.label ?? decoded.label ?? "");
      setCloudId(id);
    }
  }, [id, cloudLoadout]);

  const shareUrl = useMemo(() => {
    return buildLoadoutShareUrl(
      { ...loadout, label: label || undefined },
      typeof window !== "undefined" ? window.location.origin : "",
      cloudId ? { cloudId } : undefined,
    );
  }, [loadout, label, cloudId]);

  const selectedRunner = runners.find((runner) => runner.id === loadout.runnerId);
  const primaryWeapon = weapons.find((weapon) => weapon.id === loadout.primaryWeaponId);
  const secondaryWeapon = weapons.find((weapon) => weapon.id === loadout.secondaryWeaponId);
  const selectedCore = loadout.coreId ? getCoreById(loadout.coreId) : undefined;
  const selectedBackpack = loadout.backpackId ? getItemById(loadout.backpackId) : undefined;
  const selectedEquipment = loadout.equipmentId ? getItemById(loadout.equipmentId) : undefined;
  const selectedImplants = implantSlotList
    .map((slot) => ({ slot, implant: loadout.implants[slot] ? getImplantById(loadout.implants[slot]!) : undefined }))
    .filter((entry) => entry.implant);
  const selectedMods = loadout.modIds.map((entryId) => getModById(entryId)).filter(Boolean);

  const compatibleCores = loadout.runnerId ? cores.filter((core) => core.runnerId === loadout.runnerId) : cores;
  const backpackOptions = items.filter((item) => item.type === "backpack");
  const equipmentOptions = items.filter((item) => item.type === "equipment");

  const updateLoadout = (patch: Partial<LoadoutState>) => {
    setLoadout((current) => ({ ...current, ...patch }));
  };

  const saveToCloud = async () => {
    setSaving(true);
    try {
      const nextId = cloudId ?? generateLoadoutId();
      const payload = encodeLoadout({ ...loadout, label: label || undefined });
      await saveLoadout({
        code: nextId,
        payload,
        label: label || undefined,
        runnerId: loadout.runnerId,
      });
      setCloudId(nextId);
      void navigate({ search: { id: nextId } });
      toast.success("Loadout saved to cloud");
    } catch {
      toast.error("Failed to save loadout");
    } finally {
      setSaving(false);
    }
  };

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Loadout link copied");
  };

  const copyCode = async () => {
    const encoded = encodeLoadout({ ...loadout, label: label || undefined });
    await navigator.clipboard.writeText(encoded);
    toast.success("Inline loadout code copied");
  };

  const loadingCloud = Boolean(id) && cloudLoadout === undefined;

  return (
    <DatabasePageShell
      label="TC4-SYS://LOADOUT.BUILDER"
      title="Loadout Builder"
      description="Plan your runner, weapons, core, implants, mods, and gear. Save to the cloud and share with your LFG squad."
      actions={
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            className="rounded-none font-mono uppercase"
            onClick={saveToCloud}
            disabled={saving || loadingCloud}
          >
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Cloud
          </Button>
          <Button type="button" variant="outline" size="sm" className="rounded-none font-mono uppercase" onClick={copyShareLink}>
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button type="button" variant="outline" size="sm" className="rounded-none font-mono uppercase" onClick={copyCode}>
            <Copy className="mr-2 h-4 w-4" /> Inline Code
          </Button>
        </div>
      }
    >
      {loadingCloud && (
        <div className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading cloud loadout...
        </div>
      )}

      {recentLoadouts && recentLoadouts.length > 0 && (
        <Card className="mb-6 rounded-none border-border/50 bg-background/80">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-primary">
              <History className="h-4 w-4" />
              Recent Cloud Builds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {recentLoadouts.map((entry) => {
                const runner = entry.runnerId ? runners.find((r) => r.id === entry.runnerId) : undefined;
                return (
                  <Link
                    key={entry._id}
                    to="/loadout"
                    search={{ id: entry.code }}
                    className="block border border-border/40 bg-background/60 p-3 transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    <p className="truncate font-mono text-xs font-bold uppercase text-foreground">
                      {entry.label || entry.code}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {runner?.name ?? "Unknown Runner"}
                    </p>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="rounded-none border-border/50 bg-background/80">
            <CardHeader>
              <CardTitle className="font-mono uppercase tracking-wider text-primary">Build Name</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                placeholder="e.g. Aggressive Assassin Push"
                className="rounded-none font-mono"
              />
            </CardContent>
          </Card>

          <Card className="rounded-none border-border/50 bg-background/80">
            <CardHeader>
              <CardTitle className="font-mono uppercase tracking-wider text-primary">Runner & Weapons</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <SlotSelect
                label="Runner"
                value={loadout.runnerId}
                options={runners.map((runner) => ({ id: runner.id, name: runner.name }))}
                onChange={(runnerId) => updateLoadout({ runnerId, coreId: undefined })}
              />
              <SlotSelect
                label="Core"
                value={loadout.coreId}
                options={compatibleCores.map((core) => ({ id: core.id, name: core.name }))}
                onChange={(coreId) => updateLoadout({ coreId })}
              />
              <SlotSelect
                label="Primary Weapon"
                value={loadout.primaryWeaponId}
                options={weapons.map((weapon) => ({ id: weapon.id, name: weapon.name }))}
                onChange={(primaryWeaponId) => updateLoadout({ primaryWeaponId })}
              />
              <SlotSelect
                label="Secondary Weapon"
                value={loadout.secondaryWeaponId}
                options={weapons.map((weapon) => ({ id: weapon.id, name: weapon.name }))}
                onChange={(secondaryWeaponId) => updateLoadout({ secondaryWeaponId })}
              />
            </CardContent>
          </Card>

          <Card className="rounded-none border-border/50 bg-background/80">
            <CardHeader>
              <CardTitle className="font-mono uppercase tracking-wider text-primary">Implants</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {implantSlotList.map((slot) => (
                <SlotSelect
                  key={slot}
                  label={slot}
                  value={loadout.implants[slot]}
                  options={implants.filter((implant) => implant.slot === slot).map((implant) => ({ id: implant.id, name: implant.name }))}
                  onChange={(implantId) =>
                    updateLoadout({
                      implants: { ...loadout.implants, [slot]: implantId },
                    })
                  }
                />
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-none border-border/50 bg-background/80">
            <CardHeader>
              <CardTitle className="font-mono uppercase tracking-wider text-primary">Gear & Mods</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <SlotSelect
                label="Backpack"
                value={loadout.backpackId}
                options={backpackOptions.map((item) => ({ id: item.id, name: item.name }))}
                onChange={(backpackId) => updateLoadout({ backpackId })}
              />
              <SlotSelect
                label="Equipment"
                value={loadout.equipmentId}
                options={equipmentOptions.map((item) => ({ id: item.id, name: item.name }))}
                onChange={(equipmentId) => updateLoadout({ equipmentId })}
              />
              <div className="md:col-span-2 space-y-2">
                <Label className="font-mono text-xs uppercase tracking-wider text-primary">Weapon Mods</Label>
                <select
                  multiple
                  value={loadout.modIds}
                  onChange={(event) => {
                    const selected = Array.from(event.target.selectedOptions).map((option) => option.value);
                    updateLoadout({ modIds: selected });
                  }}
                  className="min-h-32 w-full rounded-none border border-border/50 bg-background px-3 py-2 font-mono text-sm"
                >
                  {mods.map((mod) => (
                    <option key={mod.id} value={mod.id}>{mod.name} ({mod.slot})</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit rounded-none border-primary/30 bg-primary/5 lg:sticky lg:top-4">
          <CardHeader>
            <CardTitle className="font-mono uppercase tracking-wider text-primary">Loadout Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 font-mono text-xs">
            {cloudId && (
              <div className="flex items-center gap-2 text-primary">
                <Cloud className="h-3 w-3" />
                <span className="uppercase tracking-widest">Cloud ID: {cloudId}</span>
              </div>
            )}
            {label && <p className="text-sm font-bold uppercase text-foreground">{label}</p>}
            <div>
              <p className="text-muted-foreground uppercase">Runner</p>
              <p className="text-primary">{selectedRunner?.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground uppercase">Core</p>
              <p>{selectedCore?.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground uppercase">Weapons</p>
              <p>{primaryWeapon?.name ?? "—"}</p>
              <p>{secondaryWeapon?.name ?? "—"}</p>
            </div>
            <div>
              <p className="mb-2 text-muted-foreground uppercase">Implants</p>
              <div className="flex flex-wrap gap-1">
                {selectedImplants.length === 0 ? (
                  <span>—</span>
                ) : (
                  selectedImplants.map(({ slot, implant }) => (
                    <Badge key={slot} variant="outline" className="rounded-none text-[10px]">{implant!.name}</Badge>
                  ))
                )}
              </div>
            </div>
            <div>
              <p className="mb-2 text-muted-foreground uppercase">Mods</p>
              <div className="flex flex-wrap gap-1">
                {selectedMods.length === 0 ? (
                  <span>—</span>
                ) : (
                  selectedMods.map((mod) => (
                    <Badge key={mod!.id} variant="secondary" className="rounded-none text-[10px]">{mod!.name}</Badge>
                  ))
                )}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground uppercase">Backpack</p>
              <p>{selectedBackpack?.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground uppercase">Equipment</p>
              <p>{selectedEquipment?.name ?? "—"}</p>
            </div>
            <div className="border-t border-border/40 pt-4">
              <p className="mb-2 flex items-center gap-1 text-muted-foreground uppercase">
                <Link2 className="h-3 w-3" /> Share Link
              </p>
              <p className="break-all text-[10px] text-muted-foreground">{shareUrl}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DatabasePageShell>
  );
}
