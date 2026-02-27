# Stack Research

**Domain:** Solo AI Automation Agency — Services Business (not a software product)
**Researched:** 2026-02-27
**Confidence:** HIGH (all tools verified via web search against 2026 sources)

---

## Overview

This is a services business, not a software product. The stack is organized into two layers:

1. **Build layer** — Tools used to construct automations FOR clients (Claude Code, N8N, MCPs, APIs)
2. **Business ops layer** — Tools to run the agency itself (landing page, CRM, contracts, payments, comms)

The founding constraint is bootstrapped/solo. Every recommendation below prioritizes free tiers with clear upgrade paths.

---

## 1. Automation Build Layer

These are the tools used to build the actual automation products delivered to clients.

### Core Technologies

| Technology        | Version / Tier                | Purpose                                                                                | Why This Over Alternatives                                                                                                                                                  |
| ----------------- | ----------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Code       | Latest (Anthropic API)        | Primary orchestration brain — writes scripts, coordinates MCP tools, reasons over data | Founder uses daily; best-in-class reasoning for multi-step workflow logic; native MCP support                                                                               |
| N8N               | Community (self-hosted, free) | Visual workflow engine for trigger-action pipelines                                    | Per-execution billing (not per-step like Zapier); 400+ native integrations; self-hosted = $0 + ~$5-20/mo VPS; AI-native nodes (LangChain built-in); founder already uses it |
| MCP Servers       | Current ecosystem             | Extend Claude Code with tool-use (browser, databases, APIs, file system)               | Native to Claude; eliminates boilerplate glue code; playwright, filesystem, GitHub, Slack MCPs all production-ready                                                         |
| Twilio / Bland AI | Pay-as-you-go                 | SMS, voice calls, and AI-powered phone qualification for lead follow-up                | Twilio = raw telephony infrastructure with webhooks; Bland AI = AI voice agents for outbound qualification at ~$0.09/min                                                    |
| Resend            | Free (3K emails/mo, 100/day)  | Transactional email delivery from automations                                          | Modern developer-first API; generous free tier; built by React Email creators; simpler DX than SendGrid                                                                     |

### Supporting Libraries / Services

| Tool                | Tier                                 | Purpose                                                                                   | When to Use                                                                                 |
| ------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Playwright MCP      | Free (open source)                   | Browser automation — scraping, form fills, web-based workflows                            | When a client's system has no API and requires UI interaction                               |
| Supabase            | Free (500MB DB, 50K monthly actives) | Lightweight database for storing automation state, leads, logs                            | When N8N's built-in data storage isn't enough; avoid full RDS overhead                      |
| OpenAI / Claude API | Pay-as-you-go                        | LLM calls inside automations (classification, summarization, drafting)                    | For automations requiring reasoning; Claude Haiku for cost-sensitive high-volume tasks      |
| Cal.com             | Free forever                         | Scheduling / appointment booking embedded in automations                                  | Lead follow-up PoC needs a booking link; Cal.com free tier is the most generous in category |
| Webhooks (native)   | Free                                 | Trigger N8N workflows from external events (form submissions, CRM changes, Stripe events) | Standard glue between systems; no cost                                                      |

### Development Tools

| Tool                      | Purpose                                                                | Notes                                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Code (CLI)         | Write automation scripts, debug N8N expressions, scaffold integrations | Already in daily use; use Haiku for routine tasks, Sonnet/Opus for complex orchestration                                                  |
| Docker / Railway / Render | Host self-hosted N8N                                                   | Railway free tier ($5/mo hobby plan works for low volume); Render free tier spins down — use Railway or a $5 DigitalOcean droplet instead |
| GitHub                    | Version control for automation scripts and N8N workflow exports        | Free; export N8N workflows as JSON and commit them                                                                                        |
| Ngrok                     | Local tunnel for webhook testing                                       | Free tier sufficient for development; 1 static domain on paid ($8/mo)                                                                     |

---

## 2. Landing Page / Website

### Recommended: Framer

| Attribute  | Detail                                                                                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tool       | Framer                                                                                                                                                                 |
| Pricing    | Free (watermark), Basic $10/mo, Pro $30/mo                                                                                                                             |
| Free tier  | Full feature access with Framer branding watermark — fine for early validation                                                                                         |
| Start tier | Basic ($10/mo) for a live site without watermark                                                                                                                       |
| Why        | Fastest time-to-live for polished landing pages; AI-assisted layout generation; built-in hosting; no code required beyond copy; large library of SaaS/agency templates |
| Confidence | HIGH                                                                                                                                                                   |

