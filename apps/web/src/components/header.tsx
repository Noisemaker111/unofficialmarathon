import { Link } from "@tanstack/react-router";

import { ModeToggle } from "./mode-toggle";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/lfg" as const, label: "LFG" },
  { to: "/maps" as const, label: "Maps" },
  { to: "/guides" as const, label: "Guides" },
  { to: "/tips" as const, label: "Tips" },
];

export default function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative">
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          <span className="text-primary">M</span>ARATHON
        </Link>
        <nav className="flex items-center gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="rounded-none px-3 py-1.5 text-sm font-mono font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary [&.active]:bg-primary/20 [&.active]:text-primary [&.active]:border-b-2 [&.active]:border-primary"
              activeOptions={{ exact: to === "/" }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="marathon-pulse h-2 w-2 rounded-full bg-primary" title="System Active" />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
