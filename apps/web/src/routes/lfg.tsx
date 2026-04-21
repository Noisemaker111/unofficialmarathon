import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@unofficialmarathon/ui/components/button";
import { Input } from "@unofficialmarathon/ui/components/input";
import { mapZones } from "@/data/maps";
import { runners } from "@/data/runners";
import { Plus, Swords, MapPin, X, Filter, Search, ChevronDown, ChevronRight, Trash2, Radio } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@unofficialmarathon/backend/convex/_generated/api";
import { getSessionToken, isSessionOwner } from "@/lib/session";
import { useLocalPreference } from "@/hooks/use-local-preferences";
import { useLocalHistory } from "@/hooks/use-local-history";

// ─── Image Assets ───────────────────────────────────────────────────────────────
// Using URLs from data files that are already loaded in the app
// Runner shell card images (from runners.ts) — Rook excluded (scavenger shell)
const RUNNER_ICONS: Record<string, string> = {
  Assassin: "https://marathon.wiki.gallery/images/thumb/6/63/Assassin_runner_card.jpg/400px-Assassin_runner_card.jpg",
  Destroyer: "https://marathon.wiki.gallery/images/thumb/a/a5/Destroyer_runner_card.jpg/400px-Destroyer_runner_card.jpg",
  Vandal: "https://marathon.wiki.gallery/images/thumb/c/c2/Vandal_runner_card.jpg/400px-Vandal_runner_card.jpg",
  Triage: "https://marathon.wiki.gallery/images/thumb/a/af/Triage_runner_card.jpg/400px-Triage_runner_card.jpg",
  Recon: "https://marathon.wiki.gallery/images/thumb/6/6e/Recon_runner_card.jpg/400px-Recon_runner_card.jpg",
  Thief: "https://marathon.wiki.gallery/images/thumb/2/2e/Thief_runner_card.jpg/400px-Thief_runner_card.jpg",
};

// Map zone images - currently using placeholder (wiki CORS blocked)
// Could download locally later if needed
const MAP_THUMBNAILS: Record<string, string> = {
  Perimeter: "",
  "Dire Marsh": "",
  Outpost: "",
  "Cryo Archive": "",
};

export const Route = createFileRoute("/lfg")({
  component: LFGPage,
});

// ─── Constants ───────────────────────────────────────────────────────────────

const LEVELS = ["ANY", "1-50", "50-100", "100+", "200+"] as const;
const TEAM_SIZES = [1, 2] as const;
const REGIONS = ["US", "EU"] as const;
const PLATFORMS = ["PC", "Console"] as const;
const KIT_RARITIES = ["Sponsored", "Blue", "Purple/Gold"] as const;
const MAP_NAMES = mapZones.map((z) => z.name);
const GOALS = ["PvP", "Quest", "Keys"] as const;
const PLAYSTYLES = ["Chill", "Comms", "Sweaty", "Learning"] as const;
const PLAYABLE_SHELLS = runners.filter((r) => r.name !== "Rook").map((r) => r.name);

// ─── Types ────────────────────────────────────────────────────────────────────

interface SessionForm {
  hostName: string;
  runner: string;
  level: string;
  maxTeam: number;
  regions: string[];
  platforms: string[];
  kitRarities: string[];
  zones: string[];
  goals: string[];
  playstyles: string[];
  playableShells: string[];
  description: string;
}

interface FilterState {
  level: string;
  region: string;
  zone: string;
  goal: string;
  shell: string;
  platform: string;
  kitRarity: string;
}

// ─── Default form values hydrated from local preferences ──────────────────────
// These are defined outside the component so they can be used in INITIAL_FORM.
// The actual hook values are used inside the component to hydrate state.

const DEFAULT_FORM: SessionForm = {
  hostName: "",
  runner: "Assassin",
  level: "ANY",
  maxTeam: 2,
  regions: [],
  platforms: [],
  kitRarities: [],
  zones: [],
  goals: [],
  playstyles: [],
  playableShells: [],
  description: "",
};

const DEFAULT_FILTERS: FilterState = {
  level: "",
  region: "",
  zone: "",
  goal: "",
  shell: "",
  platform: "",
  kitRarity: "",
};

// ─── Single-Select Card ──────────────────────────────────────────────────────

