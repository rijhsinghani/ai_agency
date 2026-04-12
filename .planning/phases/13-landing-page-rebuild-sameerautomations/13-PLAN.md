---
phase: 13-landing-page-rebuild-sameerautomations
type: manifest
waves: 4
plans: 6
depends_on: [09-brand-identity]
requirements: [LP-01, LP-02, LP-03, LP-04, LP-05, LP-06]
---

<objective>
Rebuild sameerautomations.com as a production-grade Next.js 15 + Tailwind v4 + shadcn/ui landing page in `website-v2/`, ship to GCP Cloud Run (us-east4) as `sameer-automations-web`, cut DNS from the legacy `website/` site, and archive the v1 site. Executed as a 4-wave parallel team honoring the PRD at `~/.claude/plans/snazzy-sauteeing-pixel.md`.

Purpose: Give the business a modern, brand-voice-compliant landing surface that can evolve with animations, components, and analytics — without rebranding.

Output: `website-v2/` Next.js app deployed to Cloud Run, DNS live on sameerautomations.com, old site archived.
</objective>

<wave_structure>

## Wave 1 — Discovery + Scaffold (parallel, ≤30 min)

Two plans run in parallel. No dependency between them.

| Plan  | Role               | Worktree                 | Output                                                                      |
| ----- | ------------------ | ------------------------ | --------------------------------------------------------------------------- |
| 13-01 | Designer           | main (research dir only) | `website-v2/research/inspiration.md`, `style-plan.md`, `content/proof.json` |
| 13-02 | Builder-A scaffold | main                     | `website-v2/` Next.js 15 scaffold + brand tokens committed                  |

## Wave 2 — Parallel Section Build (parallel, ≤90 min)

Depends on Wave 1 complete. Two plans in isolated git worktrees.

| Plan  | Role      | Worktree                                   | Sections                                                   |
| ----- | --------- | ------------------------------------------ | ---------------------------------------------------------- |
| 13-03 | Builder-A | `~/.claude/worktrees/website-v2-builder-a` | nav, hero + Bridge visual, problem strip, how-it-works     |
| 13-04 | Builder-B | `~/.claude/worktrees/website-v2-builder-b` | 4 automation cards, 3 proof blocks, FAQ, final CTA, footer |

## Wave 3 — Shipper Wiring (≤60 min)

| Plan  | Role    | Depends | Output                                                                                   |
| ----- | ------- | ------- | ---------------------------------------------------------------------------------------- |
| 13-05 | Shipper | Wave 2  | Copy lint, forms→n8n, Plausible, SEO, Dockerfile, cloudbuild.yaml, Cloud Run deploy, DNS |

## Wave 4 — Verification + Cutover (≤20 min)

| Plan  | Role     | Depends | Output                                                                                            |
| ----- | -------- | ------- | ------------------------------------------------------------------------------------------------- |
| 13-06 | Verifier | Wave 3  | Lighthouse, live curl, form E2E, Plausible event verified, `website/` archived, cutover announced |

</wave_structure>

<success_criteria>

1. `website-v2/` exists as Next.js 15 + TS + Tailwind v4 + shadcn app with brand tokens (Roc Grotesk/Gilroy, #7B2FBE/#9B4FDE/#4DD9E8/#1A1A1A) committed
2. All 9 page sections (nav, hero, problem strip, automation cards, proof, how-it-works, FAQ, final CTA, footer) render and match brand voice — zero `brand/banned-phrases.json` matches, ≥5 distinct non-photo industries named on the page
3. Real form submission lands in n8n execution history; Plausible records a page view + "Book a call" event within 60s
4. Lighthouse mobile profile: perf ≥95, a11y 100, SEO 100, best-practices 100
5. `curl -I https://sameerautomations.com` returns 200 HTTPS with HSTS header; `gcloud run services describe sameer-automations-web --region us-east4` is READY
6. Legacy `website/` moved to `website-v1-archive/` (not deleted), DNS cut, cutover announced in Slack #claude

</success_criteria>

<must_haves>
truths: - "sameerautomations.com loads over HTTPS from Cloud Run us-east4" - "Every section renders with brand fonts, colors, and visual motifs" - "Copy passes banned-phrases lint with zero matches" - "At least 5 non-photo industries named across the page" - "Email/form capture reaches n8n in production" - "Plausible records page views and 'Book a call' clicks" - "Old website/ is archived, not deleted (rollback insurance)"
artifacts: - "website-v2/app/page.tsx" - "website-v2/app/layout.tsx" - "website-v2/tailwind.config.ts" - "website-v2/Dockerfile" - "website-v2/cloudbuild.yaml" - ".github/workflows/deploy-website.yml" - "website-v2/research/inspiration.md" - "website-v2/research/style-plan.md" - "website-v2/content/proof.json" - "website-v1-archive/"
key_links: - "app/page.tsx composes all section components" - "Section components pull copy that is lint-clean against banned-phrases.json" - "Form component POSTs to n8n webhook (hooks.rajphotovideo.com)" - "layout.tsx Plausible script -> analytics dashboard" - "Cloud Run domain mapping -> Cloudflare DNS -> sameerautomations.com"
</must_haves>
</content>
</invoke>
