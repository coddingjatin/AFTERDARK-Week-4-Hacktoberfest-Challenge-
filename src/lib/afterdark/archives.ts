import type { Intensity } from "./stories";

export type ArchiveStatus = "SEALED" | "OPEN" | "ESCALATED";

export interface ArchiveSession {
  id: string;
  title: string;
  date: string;
  intensity: Intensity;
  anomalies: number;
  status: ArchiveStatus;
  summary: string;
}

export const SAMPLE_ARCHIVES: ArchiveSession[] = [
  {
    id: "0x0A1",
    title: "The Whisper in Node 7",
    date: "2026-10-12",
    intensity: "moderate",
    anomalies: 3,
    status: "SEALED",
    summary:
      "Node 7 answered a health check six minutes after being unplugged. All three anomalies pointed at the same absent operator.",
  },
  {
    id: "0x0B7",
    title: "Packet 4096 Still Beats",
    date: "2026-10-18",
    intensity: "terrifying",
    anomalies: 9,
    status: "ESCALATED",
    summary:
      "A recurring heartbeat in packet 4096 accelerated until it matched the operator's pulse. Session escalated; operator declined to return.",
  },
  {
    id: "0x0C3",
    title: "Lighthouse Frequency 19.7",
    date: "2026-10-21",
    intensity: "eerie",
    anomalies: 1,
    status: "SEALED",
    summary:
      "A single anomaly: the rotation log gained one entry per night, in handwriting two keepers swear is theirs.",
  },
  {
    id: "0x0D9",
    title: "Subway After Last Train",
    date: "2026-10-24",
    intensity: "moderate",
    anomalies: 4,
    status: "SEALED",
    summary:
      "Four anomalies, all temporal. The station clock was consistent; the operator's watch lost the same four minutes every visit.",
  },
  {
    id: "0x0E4",
    title: "The Orchard Listens Back",
    date: "2026-10-26",
    intensity: "terrifying",
    anomalies: 7,
    status: "OPEN",
    summary:
      "Audio buffers returned seven breaths that were never recorded. Session remains open; nobody has volunteered to close it.",
  },
];

const STORAGE_KEY = "afterdark.archives.v1";

export function loadArchives(): ArchiveSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ArchiveSession[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fall through to seeding
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_ARCHIVES));
  } catch {
    // storage unavailable — samples still render
  }
  return SAMPLE_ARCHIVES;
}

export function saveArchives(list: ArchiveSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // storage unavailable — keep in-memory only
  }
}

export function randomHexId(): string {
  return "0x" + Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0").toUpperCase();
}
