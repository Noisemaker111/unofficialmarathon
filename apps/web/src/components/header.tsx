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
    <header className="border-b">
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold tracking-wider">
          MARATHON
        </Link>
        <nav className="flex items-center gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground"
              activeOptions={{ exact: to === "/" }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
