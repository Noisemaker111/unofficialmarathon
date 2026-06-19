import { useQuery } from "convex/react";
import { api } from "@unofficialmarathon/backend/convex/_generated/api";
import { Radio, Users } from "lucide-react";

function formatCount(value: number | undefined): string {
  if (value === undefined) return "—";
  return value.toLocaleString();
}

export function LiveStatusWidget({ compact = false }: { compact?: boolean }) {
  const stats = useQuery(api.liveStats.getLiveStats);

  if (compact) {
    return (
      <div className="hidden items-center gap-2.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground md:flex">
        <span className="flex items-center gap-1" title="Steam players">
          <Users className="h-3 w-3 text-primary" />
          {formatCount(stats?.steamPlayers)}
        </span>
        <span className="flex items-center gap-1" title="Twitch viewers">
          <Radio className="h-3 w-3 text-primary" />
          {formatCount(stats?.twitchViewers)}
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <Stat label="Steam" value={formatCount(stats?.steamPlayers)} />
      <Stat label="Twitch" value={formatCount(stats?.twitchViewers)} />
      <Stat label="24h Peak" value={formatCount(stats?.steamPeak24h)} />
      <Stat label="S1 Peak" value={formatCount(stats?.season1Peak ?? 88153)} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border/40 bg-background/60 px-3 py-2.5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-mono text-xl font-black text-primary">{value}</p>
    </div>
  );
}
