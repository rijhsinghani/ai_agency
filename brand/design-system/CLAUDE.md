# CLAUDE.md — Sameer Automations Reel Editing

You are editing **Sameer Automations** vertical Reels for Instagram. The talking-head footage is the substrate; you are layering branded motion graphics on top.

## The single source of truth

**`brand-manifest.json`** at the project root is canonical. Read it before generating any component. Every color, font, motion preset, and overlay specification you produce **MUST** resolve to a token in that file. Do not invent hex codes, weights, durations, or fonts. If a token you need does not exist, stop and ask the user — do not fabricate one.

## Allowed paths

Only read from these directories when sourcing assets:

```
fonts/                      — Roc Grotesk Wide + Gilroy (.otf)
assets/                     — logos (logo-icon-dark.svg, etc.)
reels/components/           — overlay React components
reels/presets/              — reusable shot configurations
reels/tokens.ts             — typed exports of brand-manifest.json
brand-manifest.json         — canonical tokens
```

The full machine-readable allowlist is in `assets/allowlist.txt`. **Do not import from anywhere outside this list.** No npm fonts, no Google Fonts, no stock images, no random Lottie files.

## Stack assumptions

- **Remotion** for compositing (`@remotion/cli`, `remotion`).
- **Hyperframes** acceptable as the runtime where applicable.
- All overlays render at **1080×1920 @ 30fps** unless told otherwise.

## How to add an overlay to a shot

1. Pick the overlay `id` from `brand-manifest.json` → `overlays.registry`.
2. Import the matching component from `reels/components/`.
3. Wrap in `<Sequence from={frameIn} durationInFrames={frameLen}>`.
4. Set `accent` from the allowed list — **one accent per shot**, never two saturated overlays at once.
5. Place inside one of the zones from `safeZones.reel.talkingHeadCenterFramePadding`.

Example:

```tsx
import { LowerThird } from './components/LowerThird';
import { ACCENT } from './tokens';

<Sequence from={30} durationInFrames={120}>
  <LowerThird
    eyebrow="·  AUTOMATION 01"
    title="Reply in 60s."
    subtitle="Even at 2am."
    accent={ACCENT.cyan}
  />
</Sequence>
```

## Captions

Auto-captions are required on every Reel. Generate them from the audio transcript and emit one `<CaptionStrip>` per cue. Up to **one word per caption** may be emphasized — pick the noun or numeral the speaker stresses, set its `emphasisWordIndex`, and the component handles styling. Do not add multiple emphasis words. Do not add emoji.

## Color rule (most-broken in practice)

- One accent color per shot.
- Captions stay white on dark scrim. The accent only appears on: the eyebrow mono rule, the emphasized caption word, and the active overlay's signature element.
- **Never** two of (yellow / cyan / lime / pink / orange) on screen at the same time.
- Purple (#A055FF) is the default brand color. If unsure which accent, default to purple.

## Type rule

- Display copy → Roc Grotesk Wide (always one of weights 700, 800, 900, 950).
- Body / captions → Gilroy.
- Eyebrows / mono / timecodes → JetBrains Mono, uppercase, 0.14em tracking.
- **Never** use Inter, Roboto, Outfit, system-ui, Arial. They are in `forbidden.fonts` for a reason.

## Motion rule

- Stats / numbers → `snap_in` preset (linear, 8 frames).
- Words / cards → `soft_in` preset (cubic-bezier 0.22,1,0.36,1, 14 frames).
- All exits → `out` preset.
- Do not write custom easings without referencing the manifest.

## What to refuse

If the user asks you to:
- Use a font/color not in the manifest → refuse, suggest the closest token.
- Add emoji as a graphic element → refuse, suggest an arch-node or icon.
- Use stock photography → refuse, suggest the existing tile-typography pattern.
- Edit `brand-manifest.json` itself → ask the brand owner first; do not silently change tokens.

## Workflow per Reel

```
1. Read brand-manifest.json.
2. Read the shot-list (provided by user or in reels/shots/).
3. For each shot:
   a. Load the talking-head clip.
   b. Pick overlay component(s) from registry.
   c. Pick ONE accent.
   d. Place in safe-zone.
   e. Add captions for the audio.
4. Render at 1080×1920 @ 30fps.
```

## Validation checklist (run before render)

- [ ] All fonts resolve to `fonts/` paths.
- [ ] All colors resolve to manifest tokens (no raw hex).
- [ ] No two saturated overlays on screen at the same frame.
- [ ] All overlays sit inside `safeZones.reel`.
- [ ] Captions clear the IG bottom UI (≥430px from bottom).
- [ ] No emoji, no stock photo, no off-brand fonts.

If anything fails, fix it before rendering — do not ship a non-compliant cut.
