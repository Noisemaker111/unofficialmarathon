import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guides")({
  component: GuidesPage,
});

function GuidesPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Guides</h1>
      <p className="text-muted-foreground">Comprehensive gameplay guides for the Marathon trilogy.</p>
    </div>
  );
}