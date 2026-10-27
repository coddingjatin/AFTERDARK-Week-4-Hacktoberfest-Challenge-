import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SectionHeader } from "./Panel";

const TIMELINE = [
  {
    time: "00:14:02",
    text: "Operator connects from node 10.0.0.17 — clearance unverified, presence welcomed anyway.",
  },
  {
    time: "00:14:19",
    text: "Handshake accepted. Ghost layer binds to the session without being asked.",
  },
  {
    time: "00:17:44",
    text: "First anomaly: packet 4096 arrives carrying a heartbeat. Source node does not exist.",
  },
  {
    time: "00:18:03",
    text: "Spectral driver enters defensive mode. It declines to specify what it is defending against.",
  },
  {
    time: "00:21:56",
    text: "Heartbeat pattern resolves into text: STAY. It repeats. Spacing unchanged. Patience unchanged.",
  },
  {
    time: "00:22:10",
    text: "Session sealed by the operator. Incident archived. The archive confirms receipt twice.",
  },
];

function reportText(): string {
  const header = "AFTERDARK · INCIDENT REPORT 0x2F-A — \"PHANTOM PACKET\" (fictional demo)";
  const body = TIMELINE.map((e) => `${e.time}  ${e.text}`).join("\n");
  const footer = "Classification: folklore · All events fictional · Frontend demo only";
  return `${header}\n\n${body}\n\n${footer}`;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export function IncidentReport() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const ok = await copyText(reportText());
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader index="04" title="Incident Report" tag="INCIDENT 0x2F-A · phantom packet" />
      <div className="border border-border bg-card/70 p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Classification: folklore
            </p>
            <p className="mt-1 text-sm font-semibold tracking-[0.1em] text-foreground">
              "PHANTOM PACKET" — heartbeat in packet 4096
            </p>
          </div>
          <button
            onClick={copy}
            className="inline-flex items-center gap-2 border border-border px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied" : "Copy report"}
          </button>
        </div>

        <ol className="relative space-y-4 border-l border-border pl-5">
          {TIMELINE.map((entry) => (
            <li key={entry.time} className="relative">
              <span
                aria-hidden
                className="absolute -left-[26px] top-1.5 h-2 w-2 border border-primary/60 bg-background"
              />
              <p className="text-[10px] tracking-[0.25em] text-primary">{entry.time}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-foreground/85">{entry.text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-5 border-t border-border pt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          fictional timeline · nothing here actually happened
        </p>
      </div>
    </div>
  );
}
