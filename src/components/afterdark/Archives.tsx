import { useEffect, useState } from "react";
import { SectionHeader } from "./Panel";
import {
  SAMPLE_ARCHIVES,
  loadArchives,
  randomHexId,
  saveArchives,
  type ArchiveSession,
} from "@/lib/afterdark/archives";
import { cn } from "@/lib/utils";

const intensityColor: Record<string, string> = {
  eerie: "text-secondary border-secondary/40",
  moderate: "text-primary border-primary/40",
  terrifying: "text-destructive border-destructive/40",
};

const statusColor: Record<string, string> = {
  SEALED: "text-secondary",
  OPEN: "text-primary",
  ESCALATED: "text-destructive",
};

function ArchiveCard({
  session,
  expanded,
  onToggle,
}: {
  session: ArchiveSession;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-expanded={expanded}
      className={cn(
        "border border-border bg-card/70 p-4 text-left transition-colors hover:border-primary/50",
        expanded && "border-primary/60",
      )}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[10px] tracking-[0.25em] text-muted-foreground">
          SESSION {session.id}
        </span>
        <span className={cn("text-[10px] tracking-[0.2em]", statusColor[session.status])}>
          {session.status}
        </span>
      </div>
      <h3 className="mt-2 text-sm font-semibold tracking-[0.08em] text-foreground">
        {session.title}
      </h3>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.15em]">
        <span className="text-muted-foreground">{session.date}</span>
        <span aria-hidden className="text-border">
          |
        </span>
        <span className={cn("border px-2 py-0.5", intensityColor[session.intensity])}>
          {session.intensity}
        </span>
        <span className="text-muted-foreground">
          {session.anomalies} anomal{session.anomalies === 1 ? "y" : "ies"}
        </span>
      </div>
      {expanded ? (
        <p className="mt-3 border-t border-border pt-3 text-[12px] leading-relaxed text-muted-foreground">
          {session.summary}
        </p>
      ) : (
        <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
          {expanded ? "" : "open record ▸"}
        </p>
      )}
    </button>
  );
}

export function Archives({
  anomalyCount,
  onArchived,
}: {
  anomalyCount: number;
  onArchived?: () => void;
}) {
  const [sessions, setSessions] = useState<ArchiveSession[]>(SAMPLE_ARCHIVES);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setSessions(loadArchives());
  }, []);

  const persist = (next: ArchiveSession[]) => {
    setSessions(next);
    saveArchives(next);
  };

  const archiveCurrent = () => {
    const entry: ArchiveSession = {
      id: randomHexId(),
      title: "Live Operator Sweep",
      date: new Date().toISOString().slice(0, 10),
      intensity: anomalyCount > 4 ? "terrifying" : anomalyCount > 0 ? "moderate" : "eerie",
      anomalies: anomalyCount,
      status: "OPEN",
      summary: `Live session archived by the operator. ${anomalyCount} anomal${
        anomalyCount === 1 ? "y" : "ies"
      } recorded. The record was written twice; the second copy was not requested.`,
    };
    persist([entry, ...sessions]);
    setExpandedId(entry.id);
    onArchived?.();
  };

  return (
    <div id="archives" className="scroll-mt-24 space-y-6">
      <SectionHeader index="03" title="Session Archives" tag="stored locally in your browser" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {sessions.length} session record{sessions.length === 1 ? "" : "s"} on file
        </p>
        <button
          onClick={archiveCurrent}
          className="border border-border px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Archive this session
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <ArchiveCard
            key={session.id}
            session={session}
            expanded={expandedId === session.id}
            onToggle={() => setExpandedId(expandedId === session.id ? null : session.id)}
          />
        ))}
      </div>
    </div>
  );
}
