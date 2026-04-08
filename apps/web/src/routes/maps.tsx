import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/maps")({
  component: MapsPage,
});

function MapsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Level Maps</h1>
      <p className="text-muted-foreground">Interactive maps for Marathon, Marathon 2: Durandal, and Marathon Infinity.</p>
    </div>
  );
}