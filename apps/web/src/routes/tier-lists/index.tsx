import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Cloud, History, Loader2, Save, Share2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";
import { api } from "@unofficialmarathon/backend/convex/_generated/api";

import { DatabasePageShell } from "@/components/database/page-shell";
import { cosmetics } from "@/data/cosmetics";
import { runners } from "@/data/runners";
import { weapons } from "@/data/weapons";
import { useLocalPreference } from "@/hooks/use-local-preferences";
import {
  buildTierListShareUrl,
  decodeTierList,
  emptyTierList,
  generateTierListId,
  moveTierItem,
  tiers,
  type Tier,
  type TierListState,
  type TierListType,
} from "@/lib/tier-list";
import { Button } from "@unofficialmarathon/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";
import { Input } from "@unofficialmarathon/ui/components/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@unofficialmarathon/ui/components/tabs";
import { cn } from "@unofficialmarathon/ui/lib/utils";

const tierSearchSchema = z.object({
  share: z.string().optional(),
  id: z.string().optional(),
  type: z.enum(["weapons", "runners", "cosmetics"]).optional(),
  label: z.string().optional(),
});

export const Route = createFileRoute("/tier-lists/")({
  validateSearch: tierSearchSchema,
  component: TierListsPage,
});

const tierColors: Record<Tier, string> = {
  S: "border-rose-500/50 bg-rose-500/10 text-rose-400",
  A: "border-orange-500/50 bg-orange-500/10 text-orange-400",
  B: "border-amber-500/50 bg-amber-500/10 text-amber-400",
  C: "border-lime-500/50 bg-lime-500/10 text-lime-400",
  D: "border-sky-500/50 bg-sky-500/10 text-sky-400",
  F: "border-muted-foreground/30 bg-muted/20 text-muted-foreground",
};

function createDefaultWeaponTierList(): TierListState {
  return {
    S: ["ares-rg", "v99-channel-rifle"],
    A: ["impact-h-ar", "m77-assault-rifle", "bully-smg", "hardline-pr"],
    B: ["overrun-ar", "brrt-smg", "longshot", "v66-lookout"],
    C: ["copperhead-rf", "ce-tactical-sidearm", "retaliator-lmg"],
    D: ["repeater-hpr"],
    F: [],
  };
}

function createDefaultRunnerTierList(): TierListState {
  return {
    S: ["assassin", "recon"],
    A: ["destroyer", "triage"],
    B: ["vandal", "thief"],
    C: ["sentinel"],
    D: ["rook"],
    F: [],
  };
}

function createDefaultCosmeticTierList(): TierListState {
  return {
    S: ["runner-skin-assassin-achromatic-rush", "emblem-achromatic-rush"],
    A: ["runner-skin-destroyer-jagged-purpose", "weapon-skin-v75-scar-achromatic-rush"],
    B: ["runner-skin-vandal-satiated-bliss", "background-night-marsh"],
    C: ["runner-skin-sentinel-retro-remix"],
    D: [],
    F: [],
  };
}

