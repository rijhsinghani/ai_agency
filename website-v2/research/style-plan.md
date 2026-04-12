# Style plan — sameerautomations.com v2

**Generated:** 2026-04-12
**Validated by:** `ui-ux-pro-max` skill (supplemental) + locked brand tokens (authoritative) from `brand/brand-voice.md` §9
**Status:** Ready for Wave 2 builders. Do NOT propose palette or typography changes — they are locked.

---

## 0. Token lock (authoritative)

These come from `brand/brand-voice.md` §9 and override any skill recommendation:

| Token         | Value                                    | Tailwind name     |
| ------------- | ---------------------------------------- | ----------------- |
| Primary       | `#7B2FBE`                                | `brand-purple`    |
| Purple light  | `#9B4FDE`                                | `brand-purple-lt` |
| Cyan          | `#4DD9E8`                                | `brand-cyan`      |
| Dark base     | `#1A1A1A`                                | `brand-ink`       |
| Deep navy     | `#0F172A`                                | `brand-navy`      |
| Grain white   | `#F5F5F5`                                | `brand-white`     |
| Muted gray    | `#6B7280`                                | `brand-mute`      |
| Success green | `#10B981`                                | `brand-green`     |
| Warm orange   | `#D97706`                                | `brand-orange`    |
| Heading font  | Roc Grotesk Bold (700) + fallback Outfit |
| Body font     | Gilroy Regular (400) + fallback DM Sans  |
| Mono          | JetBrains Mono 400                       |

Signature motif: the three-stop gradient `#7B2FBE → #9B4FDE → #4DD9E8`. Declared as a CSS variable `--brand-gradient` and used for logo, hero S-wave, connector lines, and two accent dividers.

---

## 1. Background treatment (all sections)

The page has four stacked background layers, bottom to top:

1. **Base:** `#0E0E0E` (pure dark, slightly below `#1A1A1A` ink to give depth — the hero `hero-preview.html` already ships this). Sections do not swap backgrounds; they swap tint.
2. **Mesh gradient layer:** A single full-viewport `radial-gradient` pinned to the page, not per-section. Purple radial anchored top-left at 15% opacity, cyan radial anchored bottom-right at 10% opacity. Uses CSS `background-attachment: fixed` on desktop; on mobile, simplified to a static radial at 8% opacity (performance).
3. **Dot grid layer:** SVG pattern, 32px cell, 1px dot, `fill: rgba(255,255,255,0.06)`. Rendered as a single sticky full-viewport `<div>` with `pointer-events: none`. Hero section kicks it up to 8%.
4. **Grain layer:** 1x1 repeating noise PNG (or SVG `<feTurbulence>`) at 4% opacity, pinned to viewport via `position: fixed`. Blend mode `overlay`.

### Section tint shifts (no hard color breaks)

Instead of alternating dark/light, sections alternate tint at ±3 luminance on the same base:

| Section          | Base      | Gradient overlay                                        |
| ---------------- | --------- | ------------------------------------------------------- |
| Hero             | `#0E0E0E` | Mesh full-strength, brand gradient pulse in S-wave only |
| Problem strip    | `#0E0E0E` | Mesh only, no pulse                                     |
| Automation cards | `#101012` | +1 cyan radial behind center card                       |
| Proof            | `#0E0E0E` | +1 purple radial behind the middle metric               |
| How it works     | `#101012` | Connector SVG lines between step numbers                |
| FAQ              | `#0E0E0E` | Mesh only                                               |
| Final CTA        | `#0E0E0E` | Full gradient wash, 25% opacity — signature moment      |
| Footer           | `#08080A` | No overlay, grid fades to 3%                            |

This gives the scroll a continuous, "one long living surface" feel — no jarring section breaks. It matches brand-voice §9 "living system" language and directly borrows Vercel's mesh-gradient bleed pattern.

---

## 2. Hero layout

**Grid:** 12-column, 1440px max-width, 48px gutters, 96px top padding, 120px bottom padding.

**Left column (7 cols):**

- Eyebrow tag: 14px Gilroy Medium, cyan color, 2px letter-spacing uppercase, e.g. `[ AUTOMATION SYSTEMS · BUILT BY SAMEER ]`
- H1: Roc Grotesk Bold, 72px / 1.05 line-height, white `#F5F5F5`. Last word is the rotating industry (see inspiration.md ref 6).
- Subhead: Gilroy Regular, 20px / 1.5, `rgba(245,245,245,0.72)`, max 540px width.
- CTA row: 2 buttons.
  - Primary: solid `--brand-gradient` fill, 16px Gilroy Medium, 14px/24px padding, border-radius 8px, subtle glow.
  - Ghost: 1px `rgba(255,255,255,0.18)` border, white text, hover lifts border to `#9B4FDE`.