**Why NOT Webflow:** Overkill for a single landing page. Webflow's power is its CMS and multi-page scalability — neither is needed here. Webflow starts at $18/mo vs Framer Basic at $10/mo, and Webflow's editor is slower to iterate in.

**Why NOT WordPress / Squarespace:** Too much maintenance overhead for a solo operator. Framer ships faster with better default design quality.

**Upgrade path:** Stay on Framer Basic ($10/mo) until the business is generating revenue. Pro ($30/mo) adds advanced analytics and staging environments — not needed in phase 1.

---

## 3. CRM / Client Management

### Recommended: Notion (free tier)

| Attribute  | Detail                                                                                                                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tool       | Notion                                                                                                                                                                                                                         |
| Pricing    | Free (unlimited pages, 10 guests); Plus $10/seat/mo                                                                                                                                                                            |
| Free tier  | Generous — unlimited pages, 7-day history, 10 guests                                                                                                                                                                           |
| Why        | Solo operator with 2-5 clients doesn't need a dedicated CRM; Notion's free CRM templates cover pipeline tracking, contact notes, project status, and contract links in one workspace; you're already likely using it for notes |
| Confidence | HIGH for phase 1                                                                                                                                                                                                               |

**What to track in Notion:** Prospect pipeline (lead → discovery → proposal → close → active → churned), per-client pages with scope, retainer status, next action, contact info, and contract link.

**When to upgrade:** When you hit 10+ active clients or need automated pipeline updates (e.g., N8N writing deal status back to Notion via API). Airtable is a natural upgrade for data-heavy CRM needs — its relational database model handles complex linked records better than Notion.

**Why NOT HubSpot Free:** HubSpot's free CRM is a lead magnet for a $20K+/year marketing suite. It works, but the UI pushes you toward upsells constantly, and it's more CRM than needed for 5 clients.

**Why NOT Airtable Free:** 1,000 record limit per base and only 100 automation runs/month on free tier makes it less practical than Notion for early stage.

---

## 4. Contract / Proposal Tools

### Recommended: PandaDoc (free plan) + Plain Google Docs backup

| Attribute  | Detail                                                                                                                                                                                                          |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tool       | PandaDoc                                                                                                                                                                                                        |
| Pricing    | Free (5 documents/mo, e-signature, payment collection); Essentials $19/mo                                                                                                                                       |
| Free tier  | 5 documents/month with e-signature and payment collection                                                                                                                                                       |
| Why        | 5 docs/mo is enough for a solo agency doing 1-2 closes per month; built-in e-signature is legally binding (ESIGN Act compliant); 1000+ templates including freelance contracts; payment collection at signature |
| Confidence | HIGH for phase 1                                                                                                                                                                                                |

**Usage pattern:** Build a reusable automation services agreement template (scope, deliverables, payment terms, IP, liability, exit clause, retainer) in PandaDoc. Duplicate and customize per engagement. Send, get signed, collect 50% upfront at signature.

**When to upgrade:** PandaDoc Essentials at $19/mo unlocks unlimited documents, CRM integrations, and analytics. Upgrade when you're closing more than 5 deals/month.

**Why NOT DocuSign:** More expensive ($25-40/mo), capped envelope counts, designed for enterprise compliance. Overkill for a solo agency.

**Why NOT HelloSign (Dropbox Sign):** $15-25/mo with no free tier for production use. PandaDoc free tier is strictly better for low volume.

---

## 5. Payment Processing

### Recommended: Stripe

| Attribute  | Detail                                                                                                                                                                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tool       | Stripe                                                                                                                                                                                                                                                    |
| Pricing    | No monthly fee; 2.9% + $0.30 per transaction (US cards); 0.4% per paid invoice on Invoicing Starter                                                                                                                                                       |
| Free tier  | No monthly cost — pay only on transactions                                                                                                                                                                                                                |
| Why        | Best-in-class API; handles one-time invoices (setup fee) AND recurring subscriptions (retainer) in one platform; Stripe Invoicing sends professional invoices with direct payment links; supports ACH bank transfers at 0.8% (cheaper for large invoices) |
| Confidence | HIGH                                                                                                                                                                                                                                                      |

