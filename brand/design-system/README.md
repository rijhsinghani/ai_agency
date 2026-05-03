# Sameer Automations — Design System

Dark-mode-first visual system for Sameer Automations, an AI growth partner for small business owners. Sameer runs like an agency as one person: he builds the full digital presence (brand, website, content, lead capture, follow-up, reviews) for a single owner and takes revenue share after a free growth audit.

The design language is **System Architecture**: dot grids, small glowing arch-nodes, flowing connectors, subtle mesh gradients, and fine grain texture. Every surface should feel like part of a living system that's quietly working for the owner. Purple and cyan are **accents only** — never fill large areas with saturated color.

---

## Sources

- **Uploaded logos** — `uploads/logo-full-light.svg`, `uploads/logo-icon-dark.svg`, `uploads/logo-icon-light.svg` (primary S-wave pipeline marks).
- **GitHub repo** — [`rijhsinghani/ai_agency`](https://github.com/rijhsinghani/ai_agency) — canonical source. The `brand/` folder was imported; `website/index.html` was read for interaction + component patterns. Guides and the content-engine live here too.
- **Brand voice doc** — imported to `references/brand-voice.md` (verbatim from the repo).
- **Banned-phrases list** — imported to `references/banned-phrases.json` — do not use any of these in generated copy.
- **Email signature** — `references/email-signature.html` — reference for HTML email styling.
- **YouTube brand kit** — `references/youtube/` — banner, thumbnail template, profile pic, channel keywords.
- **Not accessible** — `uploads/Gilroy.zip`, `uploads/Roc-Grotesk.zip`, and `uploads/InstantEditAI - Brand Guideliness-compressed.pdf` were mentioned in the brief but aren't on the filesystem. Google Font substitutes are wired in (see Typography). Flag: please re-upload the font archives if you want the real Gilroy / Roc Grotesk shipped with the system.

---

## Products covered

**Sameer Automations itself** is the only public-facing product — a single-person agency. The main surface is the marketing website with a handful of lead-magnet guide pages (missed-call text-back, Monday pipeline, no-show killer, quote writer, review automation). There is no product app; deliverables are the automations Sameer builds for each client inside their own stack. The UI kit in this repo therefore covers the **marketing website** only.

Adjacent operational tools (`content-engine/`, `ops/`, `research/`) are internal — they don't ship to end users and aren't part of the visual brand.

---

## Content fundamentals

Sameer talks like a small business owner who built his way out of operational chaos. Not a vendor pitching software.

- **Voice is direct, peer-level, confident, practical, transparent.** Lead with the gap, show the transformation, show the numbers. Specifics over promises. Example — use: *"Most businesses lose 40% of inbound leads because nobody follows up fast enough. This system fixes that."* Don't use: *"Unlock transformative lead conversion with our proprietary engagement platform."*
- **First person, always.** "I built this," "I'll show you," "I study how your business runs." Never "we," "our team," "our platform."
- **Contractions are mandatory** — it's, you're, we'll, don't. They keep the tone human.
- **Sentence case for everything** — headings, titles, nav, buttons. Never Title Case. ("Book a call" not "Book A Call".)
- **Short paragraphs** — 2–4 sentences max. Paragraph = one idea.
- **Numerals for business metrics, always.** Write *3 jobs, $4,200, 40%, 12 minutes, 60 seconds* — not "three jobs," not "forty percent."
- **Oxford comma, always.**
- **No emoji.** Not in copy, captions, emails, or DMs. The design system also avoids emoji — use SVG arch-nodes / Lucide icons instead.
- **No buzzwords.** The repo ships a `banned-phrases.json` — the full list is cached at `references/banned-phrases.json`. Highlights: *cutting-edge, disrupt, empower, game-changer, groundbreaking, innovative, leverage, paradigm shift, revolutionary, robust, scalable solution, seamless, synergy, unlock, unleash, utilize.* If a draft contains any of these, rewrite.
- **Don't explain the technology.** The audience understands their business deeply; they don't understand automation and don't need to. Explain the outcome: *"New lead comes in. Within 60 seconds, they're qualified, booked, and confirmed."*
- **Terminology — use / don't use:** *automation* not *AI solution*; *system* not *platform*; *small business owner* not *SMB/solopreneur*; *follow-up* not *nurture sequence*; *missed call text-back* not *SMS re-engagement*; *build* not *implement/deploy*; *retainer* not *subscription*; *I built this* not *our team developed*.
- **Hard confidentiality rule.** Never reference any current or past employer, financial services, banking, treasury, or fixed income in connection with Sameer's background. The only acceptable phrasing is **"across industries"** or **"in my own business."** When in doubt, cut the reference.
- **Rotate industries in examples** — dental offices, salons, photography studios, cleaning companies, law firms, gyms, tutoring centers, trades. Not just one vertical.

### Example copy (good)

> Stop losing jobs to slow follow-up and Sunday evening paperwork. I build custom systems that answer your leads, draft your quotes, collect your reviews, and get you paid — 24/7.

> The missed call text-back alone recovered 3 jobs last month for one client. That's $4,200 from a $200/mo system.

> Every unanswered call is a $500 job walking to your competitor.

---

## Visual foundations

### Color

- **Signature** — purple → cyan gradient (`#A055FF → #C084FC → #31D8FE`). Used on the S-wave logo, gradient headline words, hairline dividers, section connectors. **Not as a block fill.**
- **Dominant surface** — neutrals: `--sa-base #0E0E0E`, `--sa-surface #161616`, `--sa-surface-raised #1E1E1E`. 80–90% of any composition should be these. The brand doc also calls out `#1A1A1A` (dark base) and `#0F172A` (deep navy) — use navy as an alternate section bg, sparingly.
- **Purple (#A055FF)** — primary CTAs, input nodes in the S-mark, focus rings, eyebrow accent lines, 1px hover borders. Use sparingly — glow/muted wash (`rgba(160, 85, 255,.12)`) is more common than solid fills.
- **Cyan (#31D8FE)** — output nodes, "What changes" section labels, some stat numbers, the cool end of the gradient. Accent-only.
- **Warm orange (#FF8135 / #FF8135)** — ROI/result numbers *exclusively*. If a number is a business outcome (2x, $4,200, 47%), color it warm orange to signal "this is the result."
- **Success green #10B981 / Error red #EF4444** — status only. Never decoration.
- **Soft white #F5F5F5 / Cream #EDE9E3** — primary text on dark. `--sa-cream-dim #A8A29E` for secondary text (~60% of body).

Full token list lives in [`colors_and_type.css`](./colors_and_type.css).

### Typography

- **Display — Roc Grotesk Wide.** Per the brand guidelines (p.27), the heading face is the **Wide** width — not the regular width. `--sa-font-display` resolves to `"Roc Grotesk Wide"` so any element that hits an h1/h2/h3 token gets the correct width by default. Tracking `-0.02em` (Wide is already wide — don't over-condense it); `line-height: 0.96–1.08`. The full 9-weight Wide family is on disk in `fonts/` (rocgroteskwide-thin…black.otf).
- **Body — Gilroy Regular / SemiBold.** Paragraphs, nav, labels, buttons. Comfortable at 15–18px.
- **Mono — JetBrains Mono.** Code blocks, data readouts, in-copy metrics where alignment matters, signature timestamps.
- **Fonts on disk.** Licensed **Roc Grotesk Wide** (Thin→Black, 9 weights) is the only Roc Grotesk width on disk — see `fonts/rocgroteskwide-*.otf`. The other widths (Regular / Cond / Comp / XWide) were DEMO files and have been removed; their `@font-face` declarations are gone too. If a width other than Wide is needed later, license it first. **Gilroy** ships as `Gilroy-Light.otf` (300) and `Gilroy-ExtraBold.otf` (800); 400/500 alias Light and 600–900 alias ExtraBold (still need real Medium and Regular).
- **Casing rule** — always sentence case. Never Title Case. Never ALL CAPS *except* on eyebrow labels (12px, tracked 0.2em uppercase).
- **Scale** — hero `clamp(3rem, 6.5vw, 5.75rem)`, h1 `clamp(2.25rem, 4vw, 3.25rem)`, h2 `clamp(1.875rem, 3vw, 2.75rem)`, h3 24, h4 20, body 16, secondary 15, eyebrow 12.

### Spacing & layout

- **4pt base grid.** Token range: 4 → 128px (`--sa-space-1 … --sa-space-32`). Card padding is 28–40px; section padding-y is 96–128px (`py-24 lg:py-32`).
- **Max content width** `max-w-7xl` (80rem) with `px-6 lg:px-10` gutters.
- **Generous vertical rhythm.** Sections breathe. Don't fill the page.
- **12-column grid** on large screens for asymmetric layouts (e.g. `lg:col-span-7` + `lg:col-span-5`). Step cards occasionally use staggered `lg:ml-8 / lg:ml-16` indents to imply flow.

### Corners & borders

- **Card radius — 16–20px** (`rounded-2xl`). Feels modern without being toy-like.
- **Button radius — 12px** (`rounded-xl`). Slightly tighter than cards.
- **Pill radius — 999px** for status badges and eyebrow pills.
- **Borders** are usually 1px `rgba(237,233,227,0.06)` — barely visible, reads as edge, not outline. On hover: `rgba(160, 85, 255,0.30)`. A premium card uses a masked gradient border that fades in on hover (see `.card-premium`).
- **No harsh outlines.** Depth comes from value shift (`surface` → `surface-raised`) plus soft glow, not from heavy strokes.

### Shadows & glow

- **Default card — no shadow.** Depth is value-based. Lift happens on hover: `0 20px 60px -15px rgba(160, 85, 255,0.15)`.
- **Primary CTA shadow** — `0 4px 28px rgba(160, 85, 255,0.32)`. The glow color matches the button color — don't use neutral shadows on brand-color buttons.
- **Featured pricing card** — triple-stacked shadow including a 1px purple ring, a soft lift, and an ambient glow.
- **Arch-nodes always glow.** `box-shadow: 0 0 8px rgba(color,0.4)` is baked into every node dot.

### Backgrounds / atmosphere

- **Always dark.** `#0E0E0E` base. Never white/light for the primary experience.
- **Mesh gradients** — large-radius radial blurs at ~5–9% opacity, layered behind content. Token: `var(--sa-mesh-section)`. Used once per section, never across the whole page.
- **Dot grid** — radial dots at 5% opacity, 48×48px tile. Used as a background texture on surface sections (`.dot-grid` class).
- **Grain overlay** — fixed SVG fractal-noise overlay at 3–3.5% opacity, `z-index: 9999`, `pointer-events: none`. Always on. Ships in `--sa-grain-url`.
- **Hero spotlight** — large radial glow that tracks the cursor on hero sections only. Opacity 8%. Disabled under `prefers-reduced-motion`.
- **Protection gradients** — thin linear-gradient fades from base → transparent on the bottom edge of the hero, to hand-off to the next section.

### Motion

- **Easing: `cubic-bezier(0.16, 1, 0.3, 1)`** everywhere. Expressive ease-out. Fast in, settled out.
- **Durations** — 200ms (state), 350ms (card lift, transforms), 700ms (reveal on scroll).
- **Reveal on scroll** — opacity 0→1 + translateY 24→0 over 700ms. Stagger children at 80ms increments.
- **Arch-node pulse** — 3s loop, opacity 0.7↔1 + scale 1↔1.15. Baked into `.arch-node` class.
- **Shimmer on CTA hover** — diagonal bright streak traverses the button in 700ms.
- **Gradient flow** — the large S-watermark's gradient stops animate 0%↔50% over 8s, giving the hero a slow breathing quality.
- **Flow connector** — a purple glow traverses step-to-step connectors every 3s (the process timeline).
- **Honor `prefers-reduced-motion: reduce`** — all animation duration reduced to 0.01ms. This is implemented at the bottom of every page.

### Hover / press

- **CTA hover** — `translateY(-2px)` + glow shadow + diagonal white shimmer.
- **Card hover** — `translateY(-5 to -6px)` + masked gradient border fades in + cursor-tracked radial glow inside the card (200–400px radius, 7% purple).
- **Link hover (nav)** — color `cream-dim → cream`, 200ms.
- **Link hover (footer)** — underline grows from 0 → 100% width over 300ms.
- **Press state** — rely on browser default `translateY(0)` snap + slight shadow flatten. No shrink.

### Transparency & blur

- **Ambient blur blobs** — `blur-[130px]` purple rings at 5–8% opacity behind hero content. Drift-animated very slowly.
- **No glassmorphism.** The nav does not use `backdrop-filter`. It relies on the dark base + subtle border-bottom on scroll.
- **Purple-muted wash** — `rgba(160, 85, 255,0.12)` is the single most-used translucent fill. Icon chips, eyebrow pills, section-label backgrounds.

### Imagery vibe

- **No stock photos.** The brand prefers SVG architecture (S-mark, banners, thumbnails) and real product screenshots/Loom frames.
- When imagery is used it's **warm** (cream, tan, deep navy, purple) — never cool/blue or b&w.
- All bitmap imagery gets a faint **grain overlay** to match the system.

### Cards — canonical recipe

```
background: var(--sa-surface-raised);     /* #1E1E1E */
border: 1px solid var(--sa-border);       /* rgba(237,233,227,0.06) */
border-radius: var(--sa-radius-card);     /* 20px */
padding: 28–40px;                         /* p-7 → p-10 */
position: relative;
/* optional: arch-node dot in top-right corner, 6px, glowing, pulse 3s */
/* on hover: translateY(-5px), masked gradient border fades in, radial cursor glow */
```

---

## Iconography

- **Primary system** — **[Lucide](https://lucide.dev)**-style 1.5px stroke outline icons drawn inline with `<svg stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">`. The website uses hand-written SVGs in this exact style (phone, clock, calendar, message, chevron, check). The same set is available as a library via `<script src="https://unpkg.com/lucide@latest"></script>` or the CDN icon set — use that for new work so we don't hand-draw duplicates.
- **Stroke weight** — 1.5px everywhere. Stroke-linecap: round. No filled icons in the current brand; if an icon needs emphasis, wrap it in a **purple-muted chip** (40–56px, `rounded-xl`, `bg-purple-muted`, `border-purple/20`).
- **Check icons** — always stroked, `stroke-width: 2.5`, never filled, always purple (`#A055FF`).
- **Arrow icons** — `stroke-width: 2.5`, rounded caps. Used in CTAs, never decorative.
- **Arch-nodes as iconography** — the 6–8px glowing dot is a *system icon* in this brand. Use alongside text to mark "this is a system node" (e.g. eyebrow labels, stat dividers, corner accents on cards). Classes: `.arch-node`, `.arch-node-cyan`, `.arch-node-purple`, `.arch-node-orange`, `.arch-node-softpurple`, `.arch-node-warm`.
- **Logo mark** — the S-wave data pipeline. Primary icon: `assets/logo-icon-dark.svg`. 100×100 viewBox. Use at 24–28px in nav; 48px+ as a decorative element; 500px+ as a wall-sized watermark at 3% opacity.
- **Favicon** — `assets/favicon.svg`.
- **No emoji.** Never.
- **No unicode icon substitutes** (★, ✓, →) — always SVG.
- **No png icons** in the source repo — stick to SVG.

---

## Index

```
.
├── README.md                    ← you are here
├── SKILL.md                     ← Agent Skill entrypoint
├── colors_and_type.css          ← all design tokens (colors, type, spacing, radii, shadows, motion)
├── assets/                      ← SVG logos and favicon (canonical brand marks)
│   ├── logo-full-dark.svg       ← wordmark + icon lockup on dark bg
│   ├── logo-full-light.svg      ← wordmark + icon lockup on light bg
│   ├── logo-icon-dark.svg       ← S-wave icon only, dark bg variant
│   ├── logo-icon-light.svg      ← S-wave icon only, light bg variant
│   ├── logo-icon-white.svg      ← monochrome white S-mark
│   ├── logo-wordmark-dark.svg
│   ├── logo-wordmark-light.svg
│   └── favicon.svg
├── references/                  ← source-of-truth docs imported from repo
│   ├── brand-voice.md           ← full voice guide — READ THIS before writing copy
│   ├── banned-phrases.json      ← word-level banlist
│   ├── email-signature.html     ← reference HTML email styling
│   └── youtube/                 ← YouTube banner, thumbnail template, profile pic, channel keywords
├── preview/                     ← design-system cards shown in the Design System tab
│   ├── colors-primary.html
│   ├── colors-accents.html
│   ├── colors-neutrals.html
│   ├── colors-semantic.html
│   ├── gradient-signature.html
│   ├── type-display.html
│   ├── type-body.html
│   ├── type-mono.html
│   ├── type-eyebrow.html
│   ├── spacing-scale.html
│   ├── radii.html
│   ├── shadows.html
│   ├── motion.html
│   ├── arch-nodes.html
│   ├── buttons.html
│   ├── eyebrow-labels.html
│   ├── cards.html
│   ├── status-badge.html
│   ├── stat-block.html
│   ├── section-connector.html
│   ├── dot-grid.html
│   ├── grain-texture.html
│   ├── logo-lockups.html
│   └── iconography.html
├── ui_kits/
│   └── website/                 ← marketing website recreation
│       ├── README.md
│       ├── index.html           ← click-thru prototype (hero → services → process → CTA)
│       ├── Nav.jsx
│       ├── Hero.jsx
│       ├── ProblemGrid.jsx
│       ├── ServicesGrid.jsx
│       ├── ProcessTimeline.jsx
│       ├── StatStrip.jsx
│       ├── TestimonialCard.jsx
│       ├── PricingCard.jsx
│       ├── Footer.jsx
│       ├── Primitives.jsx       ← Button, Card, Eyebrow, ArchNode, SectionConnector
│       └── theme.css            ← @import of root colors_and_type.css
└── uploads/                     ← original user uploads (logos)
```

---

## Using this system

- **Copy tokens**, don't re-derive them. Everything lives in `colors_and_type.css` as CSS custom properties.
- **Copy components from `ui_kits/website/`** rather than hand-rolling. They're already on-brand.
- **Run copy through the rules** in `references/brand-voice.md` and the `banned-phrases.json` list before publishing anything.
- **When in doubt, go darker and quieter.** The system is muted by default; purple and cyan pay off *because* the rest of the page lets them.

---

## Caveats / flags

1. **Roc Grotesk Wide is the only licensed width on disk** (April 2026). The DEMO files for the other widths have been removed and their `@font-face` declarations cleared. License + upload Cond/Comp/XWide/Regular before using them in any work.
2. **Gilroy still needs Regular (400), Medium (500), and SemiBold (600).** Currently 400/500 alias Light and 600–800 alias ExtraBold, which makes 16px body copy read slightly thin.
3. **Brand guideline reconciliation (April 2026).** The InstantEditAI brand guidelines PDF is the parent reference for this system's palette + type. Verified alignment: Roc Grotesk Wide for headings, Gilroy for body, `#0A1117` base, `#A055FF` purple (Pantone 266 C), `#31D8FE` cyan (2985 C), `#FFCF01` yellow (116 C), `#FF8135` orange (165 C), `#B5ED30` lime (375 C). Secondary 10-color palette pulled into tokens (see `preview/colors-secondary.html`). Things NOT pulled across: the IEAI wing graphic device, IEAI 3D-shape kit, IEAI "textbar" component, and the IEAI logo — those belong to that brand. Sameer's S-wave / arch-node / dashed-connector signatures stay distinct.
4. **UI kit covers only the marketing website.** There is no product app surface in scope.