- Proof strip (below CTAs, 48px margin-top): one line of industry words separated by a bullet middot, 13px Gilroy Regular, `rgba(245,245,245,0.5)`.

**Right column (5 cols):**

- S-wave Input/Output Bridge. Pure SVG, no Spline/R3F.
- ViewBox 480x480. Cubic-bezier S path from top-right (input node) to bottom-left (output node). Stroke = 2px, stroke width scales down to 1.5px on mobile.
- Path uses `stroke-dasharray` mount animation — 1200ms, `cubic-bezier(0.22,1,0.36,1)` ease.
- Two glowing circles (arch-nodes): input node `#7B2FBE` with cyan halo, output node `#4DD9E8` with cyan halo. Each has a `feGaussianBlur` filter at stdDev 8 and a CSS `@keyframes` pulse on `filter: brightness()` (0.9 → 1.15 → 0.9, 3s loop).
- Dot grid in the right column is +2% opacity to make the visual feel "denser" than the text side.

**Mobile (<768px):**

- Single column, S-wave moves above the H1 at 280px height.
- H1 drops to 44px / 1.1.
- CTAs stack full-width with 12px gap.

---

## 3. Typographic scale

All sizes in rem (root = 16px). Roc Grotesk Bold for headings, Gilroy Regular for body, Gilroy Medium (500) for emphasis, JetBrains Mono only for in-copy metric tags.

| Role                | Desktop         | Mobile           | Tracking |
| ------------------- | --------------- | ---------------- | -------- |
| Display (hero H1)   | 4.5rem / 1.05   | 2.75rem / 1.1    | -0.02em  |
| H2 (section)        | 3rem / 1.1      | 2rem / 1.15      | -0.015em |
| H3 (card title)     | 1.5rem / 1.25   | 1.25rem / 1.3    | -0.01em  |
| H4 (sub-card)       | 1.125rem / 1.35 | 1rem / 1.4       | 0        |
| Body large          | 1.25rem / 1.5   | 1.0625rem / 1.55 | 0        |
| Body                | 1rem / 1.6      | 1rem / 1.6       | 0        |
| Small / caption     | 0.875rem / 1.5  | 0.875rem / 1.5   | 0        |
| Eyebrow (uppercase) | 0.8125rem / 1.4 | 0.75rem / 1.4    | 0.12em   |
| Metric XL (proof)   | 7.5rem / 0.95   | 4rem / 1         | -0.03em  |
| Metric sub-label    | 0.9375rem / 1.5 | 0.875rem / 1.5   | 0.04em   |

Line length: body text is capped at 62 characters per line via `max-width: 60ch`. Hero subhead caps at 540px. FAQ answers cap at 72ch.

---

## 4. Spacing rhythm (4pt base, 8pt primary)

Base unit = 4px. All spacing values are multiples of 4; primary steps are multiples of 8. This matches shadcn/ui defaults and aligns to the dot-grid 32px cell (8 × 4).

| Token      | px  | Use                                      |
| ---------- | --- | ---------------------------------------- |
| `space-1`  | 4   | Inline badges, tag padding               |
| `space-2`  | 8   | Icon-to-text gap, small stacks           |
| `space-3`  | 12  | Button padding-y                         |
| `space-4`  | 16  | Card internal padding, paragraph spacing |
| `space-6`  | 24  | Card-to-card gap                         |
| `space-8`  | 32  | Block-to-block within a section          |
| `space-12` | 48  | Section inner padding-x                  |
| `space-16` | 64  | Small section padding-y                  |
| `space-24` | 96  | Standard section padding-y (desktop)     |
| `space-32` | 128 | Hero / final CTA padding-y               |

Container widths: `max-w-6xl` (1152px) for most sections, `max-w-7xl` (1280px) for hero and proof.

---

## 5. Section rhythm

Each of the 9 sections follows this structural pattern:

```
[96–128px top padding]
[eyebrow tag, 14px cyan, uppercase]
[H2, 48px Roc Grotesk]
[optional 20px supporting line, 60ch max]
[48px gap]
[section body — cards / accordion / metric / form]
[96–128px bottom padding]
```

Sections NEVER use a horizontal divider rule. The transition is made by:

1. The mesh gradient bleed (Vercel pattern).
2. A tint shift of ±3 luminance.
3. A 1px full-width faint gradient line at `rgba(155,79,222,0.12)` — optional, only for the 3 "heavy" transitions (problem→cards, proof→how-it-works, FAQ→final CTA).

---

