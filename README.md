# ⌁ AFTERDARK

### Every command leaves a trace.

<p align="center">
  <em>A terminal from another time. A machine that never forgot.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/STATUS-INTERACTIVE%20DEMO-171717?style=for-the-badge&labelColor=0A0A0A" alt="Interactive Demo" />
  <img src="https://img.shields.io/badge/GENRE-RETRO%20HORROR-674C32?style=for-the-badge&labelColor=0A0A0A" alt="Retro Horror" />
  <img src="https://img.shields.io/badge/AI-CLOUD%20FREE-49654A?style=for-the-badge&labelColor=0A0A0A" alt="No Cloud AI" />
</p>

<p align="center">
  <strong>Not every process should be running. Not every log should exist.</strong>
</p>


## 01 / THE PREMISE

What if your terminal had a memory of its own?

**AFTERDARK** transforms the familiar developer terminal into an immersive, interactive experience inspired by abandoned computers, analog horror, and the unsettling feeling that something is watching from the other side of the screen.

Explore fictional system anomalies. Interact with an eerie terminal companion. Generate unsettling stories. Revisit archived sessions.

Every interaction reveals another trace.

Built for the [Hacktoberfest Open-Source AI Challenge — Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26), AFTERDARK explores the intersection of developer tools, atmospheric storytelling, and privacy-conscious browser experiences.

## 02 / ENTER THE TERMINAL

```text
AFTERDARK OS  //  SESSION 0001
--------------------------------------------

$ whoami

visitor

$ scan

[!] UNUSUAL ACTIVITY DETECTED
[!] 03 UNKNOWN EVENTS DISCOVERED
[!] LAST ACTIVITY: UNDETERMINED

$ inspect --event 03

The process has no recorded origin.

It was already running when you arrived.

$ haunt

I remember your last session.

You never opened it.

--------------------------------------------
CONNECTION STATUS: UNEXPLAINED
```

<sub>Illustrative terminal transcript. Events and responses are fictional.</sub>

> **A note from the machine:** The terminal is simulated. It does not execute operating-system commands or inspect your actual computer.

## 03 / INSIDE AFTERDARK

<table>
<tr>
<td width="50%" valign="top">

### ⌘ Haunted Terminal

An interactive terminal simulator with command parsing, simulated output, session history, and fictional anomalies.

</td>
<td width="50%" valign="top">

### ◉ The Ghost

A mysterious companion that responds to terminal events with eerie, context-aware messages.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### ▧ Ghost Stories

Generate fictional horror stories using configurable settings, intensity, and length.

</td>
<td width="50%" valign="top">

### ▤ Session Archives

Explore saved sessions and revisit the events that unfolded during previous visits.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### ⚑ Incident Reports

Turn simulated anomalies into fictional timelines, observations, and incident summaries.

</td>
<td width="50%" valign="top">

### ◌ Atmospheric UI

A restrained retro-terminal aesthetic built around charcoal surfaces, muted amber, terminal green, and monospaced typography.

</td>
</tr>
</table>

## 04 / THE EXPERIENCE

### A terminal with a different personality

AFTERDARK combines familiar developer interactions with a fictional layer of mystery.

| Command | Experience |
|---|---|
| `help` | Discover the available commands |
| `ls` | Explore the simulated directory |
| `pwd` | Reveal the current simulated location |
| `whoami` | Discover your terminal identity |
| `history` | Revisit previous commands |
| `scan` | Search for fictional anomalies |
| `inspect` | Investigate a simulated event |
| `explain` | Explore a command explanation |
| `haunt` | Trigger an eerie interaction |
| `summarize` | Generate a session summary |
| `clear` | Clear the visible terminal |

The available commands depend on the current implementation.

## 05 / DESIGN PHILOSOPHY

AFTERDARK is intentionally understated.

**Dark, not noisy.**

Near-black backgrounds establish the atmosphere without overwhelming the content.

**Retro, not dated.**

Monospaced typography and restrained terminal details reference classic computing without sacrificing modern usability.

**Immersive, not complicated.**

The terminal remains the centerpiece. Navigation, archives, stories, and reports support the experience rather than compete with it.

**Functional, not decorative.**

Interactive elements should do something meaningful, even when the experience itself is fictional.

## 06 / BUILT TO BE LIGHTWEIGHT

AFTERDARK is designed as a frontend-only experience.

- No paid inference API.
- No API keys or cloud AI account.
- No backend required for the intended demo.
- No operating-system shell execution.
- No mandatory database.
- Optional browser-local session persistence.

Stories and terminal responses can be generated using local JavaScript logic. The application can run without downloading an AI model.

### The open-innovation distinction

The current demo does **not** perform genuine open-weight model inference. It demonstrates a lightweight, local-first interaction model.

A future version could integrate an open-weight model through a local inference runtime, allowing users to experiment with model choice, local processing, and configurable AI behavior.

The goal is to keep the experience accessible while providing a clear path toward deeper open-source AI integration.

## 07 / TECHNOLOGY

The intended stack, depending on the actual repository implementation:

| Technology | Role |
|---|---|
| React | Component-based UI |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Tailwind CSS | Styling, if installed |
| JavaScript | Terminal simulation and story generation |
| localStorage | Optional session persistence |

No technology should be considered part of the implementation unless it is actually present in the project.

## 08 / GET STARTED

### Prerequisites

- Node.js
- npm
- A modern web browser

### Run locally

Clone the repository:

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address displayed in your terminal.

These commands assume the project uses Vite and the standard npm scripts. Replace the repository URL and directory with your actual values.


## 9 / PROJECT STATUS

**Current focus:** A polished, interactive frontend demo.

The experience centers on terminal simulation, local story generation, interface interactions, and fictional session exploration.

Real AI inference, genuine system monitoring, and real security scanning are outside the current scope.

## 10 / THE NEXT CHAPTER

Potential directions for future development:

- Optional integration with an open-weight model running locally.
- More elaborate terminal scenarios and branching stories.
- Additional session and incident-report interactions.
- Customizable terminal appearance.
- Session import and export.
- Accessibility and keyboard-navigation improvements.

These are future ideas, not existing features.

## 11 / LICENSE

Add a `LICENSE` file with your chosen open-source license before publishing a license claim. If you select MIT, include the standard MIT License text and the appropriate copyright holder.

---

<p align="center">
  <br />
  <strong>AFTERDARK</strong>
  <br />
  <sub>SESSION TERMINATED. MEMORY RETAINED.</sub>
  <br /><br />
  <em>Some machines never really sleep.</em>
  <br /><br />
  Built for the curious. Designed for the dark.
</p>
