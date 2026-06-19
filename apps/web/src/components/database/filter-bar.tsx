import { Search, X } from "lucide-react";
import { Input } from "@unofficialmarathon/ui/components/input";
import { cn } from "@unofficialmarathon/ui/lib/utils";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  children?: React.ReactNode;
  onClear?: () => void;
}

export function FilterBar({
  search,
  onSearchChange,
  placeholder = "Search database...",
  children,
  onClear,
}: FilterBarProps) {
  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={placeholder}
          className="rounded-none border-border/50 bg-background/80 pl-10 font-mono"
        />
        {search && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-none px-3 py-1.5 text-xs font-mono font-medium uppercase tracking-wider border transition-colors",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary",
      )}
    >
      {children}
    </button>
  );
}
