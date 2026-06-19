import type { ReactNode } from "react";

interface DatabasePageShellProps {
  label: string;
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function DatabasePageShell({
  label,
  title,
  description,
  children,
  actions,
}: DatabasePageShellProps) {
  return (
    <div className="min-h-full bg-background marathon-lattice">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mb-10 border-b border-border/50 pb-8 marathon-fiducial relative">
          <div className="marathon-data-label mb-3">{label}</div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-primary">{title}</h1>
              <p className="mt-2 max-w-3xl text-muted-foreground font-mono text-sm">{description}</p>
            </div>
            {actions}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