function TierBoard({
  title,
  items,
  getName,
  tierList,
  onMove,
}: {
  title: string;
  items: { id: string; name: string }[];
  getName: (id: string) => string;
  tierList: TierListState;
  onMove: (id: string, tier: Tier) => void;
}) {
  const assigned = new Set(tiers.flatMap((tier) => tierList[tier]));
  const unassigned = items.filter((item) => !assigned.has(item.id));

  return (
    <div className="space-y-4">
      <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-primary">{title}</h2>
      {tiers.map((tier) => (
        <div key={tier} className={cn("rounded-none border p-4", tierColors[tier])}>
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xl font-black">{tier}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest">{tierList[tier].length} items</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tierList[tier].map((id) => (
              <div key={id} className="flex items-center gap-2 rounded-none border border-border/40 bg-background/80 px-2 py-1">
                <span className="font-mono text-xs uppercase">{getName(id)}</span>
                <select
                  value={tier}
                  onChange={(event) => onMove(id, event.target.value as Tier)}
                  className="rounded-none border border-border/40 bg-background px-1 py-0.5 font-mono text-[10px]"
                >
                  {tiers.map((entry) => (
                    <option key={entry} value={entry}>{entry}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      ))}
      {unassigned.length > 0 && (
        <Card className="rounded-none border-border/50 bg-background/80">
          <CardHeader>
            <CardTitle className="font-mono text-sm uppercase tracking-wider text-primary">Unranked</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {unassigned.map((item) => (
              <div key={item.id} className="flex items-center gap-2 rounded-none border border-border/40 px-2 py-1">
                <span className="font-mono text-xs uppercase">{item.name}</span>
                <select
                  defaultValue=""
                  onChange={(event) => event.target.value && onMove(item.id, event.target.value as Tier)}
                  className="rounded-none border border-border/40 bg-background px-1 py-0.5 font-mono text-[10px]"
                >
                  <option value="">Rank</option>
                  {tiers.map((entry) => (
                    <option key={entry} value={entry}>{entry}</option>
                  ))}
                </select>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function TierListsPage() {
  const { share, id, type: searchType, label: searchLabel } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [weaponTiers, setWeaponTiers] = useLocalPreference<TierListState>("tier-weapons", createDefaultWeaponTierList());
  const [runnerTiers, setRunnerTiers] = useLocalPreference<TierListState>("tier-runners", createDefaultRunnerTierList());
  const [cosmeticTiers, setCosmeticTiers] = useLocalPreference<TierListState>("tier-cosmetics", createDefaultCosmeticTierList());
  const [activeTab, setActiveTab] = useState<TierListType>("weapons");
  const [label, setLabel] = useState("");
  const [cloudId, setCloudId] = useState<string | undefined>(id);
  const [saving, setSaving] = useState(false);

  const cloudTierList = useQuery(api.tierLists.getTierListByCode, id ? { code: id } : "skip");
  const recentTierLists = useQuery(api.tierLists.listRecentTierLists, { limit: 6 });
  const saveTierList = useMutation(api.tierLists.saveTierList);

  useEffect(() => {
    if (!share) return;
    const decoded = decodeTierList(share);
    if (!decoded) return;
    if (decoded.type === "weapons") setWeaponTiers(decoded.payload);
    if (decoded.type === "runners") setRunnerTiers(decoded.payload);
    if (decoded.type === "cosmetics") setCosmeticTiers(decoded.payload);
    setActiveTab(decoded.type);
    setCloudId(undefined);
  }, [share, setWeaponTiers, setRunnerTiers, setCosmeticTiers]);

  useEffect(() => {
    if (!id || !cloudTierList) return;
    try {
      const payload = JSON.parse(cloudTierList.payload) as TierListState;
      if (cloudTierList.type === "weapons") setWeaponTiers(payload);
      if (cloudTierList.type === "runners") setRunnerTiers(payload);
      if (cloudTierList.type === "cosmetics") setCosmeticTiers(payload);
      setActiveTab(cloudTierList.type);
      setLabel(cloudTierList.label ?? searchLabel ?? "");
      setCloudId(id);
    } catch {
      // ignore invalid payload
    }
  }, [id, cloudTierList, searchLabel, setWeaponTiers, setRunnerTiers, setCosmeticTiers]);

  const currentState = activeTab === "weapons" ? weaponTiers : activeTab === "runners" ? runnerTiers : cosmeticTiers;

  const shareUrl = useMemo(() => {
    return buildTierListShareUrl(activeTab, currentState, typeof window !== "undefined" ? window.location.origin : "", {
      cloudId,
      label: label || undefined,
    });
  }, [activeTab, currentState, cloudId, label]);

  const saveToCloud = async () => {
    setSaving(true);
    try {
      const nextId = cloudId ?? generateTierListId();
      await saveTierList({
        code: nextId,
        type: activeTab,
        payload: JSON.stringify(currentState),
        label: label || undefined,
      });
      setCloudId(nextId);
      void navigate({ search: { id: nextId, type: activeTab, label: label || undefined } });
      toast.success("Tier list saved to cloud");
    } catch {
      toast.error("Failed to save tier list");
    } finally {
      setSaving(false);
    }
  };

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Tier list link copied");
  };

  const weaponName = useMemo(() => {
    const map = new Map(weapons.map((weapon) => [weapon.id, weapon.name]));
    return (entryId: string) => map.get(entryId) ?? entryId;
  }, []);

  const runnerName = useMemo(() => {
    const map = new Map(runners.map((runner) => [runner.id, runner.name]));
    return (entryId: string) => map.get(entryId) ?? entryId;
  }, []);

  const cosmeticName = useMemo(() => {
    const map = new Map(cosmetics.map((entry) => [entry.id, entry.name]));
    return (entryId: string) => map.get(entryId) ?? entryId;
  }, []);

  const loadingCloud = Boolean(id) && cloudTierList === undefined;

  return (
    <DatabasePageShell
      title="Tier Lists"
      description="Rank weapons, runners, and cosmetics."
      actions={
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" className="rounded-none font-mono uppercase" onClick={saveToCloud} disabled={saving || loadingCloud}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Cloud
          </Button>
          <Button type="button" variant="outline" size="sm" className="rounded-none font-mono uppercase" onClick={copyShareLink}>
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      }
    >
      <Card className="mb-6 rounded-none border-border/50 bg-background/80">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono text-sm uppercase tracking-wider text-primary">List Name</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="e.g. Season 2 PvP Meta"
            className="rounded-none font-mono"
          />
          {cloudId && (
            <p className="mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">
              <Cloud className="h-3 w-3" /> Cloud ID: {cloudId}
            </p>
          )}
        </CardContent>
      </Card>

      {loadingCloud && (
        <div className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading cloud tier list...
        </div>
      )}

      {recentTierLists && recentTierLists.length > 0 && (
        <Card className="mb-6 rounded-none border-border/50 bg-background/80">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-primary">
              <History className="h-4 w-4" />
              Recent Cloud Lists
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {recentTierLists.map((entry) => (
              <button
                key={entry._id}
                type="button"
                onClick={() => void navigate({ search: { id: entry.code, type: entry.type, label: entry.label } })}
                className="border border-border/40 bg-background/60 p-3 text-left transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                <p className="truncate font-mono text-xs font-bold uppercase text-foreground">
                  {entry.label || entry.code}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{entry.type}</p>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TierListType)} className="w-full">
        <TabsList className="grid w-full max-w-lg grid-cols-3 rounded-none bg-muted/20 p-1 border border-border/50">
          <TabsTrigger value="weapons" className="rounded-none font-mono uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Weapons
          </TabsTrigger>
          <TabsTrigger value="runners" className="rounded-none font-mono uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Runners
          </TabsTrigger>
          <TabsTrigger value="cosmetics" className="rounded-none font-mono uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Cosmetics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weapons" className="mt-8">
          <TierBoard
            title="Weapon Tier List"
            items={weapons.map((weapon) => ({ id: weapon.id, name: weapon.name }))}
            getName={weaponName}
            tierList={weaponTiers}
            onMove={(entryId, tier) => setWeaponTiers(moveTierItem(weaponTiers, entryId, tier))}
          />
        </TabsContent>

        <TabsContent value="runners" className="mt-8">
          <TierBoard
            title="Runner Tier List"
            items={runners.map((runner) => ({ id: runner.id, name: runner.name }))}
            getName={runnerName}
            tierList={runnerTiers}
            onMove={(entryId, tier) => setRunnerTiers(moveTierItem(runnerTiers, entryId, tier))}
          />
        </TabsContent>

        <TabsContent value="cosmetics" className="mt-8">
          <TierBoard
            title="Cosmetic Tier List"
            items={cosmetics.map((entry) => ({ id: entry.id, name: entry.name }))}
            getName={cosmeticName}
            tierList={cosmeticTiers}
            onMove={(entryId, tier) => setCosmeticTiers(moveTierItem(cosmeticTiers, entryId, tier))}
          />
        </TabsContent>
      </Tabs>
    </DatabasePageShell>
  );
}