function CardSelect({
  label,
  options,
  value,
  onChange,
  formatOption,
}: {
  label: string;
  options: readonly string[] | string[];
  value: string;
  onChange: (value: string) => void;
  formatOption?: (option: string) => string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const isActive = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-none border px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-all ${
                isActive
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border/50 bg-background/30 text-muted-foreground hover:border-primary/40 hover:text-primary/80"
              }`}
            >
              {formatOption ? formatOption(option) : option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Multi-Select Chip Input ─────────────────────────────────────────────────

function ChipSelect({
  label,
  options,
  selected,
  onToggle,
  accentClass = "",
  anyOption = false,
}: {
  label: string;
  options: readonly string[] | string[];
  selected: string[];
  onToggle: (value: string) => void;
  accentClass?: string;
  anyOption?: boolean;
}) {
  const isAny = anyOption && selected.length === 0;

  return (
    <div>
      <label className="mb-2 block text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5">
        {anyOption && (
          <button
            type="button"
            onClick={() => {
              // Clear all selections to represent "Any"
              if (!isAny) {
                onToggle("__ANY__");
              }
            }}
            className={`rounded-none border px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-all ${
              isAny
                ? "border-primary bg-primary/20 text-primary"
                : "border-border/50 bg-background/30 text-muted-foreground hover:border-primary/40 hover:text-primary/80"
            }`}
          >
            Any
          </button>
        )}
        {options.map((option) => {
          const isActive = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`rounded-none border px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-all ${
                isActive
                  ? `border-primary bg-primary/15 text-primary ${accentClass}`
                  : "border-border/50 bg-background/30 text-muted-foreground hover:border-primary/40 hover:text-primary/80"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Single-Select with Images (Card Layout) ───────────────────────────────────

function ImageCardSelect({
  label,
  options,
  value,
  onChange,
  images,
}: {
  label: string;
  options: readonly string[] | string[];
  value: string;
  onChange: (value: string) => void;
  images: Record<string, string>;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
        {label}
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {options.map((option) => {
          const isActive = value === option;
          const imageUrl = images[option];
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`group relative flex flex-col items-center justify-end rounded-none border overflow-hidden transition-all aspect-[3/4] ${
                isActive
                  ? "border-primary bg-primary/15 text-primary ring-1 ring-primary/50"
                  : "border-border/50 bg-background/30 text-muted-foreground hover:border-primary/40 hover:text-primary/80"
              }`}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={option}
                  className="absolute inset-0 h-full w-full object-cover object-top opacity-70 group-hover:opacity-90 transition-opacity"
                />
              ) : (
                <div className="absolute inset-0 bg-muted/20" />
              )}
              <span className="relative z-10 w-full bg-background/80 backdrop-blur-sm px-1 py-1 text-center text-[10px] font-mono uppercase tracking-wider leading-tight">
                {option}
              </span>
</button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Multi-Select with Images ─────────────────────────────────────────────────

function ImageChipSelect({
  label,
  options,
  selected,
  onToggle,
  images,
  fallbackIcons,
  accentClass = "",
  anyOption = false,
}: {
  label: string;
  options: readonly string[] | string[];
  selected: string[];
  onToggle: (value: string) => void;
  images: Record<string, string>;
  fallbackIcons?: Record<string, string>;
  accentClass?: string;
  anyOption?: boolean;
}) {
  const isAny = anyOption && selected.length === 0;

  return (
    <div>
      <label className="mb-2 block text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5">
        {anyOption && (
          <button
            type="button"
            onClick={() => {
              if (!isAny) {
                onToggle("__ANY__");
              }
            }}
            className={`rounded-none border px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-all ${
              isAny
                ? "border-primary bg-primary/20 text-primary"
                : "border-border/50 bg-background/30 text-muted-foreground hover:border-primary/40 hover:text-primary/80"
            }`}
          >
            Any
          </button>
        )}
        {options.map((option) => {
          const isActive = selected.includes(option);
          const imageUrl = images[option];
          const fallback = fallbackIcons?.[option];
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`group relative flex items-center gap-1.5 rounded-none border px-2 py-1 text-[11px] font-mono uppercase tracking-wider transition-all ${
                isActive
                  ? `border-primary bg-primary/15 text-primary ${accentClass}`
                  : "border-border/50 bg-background/30 text-muted-foreground hover:border-primary/40 hover:text-primary/80"
              }`}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt=""
                  className="h-4 w-4 object-contain opacity-70 group-hover:opacity-100"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const span = target.nextElementSibling as HTMLElement;
                    if (span) span.style.display = "inline";
                  }}
                />
              ) : null}
              <span style={{ display: imageUrl ? "none" : "inline" }} className={fallback ? "text-sm" : ""}>
                {fallback || option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Filter Chip ─────────────────────────────────────────────────────────────

function FilterChip({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[] | string[];
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 rounded-none border px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all ${
          value
            ? "border-primary bg-primary/15 text-primary"
            : "border-border/50 bg-background/30 text-muted-foreground hover:border-primary/40"
        }`}
      >
        <span className="text-[9px] tracking-[0.15em] opacity-60">{label}:</span>
        <span>{value || "ALL"}</span>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[140px] rounded-none border border-border/50 bg-popover/95 backdrop-blur shadow-xl">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="block w-full px-3 py-1.5 text-left text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:bg-primary/10 hover:text-primary"
          >
            ALL
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`block w-full px-3 py-1.5 text-left text-[11px] font-mono uppercase tracking-wider transition-colors ${
                value === opt
                  ? "bg-primary/15 text-primary"
                  : "text-foreground/80 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Image Filter Chip ─────────────────────────────────────────────────────

function ImageFilterChip({
  label,
  value,
  options,
  onChange,
  images,
  fallbackIcons,
}: {
  label: string;
  value: string;
  options: readonly string[] | string[];
  onChange: (val: string) => void;
  images: Record<string, string>;
  fallbackIcons?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const selectedImage = value ? images[value] : null;
  const fallback = value ? fallbackIcons?.[value] : null;
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 rounded-none border px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all ${
          value
            ? "border-primary bg-primary/15 text-primary"
            : "border-border/50 bg-background/30 text-muted-foreground hover:border-primary/40"
        }`}
      >
        {selectedImage ? (
          <img src={selectedImage} alt="" className="h-3.5 w-3.5 object-contain" />
        ) : fallback ? (
          <span className="text-sm">{fallback}</span>
        ) : null}
        <span className="text-[9px] tracking-[0.15em] opacity-60">{label}:</span>
        <span>{value || "ALL"}</span>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[160px] rounded-none border border-border/50 bg-popover/95 backdrop-blur shadow-xl">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:bg-primary/10 hover:text-primary"
          >
            ALL
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[11px] font-mono uppercase tracking-wider transition-colors ${
                value === opt
                  ? "bg-primary/15 text-primary"
                  : "text-foreground/80 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {images[opt] ? (
                <img src={images[opt]} alt="" className="h-4 w-4 object-contain" />
              ) : fallbackIcons?.[opt] ? (
                <span className="text-sm">{fallbackIcons[opt]}</span>
              ) : null}
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Array Field Helper ───────────────────────────────────────────────────────

function useArrayToggle(
  setForm: React.Dispatch<React.SetStateAction<SessionForm>>,
) {
  return useCallback(
    (field: "zones" | "goals" | "playstyles" | "regions" | "platforms" | "kitRarities", value: string) => {
      setForm((prev) => {
        const arr = prev[field];
        if (value === "__ANY__") {
          // Clear all selections = "Any" (no preference)
          return { ...prev, [field]: [] };
        }
        return {
          ...prev,
          [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
        };
      });
    },
    [setForm],
  );
}

// ─── Create Session Modal ────────────────────────────────────────────────────

function CreateSessionModal({
  form,
  setForm,
  onSubmit,
  onClose,
}: {
  form: SessionForm;
  setForm: React.Dispatch<React.SetStateAction<SessionForm>>;
  onSubmit: () => void;
  onClose: () => void;
}) {
  const toggleArrayField = useArrayToggle(setForm);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md">
      <div className="pointer-events-none fixed inset-0 marathon-scanlines" />

      <div className="relative w-full max-w-2xl mx-4 border border-primary/30 shadow-[0_0_40px_oklch(0.88_0.23_120/10%)] marathon-hud-frame">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-primary/20 bg-card px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 bg-primary marathon-pulse" />
            <h2 className="text-lg font-black uppercase tracking-wider text-primary">
              LFG Post
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-none border border-border/40 p-1.5 text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive hover:bg-destructive/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form body */}
        <div className="bg-card/95 backdrop-blur-sm max-h-[70vh] overflow-y-auto">
          <div className="space-y-5 px-5 py-5">
            {/* Row: Name + Team Size */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                  Runner Name
                </label>
                <Input
                  type="text"
                  value={form.hostName}
                  onChange={(e) => setForm((s) => ({ ...s, hostName: e.target.value }))}
                  placeholder="Your callsign"
                  className="font-mono uppercase tracking-wider bg-background/50 border-border/40 focus:border-primary/60"
                />
              </div>
              <CardSelect
                label="Players Needed"
                options={TEAM_SIZES.map(String)}
                value={String(form.maxTeam)}
                onChange={(v) => setForm((s) => ({ ...s, maxTeam: Number(v) }))}
                formatOption={(opt) => `${opt} player${Number(opt) > 1 ? "s" : ""}`}
              />
            </div>

            {/* Current Shell */}
            <ImageCardSelect
              label="Current Shell"
              options={PLAYABLE_SHELLS}
              value={form.runner}
              onChange={(v) => setForm((s) => ({ ...s, runner: v }))}
              images={RUNNER_ICONS}
            />

            {/* Level */}
            <CardSelect
              label="Level Range"
              options={LEVELS}
              value={form.level}
              onChange={(v) => setForm((s) => ({ ...s, level: v }))}
            />

            {/* More Options toggle */}
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-primary/80 hover:text-primary transition-colors"
            >
              {showMore ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              More Options
            </button>

            {showMore && (
              <div className="space-y-4 border-l-2 border-primary/15 pl-4 ml-1">
                <ChipSelect
                  label="Region"
                  options={REGIONS}
                  selected={form.regions}
                  onToggle={(v) => toggleArrayField("regions", v)}
                />
                <ChipSelect
                  label="Platform"
                  options={PLATFORMS}
                  selected={form.platforms}
                  onToggle={(v) => toggleArrayField("platforms", v)}
                />
                <ChipSelect
                  label="Kit Rarity"
                  options={KIT_RARITIES}
                  selected={form.kitRarities}
                  onToggle={(v) => toggleArrayField("kitRarities", v)}
                  accentClass="text-marathon-amber"
                />
              </div>
            )}

            <hr className="marathon-terminus" />

            {/* Zones */}
            <ImageChipSelect
              label="Zones"
              options={MAP_NAMES}
              selected={form.zones}
              onToggle={(v) => toggleArrayField("zones", v)}
              images={MAP_THUMBNAILS}
            />

            {/* Objectives + Playstyle in a row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <ChipSelect
                label="Objectives"
                options={GOALS}
                selected={form.goals}
                onToggle={(v) => toggleArrayField("goals", v)}
                accentClass="text-marathon-pink"
              />
              <ChipSelect
                label="Playstyle"
                options={PLAYSTYLES}
                selected={form.playstyles}
                onToggle={(v) => toggleArrayField("playstyles", v)}
                accentClass="text-marathon-cyan"
              />
            </div>
          </div>

          {/* Action bar */}
          <div className="flex items-center justify-end border-t border-border/30 bg-card px-5 py-3">
            <div className="flex gap-3">
              <Button variant="ghost" onClick={onClose} className="font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground">
                Abort
              </Button>
              <Button
                variant="default"
                onClick={onSubmit}
                disabled={!form.hostName.trim()}
                className="font-mono uppercase tracking-wider shadow-[0_0_10px_oklch(0.88_0.23_120/15%)]"
              >
                <Plus className="h-3.5 w-3.5" />
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Session Card ────────────────────────────────────────────────────────────

function SessionCard({
  session,
  onJoin,
  onDelete,
  isOwn,
}: {
  session: {
    _id: string;
    _creationTime: number;
    hostName: string;
    runner: string;
    level: string;
    // New array fields
    regions?: string[];
    platforms?: string[];
    kitRarities?: string[];
    // Legacy string fields (backward compat)
    region?: string;
    platform?: string;
    kitRarity?: string;
    zones?: string[];
    goals?: string[];
    playstyles?: string[];
    playableShells?: string[];
    teamSize: number;
    maxTeam: number;
    description: string;
    activity?: string;
    expiresAt?: number;
  };
  onJoin: (id: string) => void;
  onDelete: (id: string) => void;
  isOwn: boolean;
}) {
  const isFull = session.teamSize >= session.maxTeam;
  const expiresIn = session.expiresAt ? getExpiresIn(session.expiresAt) : null;
  const runnerImage = RUNNER_ICONS[session.runner] ?? null;

  // Normalize legacy string fields to arrays
  const normalizedRegions = session.regions ?? (session.region ? [session.region] : []);
  const normalizedPlatforms = session.platforms ?? (session.platform ? [session.platform] : []);
  const normalizedKitRarities = session.kitRarities ?? (session.kitRarity ? [session.kitRarity] : []);

  // Helper: render array badge
  const renderBadges = (
    items: string[] | undefined,
    accentClass: string,
    icon?: React.ReactNode,
  ) =>
    (items ?? []).map((item) => (
      <span
        key={item}
        className={`inline-flex items-center gap-1 rounded-none border border-current/20 bg-current/5 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider ${accentClass}`}
      >
        {icon}
        {item}
      </span>
    ));

  // Calculate age for display (replace "ago" with "old")
  const ageMs = Date.now() - session._creationTime;
  const ageMinutes = Math.floor(ageMs / 60000);
  const ageDisplay = ageMinutes < 10 ? getAgeDisplay(ageMinutes) : null;

  // Render slot tiles
  const renderSlotTiles = () => {
    const tiles = [];
    for (let i = 0; i < session.maxTeam; i++) {
      const isFilled = i < session.teamSize;
      tiles.push(
        <div
          key={i}
          className={`h-2.5 w-2.5 transition-all ${
            isFilled
              ? "bg-primary shadow-[0_0_4px_oklch(0.88_0.23_120/40%)]"
              : "border border-border/40 bg-muted/10"
          }`}
        />
      );
    }
    return tiles;
  };

  return (
    <div className="group relative rounded-none border border-border/40 bg-card/60 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-[0_0_20px_oklch(0.88_0.23_120/8%)] marathon-hud-frame">
      <div className="flex gap-0">
        {/* Left: Runner portrait */}
        {runnerImage && (
          <div className="relative w-20 shrink-0 overflow-hidden border-r border-border/30">
            <img
              src={runnerImage}
              alt={session.runner}
              className="absolute inset-0 h-full w-full object-cover object-top opacity-70 group-hover:opacity-85 transition-opacity"
            />
            {/* Runner name overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-1.5 pb-1.5 pt-4">
              <span className="block text-[9px] font-mono uppercase tracking-wider text-marathon-cyan text-center">
                {session.runner}
              </span>
            </div>
          </div>
        )}

        {/* Right: Content area */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Header row */}
          <div className="flex items-center justify-between gap-3 border-b border-border/30 px-4 py-2.5">
            <div className="flex items-center gap-3 min-w-0">
              <h3 className="text-sm font-black uppercase tracking-wider text-foreground truncate">
                {session.hostName}
              </h3>
              <span className="shrink-0 text-[9px] font-mono uppercase tracking-wider text-muted-foreground/60">
                LVL {session.level}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {/* Slot indicators */}
              <div className="flex items-center gap-1">
                {renderSlotTiles()}
                <span className="ml-1 text-[9px] font-mono text-muted-foreground/50">
                  {session.teamSize}/{session.maxTeam}
                </span>
              </div>
              {expiresIn && ageMinutes < 10 && (
                <span className="text-[9px] font-mono uppercase tracking-wider text-faction-mida marathon-pulse">
                  {expiresIn}
                </span>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 px-4 py-2.5 space-y-2.5">
            {/* Description */}
            {session.description && (
              <p className="text-[11px] font-mono text-muted-foreground/80 leading-relaxed line-clamp-2">
                {session.description}
              </p>
            )}

            {/* Data tags — show "Any" fallback when a category is empty */}
            <div className="flex flex-wrap gap-1.5">
              {(session.zones ?? []).length > 0
                ? renderBadges(session.zones, "text-marathon-cyan", <MapPin className="h-2.5 w-2.5" />)
                : (
                  <span className="inline-flex items-center gap-1 rounded-none border border-marathon-cyan/15 bg-marathon-cyan/5 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-marathon-cyan/50">
                    <MapPin className="h-2.5 w-2.5" />Any Zone
                  </span>
                )}
              {(session.goals ?? []).length > 0
                ? renderBadges(session.goals, "text-marathon-pink", <Swords className="h-2.5 w-2.5" />)
                : (
                  <span className="inline-flex items-center gap-1 rounded-none border border-marathon-pink/15 bg-marathon-pink/5 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-marathon-pink/50">
                    <Swords className="h-2.5 w-2.5" />Any Obj
                  </span>
                )}
              {(session.playstyles ?? []).length > 0
                ? renderBadges(session.playstyles, "text-marathon-amber")
                : (
                  <span className="inline-flex items-center gap-1 rounded-none border border-marathon-amber/15 bg-marathon-amber/5 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-marathon-amber/50">
                    Any Style
                  </span>
                )}
              {renderBadges(session.playableShells, "text-faction-nucaloric")}
            </div>
          </div>

          {/* Action footer */}
          <div className="flex items-center justify-between border-t border-border/20 px-4 py-2">
            {/* Region/Platform meta */}
            <div className="flex items-center gap-2">
              {normalizedRegions.length > 0 && (
                <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/50">
                  {normalizedRegions.join(" / ")}
                </span>
              )}
              {normalizedPlatforms.length > 0 && (
                <>
                  {normalizedRegions.length > 0 && <span className="text-muted-foreground/20">|</span>}
                  <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/50">
                    {normalizedPlatforms.join(" / ")}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isOwn && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(session._id)}
                  className="h-7 px-2.5 font-mono uppercase tracking-wider text-[10px] text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </Button>
              )}
              <Button
                variant={isFull ? "outline" : "default"}
                size="sm"
                onClick={() => onJoin(session._id)}
                disabled={isFull}
                className={`h-7 px-3 font-mono uppercase tracking-wider text-[10px] ${
                  isFull
                    ? "border-border/30 text-muted-foreground opacity-50"
                    : "shadow-[0_0_10px_oklch(0.88_0.23_120/10%)]"
                }`}
              >
                {isFull ? "Full" : "Join"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Utility ─────────────────────────────────────────────────────────────────

function getAgeDisplay(minutes: number): string {
  if (minutes < 1) return "<1m old";
  if (minutes < 60) return `${minutes}m old`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h old`;
  return `${Math.floor(hours / 24)}d old`;
}

function getExpiresIn(expiresAt: number): string | null {
  const remaining = expiresAt - Date.now();
  if (remaining <= 0) return "expired";
  const minutes = Math.floor(remaining / 60000);
  if (minutes <= 0) return "<1m left";
  return `${minutes}m left`;
}

// ─── Main Page ───────────────────────────────────────────────────────────────

function LFGPage() {
  // ── Local-first state ────────────────────────────────────────────────────
  // Session token: unique per browser, used for post ownership
  const ownerToken = useMemo(() => getSessionToken(), []);

  // Remembered preferences: hostName and runner persist across sessions
  const [rememberedName, setRememberedName] = useLocalPreference<string>("lfg-hostName", "");
  const [rememberedRunner, setRememberedRunner] = useLocalPreference<string>("lfg-runner", "Assassin");

  // Day-by-day history: tracks filter selections and post activity
  const filterHistory = useLocalHistory<string>("lfg-filters");
  const postHistory = useLocalHistory<string>("lfg-posts");

  // ── UI state ─────────────────────────────────────────────────────────────
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<SessionForm>({
    ...DEFAULT_FORM,
    hostName: rememberedName || "",
    runner: rememberedRunner || "Assassin",
  });
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTERS });

  // ── Convex queries and mutations ──────────────────────────────────────────
  const allSessions =
    useQuery(api.sessions.listSessions, {
      status: "open",
      activity: undefined,
      zone: filters.zone || undefined,
      level: filters.level || undefined,
      region: filters.region || undefined,
      goal: filters.goal || undefined,
      shell: filters.shell || undefined,
      platform: filters.platform || undefined,
      kitRarity: filters.kitRarity || undefined,
    }) ?? [];

  // Show sessions created by this browser (for delete/edit UI)
  const mySessions = useQuery(api.sessions.listMySessions, { ownerToken }) ?? [];
  const mySessionIds = useMemo(() => new Set(mySessions.map((s) => s._id)), [mySessions]);

  // Hide sessions older than 10 minutes (client-side filter)
  const sessions = allSessions.filter((s) => {
    const ageMs = Date.now() - s._creationTime;
    const ageMinutes = ageMs / 60000;
    return ageMinutes < 10;
  });

  const createSession = useMutation(api.sessions.createSession);
  const deleteSession = useMutation(api.sessions.deleteSession);
  const joinSession = useMutation(api.sessions.joinSession);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleCreate = useCallback(async () => {
    if (!form.hostName.trim()) return;

    // Remember preferences for next time
    setRememberedName(form.hostName.trim());
    setRememberedRunner(form.runner);

    // Record to day-by-day history
    void postHistory.record(form.hostName.trim());

    await createSession({
      hostName: form.hostName.trim(),
      runner: form.runner,
      level: form.level,
      maxTeam: form.maxTeam,
      regions: form.regions,
      platforms: form.platforms,
      kitRarities: form.kitRarities,
      zones: form.zones,
      goals: form.goals,
      playstyles: form.playstyles,
      playableShells: form.playableShells,
      description: form.description.trim(),
      ownerToken,
    });
    setShowCreate(false);
    setForm({
      ...DEFAULT_FORM,
      hostName: form.hostName.trim(),
      runner: form.runner,
    });
  }, [form, createSession, ownerToken, setRememberedName, setRememberedRunner, postHistory]);

  const handleDelete = useCallback(
    async (sessionId: string) => {
      await deleteSession({
        sessionId: sessionId as Parameters<typeof deleteSession>[0]["sessionId"],
        ownerToken,
      });
    },
    [deleteSession, ownerToken],
  );

  const handleJoin = useCallback(
    (sessionId: string) => {
      const runnerName = prompt("Enter your runner name:");
      if (!runnerName?.trim()) return;
      const runner = prompt("Choose your runner:\n\n" + PLAYABLE_SHELLS.join(", ")) ?? "Assassin";
      if (!PLAYABLE_SHELLS.includes(runner)) return;
      void joinSession({
        sessionId: sessionId as Parameters<typeof joinSession>[0]["sessionId"],
        runnerName: runnerName.trim(),
        runner,
        joinerToken: ownerToken,
      });
    },
    [joinSession, ownerToken],
  );

  const updateFilter = useCallback(
    (key: keyof FilterState, value: string) => {
      setFilters((prev) => {
        const next = { ...prev, [key]: value };
        // Record non-empty filter changes to history
        if (value) {
          void filterHistory.record(`${key}:${value}`);
        }
        return next;
      });
    },
    [filterHistory],
  );

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col bg-background marathon-dither overflow-hidden">
      {/* Create session modal */}
      {showCreate && (
        <CreateSessionModal
          form={form}
          setForm={setForm}
          onSubmit={handleCreate}
          onClose={() => setShowCreate(false)}
        />
      )}

{/* Two column layout — fills remaining height */}
      <div className="flex flex-1 gap-8 container mx-auto max-w-6xl px-4 min-h-0">
        {/* Sidebar - Filters — pinned, does not scroll with posts */}
        <div className="w-72 shrink-0 hidden lg:flex lg:flex-col pb-6 overflow-y-auto scrollbar-none">
          <div className="border border-border/30 bg-card/60 backdrop-blur-sm marathon-hud-frame">
              {/* Sidebar header */}
              <div className="flex items-center justify-between border-b border-primary/20 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Filter className="h-3 w-3 text-primary/70" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                    Filters
                  </span>
                </div>
                {(filters.level || filters.region || filters.zone || filters.goal || filters.shell || filters.platform || filters.kitRarity) && (
                  <button
                    type="button"
                    onClick={() => setFilters({ ...DEFAULT_FILTERS })}
                    className="text-[9px] font-mono uppercase tracking-wider text-destructive/70 hover:text-destructive transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="p-3 space-y-4">
                {/* Level */}
                <div>
                  <span className="mb-2 block text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
                    Level
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {LEVELS.filter((l) => l !== "ANY").map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => updateFilter("level", filters.level === lvl ? "" : lvl)}
                        className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                          filters.level === lvl
                            ? "border-primary bg-primary/20 text-primary shadow-[0_0_8px_oklch(0.88_0.23_120/15%)]"
                            : "border-border/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region */}
                <div>
                  <span className="mb-2 block text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
                    Region
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {REGIONS.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => updateFilter("region", filters.region === r ? "" : r)}
                        className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                          filters.region === r
                            ? "border-primary bg-primary/20 text-primary shadow-[0_0_8px_oklch(0.88_0.23_120/15%)]"
                            : "border-border/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Platform */}
                <div>
                  <span className="mb-2 block text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
                    Platform
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PLATFORMS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => updateFilter("platform", filters.platform === p ? "" : p)}
                        className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                          filters.platform === p
                            ? "border-primary bg-primary/20 text-primary shadow-[0_0_8px_oklch(0.88_0.23_120/15%)]"
                            : "border-border/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Kit Rarity */}
                <div>
                  <span className="mb-2 block text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
                    Kit Rarity
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {KIT_RARITIES.map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => updateFilter("kitRarity", filters.kitRarity === k ? "" : k)}
                        className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                          filters.kitRarity === k
                            ? "border-marathon-amber/80 bg-marathon-amber/15 text-marathon-amber shadow-[0_0_8px_oklch(0.75_0.17_70/15%)]"
                            : "border-border/40 text-muted-foreground hover:border-marathon-amber/40 hover:text-foreground"
                        }`}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <hr className="marathon-terminus" />

                {/* Zone */}
                <div>
                  <span className="mb-2 block text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
                    Zone
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {MAP_NAMES.map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={() => updateFilter("zone", filters.zone === z ? "" : z)}
                        className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                          filters.zone === z
                            ? "border-marathon-cyan/80 bg-marathon-cyan/15 text-marathon-cyan shadow-[0_0_8px_oklch(0.72_0.15_195/15%)]"
                            : "border-border/40 text-muted-foreground hover:border-marathon-cyan/40 hover:text-foreground"
                        }`}
                      >
                        {z}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Objective */}
                <div>
                  <span className="mb-2 block text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
                    Objective
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {GOALS.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => updateFilter("goal", filters.goal === g ? "" : g)}
                        className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                          filters.goal === g
                            ? "border-marathon-pink/80 bg-marathon-pink/15 text-marathon-pink shadow-[0_0_8px_oklch(0.65_0.28_340/15%)]"
                            : "border-border/40 text-muted-foreground hover:border-marathon-pink/40 hover:text-foreground"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <hr className="marathon-terminus" />

                {/* Shell */}
                <div>
                  <span className="mb-2 block text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
                    Shell
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {PLAYABLE_SHELLS.map((shell) => (
                      <button
                        key={shell}
                        type="button"
                        onClick={() => updateFilter("shell", filters.shell === shell ? "" : shell)}
                        className={`group relative flex flex-col items-center justify-end overflow-hidden border transition-all aspect-[3/4] ${
                          filters.shell === shell
                            ? "border-primary bg-primary/15 ring-1 ring-primary/40 shadow-[0_0_12px_oklch(0.88_0.23_120/15%)]"
                            : "border-border/40 hover:border-primary/50"
                        }`}
                      >
                        {RUNNER_ICONS[shell] && (
                          <img
                            src={RUNNER_ICONS[shell]}
                            alt={shell}
                            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity ${
                              filters.shell === shell ? "opacity-90" : "opacity-60 group-hover:opacity-80"
                            }`}
                          />
                        )}
                        <span className={`relative z-10 w-full bg-background/80 backdrop-blur-sm px-0.5 py-0.5 text-center text-[8px] font-mono uppercase tracking-wider ${
                          filters.shell === shell ? "text-primary" : "text-muted-foreground"
                        }`}>
                          {shell}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content - sessions — this column scrolls */}
          <div className="flex-1 min-w-0 overflow-y-auto pb-6">
            {/* Page title */}
            <div className="mb-6 pb-4 border-b border-border/30">
              <h1 className="text-3xl font-black uppercase tracking-tighter text-primary">
                Looking For Group
              </h1>
            </div>

            {/* Action bar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="h-2 w-2 bg-primary marathon-pulse" />
                  <div className="absolute inset-0 h-2 w-2 bg-primary/30 animate-ping" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  {sessions.length} active session{sessions.length !== 1 ? "s" : ""}
                </span>
              </div>
              <Button
                variant="default"
                onClick={() => setShowCreate(true)}
                className="font-mono uppercase tracking-wider shadow-[0_0_12px_oklch(0.88_0.23_120/15%)]"
              >
                <Plus className="h-3.5 w-3.5" />
                Post
              </Button>
            </div>

            {/* Session list */}
            <div className="space-y-3">
              {sessions.length === 0 ? (
                <div className="rounded-none border border-border/30 bg-card/30 backdrop-blur-sm p-16 text-center marathon-scanlines relative marathon-hud-frame">
                  <div className="relative z-10 space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center border border-border/30">
                      <Radio className="h-5 w-5 text-muted-foreground/30" />
                    </div>
                    <p className="text-muted-foreground font-mono uppercase tracking-[0.2em] text-xs">
                      No active sessions
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground/40 max-w-xs mx-auto">
                      The feed is quiet. Post a session to find your squad on Tau Ceti IV.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCreate(true)}
                      className="mt-2 font-mono uppercase tracking-wider text-[10px]"
                    >
                      <Plus className="h-3 w-3" />
                      Create Session
                    </Button>
                  </div>
                </div>
              ) : (
                sessions.map((session) => (
                  <SessionCard
                    key={session._id}
                    session={session}
                    onJoin={handleJoin}
                    onDelete={handleDelete}
                    isOwn={mySessionIds.has(session._id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
  );
}