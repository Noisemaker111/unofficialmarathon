import { Link } from "@tanstack/react-router";
import { cn } from "@unofficialmarathon/ui/lib/utils";

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <path d="M2 2h28v28H2V2z" className="fill-primary" />
      <path d="M2 2h12v12H2V2z" className="fill-background/20" />
      <path
        d="M8 22V10h3.2l2.8 7.2L16.8 10H20v12h-2.6v-7.4L14.2 22h-2.4l-3.2-7.4V22H8z"
        className="fill-background"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn(
        "group flex min-w-0 items-center gap-2.5 transition-opacity hover:opacity-90 sm:gap-3",
        className,
      )}
      aria-label="Unofficial Marathon home"
    >
      <LogoMark className="h-8 w-8 sm:h-9 sm:w-9" />
      <div className="min-w-0 leading-none">
        <span className="block truncate font-bold uppercase tracking-[0.12em] text-foreground text-[13px] sm:text-[15px]">
          Marathon
        </span>
        <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.24em] text-primary/75 sm:text-[9px]">
          <span className="sm:hidden">Fan Site</span>
          <span className="hidden sm:inline">Unofficial</span>
        </span>
      </div>
    </Link>
  );
}

export { LogoMark };
