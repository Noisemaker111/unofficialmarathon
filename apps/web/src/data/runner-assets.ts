/** Local runner assets sourced from Bungie press kits via marathon.wiki.gallery */

export interface RunnerAssetSet {
  card: string;
  render: string;
}

export const runnerAssets: Record<string, RunnerAssetSet> = {
  assassin: {
    card: "/assets/runners/assassin-card.jpg",
    render: "/assets/runners/assassin-render.jpg",
  },
  destroyer: {
    card: "/assets/runners/destroyer-card.jpg",
    render: "/assets/runners/destroyer-render.jpg",
  },
  vandal: {
    card: "/assets/runners/vandal-card.jpg",
    render: "/assets/runners/vandal-render.jpg",
  },
  triage: {
    card: "/assets/runners/triage-card.jpg",
    render: "/assets/runners/triage-render.jpg",
  },
  recon: {
    card: "/assets/runners/recon-card.jpg",
    render: "/assets/runners/recon-render.jpg",
  },
  thief: {
    card: "/assets/runners/thief-card.jpg",
    render: "/assets/runners/thief-render.jpg",
  },
  rook: {
    card: "/assets/runners/rook-card.jpg",
    render: "/assets/runners/rook-render.jpg",
  },
  sentinel: {
    card: "/assets/runners/sentinel-card.png",
    render: "/assets/runners/sentinel-render.png",
  },
};

export function getRunnerAssets(runnerId: string): RunnerAssetSet | undefined {
  return runnerAssets[runnerId];
}
