import type { ReactNode } from "react";

interface DatabasePageShellProps {
  title: string;
  children: ReactNode;
  description?: string;
  actions?: ReactNode;
}

export function DatabasePageShell({
  title,
  description,
  children,
  actions,
}: DatabasePageShellProps) {
  return (
    <div className="min-h-full bg-background marathon-lattice">
      <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <div className="mb-8 flex flex-col gap-4 border-b border-border/50 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-3xl font-black uppercase tracking-tight text-primary sm:text-4xl">{title}</h1>
            {description ? (
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions}
        </div>
        {children}
      </div>
    </div>
  );
}
