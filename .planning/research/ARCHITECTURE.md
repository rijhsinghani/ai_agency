# Architecture Research

**Domain:** Solo AI automation agency serving local service businesses
**Researched:** 2026-02-27
**Confidence:** MEDIUM — business model patterns drawn from multiple current sources; specific time allocation ratios not available as published benchmarks; core structural patterns are consistent across sources.

---

## Standard Architecture

This is a business operations architecture, not a software architecture. The agency is a system of interconnected workflows: content creates leads, leads convert to clients, clients receive automations, automations generate retainer revenue, and the agency automates its own operations using the same techniques it sells.

### System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                     ACQUISITION ENGINE                           │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────────┐  │
│  │   Content   │  │  Landing    │  │   Discovery Call /     │  │
│  │   Funnel    │→ │   Page      │→ │   Lead Qualification   │  │
│  │(YT/LinkedIn)│  │(lead cap)   │  │   (value discovery)    │  │
│  └─────────────┘  └─────────────┘  └────────────────────────┘  │
└──────────────────────────────────────┬───────────────────────────┘
                                       │ qualified lead
┌──────────────────────────────────────▼───────────────────────────┐
│                     SALES PIPELINE                               │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────────┐  │
│  │  Proposal   │→ │  Contract   │→ │  50% Deposit / Kick-   │  │
│  │  (scoped,   │  │  (signed,   │  │  off call scheduled    │  │
│  │  ROI-based) │  │  templated) │  │                        │  │
│  └─────────────┘  └─────────────┘  └────────────────────────┘  │
└──────────────────────────────────────┬───────────────────────────┘
                                       │ signed + deposited
┌──────────────────────────────────────▼───────────────────────────┐
│                     DELIVERY ENGINE                              │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  ┌─────────┐  │
│  │  Discovery  │→ │    Build    │→ │   Test    │→ │ Deploy  │  │
│  │  (workflow  │  │  (Claude    │  │  (with    │  │ + hand- │  │
│  │   mapping)  │  │   Code +    │  │  client)  │  │   off)  │  │
│  │             │  │   MCPs)     │  │           │  │         │  │
│  └─────────────┘  └─────────────┘  └───────────┘  └────┬────┘  │
└──────────────────────────────────────────────────────────┼───────┘
                                                            │ go-live
┌──────────────────────────────────────────────────────────▼───────┐
│                     RETAINER ENGINE                              │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────────┐  │
│  │  Monitoring │  │   Tweaks /  │  │  Upsell / Case Study   │  │
│  │  + Alerts   │  │  Iteration  │  │  / Referral Ask        │  │
│  └─────────────┘  └─────────────┘  └────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│              AGENCY OPERATIONS (runs in parallel)                │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────────┐  │
│  │  Invoicing  │  │  Templates  │  │  Knowledge Base        │  │
│  │  + Payments │  │  Library    │  │  (patterns, scripts)   │  │
│  └─────────────┘  └─────────────┘  └────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component            | Responsibility                                                                               | Typical Implementation                                                         |
| -------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Content Funnel       | Attract inbound leads; educate non-technical owners on what automation does for them         | YouTube (pivoted channel), LinkedIn, short-form clips, case studies            |
| Landing Page         | Convert content viewers to booked discovery calls; communicate value proposition             | Static site with Calendly embed; no-code preferred for speed                   |
| Lead Qualification   | Determine fit (budget, pain point, decision-maker) before investing in proposal              | Value discovery call script; quantify lead loss × LTV, time cost × hourly rate |
| Proposal             | Scope the automation, quantify ROI, set payment terms                                        | Templated doc customized per engagement; ROI calculation as centerpiece        |
| Contract             | Protect both parties; establish scope, IP, exit terms                                        | Plain-English reusable template; no lawyer required for v1                     |
| Discovery (delivery) | Map the client's existing workflow; identify integration points, data sources, failure modes | 1-2 sessions with client; produces a workflow diagram and build spec           |
| Build                | Construct the automation                                                                     | Claude Code + MCPs + APIs + scripts; not no-code platforms                     |
| Test + Deploy        | Validate behavior, hand off to client                                                        | Parallel run before cutover; written handoff doc                               |
| Retainer             | Maintain, monitor, and iterate on live automations                                           | Monthly check-in; alert on failures; small tweaks in scope                     |
| Templates Library    | Reusable automation patterns by vertical and use case                                        | Git repo of working scripts; reduces build time on repeat problems             |
| Knowledge Base       | Discovery scripts, objection handling, pricing frameworks, lessons learned                   | Markdown files or Notion; founder-maintained                                   |
| Invoicing + Payments | Collect 50% deposit, balance on completion, monthly retainer                                 | Stripe invoices or Wave (free); automated reminders                            |

