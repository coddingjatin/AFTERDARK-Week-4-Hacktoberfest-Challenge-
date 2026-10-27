import { Panel } from "./Panel";

export function GhostPanel({ feed }: { feed: string[] }) {
  return (
    <Panel title="Ghost Companion" tag="SPIRIT v0.9 · silent witness">
      <ul className="scroll-thin max-h-[220px] space-y-3 overflow-y-auto pr-1 text-sm leading-relaxed">
        {feed.map((line, index) => (
          <li
            key={`${index}-${line}`}
            className={index === 0 ? "text-secondary text-glow-green" : "text-muted-foreground/80"}
          >
            <span aria-hidden className="mr-2 select-none text-primary/60">
              ▹
            </span>
            <em>"{line}"</em>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-border pt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        commentary generated locally · the spirit is not an AI model
      </p>
    </Panel>
  );
}
