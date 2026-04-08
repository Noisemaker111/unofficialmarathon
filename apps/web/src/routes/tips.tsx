import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tips")({
  component: TipsPage,
});

function TipsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Tips & Strategies</h1>
      <p className="text-muted-foreground">Quick tips, Vidmaster strategies, and difficulty-specific advice.</p>
    </div>
  );
}