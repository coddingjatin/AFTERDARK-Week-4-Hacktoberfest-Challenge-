import { useState } from "react";
import { SectionHeader } from "./Panel";
import {
  INTENSITIES,
  STORY_LENGTHS,
  STORY_SETTINGS,
  generateStory,
  type Intensity,
  type StoryLength,
  type StorySetting,
} from "@/lib/afterdark/stories";
import { cn } from "@/lib/utils";

function Seg<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
      <div className="flex flex-wrap divide-x divide-border border border-border">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            aria-pressed={option === value}
            className={cn(
              "px-4 py-2 text-[11px] uppercase tracking-[0.15em] transition-colors",
              option === value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function GhostStories({ onStory }: { onStory?: (setting: StorySetting) => void }) {
  const [intensity, setIntensity] = useState<Intensity>("eerie");
  const [setting, setSetting] = useState<StorySetting>("Server Room 7");
  const [length, setLength] = useState<StoryLength>("standard");
  const [story, setStory] = useState<string | null>(null);
  const [summoning, setSummoning] = useState(false);

  const summon = () => {
    setSummoning(true);
    setStory(null);
    window.setTimeout(() => {
      setStory(generateStory(intensity, setting, length));
      setSummoning(false);
      onStory?.(setting);
    }, 900);
  };

  return (
    <div id="stories" className="scroll-mt-24 space-y-6">
      <SectionHeader index="02" title="Ghost Stories" tag="local templates · no AI model" />
      <div className="grid gap-4 md:grid-cols-3">
        <Seg label="Horror intensity" options={INTENSITIES} value={intensity} onChange={setIntensity} />
        <Seg label="Setting" options={STORY_SETTINGS} value={setting} onChange={setSetting} />
        <Seg label="Story length" options={STORY_LENGTHS} value={length} onChange={setLength} />
      </div>

      <button
        onClick={summon}
        disabled={summoning}
        className="border border-primary/60 px-5 py-2.5 text-[11px] uppercase tracking-[0.3em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:cursor-wait disabled:opacity-60"
      >
        {summoning ? "Summoning ····" : "Summon story"}
      </button>

      {summoning ? (
        <p className="animate-blink text-sm text-secondary">listening for what answers ···</p>
      ) : null}

      {story ? (
        <article className="border border-border bg-muted/40 p-5">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {setting} · {intensity} · {length}
          </p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{story}</p>
        </article>
      ) : null}
    </div>
  );
}
