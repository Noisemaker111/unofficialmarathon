import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";

import { DatabasePageShell } from "@/components/database/page-shell";
import { getWeaponById } from "@/data/weapons";
import { parseNumericStat } from "@/lib/database";
import { buttonVariants } from "@unofficialmarathon/ui/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@unofficialmarathon/ui/components/table";
import { cn } from "@unofficialmarathon/ui/lib/utils";

const compareSearchSchema = z.object({
  ids: z.string().optional(),
});

export const Route = createFileRoute("/weapons/compare")({
  validateSearch: compareSearchSchema,
  component: WeaponComparePage,
});

const statFields = [
  { key: "firepower", label: "Firepower" },
  { key: "accuracy", label: "Accuracy" },
  { key: "handling", label: "Handling" },
  { key: "range", label: "Range" },
  { key: "magazine", label: "Magazine" },
  { key: "zoom", label: "Zoom" },
] as const;

function WeaponComparePage() {
  const { ids } = Route.useSearch();
  const weaponIds = (ids?.split(",").filter(Boolean) ?? []).slice(0, 4);
  const comparedWeapons = weaponIds
    .map((id) => getWeaponById(id))
    .filter((weapon): weapon is NonNullable<typeof weapon> => Boolean(weapon));

  return (
    <DatabasePageShell
      title="Weapon Compare"
      description="Compare up to four weapons."
      actions={
        <Link to="/weapons" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-none font-mono uppercase")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Pick Weapons
        </Link>
      }
    >
      {comparedWeapons.length === 0 ? (
        <p className="font-mono text-sm text-muted-foreground">
          No weapons selected. Go to the{" "}
          <Link to="/weapons" className="text-primary hover:underline">
            weapons database
          </Link>{" "}
          and add up to four weapons to compare.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-none border border-border/50 bg-background/80">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="font-mono uppercase tracking-wider text-primary">Stat</TableHead>
                {comparedWeapons.map((weapon) => (
                  <TableHead key={weapon.id} className="min-w-[160px] font-mono uppercase tracking-wider text-primary">
                    <Link to="/weapons/$weaponId" params={{ weaponId: weapon.id }} className="hover:underline">
                      {weapon.name}
                    </Link>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-border/50">
                <TableCell className="font-mono uppercase text-muted-foreground">Category</TableCell>
                {comparedWeapons.map((weapon) => (
                  <TableCell key={weapon.id} className="font-mono text-sm uppercase">
                    {weapon.category.replaceAll("_", " ")}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="border-border/50">
                <TableCell className="font-mono uppercase text-muted-foreground">Ammo</TableCell>
                {comparedWeapons.map((weapon) => (
                  <TableCell key={weapon.id} className="font-mono text-sm">{weapon.ammoType}</TableCell>
                ))}
              </TableRow>
              {statFields.map((field) => {
                const values = comparedWeapons.map((weapon) => weapon[field.key]);
                const numericValues = values.map((value) => parseNumericStat(value));
                const max = Math.max(...numericValues.filter((value): value is number => value !== null));
                return (
                  <TableRow key={field.key} className="border-border/50">
                    <TableCell className="font-mono uppercase text-muted-foreground">{field.label}</TableCell>
                    {comparedWeapons.map((weapon, index) => {
                      const value = weapon[field.key] || "—";
                      const numeric = numericValues[index];
                      const isBest = numeric !== null && numeric === max && max > 0;
                      return (
                        <TableCell
                          key={weapon.id}
                          className={cn("font-mono text-sm", isBest && "text-primary font-bold")}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </DatabasePageShell>
  );
}
