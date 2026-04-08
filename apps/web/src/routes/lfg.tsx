import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/lfg")({
  component: LFGPage,
});

function LFGPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Looking For Group</h1>
      <p className="text-muted-foreground">Find teammates for co-op, speedruns, and multiplayer.</p>
    </div>
  );
}