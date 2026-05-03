# Sameer Automations — Design System

This is the design system for **Sameer Automations**, an AI-automation "agency of one" that builds full digital systems (website, lead capture, follow-up, quotes, reviews, payments) for small business owners and takes revenue share after a free growth audit.

## When to invoke

Use this system whenever you are designing:
- marketing pages, lead-magnet guide pages, or long-form landing pages for **Sameer Automations**
- HTML emails, email signatures, or social assets tied to the Sameer brand
- internal tools, decks, or documents that should feel like part of Sameer's brand
- anything that should feel *dark-mode-first, technical-but-human, "System Architecture"* in visual language

If you're working on a different product / brand, do not use this system.

## Read these first

1. **`README.md`** — the full brand voice, visual foundations, spacing, motion, iconography rules, and file index. Read it start-to-finish before generating anything.
2. **`colors_and_type.css`** — all tokens as CSS custom properties. Import this at the top of any stylesheet you write for this brand.
3. **`references/brand-voice.md`** — full voice and copywriting guide, imported verbatim from the source repo.
4. **`references/banned-phrases.json`** — word-level banlist. Every draft must pass without any of these phrases. Common offenders: *unlock, leverage, empower, seamless, synergy, revolutionary, cutting-edge, disrupt, game-changer.*
5. **`ui_kits/website/README.md`** — how the website components are organized and how to extend them.

## Build with the kit, don't reinvent

Prefer composing `ui_kits/website/` components (Nav, Hero, ProblemGrid, ServicesGrid, ProcessTimeline, StatStrip, TestimonialCard, PricingCard, CTABlock, Footer) plus primitives (Button, Card, Eyebrow, ArchNode, IconChip, SectionConnector, StatusPill, Icon.*) over writing from scratch. They are already on-brand.

## Hard rules (do not break)

- **Sentence case** for every heading, nav item, button, and title. Never Title Case.
- **First person** ("I build," "I study") — never "we" or "our team."
- **Contractions always** — it's, you're, don't.
- **Numerals for metrics** — *3 jobs, 47%, $4,200*, never spelled out.
- **No emoji. Ever.** Not in copy, not in design. Use SVG icons or arch-nodes.
- **No banned phrases.** Cross-check every draft against `references/banned-phrases.json`.
- **Never** reference Sameer's past industries (finance, banking, treasury). Only **"across industries"** or **"in my own business."**
- **Warm orange (`#FF8135` / `#FF8135`) is reserved for ROI / result numbers.** Don't color decorations with it.
- **Purple and cyan are accents only.** 80–90% of any composition is dark neutrals.
- **Dark mode only.** Light backgrounds are for printed one-pagers or HTML email only; the product experience is always dark.
- **Honor `prefers-reduced-motion`.** Every template in this system already disables animations under that media query.

## Visual signatures to lean on

- **Arch-nodes** — small pulsing glowing dots placed in card corners, on eyebrow rails, between sections. The iconic system element.
- **Dashed section connectors** — 80px vertical dashed line with a pulsing node mid-way between every two sections.
- **S-wave logo watermark** — at 3% opacity as a hero background element.
- **Dot grid + grain overlay** — always on for surface texture; grain at ~3% opacity, fixed position, `pointer-events: none`.
- **Mesh radial gradients** — large (500–600px), soft (5–9% opacity), one per section, never page-wide.
- **Gradient on the last word of the hero headline** — purple→cyan text clip. Not on body copy, not on anything else.

## Font status (April 2026)

- **Roc Grotesk Wide — LICENSED, on disk** in `fonts/rocgroteskwide-*.otf` (full Thin→Black, 9 weights). This is the default heading face per brand guidelines p.27. `--sa-font-display` resolves to it automatically.
- **Roc Grotesk Regular / Cond / Comp / XWide** — DEMO files have been deleted. The `@font-face` blocks were removed from `colors_and_type.css`; the corresponding `--sa-font-display-*` tokens fall back to system-ui until licensed OTFs are added. Don't use these tokens in production work.
- **Gilroy** — Light (300) + ExtraBold (800) on disk. 400/500 alias Light and 600–800 alias ExtraBold; still need real Regular and Medium for body weight.

## Heading width rule

Pick ONE width per composition. Default is **Wide** (Roc Grotesk Wide). Use Regular for long body-headlines or legal docs. Use Cond for data-dense labels. Mixing widths inside a single line is reserved for the tile-typography unit only.
