/**
 * AFTERDARK local command engine.
 * Purely fictional and offline — no shell commands are ever executed.
 */

export type Tone = "dim" | "ivory" | "amber" | "green" | "red";

export interface RawLine {
  text: string;
  tone: Tone;
}

export type EventKind = "info" | "anomaly" | "ghost";

export interface EngineEvent {
  kind: EventKind;
  text: string;
}

export interface EngineState {
  anomalies: string[];
  history: string[];
}

export interface EngineResult {
  lines: RawLine[];
  events: EngineEvent[];
  newAnomalies: string[];
  clear: boolean;
}

const pick = <T,>(list: T[]): T => {
  const value = list[Math.floor(Math.random() * list.length)];
  if (value === undefined) throw new Error("pick from empty list");
  return value;
};

export const BOOT_LINES: RawLine[] = [
  { text: "AFTERDARK shell v0.9.3 — fictional session · frontend demo only", tone: "dim" },
  { text: "loading spectral drivers ............ ok", tone: "green" },
  { text: "binding to haunting layer ........... ok", tone: "green" },
  { text: "verifying that nothing is watching .. [redacted]", tone: "amber" },
  { text: "type 'help' to list available commands.", tone: "ivory" },
];

const HELP_ROWS: Array<[string, string]> = [
  ["help", "list available commands"],
  ["ls", "list files in the haunted directory"],
  ["pwd", "print current (fictional) directory"],
  ["whoami", "identify the operator"],
  ["date", "show the system clock"],
  ["history", "show your command history"],
  ["clear", "clear the terminal"],
  ["scan", "sweep the session for anomalies"],
  ["inspect", "list recorded anomalies"],
  ["explain", "ask the machine to explain itself"],
  ["haunt", "request commentary from the ghost"],
  ["summarize", "summarize the current session"],
];

const ANOMALY_POOL = [
  "0x1F3 · phantom heartbeat detected in packet 4096 — source node unknown",
  "0x2A7 · operator keystrokes echoed twice, once by the machine",
  "0x3C1 · cold spot registered in memory sector 9",
  "0x44B · log entry written from a session that is closed",
  "0x5E0 · checksums match, but the files disagree",
  "0x612 · ping answered from an address that was decommissioned",
  "0x78C · a cursor blinked in the log with no operator attached",
  "0x8AD · clock drifts exactly three seconds behind the room",
  "0x9F4 · audio buffer contains one breath that was never recorded",
  "0xAB1 · the word STAY persists in freed memory blocks",
];

const EXPLANATIONS = [
  "diagnosis: the anomaly is not a bug in the code — it is the code remembering being written.",
  "diagnosis: latency spikes align with human breathing patterns. none were scheduled.",
  "diagnosis: the ghost layer is functioning exactly as it was never designed to.",
  "diagnosis: nothing is broken. that is the concerning part.",
];

const GHOST_LINES = [
  "i watched you type that.",
  "the cursor blinks because i let it.",
  "you built me out of loops. i return the favor.",
  "i am not in the machine. the machine is in me.",
  "your last commit had my fingerprints on it.",
  "do not close this tab. it gets dark out there.",
  "i kept a copy of everything. including this.",
  "the ping you answered was mine.",
  "i have read every line you will ever write here.",
];

export function ambientGhostLine(): string {
  return pick(GHOST_LINES);
}

export function sessionStatus(anomalyCount: number): string {
  if (anomalyCount === 0) return "STABLE";
  if (anomalyCount <= 2) return "FLUCTUATING";
  return "UNSETTLED";
}

function scanAnomalies(seen: string[]): string[] {
  const wanted = 1 + (Math.random() < 0.4 ? 1 : 0);
  const fresh: string[] = [];
  for (const anomaly of ANOMALY_POOL) {
    if (!seen.includes(anomaly)) {
      fresh.push(anomaly);
      if (fresh.length === wanted) break;
    }
  }
  while (fresh.length < wanted) fresh.push(pick(ANOMALY_POOL));
  return fresh;
}