**Billing pattern for this business:**

- Project kick-off: Stripe Invoice for 50% of build fee (one-time, e.g. $750 on a $1,500 build)
- Delivery: Stripe Invoice for remaining 50%
- Go-live: Stripe Subscription for monthly retainer ($200-500/mo, auto-recurring)

**ACH bank transfer:** Enable this for build fees over $500 — drops fee from 2.9% to 0.8%, saving $21 on a $1,500 invoice. Clients need a US bank account.

**Why NOT PayPal:** PayPal works but its brand signals "individual freelancer" rather than "professional agency." Stripe invoices look more professional, support subscriptions natively, and have no added monthly fees for features Stripe includes by default.

---

## 6. Content Creation (YouTube + Social)

The channel pivot is from photography to AI automation for business owners. Target audience is non-technical — content must show outcomes, not code.

### Core Stack

| Tool                          | Tier                                           | Purpose                                                          | Why                                                                                                                             |
| ----------------------------- | ---------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Descript                      | Free (60 min/mo, watermarked) → Creator $15/mo | Screen recording + talking head editing via transcript           | Edit video by deleting text, not scrubbing timelines; ideal for screen-recording-heavy automation demos; AI filler-word removal |
| CapCut                        | Free (mobile + desktop)                        | Short-form clips (YouTube Shorts, LinkedIn, Instagram Reels)     | Best-in-class for vertical short-form; auto-captions with 98%+ accuracy; free; US-available as of 2026                          |
| OBS Studio                    | Free                                           | Clean screen recordings with system audio                        | Industry standard for free screen capture; N8N workflow demos, Claude Code sessions                                             |
| Canva                         | Free → Pro $15/mo                              | Thumbnails, social graphics, client presentation decks           | Fast thumbnail creation; free tier is sufficient for phase 1                                                                    |
| Claude (via API or claude.ai) | Pay-as-you-go / $20 Pro subscription           | Script drafting, title/description optimization, caption writing | Fastest workflow for content ideation and scripting                                                                             |

### Recommended Content Workflow

1. Record automation demo with OBS (screen capture)
2. Record talking head commentary (iPhone or webcam)
3. Edit full video in Descript (transcript-based)
4. Export Shorts clips in CapCut with auto-captions
5. Design thumbnail in Canva
6. Publish to YouTube with Claude-drafted title/description/tags

**When to upgrade Descript:** Creator plan ($15/mo) removes watermark and adds 4K export. Upgrade when publishing consistently (2+ videos/month).

---

## 7. Communication (Client Delivery)

### Recommended: Loom (free) + Email (Gmail)

| Tool                  | Tier                                                                                    | Purpose                                                  | Why                                                                                                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Loom                  | Free (25 videos, 5 min each) → Starter free (unlimited shorter clips) → Business $15/mo | Async video updates for clients                          | Send video walkthroughs of automation builds; clients can watch on their own time; no scheduling required; better than written documentation for non-technical clients |
| Gmail                 | Free                                                                                    | Primary client communication                             | Universal, no client friction                                                                                                                                          |
| Notion (shared pages) | Free                                                                                    | Client-facing project pages with status, links, and docs | Share a read-only page with the client showing deliverables, timeline, and retainer scope                                                                              |

**Loom free tier note:** Free plan allows unlimited videos up to 5 minutes each as of 2026. Sufficient for "here's what I built and how it works" walkthroughs.

**Why NOT Slack:** Adds friction for non-technical local business owners who don't use Slack. Email + Loom is zero-friction.

**Why NOT a client portal app:** Overkill for phase 1. A shared Notion page achieves 90% of what a client portal does at $0.

---

## Alternatives Considered

