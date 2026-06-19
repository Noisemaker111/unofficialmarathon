import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { LiveStatusWidget } from "./live-status-widget";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@unofficialmarathon/ui/lib/utils";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/database" as const, label: "Database" },
  { to: "/loadout" as const, label: "Loadout" },
  { to: "/lfg" as const, label: "LFG" },
  { to: "/maps" as const, label: "Maps" },
  { to: "/tier-lists" as const, label: "Tiers" },
  { to: "/tips" as const, label: "Tips" },
] as const;

const navLinkClass =
  "rounded-none px-3 py-2 text-sm font-mono font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary [&.active]:bg-primary/15 [&.active]:text-primary whitespace-nowrap";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="relative z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-3 sm:px-4">
        <Logo className="flex-1 lg:flex-none" />

        <nav className="hidden items-center lg:flex lg:flex-1 lg:justify-center">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={navLinkClass}
              activeOptions={{ exact: to === "/" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LiveStatusWidget compact />
          <ModeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center border border-border/50 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-14 z-40 bg-background/70 backdrop-blur-[2px] lg:hidden"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <nav className="absolute inset-x-0 top-full z-50 border-b border-border/40 bg-background/98 px-3 py-2 shadow-lg lg:hidden">
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
              {links.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(navLinkClass, "block text-center")}
                  activeOptions={{ exact: to === "/" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="mt-2 border-t border-border/40 pt-2 lg:hidden">
              <LiveStatusWidget />
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
