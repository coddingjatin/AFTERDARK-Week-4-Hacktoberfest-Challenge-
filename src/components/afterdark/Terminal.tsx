import { useEffect, useRef, useState, type FormEvent } from "react";
import { Panel } from "./Panel";
import type { Tone } from "@/lib/afterdark/engine";
import { cn } from "@/lib/utils";

export interface TerminalLine {
  id: number;
  text: string;
  tone: Tone;
  time?: string;
}

const toneClass: Record<Tone, string> = {
  dim: "text-muted-foreground",
  ivory: "text-foreground",
  amber: "text-primary",
  green: "text-secondary",
  red: "text-destructive",
};

export function Terminal({
  lines,
  showTimestamps,
  onCommand,
  className,
}: {
  lines: TerminalLine[];
  showTimestamps: boolean;
  onCommand: (raw: string) => void;
  className?: string;
}) {
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, showTimestamps]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onCommand(value);
    setValue("");
  };

  return (
    <Panel
      title="Main Terminal"
      tag="fictional · nothing executes"
      className={className}
      bodyClassName="p-0"
    >
      <div
        ref={scrollRef}
        className="scroll-thin h-[380px] overflow-y-auto px-4 py-3 text-[13px] leading-relaxed md:h-[440px]"
      >
        {lines.map((line) => (
          <div key={line.id} className={cn("whitespace-pre-wrap break-words", toneClass[line.tone])}>
            {showTimestamps && line.time ? (
              <span className="mr-2 text-muted-foreground/50">[{line.time}]</span>
            ) : null}
            {line.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={submit}
        className="flex items-center gap-2 border-t border-border px-4 py-3 text-[13px]"
      >
        <span className="shrink-0 whitespace-nowrap text-secondary text-glow-green">
          guest@afterdark:~$
        </span>
        <div className="relative min-w-0 flex-1">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command input"
            className="w-full bg-transparent text-transparent caret-transparent outline-none"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-pre"
          >
            <span className="text-foreground">{value}</span>
            <span className="animate-blink text-primary">▊</span>
          </div>
        </div>
        <button
          type="submit"
          className="shrink-0 border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Enter
        </button>
      </form>
    </Panel>
  );
}
