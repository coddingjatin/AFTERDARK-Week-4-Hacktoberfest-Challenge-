import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  tag,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  tag?: string;
  children: ReactNode;
  className?: string | undefined;
  bodyClassName?: string | undefined;
}) {
  return (
    <section className={cn("border border-border bg-card/70", className)}>
      <header className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          {title}
        </h2>
        {tag ? (
          <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-secondary/90">
            {tag}
          </span>
        ) : null}
      </header>
      <div className={cn("p-4", bodyClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  index,
  title,
  tag,
}: {
  index: string;
  title: string;
  tag?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
      <h2 className="text-lg font-semibold uppercase tracking-[0.25em] text-foreground">
        <span className="mr-3 text-primary">{index}</span>
        {title}
      </h2>
      {tag ? (
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{tag}</span>
      ) : null}
    </div>
  );
}
