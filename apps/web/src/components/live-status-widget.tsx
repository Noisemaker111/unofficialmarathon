import { useQuery } from "convex/react";
import { api } from "@unofficialmarathon/backend/convex/_generated/api";
import { Activity, Radio, Users } from "lucide-react";

function formatCount(value: number | undefined): string {
  if (value === undefined) return "—";
  return value.toLocaleString();
}

export function LiveStatusWidget({ compact = false }: { compact?: boolean }) {
  const stats = useQuery(api.liveStats.getLiveStats);

  if (compact) {
    return (
      <div className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground lg:flex">
        <span className="flex items-center gap-1" title="Steam concurrent players">
          <Users className="h-3 w-3 text-primary" />
          {formatCount(stats?.steamPlayers)}
        </span>
        <span className="flex items-center gap-1" title="Twitch viewers">
          <Radio className="h-3 w-3 text-primary" />
          {formatCount(stats?.twitchViewers)}
        </span>
        <span className="marathon-pulse h-2 w-2 rounded-full bg-primary" title="Live stats" />
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div className="border border-border/40 bg-background/60 p-4">
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <Users className="h-3.5 w-3.5 text-primary" />
          Steam Players
        </div>
        <p className="font-mono text-2xl font-black text-primary">{formatCount(stats?.steamPlayers)}</p>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground">Live via Steam API</p>
      </div>
      <div className="border border-border/40 bg-background/60 p-4">
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <Radio className="h-3.5 w-3.5 text-primary" />
          Twitch Viewers
        </div>
        <p className="font-mono text-2xl font-black text-primary">{formatCount(stats?.twitchViewers)}</p>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground">
          {stats?.twitchChannels !== undefined ? `${stats.twitchChannels} channels` : "Set Twitch env vars"}
        </p>
      </div>
      <div className="border border-border/40 bg-background/60 p-4">
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <Activity className="h-3.5 w-3.5 text-primary" />
          24h Steam Peak
        </div>
        <p className="font-mono text-2xl font-black">{formatCount(stats?.steamPeak24h)}</p>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground">Tracked since last refresh</p>
      </div>
      <div className="border border-border/40 bg-background/60 p-4">
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <Activity className="h-3.5 w-3.5 text-primary" />
          Record Peaks
        </div>
        <p className="font-mono text-xs text-foreground">
          S1: {formatCount(stats?.season1Peak ?? 88153)}
        </p>
        <p className="font-mono text-xs text-foreground">
          Slam: {formatCount(stats?.serverSlamPeak ?? 143621)}
        </p>
      </div>
    </div>
  );
}