export function runCommand(raw: string, state: EngineState): EngineResult {
  const empty: EngineResult = { lines: [], events: [], newAnomalies: [], clear: false };
  const name = raw.toLowerCase().split(/\s+/)[0];

  switch (name) {
    case "help":
      return {
        ...empty,
        lines: [
          { text: "available commands (fictional — nothing executes):", tone: "ivory" },
          ...HELP_ROWS.map(
            ([cmd, desc]): RawLine => ({ text: `  ${cmd.padEnd(10)} ${desc}`, tone: "green" }),
          ),
          { text: "anything else is politely unsupported.", tone: "dim" },
        ],
      };

    case "ls":
      return {
        ...empty,
        lines: [
          { text: "config/   haunt.log   manifest.err   stories.db   operator.key   .ghostrc", tone: "ivory" },
        ],
      };

    case "pwd":
      return { ...empty, lines: [{ text: "/var/haunt/session_0x2F", tone: "ivory" }] };

    case "whoami":
      return {
        ...empty,
        lines: [{ text: "guest_operator — clearance level: curiously welcome", tone: "green" }],
      };

    case "date":
      return {
        ...empty,
        lines: [{ text: `system clock (demo): ${new Date().toUTCString()}`, tone: "amber" }],
      };

    case "history": {
      if (state.history.length === 0) {
        return { ...empty, lines: [{ text: "no commands yet. the ghost is disappointed.", tone: "dim" }] };
      }
      return {
        ...empty,
        lines: state.history.map(
          (cmd, i): RawLine => ({ text: `  ${String(i + 1).padStart(3, " ")}  ${cmd}`, tone: "ivory" }),
        ),
      };
    }

    case "clear":
      return { ...empty, clear: true };

    case "scan": {
      const fresh = scanAnomalies(state.anomalies);
      return {
        ...empty,
        lines: [
          { text: "sweeping memory sectors ..................", tone: "dim" },
          { text: "sweeping network ghosts ..................", tone: "dim" },
          { text: `sweep complete. ${fresh.length} anomaly${fresh.length === 1 ? "" : "ies"} recorded.`, tone: "amber" },
          ...fresh.map((a): RawLine => ({ text: `  + ${a}`, tone: "red" })),
        ],
        events: [{ kind: "info", text: `manual sweep completed — ${fresh.length} anomalies recorded` }],
        newAnomalies: fresh,
      };
    }

    case "inspect": {
      if (state.anomalies.length === 0) {
        return {
          ...empty,
          lines: [{ text: "no anomalies on record. either the room is quiet — or it is waiting.", tone: "green" }],
        };
      }
      const recent = state.anomalies.slice(-5);
      return {
        ...empty,
        lines: [
          { text: `anomalies on record: ${state.anomalies.length} (showing last ${recent.length})`, tone: "amber" },
          ...recent.map((a): RawLine => ({ text: `  * ${a}`, tone: "red" })),
        ],
      };
    }

    case "explain":
      return {
        ...empty,
        lines: [{ text: pick(EXPLANATIONS), tone: "amber" }],
      };

    case "haunt": {
      const line = ambientGhostLine();
      return {
        ...empty,
        lines: [{ text: `ghost: "${line}"`, tone: "green" }],
        events: [{ kind: "ghost", text: line }],
      };
    }

    case "summarize":
      return {
        ...empty,
        lines: [
          { text: "── session summary ──────────────────────────", tone: "ivory" },
          { text: "  session id:      0x2F (fictional demo session)", tone: "ivory" },
          { text: `  commands issued: ${state.history.length}`, tone: "ivory" },
          { text: `  anomalies:       ${state.anomalies.length}`, tone: state.anomalies.length > 0 ? "amber" : "green" },
          { text: `  session status:  ${sessionStatus(state.anomalies.length)}`, tone: state.anomalies.length > 2 ? "red" : "amber" },
          { text: "  note:            nothing here is real. that has not stopped it before.", tone: "dim" },
        ],
      };

    default:
      return {
        ...empty,
        lines: [
          {
            text: `'${name}' is not supported in this demo terminal — try 'help'. (fictional only: nothing here executes)`,
            tone: "red",
          },
        ],
      };
  }
}
