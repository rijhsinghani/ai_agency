# Phase 13: Landing Page Rebuild — sameerautomations.com - Context

**Gathered:** 2026-04-12
**Status:** Ready for planning
**Source:** PRD Express Path (`~/.claude/plans/snazzy-sauteeing-pixel.md`)

<domain>
## Phase Boundary

Rebuild `sameerautomations.com` from the current 133KB plain HTML + Tailwind CDN file (`website/index.html`) to a production Next.js 15 + Tailwind v4 + shadcn/ui app in a new `website-v2/` directory, ship to GCP Cloud Run in us-east4 as service `sameer-automations-web`, and cut DNS over from the old site. Brand identity is locked — we are rebuilding the surface only, NOT rebranding.

**In scope:** Scaffolding, 9 page sections (nav, hero, problem strip, automation cards, proof, how-it-works, FAQ, final CTA, footer), copy-lint against `brand/banned-phrases.json`, form capture to existing n8n webhook, Plausible analytics, Dockerfile + cloudbuild.yaml, Cloud Run deploy, DNS cutover, archive old site.

**Out of scope:** Rebrand, blog/CMS, MDX, A/B framework, auth/client portal, Remotion case-study videos, NotebookLM embed, multi-language, paid-ad variants, email list.

</domain>

<decisions>
## Implementation Decisions (locked by PRD)

### Framework + Stack

- **Next.js 15** App Router, TypeScript, static export where possible
- **Tailwind CSS v4** + brand tokens (Roc Grotesk / Gilroy / #7B2FBE / #9B4FDE / #4DD9E8 / #1A1A1A)
- **shadcn/ui** primitives (Button, Card, Accordion, Dialog)
- **21st.dev Magic MCP** as primary generator for distinctive sections
- **Framer Motion** for animations; optional Spline/R3F for hero S-wave visual
- **Lucide** icons

### Deploy

- **GCP Cloud Run** in us-east4 as `sameer-automations-web`
- Multi-stage Dockerfile targeting Next.js standalone output
- `cloudbuild.yaml` + `.github/workflows/deploy-website.yml` mirroring studio-os deploy pattern
- DNS: Cloudflare → Cloud Run custom domain mapping for `sameerautomations.com`

### Integrations (reuse existing infra only)

- **Form capture**: POST to existing n8n webhook on `hooks.rajphotovideo.com` (confirm endpoint via `n8n-mcp`)
- **Booking CTA**: existing Google Calendar link from v1 site
- **Analytics**: Plausible (cloud or self-hosted)
- **SEO meta**: reuse v1 OG/Twitter copy from `website/index.html:7-28`

### Positioning (non-negotiable, from `brand/brand-voice.md`)

- **Broad**: any small service business owner (dental, salon, trades, studio, gym, real estate, cleaning, law). Rotate at least 5 industries across the page.
- **Voice**: direct, peer-level, confident, practical, transparent. Never guru.
- **Tagline**: "Smart systems. Built for your business. By Sameer."
- **Hero promise**: every lead gets a response in 60 seconds. Built custom. Running in days.
- **Hard constraints**: no emojis anywhere, no banned phrases (`brand/banned-phrases.json`), never reference Sameer's day job, sentence case, Oxford comma, numerals for metrics.

### Execution model

Work is split across a **4-wave parallel team**:

1. **Wave 1 (≤30 min)** — designer agent scrapes 21st.dev gallery via firecrawl-mcp + runs `ui-ux-pro-max` skill to produce style plan; in parallel, builder-A scaffolds Next.js + brand tokens.
2. **Wave 2 (≤90 min)** — builder-A and builder-B work in isolated git worktrees (`superpowers:using-git-worktrees`) on disjoint sections using `frontend-design:frontend-design` skill + 21st.dev Magic MCP. Each section = atomic commit.
3. **Wave 3 (≤60 min)** — shipper (main agent) wires forms, analytics, SEO, Docker, Cloud Run, DNS. Pipeline: `run-ci` → `ship` → `deploy`.
4. **Wave 4 (≤20 min)** — full verification block + cutover.

**Total wall-clock target: ~3.5 hours.**

### Section assignments

- **Builder-A**: nav, hero (with Input/Output Bridge visual), problem strip, how-it-works
- **Builder-B**: 4 automation cards, 3 proof blocks, FAQ accordion, final CTA, footer

### Claude's discretion

- Exact Framer Motion timing/easing curves
- Whether hero uses Spline or React Three Fiber or pure SVG for the S-wave visual (try SVG first, escalate only if needed)
- Internal file/component naming inside `website-v2/`
- Specific n8n webhook field schema (confirm with n8n-mcp, pick cleanest)

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Plan & brand

- `~/.claude/plans/snazzy-sauteeing-pixel.md` — full approved PRD with waves, verification block, section specs
- `brand/brand-voice.md` — voice, tone, style rules, visual identity (§9), color system, typography, logo spec
- `brand/banned-phrases.json` — copy lint dictionary (hard constraint)

### Existing site (reference + rollback)

- `website/index.html` — current production landing page (lines 7-28 = OG/Twitter meta to reuse; lines 31-58 = tailwind config with brand palette)
- `website/hero-preview.html` — hero design reference
- `website/hero-spline-preview.html` — Spline variant reference

### Content sources

- `research/case-studies/` — real automation wins with numbers (pull metrics for proof blocks)
- `ops/packages/` — service definitions + pricing ($1.5K–$3K setup + $200–500/mo retainer)
- `.planning/PROJECT.md` — positioning, out-of-scope, constraints

### Infra reference

- studio-os Cloud Run deploy pattern (search `~/studio-os/` for `cloudbuild.yaml` + `.github/workflows/deploy-*.yml` examples)

</canonical_refs>

<specifics>
## Specific Ideas

### Page architecture (locked order, single long-scroll)

1. Nav (sticky, minimal: logo / "Work" / "How it works" / "Book a call")
2. Hero (headline + subhead + 2 CTAs + animated Input/Output Bridge; industry proof strip below)
3. Problem strip (3 tiles)
4. What gets built (4 automation cards: missed call text-back, instant lead response, review management, booking confirmations)
5. Proof (3 case studies, one giant metric each, rotating industries)
6. How it works (4 steps: discovery → scope → build → handoff + retainer)
7. FAQ (accordion with price transparency)
8. Final CTA (dot-grid + arch-node visual cue)
9. Footer (contact, @SameerAutomates, legal)

### Visual motifs (from `brand/brand-voice.md:168-176`)

All sections overlay dot-grid + arch-node + connector elements at low opacity. Purple→cyan gradient is the signature motif.

### Reuse from existing v1

- SEO metadata text (OG/Twitter)
- Google Calendar booking URL
- Favicon (`website/favicon.svg`)
- Color tokens (already correct in v1 tailwind config)
- Font-face declarations for Roc Grotesk + Gilroy

</specifics>

<deferred>
## Deferred Ideas

- Blog / content pages (v1.1, after YouTube videos ship)
- MDX / CMS
- A/B test harness
- Remotion case-study videos (v1.1)
- NotebookLM knowledge base embed (v1.1)
- Multi-language
- Paid-ad landing variants
- Email list / newsletter
- Client portal (lives in studio-os)

</deferred>

---

_Phase: 13-landing-page-rebuild-sameerautomations_
_Context gathered: 2026-04-12 via PRD Express Path_
