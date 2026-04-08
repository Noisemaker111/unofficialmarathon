# AGENTS.md — Unofficial Marathon Operation Guide

## What We're Building

**Unofficial Marathon** is a community fan site for Bungie's **Marathon (2026)** — the upcoming extraction shooter set on Tau Ceti IV. It serves as a wiki-like hub for weapons, runners, factions, maps, guides, and LFG — the go-to resource for players exploring the 2026 game.

### Planned Pages

| Page | Purpose | Content Source |
|------|---------|----------------|
| **Home** | Landing page with site overview and status | N/A |
| **LFG** | Looking For Group — find teammates for runs, contracts, PvP | Convex real-time sessions |
| **Maps** | Interactive maps for Perimeter, Dire Marsh, Outpost, Cryo Archive | Fandom wiki map data |
| **Guides** | Weapon guides, runner builds, faction breakdowns, implant guides | Fandom wiki structured data |
| **Tips** | Quick tips, runner strategies, extraction survival advice | Community knowledge |

### Primary Data Source

The canonical data source is the **Marathon Wiki on Fandom**: [https://marathonthegame.fandom.com/wiki/Marathon_Wiki](https://marathonthegame.fandom.com/wiki/Marathon_Wiki)

This wiki covers the 2026 extraction shooter and includes:
- **Weapons**: 8 categories (Assault Rifles, Machine Guns, Precision Rifles, Pistols, Railguns, Shotguns, Sniper Rifles, SMGs) + Unique variants
- **Runners**: 7 shell models (Assassin, Destroyer, Vandal, Triage, Recon, Thief, Rook) with abilities, cores, and stats
- **Factions**: 6 factions (Arachne, CyberAcme, NuCaloric, Sekiguchi, Traxus, MIDA)
- **Maps**: 4 zones (Perimeter, Dire Marsh, Outpost, Cryo Archive) with interactive maps
- **Items**: Implants, Backpacks, Keys, Datacards, Consumables, Loot, Valuables
- **PvE**: Combatants that populate Tau Ceti IV

### Note on Classic Trilogy Content

The root `.md` files (`design.md`, `gameplay.md`, `lore.md`, `resources.md`, `style.md`) contain data about the **classic Marathon trilogy (1994–1996)**. While valuable for lore context and design inspiration, they are NOT the primary data source for this site. The site focuses on the 2026 game. Classic trilogy content may be added as a "Lore" section later.

## Architecture

### Monorepo Structure (Turborepo + Bun)

```
unofficialmarathon/
├── apps/
│   └── web/                    # Frontend (React + Vite + TanStack Router)
│       ├── src/
│       │   ├── routes/         # File-based routing
│       │   │   ├── __root.tsx  # Root layout (Header + ThemeProvider)
│       │   │   ├── index.tsx  # Home page
│       │   │   ├── lfg.tsx    # LFG page
│       │   │   ├── maps.tsx   # Maps page
│       │   │   ├── guides.tsx # Guides page
│       │   │   └── tips.tsx   # Tips page
│       │   ├── components/    # App-specific components
│       │   ├── data/          # Typed game data modules
│       │   │   ├── weapons.ts # 2026 weapon stats
│       │   │   ├── runners.ts # Runner shell data
│       │   │   ├── factions.ts# Faction data
│       │   │   └── maps.ts    # Map zone data
│       │   ├── main.tsx       # Entry point (ConvexProvider + Router)
│       │   └── index.css      # Imports shared globals
│       ├── package.json
│       └── vite.config.ts
├── packages/
│   ├── ui/                     # Shared shadcn/ui components
│   │   ├── src/
│   │   │   ├── components/    # Button, Card, Input, etc.
│   │   │   ├── hooks/         # Shared React hooks
│   │   │   ├── lib/           # Utilities (cn, etc.)
│   │   │   └── styles/
│   │   │       └── globals.css # Tailwind v4 + shadcn theme tokens
│   │   └── package.json
│   ├── backend/               # Convex backend
│   │   └── convex/
│   │       ├── schema.ts      # Database schema (currently empty)
│   │       ├── healthCheck.ts # Health check query
│   │       └── _generated/    # Auto-generated Convex types
│   ├── env/                   # Environment variable validation
│   └── config/                # Shared TypeScript config
├── package.json               # Root workspace config
└── turbo.json                 # Turborepo pipeline config
```

### Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Framework** | React 19 | Latest React with concurrent features |
| **Routing** | TanStack Router v1 | File-based routing in `src/routes/` |
| **Styling** | Tailwind CSS v4 | Via `@tailwindcss/vite` plugin |
| **UI Library** | shadcn/ui (`@unofficialmarathon/ui`) | Shared component package; add new primitives via `npx shadcn@latest add -c packages/ui` |
| **Build** | Vite 6 | Fast HMR, modern ESM |
| **Backend** | Convex | Reactive database + server functions |
| **Package Manager** | Bun 1.3 | Fast installs, workspace support |
| **Monorepo** | Turborepo | Orchestrated builds, dev, type-check |
| **Animation** | tw-animate-css | CSS animations for shadcn components |
| **Icons** | Lucide React | Icon library via catalog dependency |

### Key Conventions

**Routing**: TanStack Router file-based. Files in `apps/web/src/routes/` become routes. Add a `lfg.tsx` file → creates `/lfg` route. Use `createFileRoute` for type-safe route definitions.

**Components**: Shared primitives live in `packages/ui/src/components/`. App-specific components live in `apps/web/src/components/`. Import shared components as `@unofficialmarathon/ui/components/button`.

**Styling**: Dark theme by default (`defaultTheme="dark"`). Theme tokens defined in `packages/ui/src/styles/globals.css` using oklch color space. Use shadcn CSS variables (`--background`, `--foreground`, etc.) for all color references. Do NOT hardcode hex colors.

**Convex**: Read `packages/backend/AGENTS.md` and `convex/_generated/ai/guidelines.md` before writing any Convex code. Use `api` from `@unofficialmarathon/backend/convex/_generated/api`. Queries with `useQuery`, mutations with `useMutation`.

**State**: Convex provides real-time reactive state. No need for local state management libraries.

**Theme — 2026 Marathon Aesthetic**: The 2026 Marathon has a dark, industrial sci-fi aesthetic on Tau Ceti IV. Key visual elements:
- **Corporate/faction identity**: Each faction (Arachne, CyberAcme, etc.) has distinct branding
- **Runner shells**: Cybernetic mercenaries with faction-specific designs
- **Industrial environments**: The colony of Tau Ceti IV — derelict, scavenged, hostile
- **Color coding**: Faction colors should distinguish different in-game entities
- **Dark-first**: Default theme is dark, with faction accent colors for highlights
- References from the classic trilogy `style.md` can inform the overall Marathon aesthetic, but the 2026 game has its own visual identity

## Data Extraction Pattern

When converting wiki data to page data:

1. **Prefer typed data structures** over raw HTML rendering
2. **Extract tables** from the Fandom wiki into typed arrays/objects
3. **Use discriminated unions** for entity types (e.g., `type WeaponCategory = "assault_rifle" | "machine_gun" | ...`)
4. **Reference source URLs** from the Fandom wiki for attribution
5. **Keep game-specific terminology** (Runner, Shell, Tau Ceti IV, Implants, Cores, etc.)

## Adding New Pages

### Route Creation

To add a new page (e.g., `/guides`):

1. Create `apps/web/src/routes/guides.tsx`
2. Use `createFileRoute("/guides")` for type safety
3. Import shared components from `@unofficialmarathon/ui`
4. Add link to `apps/web/src/components/header.tsx` links array

### Example Route File

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guides")({
  component: GuidesPage,
});

function GuidesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Page content */}
    </div>
  );
}
```

### Header Navigation

Update `apps/web/src/components/header.tsx` to add new nav links:

```tsx
const links = [
  { to: "/", label: "Home" },
  { to: "/lfg", label: "LFG" },
  { to: "/maps", label: "Maps" },
  { to: "/guides", label: "Guides" },
  { to: "/tips", label: "Tips" },
] as const;
```

### Adding Shared Components

If a component is reusable across pages:

```bash
npx shadcn@latest add accordion -c packages/ui
```

Then import: `import { Accordion } from "@unofficialmarathon/ui/components/accordion";`

If it's app-specific, keep it in `apps/web/src/components/`.

## Development Commands

```bash
# Install dependencies
bun install

# Setup Convex (first time)
bun run dev:setup

# Start all dev servers (web + Convex)
bun run dev

# Start only the web frontend
bun run dev:web

# Type check all packages
bun run check-types

# Build all packages
bun run build
```

## Unresolved Questions

- **LFG real-time features**: Should LFG use Convex real-time subscriptions for live session updates, or poll-based refresh?
- **Map interactivity**: Should maps be SVG-based interactive floor plans, or image-based with hotspot overlays from the Fandom wiki?
- **Content management**: Should game data live in TypeScript modules (developer-friendly) or in Convex tables (editable via admin UI)?
- **Community features**: Should LFG support Discord integration, or remain a standalone tool?
- **Classic trilogy content**: Should we add a dedicated "Lore" section for classic Marathon backstory, or keep the site focused on the 2026 game only?
- **Search**: Should we implement full-text search across guides/data, and if so, should it use Convex search or a client-side solution?