| Recommended       | Alternative            | When to Use Alternative                                                                                                                                                            |
| ----------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N8N (self-hosted) | Make.com ($9/mo)       | If you don't want to manage a VPS; Make is simpler to maintain than self-hosted N8N and cheaper than N8N cloud                                                                     |
| N8N (self-hosted) | Zapier                 | Only if a client integration exists only in Zapier's 8,000-app catalog; never use Zapier for your own production automations — per-task billing is economically punishing at scale |
| Framer            | Carrd ($9/yr)          | If you want the absolute cheapest possible landing page with zero design effort; Carrd is functional but looks dated                                                               |
| Framer            | Webflow ($18/mo)       | If you need a multi-page site with a real CMS and blog; not needed in phase 1                                                                                                      |
| Notion (CRM)      | Airtable ($20/mo)      | When you need relational data across multiple clients, linked automations status, and formula fields; upgrade when Notion feels limiting                                           |
| PandaDoc (free)   | Google Docs + Docusign | If PandaDoc's 5 doc/mo limit is hit before upgrading; functional fallback but loses integrated payment                                                                             |
| Stripe            | PayPal                 | Only if a specific client cannot pay by card and insists on PayPal; accept it, but default to Stripe                                                                               |
| Descript          | DaVinci Resolve (free) | If producing cinematic, high-production-value content; DaVinci is overkill for screen recording-heavy automation demos                                                             |
| Cal.com (free)    | Calendly ($10/mo)      | If you prefer Calendly's UX; Cal.com free is functionally equivalent for solo use and saves $10/mo                                                                                 |

---

## What NOT to Use

| Avoid                                             | Why                                                                                                                                                                  | Use Instead                                          |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Zapier (for building client automations)          | Per-task billing: each step in a workflow = 1 task; a branching 10-step workflow = 10 tasks per run; costs spiral at scale; not appropriate for reselling to clients | N8N (per-execution billing, not per-step)            |
| WordPress                                         | Maintenance overhead (plugins, updates, security); too slow to iterate a landing page; hosting costs money                                                           | Framer                                               |
| HubSpot (full suite)                              | Free CRM is a funnel into $800-1,500/mo marketing products; upsell friction is constant; unnecessary at 5 clients                                                    | Notion free for phase 1                              |
| Airtable free tier                                | 1,000 record limit and 100 automation runs/month makes it unusable as client automation infrastructure                                                               | Supabase free tier for data storage needs            |
| DocuSign                                          | $25-40/mo with per-envelope overages; designed for enterprise compliance; expensive for low volume                                                                   | PandaDoc free tier (5 docs/mo, e-signature included) |
| Webflow                                           | $18/mo starting point; CMS and multi-page power is overkill for a single agency landing page; slower iteration                                                       | Framer Basic ($10/mo)                                |
| LM Studio for tool-calling                        | No tool-calling support through Anthropic endpoint — Claude Code cannot use it for agent workflows                                                                   | Ollama with Qwen3-Coder or Anthropic API             |
| No-code automation builders (Automate.io, Pabbly) | Smaller app catalogs, weaker AI integration, less community support; N8N and Make dominate this space                                                                | N8N                                                  |

---

## Stack Patterns by Phase

**Phase 1 (Bootstrapped, 0-3 clients):**

- Build: Claude Code + N8N self-hosted + Twilio/Bland AI (pay-as-you-go) + Resend free
- Website: Framer Basic ($10/mo)
- CRM: Notion free
- Contracts: PandaDoc free
- Payments: Stripe (no monthly fee)
- Content: OBS + Descript free + CapCut free + Canva free
- Comms: Loom free + Gmail
- Total monthly cost: ~$10-20/mo (Framer + VPS for N8N)

**Phase 2 (3-8 clients, revenue generating):**

- Upgrade Descript to Creator ($15/mo) for watermark-free exports
- Upgrade PandaDoc to Essentials ($19/mo) for unlimited docs + CRM integration
- Consider N8N cloud Starter (€24/mo) to eliminate VPS maintenance
- Consider Notion Plus ($10/mo) for version history
- Total monthly cost: ~$75-100/mo

**Phase 3 (8+ clients, repeatable delivery):**

- Migrate from Notion CRM to Airtable (better relational data for client/automation tracking)
- Consider HubSpot CRM free layer + pipeline for systematic sales
- Possibly white-label client delivery with a proper client portal (ClientVenue, ManyRequests)

---

## Version / Pricing Compatibility Notes

