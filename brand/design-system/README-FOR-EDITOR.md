# How to edit a Sameer Automations Reel

This is the human-and-AI workflow for turning raw talking-head footage into a finished branded Reel using Remotion / Hyperframes + Claude Code.

## TL;DR

1. Drop the raw footage into `reels/footage/<reel-name>/`.
2. Drop a transcript (or run Whisper) → `reels/footage/<reel-name>/transcript.json`.
3. Tell Claude Code: *"Edit this Reel using the brand system."*
4. Claude reads `brand-manifest.json` + `CLAUDE.md`, scaffolds a Remotion composition that pulls components from `reels/components/`, applies the brand rules, renders 1080×1920 @ 30fps.
5. Review. Tweak shot timings if needed. Ship.

## What's in this kit

```
brand-manifest.json          ← canonical tokens (colors, fonts, motion, zones)
CLAUDE.md                    ← editing rules — Claude Code reads this first
assets/allowlist.txt         ← every file allowed when editing
README-FOR-EDITOR.md         ← this file

fonts/                       ← Roc Grotesk Wide + Gilroy
assets/                      ← logos

reels/
  tokens.ts                  ← typed exports of the manifest
  fonts.css                  ← @font-face block for Remotion runtime
  components/
    LowerThird.tsx           ← name / topic card, anchored bottom
    CaptionStrip.tsx         ← auto-captions for spoken cues
    NumberedList.tsx         ← items stack in as you list them
    QuotePull.tsx            ← repeats your line as side-rail text
    SystemDiagram.tsx        ← arch-node graph that builds as you explain
  presets/
    shot-presets.ts          ← ready-to-use shot configs

preview/                     ← static visual references for each overlay
```

## The five overlays

| Overlay | When to trigger | Anchor |
|---|---|---|
| **LowerThird** | Setting context: "Today I'm going to show you…" | bottom of frame |
| **CaptionStrip** | Every spoken sentence (auto-captions, 1 emphasis word per cue) | above the IG bottom UI |
| **NumberedList** | When you list things: "There are 5 plays I run…" | bottom of frame |
| **QuotePull** | When you say a line worth repeating visually | right or left rail |
| **SystemDiagram** | When you explain a flow: "First the lead comes in, then…" | right rail |

## Color rules (the most-broken in practice)

- **One accent per shot.** If a `LowerThird` is purple, captions on that shot emphasize in purple too. Don't mix.
- **Never two saturated overlays at once.** A yellow lower-third + a cyan stat callout in the same frame is forbidden.
- **Purple is default.** When in doubt, use `ACCENT.purple`.

## Type rules

- All display copy = **Roc Grotesk Wide**, weights 700/800/900/950.
- All body & captions = **Gilroy**.
- All eyebrows / mono / timecodes = **JetBrains Mono**, uppercase, 0.14em tracking.
- **Never** use Inter, Outfit, system-ui — they are forbidden in `brand-manifest.json`.

## Motion rules

- Numbers / stats → **snap_in** (linear, 8 frames). Hard pop.
- Words / cards / lists → **soft_in** (ease-out, 14 frames). Soft.
- Idle nodes → **node_pulse** (90-frame breathing loop).
- Don't write custom easings.

## Workflow with Claude Code

When you ask Claude Code to edit a reel, it will:

1. Read `brand-manifest.json` for tokens.
2. Read `CLAUDE.md` for editing rules.
3. Read your transcript + shot list.
4. For each shot:
   - Pick an overlay component from the registry.
   - Pick **one** accent.
   - Place it in a safe-zone.
   - Add captions for the audio.
5. Validate against the checklist in `CLAUDE.md` before rendering.
6. Render at 1080×1920 @ 30fps.

## What Claude will refuse to do

- Use a font outside the manifest.
- Invent a hex code.
- Place two saturated overlays on the same frame.
- Add emoji as graphics.
- Use stock photography.

If you genuinely need one of these, edit `brand-manifest.json` first — that's the only legal way to expand the system.

## Adding a new overlay type

If you find yourself recording a kind of shot that none of the five overlays covers:

1. Sketch the layout in a `preview/*.html` card so it's reviewable.
2. Add a token to `brand-manifest.json` → `overlays.registry`.
3. Add the path to `assets/allowlist.txt`.
4. Build the component in `reels/components/`.
5. Add a preset in `reels/presets/shot-presets.ts`.

Once it's in the manifest, Claude Code will pick it up automatically.

## Stack notes

- **Remotion** is the primary target. Components are written as React + Remotion (`useCurrentFrame`, `interpolate`, `AbsoluteFill`, `Sequence`).
- **Hyperframes** can consume the same components — they're plain React.
- Fonts load via `reels/fonts.css`. Use `staticFile()` from Remotion to resolve.
- Every component honors `useCurrentFrame()` → animates from frame 0 of its `<Sequence>`.

## Render checklist

Before shipping a cut:

- [ ] All fonts resolve to `fonts/`.
- [ ] All colors come from `tokens.ts` — no raw hex anywhere.
- [ ] No frame has two saturated overlays.
- [ ] All overlays sit inside the IG safe-zones.
- [ ] Captions clear the bottom UI (≥430px).
- [ ] No emoji, no stock photo, no off-brand fonts.
- [ ] Logo never appears (per spec — type-only system).

If everything passes: render. If not: fix before render.
