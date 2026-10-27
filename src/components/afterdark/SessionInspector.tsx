import { Panel } from "./Panel";
import { sessionStatus, type EventKind } from "@/lib/afterdark/engine";
import type { EventKind as Kind } from "@/lib/afterdark/engine";
import { cn } from "@/lib/utils";

export interface SessionEvent {
  id: number;
  kind: Kind;
  text: string;
  time: string;
}

const statusColor: Record<string, string> = {
  STABLE: "text-secondary",
  FLUCTUATING: "text-primary",
  UNSETTLED: "text-destructive",
};

const kindLabel: Record<EventKind, string> = {
  info: "INFO",
  anomaly: "ANOM",
  ghost: "GHST",
};

const kindColor: Record<EventKind, string> = {
  info: "text-muted-foreground",
  anomaly: "text-destructive",
  ghost: "text-secondary",
};

export function SessionInspector({
  events,
  anomalies,
  onSweep,
}: {
  events: SessionEvent[];
  anomalies: string[];
  onSweep: () => void;
}) {
  const status = sessionStatus(anomalies.length);
  const counts: Record<EventKind, number> = {
    info: events.filter((e) => e.kind === "info").length,
    anomaly: anomalies.length,
    ghost: events.filter((e) => e.kind === "ghost").length,
  };
  const total = Math.max(1, counts.info + counts.anomaly + counts.ghost);

  return (
    <Panel title="Session Inspector" tag={`SESSION 0x2F · ${status}`}>
      <div className="grid grid-cols-3 gap-px border border-border bg-border text-center">
        {(
          [
            ["Events", events.length],
            ["Anomalies", anomalies.length],
            ["Status", status],
          ] as const
        ).map(([label, val]) => (
          <div key={label} className="bg-card px-2 py-3">
            <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
            <p
              className={cn(
                "mt-1 text-sm font-semibold",
                label === "Status" ? statusColor[String(val)] : "text-foreground",
              )}
            >
              {String(val)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-1.5">
        {(Object.keys(counts) as EventKind[]).map((kind) => (
          <div key={kind} className="flex items-center gap-2 text-[11px]">
            <span className={cn("w-10 shrink-0 tracking-[0.15em]", kindColor[kind])}>
              {kindLabel[kind]}
            </span>
            <div className="h-2 flex-1 overflow-hidden bg-muted">
              <div
                className={cn(
                  "h-full",
                  kind === "anomaly" ? "bg-destructive" : kind === "ghost" ? "bg-secondary" : "bg-muted-foreground/50",
                )}
                style={{ width: `${(counts[kind] / total) * 100}%` }}
              />
            </div>
            <span className="w-6 shrink-0 text-right text-muted-foreground">{counts[kind]}</span>
          </div>
        ))}
      </div>

      <div className="scroll-thin mt-4 max-h-[110px] space-y-1 overflow-y-auto border-t border-border pt-3 text-[11px] leading-relaxed">
        {anomalies.length === 0 ? (
          <p className="text-muted-foreground">
            no anomalies on record — run a sweep and see what answers.
          </p>
        ) : (
          anomalies
            .slice(-3)
            .reverse()
            .map((a, i) => (
              <p key={`${i}-${a}`} className="text-destructive/90">
                <span aria-hidden className="mr-2 text-primary/60">
                  ✳
                </span>
                {a}
              </p>
            ))
        )}
      </div>

      <button
        onClick={onSweep}
        className="mt-4 w-full border border-primary/50 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        Run sweep
      </button>
    </Panel>
  );
}