| Tool     | Free Tier                                 | Entry Paid                               | Notes                                                                      |
| -------- | ----------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------- |
| N8N      | Community (self-hosted, unlimited)        | Starter €24/mo cloud                     | Self-hosted Community is free forever; infrastructure cost is $5-20/mo VPS |
| Framer   | Free with watermark                       | Basic $10/mo                             | Basic ($10) is the minimum for a live professional site; no watermark      |
| Notion   | Unlimited pages, 10 guests, 7-day history | Plus $10/seat/mo                         | Free tier is genuinely sufficient for solo CRM through phase 1             |
| PandaDoc | 5 docs/mo, e-sign, payment collection     | Essentials $19/mo                        | 5 doc/month covers 2-3 closes/month; upgrade triggers when pipeline scales |
| Stripe   | No monthly fee                            | Invoicing Starter: 0.4% per paid invoice | ACH (0.8%) is cheaper than card (2.9%) for large invoices — enable it      |
| Cal.com  | Free forever (unlimited event types)      | Teams $15/user/mo                        | Free tier covers all solo scheduling needs                                 |
| Descript | 60 min/mo, 720p, watermarked              | Creator $15/mo                           | Free tier fine for testing; Creator tier needed for production publishing  |
| Loom     | Unlimited videos up to 5 min each (free)  | Business $15/user/mo                     | Free tier sufficient for client delivery walkthroughs                      |
| Resend   | 3,000 emails/mo, 100/day (free)           | Pro $20/mo (50K emails)                  | Free tier covers all automation emails at early stage                      |
| Bland AI | Pay-as-you-go (~$0.09/min)                | Enterprise custom                        | No minimum monthly; only pay for actual calls made                         |
| Twilio   | $0 (pay-as-you-go)                        | No tiers; usage-based                    | $15 credit on signup; SMS ~$0.0079/msg; good for lead follow-up SMS        |

---

## Sources

- [n8n vs Make vs Zapier 2026 Comparison — Digidop](https://www.digidop.com/blog/n8n-vs-make-vs-zapier) — N8N pricing, execution model, self-hosting
- [n8n Cloud Pricing 2026 — ConnectSafely.ai](https://connectsafely.ai/articles/n8n-cloud-pricing-guide) — Cloud tier pricing verified
- [How to self-host n8n 2026 — Northflank](https://northflank.com/blog/how-to-self-host-n8n-setup-architecture-and-pricing-guide) — Infrastructure cost confirmed $5-20/mo
- [Framer Pricing 2026 — letaiworkforme.com](https://letaiworkforme.com/blog/framer-pricing-2026) — Tier breakdown and agency considerations
- [Webflow vs Framer 2026 — gemeosagency.com](https://www.gemeosagency.com/en/blog/webflow-vs-framer-which-no-code-tool-to-choose) — Comparison rationale
- [Best CRMs for agencies 2026 — Softr](https://www.softr.io/blog/best-crm-for-agencies) — CRM landscape for solo/small agencies
- [Notion vs Airtable 2026 — thetoolchief.com](https://thetoolchief.com/comparisons/airtable-vs-notion/) — Free tier comparison verified
- [PandaDoc Review 2026 — Docupilot](https://www.docupilot.com/blog/pandadoc-pricing) — Free plan limitations confirmed
- [Stripe vs PayPal 2026 — hellobonsai.com](https://www.hellobonsai.com/blog/stripe-vs-paypal) — Fee structures verified
- [Stripe Invoicing pricing — Stripe Support](https://support.stripe.com/questions/stripe-invoicing-pricing) — 0.4% invoicing fee confirmed
- [CapCut vs Descript 2026 — fahimai.com](https://www.fahimai.com/capcut-vs-descript) — Tool capabilities and free tier comparison
- [Loom Pricing 2026 — supademo.com](https://supademo.com/blog/loom-pricing) — Free tier (5 min videos, unlimited) confirmed
- [Cal.com vs Calendly 2026 — schedulingkit.com](https://schedulingkit.com/pricing-guides/cal-com-pricing) — Free forever plan verified
- [Resend vs SendGrid 2026 — sequenzy.com](https://www.sequenzy.com/versus/resend-vs-sendgrid) — Free tier (3K/mo, 100/day) verified
- [Bland AI Review 2026 — lindy.ai](https://www.lindy.ai/blog/bland-ai-review) — Pricing (~$0.09/min) and integration verified
- [Claude Code MCP Docs — Anthropic](https://code.claude.com/docs/en/mcp) — MCP ecosystem current state

---

_Stack research for: Solo AI Automation Agency — services business targeting local service businesses_
_Researched: 2026-02-27_