---

## Recommended Project Structure

The agency's "code" is the collection of automation artifacts, templates, and operational documents. A sensible folder layout for the repo:

```
agency/
├── clients/                  # Per-client work (gitignored or private repo)
│   └── [client-slug]/
│       ├── discovery.md      # Workflow map, pain points, integrations
│       ├── proposal.md       # Scoped proposal (versioned)
│       ├── contract.md       # Signed contract copy
│       ├── build/            # Automation scripts and configs
│       └── runbook.md        # Handoff doc + monitoring notes
│
├── templates/                # Reusable automation patterns
│   ├── lead-follow-up/       # Lead → qualify → book → confirm
│   ├── review-request/       # Post-job → review ask → follow-up
│   ├── appointment-reminder/ # Booking → reminder sequence
│   └── intake-form/          # New client intake → CRM entry
│
├── ops/                      # Agency's own internal operations
│   ├── contract-template.md  # Master contract (customize per client)
│   ├── proposal-template.md  # Master proposal structure
│   ├── discovery-script.md   # Value discovery call script
│   ├── onboarding-checklist.md
│   └── invoicing.md          # Payment process, tools, cadence
│
├── content/                  # Content production assets
│   ├── calendar.md           # Content calendar
│   ├── scripts/              # Video scripts
│   └── case-studies/         # Before/after documentation
│
└── knowledge/                # What has been learned
    ├── pricing-framework.md
    ├── objections.md
    ├── verticals/            # Notes per industry (plumbers, dentists, etc.)
    └── lessons-learned.md
```

### Structure Rationale