## 6. Motion language

All motion is handled by Framer Motion. Global preset stored in `lib/motion.ts`:

```ts
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};
```

**Rules:**

- Fade-up + 24px travel. Never slide from side, never scale, never rotate, never bounce.
- Stagger children with `staggerChildren: 0.08` (80ms) to max 0.12 (120ms).
- Duration cap: 600ms. Anything longer feels slow on scroll.
- Easing: single curve `cubic-bezier(0.22, 1, 0.36, 1)` — the Framer preset. No `easeIn`, no `easeInOut`, no spring.
- Hero S-wave path animation: 1200ms one-shot on mount, separate from scroll preset.
- Arch-node glow pulse: CSS `@keyframes`, 3s infinite, `ease-in-out`.
- Metric counter animation (proof): count-up from 0 to target over 1200ms on viewport entry, once.
- FAQ accordion: `auto` height with CSS grid-row trick, 240ms ease-out open, 180ms ease-in close.
- `prefers-reduced-motion: reduce` — all motion collapses to instant opacity fade, no travel, no counter animation, no path stroke, no pulse.

**Disallowed motion:**

- Parallax backgrounds (heavy, breaks on mobile)
- Scroll-linked transforms (janky, not needed)
- 3D tilt on cards (dated)
- Typewriter effects (too slow)
- Infinite marquees (distracting, overused)

---

## 7. Component primitives (shadcn/ui + custom)

Installed via `npx shadcn@latest add`:

- `Button` — variants: `primary` (gradient fill), `ghost` (1px border), `link` (underline on hover, cyan)
- `Card` — variants: `default` (1px border, grain inherited), `raised` (adds subtle inner highlight border-top)
- `Accordion` — FAQ section. Border-bottom only, no borders on left/right, no chevron rotation gimmick — chevron fades in on hover.
- `Dialog` — used only for the Book-a-call fallback modal (rare path).
- `Badge` — used for industry tags on proof blocks and automation-card labels. Variant: `cyan-outline` (1px cyan border, cyan text, transparent bg).

Custom primitives (not shadcn):

- `<DotGrid />` — full-section background layer, accepts `density` + `opacity` props
- `<ArchNode glow={purple|cyan} size={8|12|16} />` — the glowing dot, CSS pulse keyframe
- `<SWavePath from={node} to={node} />` — SVG path, animated on mount
- `<Connector variant={purple|cyan|gradient} />` — thin animated SVG line between elements
- `<GrainOverlay />` — single global component, mounted in root layout
- `<MetricXL value={string} label={string} industry={string} />` — used in proof section, runs count-up animation on viewport entry
- `<EyebrowTag>` — uppercase cyan label used atop every section

All custom primitives live in `components/brand/` and import tokens from `tailwind.config.ts`.

---

## 8. Accessibility floor (non-negotiable)

- Body text contrast on `#0E0E0E`: `#F5F5F5` gives 15.3:1 — passes AAA.
- Secondary text `rgba(245,245,245,0.72)` gives ≈11:1 — passes AAA.
- Muted `rgba(245,245,245,0.5)` — only used for 13px+ labels, gives ≈7.6:1 — passes AA large.
- All interactive elements: visible focus ring, 2px `#4DD9E8` outline offset 3px.
- Touch targets: 44px minimum height on all buttons and accordion triggers.
- `cursor: pointer` on every clickable element (including cards if the whole card is clickable).
- Icons: Lucide only. No emojis anywhere (brand rule + accessibility).
- `prefers-reduced-motion` respected (see §6).
- Hero animated S-wave has an `aria-hidden="true"` attribute and a visually hidden `<span>` description above it: "An illustration of an automated data pipeline connecting two system nodes."
- Form: every field has a visible `<label>`, not just placeholder text. Inline error messages live next to the field, not at the top.

---

## 9. Pre-build checklist (for Wave 2 builders)

Before any component merges:

- [ ] Uses brand tokens from `tailwind.config.ts`, not raw hex
- [ ] Uses `<DotGrid />`, `<ArchNode />`, `<GrainOverlay />` primitives, not ad-hoc SVG
- [ ] Uses the global `fadeUp` preset from `lib/motion.ts`, not inline variants
- [ ] Zero emojis in copy or code
- [ ] Body copy passes banned-phrases lint
- [ ] Hero / section rotates across ≥5 distinct industries
- [ ] No raw drop-shadows on cards — only 1px borders (Attio pattern)
- [ ] No glassmorphism — grain + border only
- [ ] Mobile tested at 375px, tablet at 768px, desktop at 1440px
- [ ] `prefers-reduced-motion` tested with DevTools emulator
