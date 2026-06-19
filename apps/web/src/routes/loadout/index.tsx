import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { History, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";
import { api } from "@unofficialmarathon/backend/convex/_generated/api";

import { LoadoutBuilder } from "@/components/loadout/loadout-builder";
import { runners } from "@/data/runners";
import {
  buildLoadoutShareUrl,
  decodeLoadout,
  emptyLoadout,
  encodeLoadout,
  generateLoadoutId,
  type LoadoutState,
} from "@/lib/loadout";

const loadoutSearchSchema = z.object({
  code: z.string().optional(),
  id: z.string().optional(),
});

export const Route = createFileRoute("/loadout/")({
  validateSearch: loadoutSearchSchema,
  component: LoadoutBuilderPage,
});

function LoadoutBuilderPage() {
  const { code, id } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [loadout, setLoadout] = useState<LoadoutState>(emptyLoadout());
  const [label, setLabel] = useState("");
  const [cloudId, setCloudId] = useState<string | undefined>(id);
  const [saving, setSaving] = useState(false);

  const cloudLoadout = useQuery(api.loadouts.getLoadoutByCode, id ? { code: id } : "skip");
  const recentLoadouts = useQuery(api.loadouts.listRecentLoadouts, { limit: 6 });
  const saveLoadout = useMutation(api.loadouts.saveLoadout);

  useEffect(() => {
    if (!code) return;
    const decoded = decodeLoadout(code);
    if (decoded) {
      setLoadout(decoded);
      setLabel(decoded.label ?? "");
      setCloudId(undefined);
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

  const updateLoadout = (patch: Partial<LoadoutState>) => {
    setLoadout((current) => ({ ...current, ...patch }));
  };

  const saveToCloud = async () => {
    setSaving(true);
    try {
      const nextId = cloudId ?? generateLoadoutId();
      await saveLoadout({
        code: nextId,
        payload: encodeLoadout({ ...loadout, label: label || undefined }),
        label: label || undefined,
        runnerId: loadout.runnerId,
      });
      setCloudId(nextId);
      void navigate({ search: { id: nextId } });
      toast.success("Saved");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const copyShareLink = async () => {
    const url = buildLoadoutShareUrl(
      { ...loadout, label: label || undefined },
      window.location.origin,
      cloudId ? { cloudId } : undefined,
    );
    await navigator.clipboard.writeText(url);
    toast.success("Link copied");
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(encodeLoadout({ ...loadout, label: label || undefined }));
    toast.success("Code copied");
  };

  const loadingCloud = Boolean(id) && cloudLoadout === undefined;

  return (
    <div className="min-h-full bg-background marathon-lattice">
      <div className="container mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8">
        <div className="mb-6 border-b border-border/40 pb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/60">Configure</p>
          <h1 className="text-2xl font-black uppercase tracking-tight text-primary sm:text-3xl">Loadout Builder</h1>
          <p className="mt-1 max-w-xl font-mono text-xs text-muted-foreground">
            Plan your shell, weapons, cores, implants, and gear — then save or share your build.
          </p>
        </div>

        {loadingCloud && (
          <div className="mb-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading...
          </div>
        )}

        {recentLoadouts && recentLoadouts.length > 0 && (
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <History className="h-3 w-3" /> Recent
            </span>
            {recentLoadouts.map((entry) => {
              const runner = entry.runnerId ? runners.find((r) => r.id === entry.runnerId) : undefined;
              return (
                <Link
                  key={entry._id}
                  to="/loadout"
                  search={{ id: entry.code }}
                  className="shrink-0 border border-border/40 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase transition-colors hover:border-primary/40"
                >
                  {entry.label || runner?.name || entry.code}
                </Link>
              );
            })}
          </div>
        )}

        <LoadoutBuilder
          loadout={loadout}
          label={label}
          cloudId={cloudId}
          saving={saving}
          onLabelChange={setLabel}
          onChange={updateLoadout}
          onSave={saveToCloud}
          onShare={copyShareLink}
          onCopyCode={copyCode}
        />
      </div>
    </div>
  );
}
