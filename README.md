# unofficialmarathon

Unofficial Marathon is a community fan site for Bungie's Marathon (2026), built as a Bun/Turborepo monorepo with a React + Vite frontend and a Convex backend.

## Stack

- React 19
- TanStack Router
- Tailwind CSS v4
- shadcn/ui in `packages/ui`
- Convex in `packages/backend`
- Bun workspaces + Turborepo

## Local Development

Install dependencies:

```bash
bun install
```

Configure a development Convex deployment:

```bash
bun run dev:setup
```

Set the frontend env in `apps/web/.env`:

```bash
VITE_CONVEX_URL=https://your-dev-deployment.convex.cloud
```

Run the app:

```bash
bun run dev
```

## Production Deployment

### Convex

Create or select the production deployment, then deploy the backend from the repo root:

```bash
npx convex deploy
```

Copy the production URL into Vercel as:

```bash
VITE_CONVEX_URL=https://your-production-deployment.convex.cloud
```

### Vercel

This repo includes a root `vercel.json` configured for the monorepo:

- install command: `bun install`
- build command: `bun run build:web`
- output directory: `apps/web/dist`
- SPA rewrite to `index.html` for TanStack Router client routes

After importing the GitHub repo into Vercel, set `VITE_CONVEX_URL` in the Vercel project environment variables and deploy.

## Scripts

- `bun run dev`
- `bun run build`
- `bun run build:web`
- `bun run check-types`
- `bun run dev:web`
- `bun run dev:server`
- `bun run dev:setup`
