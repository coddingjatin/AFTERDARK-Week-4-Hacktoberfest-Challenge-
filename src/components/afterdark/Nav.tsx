const LINKS = [
  { href: "#terminal", label: "Terminal" },
  { href: "#stories", label: "Ghost Stories" },
  { href: "#archives", label: "Archives" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <a href="#terminal" className="flex items-baseline gap-3 whitespace-nowrap">
          <span className="text-sm font-semibold tracking-[0.3em] text-foreground text-glow">
            <span className="text-secondary" aria-hidden>
              ▓▒░
            </span>{" "}
            AFTERDARK
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.35em] text-muted-foreground sm:inline">
            ghost in the machine
          </span>
        </a>

        <nav className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] md:gap-6 md:text-xs">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <span className="hidden shrink-0 border border-primary/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-primary sm:inline-block">
          Demo · frontend only
        </span>
      </div>
    </header>
  );
}