- **clients/**: Isolated per client to allow safe sharing and avoid cross-contamination. Each folder is a complete record of the engagement.
- **templates/**: The agency's primary intellectual property. Each template reduces future build time. Built from real client work, not theoretical examples.
- **ops/**: The agency runs itself like a client would run a business. All repeatable internal tasks are documented and eventually automated.
- **content/**: Content is part of the acquisition engine and must be treated as a production pipeline, not an afterthought.
- **knowledge/**: The founder's accumulated expertise. What worked, what did not, how to price, how to handle objections. This is what scales.

---

## Architectural Patterns

### Pattern 1: Content → Demonstration → Sale

**What:** Every piece of content is a demonstration of a specific automation working in the real world. The content does not explain how to build it — it shows what the client's life looks like after it exists.

**When to use:** Always. This is the core acquisition engine for a solo operator with no outbound sales team.

**Trade-offs:** Slow to compound (3-6 months before meaningful inbound). Cannot be shortcut. Once it works, it requires far less founder time per lead than cold outreach.

**Example:**

```
Video: "How this plumber stopped losing 40% of his leads"
  → Screen recording of lead follow-up automation
  → Shows lead coming in, AI qualifying, appointment booked
  → Call to action: "Want this for your business?"
  → Link to landing page → Calendly
```

---

### Pattern 2: Value Discovery Before Proposal

**What:** No proposal is written until the founder has quantified the client's pain in dollars. Discovery call script drives to: (a) how many leads are lost per month, (b) what each lead is worth, (c) how many hours are wasted on manual tasks, (d) what the hourly cost of that time is.

**When to use:** Every engagement, without exception. The numbers from this conversation become the ROI case in the proposal.

**Trade-offs:** Requires 45-60 minutes per prospect. Disqualifies clients who cannot articulate their numbers — which is a feature, not a bug (those clients cannot be satisfied with measurable results).

**Example:**

```
Discovery output:
  - 12 missed leads/month × $800 LTV = $9,600/month in lost revenue
  - Owner spends 8 hrs/week on follow-up calls × $75/hr = $600/month labor cost
  - Total visible cost: ~$10,200/month

Proposal framing:
  - Automation recovers 70% of missed leads = $6,720/month
  - One-time build: $2,000
  - Monthly retainer: $350
  - Payback period: < 10 days
```

---

### Pattern 3: Build Once, Templatize, Reuse

**What:** Every automation built for a client is immediately generalized into a template. The second dentist automation takes 30% of the time of the first because the core pattern already exists. By the third or fourth, delivery time is minimal.

**When to use:** After every completed build. This is how a solo operator scales beyond ~3 clients without burning out.

**Trade-offs:** Requires discipline to generalize rather than leave client-specific code as-is. Initial builds take longer because the founder is also building the template.

**Example:**

```
Client build: Lead follow-up for Smith Plumbing
  → Strip client-specific: phone numbers, prompts, CRM fields
  → Parameterize: business name, follow-up timing, booking link
  → Document: inputs required, integrations needed, edge cases
  → Add to templates/lead-follow-up/

Next client: Configure parameters, test, deploy in 4 hours not 20
```

---

### Pattern 4: The Agency Eats Its Own Dog Food

**What:** Every automation the agency sells to clients is also used internally. Lead follow-up, appointment booking, intake forms, review requests — if you build it for a plumber, you run it yourself too. This produces real case studies, surfaces bugs before client deployment, and demonstrates authentic credibility.

**When to use:** From day one. The PoC (lead follow-up automation) is built for the agency itself first, then sold to clients.

**Trade-offs:** Requires committing to running the automation live, not just demonstrating it. Edge cases will appear and must be fixed.

**Example:**

```
Agency internal stack (automations the agency runs):
  - New inquiry → AI qualification → Calendly booking → confirmation email
  - Post-call → proposal draft trigger → follow-up reminder
  - Client go-live → invoice generation → retainer reminder
  - Monthly → client check-in email → usage report
```

---

## Data Flow

### Acquisition Flow

```
Content viewer
    ↓ (watches video / reads post)
Landing page
    ↓ (books call via Calendly)
Discovery call
    ↓ (value quantification → lead qualifies or disqualifies)
Proposal sent
    ↓ (client reviews, negotiates scope)
Contract signed + deposit paid
    ↓
Delivery phase begins
```

### Delivery Flow

```
Kickoff call
    ↓
Workflow discovery (1-2 sessions)
    ↓ (produces: workflow map + build spec + integration inventory)
Build (Claude Code + MCPs + APIs)
    ↓ (iterate locally, client reviews staging environment)
Client acceptance testing
    ↓ (parallel run, edge case validation)
Deploy to production
    ↓
Balance invoice sent → paid
    ↓
Retainer begins (monthly)
```

### Knowledge Accumulation Flow

```
Client engagement
    ↓
Completed build → generalize → templates/
    ↓
Lessons (what broke, what worked) → knowledge/lessons-learned.md
    ↓
Vertical notes (industry-specific patterns) → knowledge/verticals/
    ↓
Next client in same vertical: faster discovery, faster build, higher margin
```

### Retainer Flow

```
Monthly: automated health check (ping automation endpoints, verify output)
    ↓
If healthy: monthly check-in email to client → "all good, here's usage report"
    ↓
If degraded: founder notified → diagnose → fix → notify client
    ↓
Quarterly: upsell review → "here are 2 more automations worth $X/month to you"
```

---

## Component Boundaries

These are the dependency rules — what must exist before what can be built.

| Boundary                                          | What Depends On What                                     | Why                                                              |
| ------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------- |
| Landing page depends on brand + value prop        | Cannot drive traffic to a blank page                     | Content drives to landing page; landing page must be ready first |
| Proposal depends on discovery script              | Cannot price without quantified value                    | Numbers from discovery call become the ROI case                  |
| Build depends on delivery playbook                | Need a repeatable delivery process before taking clients | Ad hoc delivery does not scale and risks client satisfaction     |
| Retainer depends on successful deployment         | Retainer value is maintaining a working automation       | Nothing to maintain until something is deployed                  |
| Templates depend on completed client builds       | Templates come from real work, not theory                | First build is always custom; template is extracted after        |
| Content depends on real case studies              | "Show results" only works if results exist               | PoC + first client engagement produces the first case study      |
| Scaling (5+ clients) depends on agency automation | Founder time is fixed; must automate own operations      | Without internal automation, growth = burnout                    |

---

## Build Order (What to Build First)

The critical path is: PoC → sales assets → sales pipeline → delivery infrastructure → first client → template extraction → retainer operations → internal automation.

```
Phase 1: Foundation
  1. Value discovery script (enables qualification)
  2. Lead follow-up automation PoC (built for agency first)
  3. Case study from the PoC (first sales asset)
  4. Landing page (converts content viewers to calls)

Phase 2: Sales Pipeline
  5. Proposal template (reusable, ROI-centered)
  6. Contract template (plain-English, reusable)
  7. Pricing framework (formalized, not ad hoc)
  8. Content calendar + first 4-6 videos (YouTube pivot)

Phase 3: Delivery Infrastructure
  9. Client discovery process (workflow mapping methodology)
  10. Delivery playbook (repeatable build + test + deploy steps)
  11. Handoff doc template (what client receives at go-live)
  12. Retainer scope definition (what $200-500/mo covers)

Phase 4: First Client
  13. Execute full pipeline with real client
  14. Extract first vertical template from the build
  15. Document lessons learned

Phase 5: Operations Automation
  16. Automate internal invoicing reminders
  17. Automate client health checks (monthly retainer)
  18. Automate content repurposing (YT → LinkedIn clips)
  19. Build intake form → CRM entry automation
```

---

## Scaling Considerations

| Stage        | Clients                | Architecture Adjustments                                                                                               |
| ------------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 0-1 clients  | Proving the model      | Everything manual is acceptable; document everything                                                                   |
| 2-4 clients  | Repeating the model    | Template library in use; delivery time dropping; proposal + contract templated                                         |
| 5-8 clients  | Systematizing          | Agency's own operations automated; monthly retainer monitoring automated; content pipeline producing consistently      |
| 9-12 clients | Near capacity for solo | Most builds are template-driven; majority of time is retainer + sales; content generates inbound without active effort |
| 12+ clients  | Capacity constraint    | Must either raise prices, narrow niche further, or hire one part-time contractor for build execution                   |

### Scaling Priorities

1. **First constraint:** Founder time on build work — resolved by template library + reuse patterns
2. **Second constraint:** Founder time on business operations (invoicing, contracts, onboarding) — resolved by agency eating its own dog food (internal automations)
3. **Third constraint:** Inbound lead volume — resolved by content compounding + referral asks at retainer check-ins
4. **Fourth constraint:** Delivery quality consistency — resolved by documented playbook + handoff templates

---

## Anti-Patterns

### Anti-Pattern 1: Custom Build Without Templatizing

**What people do:** Build a one-off automation for each client, tailored specifically to their tools, never generalizing the pattern.

**Why it's wrong:** The 10th client is just as hard as the first. Build time stays high, margin stays low, founder burnout scales with client count.

**Do this instead:** After every build, extract the generalized template. Client-specific configuration lives in parameters, not in the core logic.

---

### Anti-Pattern 2: Selling Before Quantifying

**What people do:** Jump to a proposal or a pitch before understanding the client's specific dollar cost of the problem.

**Why it's wrong:** Proposals without ROI framing are just quotes. They compete on price, not value. Clients without quantified pain cannot evaluate the ROI and will price-shop.

**Do this instead:** Run the value discovery script on every call. Do not send a proposal until you can write "this automation is worth $X/month to you and pays for itself in Y days."

---

### Anti-Pattern 3: Content That Teaches Instead of Demonstrates

**What people do:** Create educational content about AI automation (how to use Claude, how to build workflows) aimed at technical viewers who will never become clients.

**Why it's wrong:** The target audience — plumbers, dentists, realtors — does not want to understand how it is built. They want to see what their business looks like after it is running.

**Do this instead:** Every video shows a before-and-after for a specific business type. "Before: missed 12 leads a month. After: every lead gets a follow-up within 5 minutes." Show the automation running, not the code.

---

### Anti-Pattern 4: No Internal Operations Automation

**What people do:** Build client automations while handling all their own operations manually — chasing invoices, writing proposals from scratch, manually onboarding clients.

**Why it's wrong:** Hypocritical and time-consuming. A founder selling automation who does not automate their own business is the cobbler's children with no shoes. At 5+ clients, manual operations become a significant drag.

**Do this instead:** Automate the agency's own operations using the same tools sold to clients. This also produces authentic case studies ("here is how I run my own business").

---

### Anti-Pattern 5: Retainer Without Scope Definition

**What people do:** Sell a vague "maintenance and support" retainer with no defined scope of what is and is not included.

**Why it's wrong:** Clients escalate scope continuously ("can you just also add..."), retainer becomes unprofitable, relationship degrades.

**Do this instead:** Define retainer scope in the contract: monitoring, alerts, up to X hours of tweaks per month, excludes new automation builds (quoted separately). New automations are upsells, not retainer scope.

---

## Integration Points

### External Services

| Service                | Integration Pattern                                                      | Notes                                              |
| ---------------------- | ------------------------------------------------------------------------ | -------------------------------------------------- |
| Calendly / Cal.com     | Embed on landing page; trigger qualification email on booking            | Free tier sufficient for early stage               |
| Stripe / Wave          | Invoice generation, deposit collection, retainer billing                 | Wave is free; Stripe for cards                     |
| n8n / Make             | Workflow orchestration for client automations                            | Self-hosted n8n for cost control at scale          |
| Claude API             | AI intelligence layer inside automations                                 | Core capability; budget for token costs in pricing |
| YouTube                | Content distribution; long-form case studies                             | Pivoted channel; first content platform            |
| LinkedIn               | Content distribution; professional credibility                           | Repurposed clips from YouTube                      |
| Notion / Obsidian      | Knowledge base; templates; client notes                                  | Markdown-first for portability                     |
| GitHub                 | Version control for automation code; templates library                   | Private repo per client; shared templates repo     |
| Zapier (lightweight)   | Simple trigger connections when n8n is overkill                          | Use sparingly; $0 for low-volume tasks             |
| GoHighLevel (optional) | All-in-one CRM + landing pages + booking — used by many agency operators | Higher cost; evaluate at 3+ clients                |

### Internal Boundaries

| Boundary                  | Communication                                                         | Notes                                                    |
| ------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------- |
| Content → Landing Page    | Referral traffic via links in video descriptions / posts              | Landing page must load fast and have one CTA             |
| Landing Page → CRM        | Form submission → record creation                                     | Can be as simple as a Notion database at first           |
| Discovery Call → Proposal | Manual: founder writes proposal from template post-call               | Automate the first draft at 3+ clients/month             |
| Contract → Invoicing      | Manual trigger: contract signed → Stripe invoice generated            | Automate with webhook at scale                           |
| Build → Retainer          | Deploy event → retainer start date recorded → first invoice scheduled | Critical: retainer billing must be automatic, not manual |
| Retainer → Upsell         | Monthly check-in → quarterly review → new proposal if fit             | Document upsell opportunities in client folder           |

---

## Sources

- [AI Workflow Automation Agency: The Definitive 2026 Guide](https://www.heyreach.io/blog/ai-workflow-automation-agency) — MEDIUM confidence; covers delivery pipeline and tech stack patterns
- [Starting an AI Automation Agency: The Workflow Partner Model](https://www.moxo.com/blog/starting-ai-automation-agency) — MEDIUM confidence; reusable template IP and retainer structure
- [Start an AI Automation Agency: Business Model, Tools & Pricing](https://digitalagencynetwork.com/start-an-ai-automation-agency/) — MEDIUM confidence; MVS approach and niche specialization
- [AI Automation Agency Pricing 2026: CFO's Guide](https://optimizewithsanwal.com/ai-automation-agency-pricing-2026-a-cfos-guide/) — MEDIUM confidence; pricing tiers and hybrid model
- [AI Agents for Freelancers & Solopreneurs 2026](https://www.botborne.com/blog/ai-agents-freelancers-solopreneurs-2026.html) — LOW confidence (WebSearch only); scale benchmarks
- [Scaling Your Consulting Business 2026](https://www.consultingsuccess.com/scaling-your-consulting-business) — MEDIUM confidence; operational systematization at 0-10 client stage
- [The 2026 Agency Masterclass: Scaling an AI Automation Agency to $10K/Month](https://medium.com/@nbjoshua8/the-2026-agency-masterclass-scaling-an-ai-automation-agency-aaa-to-10-000-month-f71a641d4ec3) — LOW confidence (single source); scale trajectory guidance

---

_Architecture research for: Solo AI Automation Agency (local service businesses)_
_Researched: 2026-02-27_
