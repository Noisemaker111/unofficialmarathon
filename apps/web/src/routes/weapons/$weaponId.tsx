import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Star } from "lucide-react";

import { DatabasePageShell } from "@/components/database/page-shell";
import { getModsForWeapon } from "@/data/mods";
import { getWeaponById, weaponCategories } from "@/data/weapons";
import { Badge } from "@unofficialmarathon/ui/components/badge";
import { buttonVariants } from "@unofficialmarathon/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@unofficialmarathon/ui/components/card";
import { cn } from "@unofficialmarathon/ui/lib/utils";

export const Route = createFileRoute("/weapons/$weaponId")({
  component: WeaponDetailPage,
});

function WeaponDetailPage() {
  const { weaponId } = Route.useParams();
  const weapon = getWeaponById(weaponId);
  const compatibleMods = weapon ? getModsForWeapon(weapon.id) : [];

  if (!weapon) {
    return (
      <DatabasePageShell
        title="Weapon Not Found"
        description="Not in database."
      >
        <Link to="/weapons" className={cn(buttonVariants({ variant: "outline" }), "rounded-none font-mono uppercase")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Weapons
        </Link>
      </DatabasePageShell>
    );
  }

  const categoryLabel = weaponCategories.find((entry) => entry.value === weapon.category)?.label;

  return (
    <DatabasePageShell
      title={weapon.name}
      description={weapon.category.replace("_", " ")}
      actions={
        <Link to="/weapons" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-none font-mono uppercase")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> All Weapons
        </Link>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="rounded-none border-border/50 bg-background/80">
          <CardContent className="space-y-4 pt-6">
            {weapon.imageUrl ? (
              <img src={weapon.imageUrl} alt={weapon.name} className="mx-auto h-40 object-contain" />
            ) : (
              <div className="flex h-40 items-center justify-center border border-dashed border-border/50 font-mono text-xs text-muted-foreground">
                Image pending
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="rounded-none font-mono text-[10px] uppercase">{categoryLabel}</Badge>
              <Badge variant="outline" className="rounded-none font-mono text-[10px]">{weapon.ammoType}</Badge>
              {weapon.unique && (
                <Badge variant="outline" className="rounded-none font-mono text-[10px] text-primary border-primary/40">
                  <Star className="mr-1 h-3 w-3" /> Unique
                </Badge>
              )}
            </div>
            {weapon.special && (
              <p className="font-mono text-xs text-primary">{weapon.special}</p>
            )}
            <a
              href={weapon.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-primary hover:underline"
            >
              Marathon Wiki <ExternalLink className="h-3 w-3" />
            </a>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-none border-border/50 bg-background/80">
            <CardHeader>
              <CardTitle className="font-mono uppercase tracking-wider text-primary">Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {[
                ["Firepower", weapon.firepower],
                ["Accuracy", weapon.accuracy],
                ["Handling", weapon.handling],
                ["Range", weapon.range],
                ["Magazine", weapon.magazine],
                ["Zoom", weapon.zoom],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-border/30 pb-2 font-mono text-sm">
                  <span className="text-muted-foreground uppercase">{label}</span>
                  <span>{value || "—"}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-none border-border/50 bg-background/80">
            <CardHeader>
              <CardTitle className="font-mono uppercase tracking-wider text-primary">
                Compatible Mods ({compatibleMods.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {compatibleMods.length === 0 ? (
                <p className="font-mono text-sm text-muted-foreground">No mod data linked yet.</p>
              ) : (
                compatibleMods.map((mod) => (
                  <div key={mod.id} className="border border-border/40 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <Link to="/mods" className="font-mono text-sm uppercase hover:text-primary">
                        {mod.name}
                      </Link>
                      <Badge variant="outline" className="rounded-none font-mono text-[10px] uppercase">
                        {mod.slot}
                      </Badge>
                    </div>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{mod.description}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DatabasePageShell>
  );
}
