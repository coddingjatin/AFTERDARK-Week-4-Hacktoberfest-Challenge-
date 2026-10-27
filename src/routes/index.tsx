import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/afterdark/Nav";
import { Terminal, type TerminalLine } from "@/components/afterdark/Terminal";
import { GhostPanel } from "@/components/afterdark/GhostPanel";
import { SessionInspector, type SessionEvent } from "@/components/afterdark/SessionInspector";
import { GhostStories } from "@/components/afterdark/GhostStories";
import { Archives } from "@/components/afterdark/Archives";
import { IncidentReport } from "@/components/afterdark/IncidentReport";
import { Settings, type DemoSettings } from "@/components/afterdark/Settings";
import {
  BOOT_LINES,
  ambientGhostLine,
  runCommand,
  type EventKind,
  type Tone,
} from "@/lib/afterdark/engine";
import type { StorySetting } from "@/lib/afterdark/stories";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AFTERDARK — Ghost in the Machine Terminal" },
      {
        name: "description",
        content:
          "AFTERDARK is a cinematic horror-terminal demo for the Ghost in the Machine theme: a fictional ops console with anomalies, ghost stories and session archives. Frontend demo only.",
      },
      { property: "og:title", content: "AFTERDARK — Ghost in the Machine Terminal" },
      {
        property: "og:description",
        content:
          "A fictional horror-terminal ops console: scan for anomalies, summon ghost stories, read the incident report. Frontend demo only — nothing executes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AFTERDARK — Ghost in the Machine Terminal" },
      {
        name: "twitter:description",
        content:
          "A fictional horror-terminal ops console: scan for anomalies, summon ghost stories, read the incident report. Frontend demo only.",
      },
    ],
  }),
  component: Index,
});

const GHOST_INTRO = "i have been here since the build finished.";

function Index() {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [events, setEvents] = useState<SessionEvent[]>([]);
  const [anomalies, setAnomalies] = useState<string[]>([]);
  const [ghostFeed, setGhostFeed] = useState<string[]>([GHOST_INTRO]);
  const [settings, setSettings] = useState<DemoSettings>({
    grain: true,
    scanlines: true,
    flicker: false,
    timestamps: true,
  });

  const idRef = useRef(0);
  const nextId = () => ++idRef.current;
  const clock = () => new Date().toTimeString().slice(0, 8);

  const pushTerminal = useCallback((raw: Array<{ text: string; tone: Tone }>) => {
    setTerminalLines((prev) => [
      ...prev,
      ...raw.map((line) => ({ ...line, id: nextId(), time: clock() })),
    ]);
  }, []);

  const pushEvent = useCallback((kind: EventKind, text: string) => {
    setEvents((prev) => [{ id: nextId(), kind, text, time: clock() }, ...prev].slice(0, 120));
    if (kind === "ghost") {
      setGhostFeed((prev) => [text, ...prev].slice(0, 8));
    }
  }, []);

  useEffect(() => {
    pushTerminal(BOOT_LINES);
  }, [pushTerminal]);

  useEffect(() => {
    const timer = window.setInterval(() => pushEvent("ghost", ambientGhostLine()), 16000);
    return () => window.clearInterval(timer);
  }, [pushEvent]);

  const handleCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      pushTerminal([{ text: `guest@afterdark:~$ ${cmd}`, tone: "dim" }]);
      if (!cmd) return;
      setCmdHistory((prev) => [...prev, cmd]);
      const result = runCommand(cmd, { anomalies, history: cmdHistory });
      if (result.clear) {
        setTerminalLines([]);
      } else if (result.lines.length > 0) {
        pushTerminal(result.lines);
      }
      if (result.newAnomalies.length > 0) {
        setAnomalies((prev) => [...prev, ...result.newAnomalies]);
        for (const text of result.newAnomalies) pushEvent("anomaly", text);
      }
      for (const event of result.events) pushEvent(event.kind, event.text);
    },
    [anomalies, cmdHistory, pushTerminal, pushEvent],
  );

  const toggleSetting = (key: keyof DemoSettings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className={cn("relative min-h-screen", settings.flicker && "animate-flicker")}>
      <div aria-hidden className="vignette" />
      {settings.grain ? <div aria-hidden className="grain-overlay" /> : null}
      {settings.scanlines ? <div aria-hidden className="scanlines-overlay" /> : null}

      <Nav />

      <main className="relative z-10 mx-auto max-w-6xl space-y-16 px-4 pb-16 pt-10">
        <section id="terminal" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.45em] text-secondary">
              spectral operations console
            </p>
            <h1 className="text-2xl font-semibold tracking-[0.12em] text-foreground text-glow md:text-3xl">
              WATCH THE MACHINE. IT WATCHES BACK.
            </h1>
            <p className="max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
              A fictional terminal for the Ghost in the Machine hackathon theme. Every anomaly,
              ghost and incident below is simulated locally — nothing is real, nothing executes.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <Terminal
              className="lg:col-span-2"
              lines={terminalLines}
              showTimestamps={settings.timestamps}
              onCommand={handleCommand}
            />
            <div className="space-y-4">
              <GhostPanel feed={ghostFeed} />
              <SessionInspector
                events={events}
                anomalies={anomalies}
                onSweep={() => handleCommand("scan")}
              />
            </div>
          </div>
        </section>

        <GhostStories
          onStory={(setting: StorySetting) =>
            pushEvent("info", `story summoned — the machine narrates ${setting}`)
          }
        />

        <Archives
          anomalyCount={anomalies.length}
          onArchived={() => pushEvent("info", "session archived — the record was written twice")}
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <IncidentReport />
          </div>
          <div className="lg:col-span-2">
            <Settings settings={settings} onToggle={toggleSetting} />
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-border py-6">
        <p className="mx-auto max-w-6xl px-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          AFTERDARK v0.9.3 — frontend demo · no backend · no AI model · all events fictional
        </p>
      </footer>
    </div>
  );
}
