import { SectionHeader } from "./Panel";
import { cn } from "@/lib/utils";

export interface DemoSettings {
  grain: boolean;
  scanlines: boolean;
  flicker: boolean;
  timestamps: boolean;
}

const TOGGLES: Array<{
  key: keyof DemoSettings;
  label: string;
  description: string;
}> = [
  { key: "grain", label: "Film grain", description: "Subtle analog texture across the page" },
  { key: "scanlines", label: "CRT scanlines", description: "Faint horizontal lines, like an old monitor" },
  { key: "flicker", label: "CRT flicker", description: "Occasional dimming, like a tube light struggling" },
  { key: "timestamps", label: "Terminal timestamps", description: "Prefix each terminal line with a timestamp" },
];

export function Settings({
  settings,
  onToggle,
}: {
  settings: DemoSettings;
  onToggle: (key: keyof DemoSettings) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionHeader index="05" title="Console Settings" tag="visual only" />
      <div className="border border-border bg-card/70 p-5">
        <ul className="divide-y divide-border">
          {TOGGLES.map(({ key, label, description }) => {
            const on = settings[key];
            return (
              <li key={key} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-[13px] tracking-[0.05em] text-foreground">{label}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>
                </div>
                <button
                  role="switch"
                  aria-checked={on}
                  aria-label={label}
                  onClick={() => onToggle(key)}
                  className={cn(
                    "shrink-0 border px-3 py-1.5 text-[10px] tracking-[0.2em] transition-colors",
                    on
                      ? "border-primary/50 text-primary"
                      : "border-border text-muted-foreground hover:border-muted-foreground/50",
                  )}
                >
                  {on ? "[ ON ]" : "[ OFF ]"}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
