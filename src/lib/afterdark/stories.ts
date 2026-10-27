/**
 * AFTERDARK ghost story generator.
 * Local JavaScript templates only — no AI, no network calls.
 */

export type Intensity = "eerie" | "moderate" | "terrifying";
export type StoryLength = "fragment" | "standard" | "extended";
export type StorySetting = "Server Room 7" | "Midnight Subway" | "The Lighthouse" | "Orchard Static";

export const INTENSITIES: Intensity[] = ["eerie", "moderate", "terrifying"];
export const STORY_LENGTHS: StoryLength[] = ["fragment", "standard", "extended"];
export const STORY_SETTINGS: StorySetting[] = [
  "Server Room 7",
  "Midnight Subway",
  "The Lighthouse",
  "Orchard Static",
];

const pick = <T,>(list: T[]): T => {
  const value = list[Math.floor(Math.random() * list.length)];
  if (value === undefined) throw new Error("pick from empty list");
  return value;
};

const OPENINGS: Record<StorySetting, string[]> = {
  "Server Room 7": [
    "The fans cut out at 03:00 — all of them, at once, like a held breath. In the dark of Server Room 7 the only light was the standby LEDs, pulsing in a rhythm nobody had configured.",
    "Server Room 7 was decommissioned in 2019. The badge log says someone badged in last night. The badge log says someone badged in every night since.",
  ],
  "Midnight Subway": [
    "The last train left at 01:14. The one you boarded arrived at 01:14 as well, and it kept its doors open at every station, waiting for someone who never quite stepped in.",
    "The platform display said NEXT TRAIN: ARRIVING. It had said so for six minutes. Behind you, the tunnel exhaled something warmer than air.",
  ],
  "The Lighthouse": [
    "Nineteen seconds between sweeps. The keeper's log said the light was automated in 1987. The log was still being written in.",
    "The lighthouse beam swept the water the way it had for a century. What it did not do, ever, was pause. Tonight, at the cliff's edge, it paused.",
  ],
  "Orchard Static": [
    "The rows of apple trees stood perfectly still, which was the first wrong thing. The radio you'd left in the truck was playing static that kept time with your footsteps.",
    "They said the orchard was quiet after dark. They never said quiet like what — no birds, no wind, and, as you noticed at the third row, no echoes.",
  ],
};

const ESCALATION: Record<Intensity, string[]> = {
  eerie: [
    "Nothing moved. That was the trouble — things that should move, didn't; and things that shouldn't, seemed about to.",
    "Somewhere behind the walls, a sound repeated itself at exact intervals, patient as a metronome, as if counting down to a moment it already knew.",
  ],
  moderate: [
    "Then the temperature dropped ten degrees in one breath, and every light in the place turned to face you — not toward you, at you, like eyes.",
    "It started small: a name written in the condensation on the glass. Your name. Then your name with tomorrow's date beside it.",
  ],
  terrifying: [
    "The walls began to breathe. Slow, deep, even breaths that paused — exactly, deliberately — each time you held yours.",
    "Every reflective surface showed the room one second behind. Then two. Then it showed the room, and you weren't in it.",
  ],
};

const ENDINGS: Record<Intensity, string[]> = {
  eerie: [
    "In the morning, everything was normal. Almost. One thing had moved, and no one could say what.",
    "You left the lights on that night. It didn't matter. It knew its way around.",
  ],
  moderate: [
    "When the sun came up you were outside, sitting on the curb, holding your own hand.",
    "You locked the door behind you. From the other side came a single, polite knock.",
  ],
  terrifying: [
    "They found the recording later. In it, you are still there, screaming. In it, so is the thing that learned your voice.",
    "You woke in your own bed. That was the worst part — it knew where you slept.",
  ],
};

const CODAS = [
  "AUTHOR'S NOTE: recovered from /var/haunt. Author unknown. Author still writing.",
  "POSTSCRIPT: the session log lists you as a witness. It lists something else as the second witness.",
  "They decommissioned the site the following spring. The anomalies moved. Anomalies always move.",
];

export function generateStory(
  intensity: Intensity,
  setting: StorySetting,
  length: StoryLength,
): string {
  const opening = pick(OPENINGS[setting]);
  const middle = pick(ESCALATION[intensity]);
  const ending = pick(ENDINGS[intensity]);

  if (length === "fragment") return `${opening}\n\n${ending}`;
  if (length === "standard") return `${opening}\n\n${middle}\n\n${ending}`;
  return `${opening}\n\n${middle}\n\n${ending}\n\n${pick(CODAS)}`;
}
