# Feature Research

**Domain:** AI Automation Agency — Services business selling workflow automations to local service businesses
**Researched:** 2026-02-27
**Confidence:** HIGH (client-facing offerings well-established in market; business infrastructure patterns verified across multiple agency operators)

---

## Feature Landscape

This file covers two distinct dimensions:

1. **Client-Facing Offerings** — What you sell to plumbers, dentists, realtors, contractors
2. **Business Infrastructure** — What you need to operate, sell, and deliver

---

## Part 1: Client-Facing Automation Offerings

### Table Stakes (Clients Expect These)

If you cannot demonstrate or offer these, local service business owners will not trust you as an automation agency. Missing any of these signals that you are not a serious operator.

| Feature                            | Why Expected                                                                                                                                   | Complexity | Notes                                                                                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Lead follow-up automation          | Every service business leaks leads. 60-second AI response vs. 2-hour human callback is the core pitch. This is THE category-defining offering. | MEDIUM     | SMS + email + form capture + AI qualifier + booking link. n8n or Make + Twilio or Resend + Claude/OpenAI. First PoC to build and demo. |
| Appointment scheduling & reminders | Scheduling friction and no-shows are universal pain points. Clients expect you to solve this.                                                  | MEDIUM     | Calendly/Cal.com integration + AI confirmation + reminder sequence. Reduces no-shows 30-50%.                                           |
| Review request automation          | Google reviews directly drive local SEO rankings and new leads. Every local business owner knows this pain.                                    | LOW        | Post-job trigger → SMS/email requesting review → direct link to Google profile. High impact, low complexity.                           |
| AI chatbot for website             | Visible, tangible artifact on client's website. Non-technical owners can see and point to it. Creates trust.                                   | MEDIUM     | Trained on business FAQ, hours, services, pricing. Handles inbound inquiries 24/7. Webchat widget or embedded iframe.                  |
| Missed call text-back              | Unanswered calls are lost revenue. Auto-SMS when someone calls and hangs up is a clear, demonstrable win.                                      | LOW        | Twilio or similar. Catches leads before they call the competitor. Often the first automation many clients have ever seen.              |

### Differentiators (Competitive Advantage)

These are not expected, but they make the engagement more valuable, justify premium pricing, and reduce churn on the retainer.

| Feature                                   | Value Proposition                                                                                                                                                                                | Complexity | Notes                                                                                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| AI-powered quote/estimate follow-up       | Most contractors quote and never follow up. Automated 3-touch follow-up sequence after sending estimate recovers deals that would otherwise go cold.                                             | MEDIUM     | Trigger from CRM or email. Day 1, Day 3, Day 7 cadence. Personalized with job details. High ROI for contractors and roofers. |
| Post-job upsell & nurture sequence        | One-time customers become repeat customers. AI-triggered email/SMS after job completion recommends seasonal follow-up services (HVAC tune-up, dental cleaning reminder, annual home inspection). | MEDIUM     | Requires job-completion trigger from scheduling system or CRM. Works best with plumbers, HVAC, dentists.                     |
| Reputation monitoring & competitor alerts | Tracks new reviews on Google/Yelp, flags negative reviews for fast response, tracks competitor ratings. Shows clients you are watching their business.                                           | MEDIUM     | Google My Business API + review aggregators. Monthly report auto-generated and emailed. Valued by dentists and realtors.     |
| Intake form → CRM pipeline automation     | New lead fills out form → AI extracts intent and urgency → creates CRM entry → routes to correct pipeline stage → triggers appropriate follow-up. Eliminates manual CRM hygiene.                 | MEDIUM     | Typeform/JotForm + n8n/Make + HubSpot/Pipedrive. Significant time savings for multi-location businesses.                     |
| Weekly business health report             | Auto-generated weekly digest: leads received, appointments booked, reviews earned, follow-ups sent. Non-technical owner sees tangible proof of value every Monday.                               | MEDIUM     | Keeps retainer justified. Reduces churn. Makes renewal conversations easy because the value is documented.                   |
| Voice AI for inbound calls                | AI answers phone, qualifies caller, books appointment or routes to human. 24/7 coverage. Highly visible and demo-able.                                                                           | HIGH       | Bland.ai, Retell, ElevenLabs + voice model. More technically complex, higher wow-factor. Save for Phase 2.                   |
| Invoice / payment follow-up automation    | Unpaid invoices are a persistent pain for service businesses. AI sends payment reminders on a schedule, reducing days-to-collect.                                                                | LOW-MEDIUM | Stripe/QuickBooks/Square webhook + SMS/email sequence. Often a quick win that impresses at close.                            |

### Anti-Features (Deliberately NOT Offered)

These appear attractive but create problems — scope creep, delivery risk, commoditization, or misalignment with the solo operator model.

| Anti-Feature                                      | Why Requested                                                             | Why Problematic                                                                                                                                                             | What to Do Instead                                                                                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Full website builds                               | Clients conflate "tech guy" with web developer. They will ask.            | Not automation. Wrong skill positioning. Breaks the "discrete workflow automation" model. Attracts wrong-fit clients who will under-pay and over-expect.                    | Refer to a web developer partner. Position yourself as the automation layer on top of any website.                                                     |
| Social media content creation                     | Clients assume AI = content writing. Easy upsell pitch.                   | Not automation. Content is a different skill, different deliverable, different retainer cadence. Turns you into a content agency, not an automation agency.                 | Out of scope, per PROJECT.md. Refer out or offer only if workflow automation triggers it (e.g., auto-post when new job completes — that's automation). |
| SEO services                                      | Local SEO is adjacent to "make my business findable." Clients will ask.   | Saturated market, requires ongoing labor, not automation. Doesn't play to technical strengths.                                                                              | Refer to SEO specialist. Automate review collection instead (which improves local SEO indirectly).                                                     |
| Custom app development                            | Some clients will want a client portal, a mobile app, a custom dashboard. | Full application development is explicitly out of scope (PROJECT.md). Different complexity tier, different pricing, different skill requirements.                           | Define scope clearly in contract. Build automations that connect existing apps, not replace them.                                                      |
| No-code/DIY setup for clients                     | Some clients want to learn to do it themselves. Seems collaborative.      | Trains clients out of needing you. Destroys the retainer model. Clients who self-serve don't pay $300/mo ongoing.                                                           | Offer documentation of what was built. Do not train clients to maintain it themselves beyond basic troubleshooting.                                    |
| Enterprise clients                                | Large companies have budget. Seems attractive.                            | Long sales cycles, procurement processes, security reviews, legal review, IT gatekeepers. Solo operator cannot compete effectively. Explicitly out of scope per PROJECT.md. | Stay focused on local service businesses. Refer enterprise inquiries to agencies that serve them.                                                      |
| Performance-based pricing                         | "Pay me only when leads convert." Clients love it.                        | Ties revenue to outcomes you do not fully control (client follow-through, market conditions, sales skills). Risk is asymmetric against the agency.                          | Value-based pricing based on expected lead value recovered. Fixed build fee + flat retainer.                                                           |
| White-label reselling other agencies' automations | Outsource the builds, markup. Seems scalable.                             | Creates dependency, quality control issues, margin compression. Wrong model for solo technical operator who builds custom code.                                             | Build everything yourself using Claude Code + APIs. Methodology ownership is the competitive moat.                                                     |

---

## Part 2: Business Infrastructure (What You Need to Operate)

### Table Stakes (Must Have to Be Trusted)

Without these, even a warm lead will not convert. These are trust signals and operational minimums.

| Feature                                   | Why Expected                                                                                                                                                                   | Complexity | Notes                                                                                                                                                                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Landing page with clear value proposition | Every client will Google you or follow a link. No landing page = not serious. Must be in language non-technical owners understand ("Your business stops losing leads at 5pm"). | LOW        | Single-page site. Headline = outcome. Social proof. One CTA: book a discovery call. Framer, Webflow, or even a well-built Notion page works for v1.                                                                   |
| Branded email address                     | Professional.email@youragency.com. Gmail or Apple Mail is unprofessional for B2B.                                                                                              | LOW        | Google Workspace ($6/mo) or Zoho Mail (free tier). Domain from Namecheap/Porkbun. Non-negotiable signal of legitimacy.                                                                                                |
| Client agreement template                 | Protects both parties. Defines scope, payment, IP, liability, exit. Clients will ask "do you have a contract?"                                                                 | LOW        | Plain-English template with 7 key clauses: scope, deliverables, 50/50 payment, IP (client owns instance, agency owns methodology), liability cap, retainer scope, 30-day exit. Docusign or HelloSign for e-signature. |
| Discovery call process (script + booking) | Clients need to talk before they buy. No booking system = friction = lost deals.                                                                                               | LOW        | Calendly free tier. 30-minute call template. Value discovery script: quantify lead loss, time cost, revenue impact before proposing any solution.                                                                     |
| PoC / demo automation                     | The single most important sales asset. A working lead follow-up automation you can screen-record and walk through.                                                             | MEDIUM     | Build it for yourself first. Use it to capture YOUR own leads. Record the demo. Use it in every sales conversation. Described in PROJECT.md as first priority.                                                        |
| Case study (before/after)                 | Social proof for a category that is new to most clients. "Show me someone else you've helped" is a top-3 objection.                                                            | LOW        | The PoC becomes the first case study. Before: manual follow-up, 2-hour response, X% lead loss. After: automated, 60-second response, Y leads recovered. Even a self-built demo counts as v1 case study.               |
| Invoicing system                          | Clients expect professional invoices. Must be able to collect 50% upfront before build starts.                                                                                 | LOW        | Stripe for card payments, or Wave (free) for invoicing. Bonsai has proposals + contracts + invoicing bundled ($24/mo).                                                                                                |
| Business name + minimal brand             | A name, a domain, a logo, a color palette. Without this, you cannot create a professional landing page, email, or contract.                                                    | LOW        | Name should be non-intimidating, approachable, outcome-focused (not "AI Solutions LLC"). Canva for logo. 2-3 colors.                                                                                                  |

### Differentiators (Operational Competitive Advantage)

These are not required to start, but they improve close rates, reduce churn, and make the business more professional over time.

| Feature                             | Value Proposition                                                                                                                                                                                                                                                               | Complexity | Notes                                                                                                                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value discovery script              | Quantifies the client's problem in dollar terms before proposing anything. "You said you get 30 new leads per week. If even 10% fall through the cracks, and your average job is $800, that's $2,400/month in lost revenue. This automation pays for itself in the first week." | LOW        | One-time effort to write. Reusable across all sales conversations. Turns objections about price into ROI discussions.                                            |
| Video PoC walkthrough               | Screen recording of the automation in action. Used in YouTube content AND as a sales asset sent after discovery calls. Replaces long written proposals for visual learners.                                                                                                     | LOW        | Record with Loom. 3-5 minutes. Show the problem → show the automation → show the outcome.                                                                        |
| YouTube channel (content funnel)    | Inbound leads who have already seen your work. Warms cold outreach. Builds credibility without cold calling.                                                                                                                                                                    | MEDIUM     | Pivot existing photography channel. Content for business owners, not builders. "How a plumber recovered 8 missed leads in one week" not "How I built a webhook." |
| Proposal template (3-tier pricing)  | Anchors client to middle tier. Starter/Professional/Enterprise structure. Prevents race to bottom on price.                                                                                                                                                                     | LOW        | Seven-section format (per research). Starter $1,500, Professional $2,500, Growth $4,000. Always present all three.                                               |
| Client onboarding playbook          | First 30 days set the tone. Structured onboarding reduces churn 40%. Milestone emails, kickoff agenda, intake form, go-live review.                                                                                                                                             | LOW        | Once built, reusable per engagement. Shows operational maturity even as a solo operator.                                                                         |
| Lightweight CRM for own pipeline    | Track your own leads, proposals sent, follow-up cadence. Solo operators who manage this from memory miss deals.                                                                                                                                                                 | LOW        | Notion CRM template or HubSpot free tier. Not a complex build — just a pipeline view with deal stages.                                                           |
| Monthly retainer reporting template | Auto-generated or templated report: automations active, triggers fired, leads captured, value delivered this month. Justifies the retainer and surfaces upsell conversations.                                                                                                   | LOW-MEDIUM | Pairs with the "weekly business health report" product feature. Can be delivered as simple PDF or Google Slides.                                                 |
| Referral/partnership pipeline       | Plumbers refer HVAC companies. Dentists refer other health practices. Web designers know every local business that needs a website. One active referral partner > 100 cold emails.                                                                                              | LOW        | Identify 3-5 referral partner categories. Simple revenue-share agreement ($200-500 per closed deal). Spreadsheet to track.                                       |

### Anti-Features (Business Infrastructure to Deliberately Skip)

| Anti-Feature                                     | Why Requested                      | Why Problematic                                                                                                                    | What to Do Instead                                                                                              |
| ------------------------------------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Hiring / subcontracting immediately              | "Scale faster, take more clients." | Solo operator for v1 per PROJECT.md. Hiring before product-market fit creates overhead that forces you to take bad-fit clients.    | Stay solo. Use AI tools (Claude Code, automation) to extend personal capacity before hiring.                    |
| Heavy CRM/PM software stack                      | "Manage clients professionally."   | Tool sprawl. Paying $200/mo in SaaS before having clients creates cost pressure.                                                   | Free tier of Notion or HubSpot. One tool for proposals/contracts (Bonsai). Expand only when constrained.        |
| Full company formation / legal overhead at start | "Protect yourself."                | LLC formation, accountant, business bank — useful eventually, but not Day 1. Creates procrastination disguised as preparation.     | Use personal name or DBA. Get one client first. Form LLC when you have revenue to protect.                      |
| Elaborate content calendar before PoC exists     | "Build audience first."            | No product = content about potential, not proof. Without a working demo, content has no credibility.                               | Build the PoC. Film it. That IS the first content. Content calendar comes after first working automation.       |
| Paid ads before organic validation               | "Reach clients faster."            | Paid local B2B ads are expensive. Without validated messaging and case studies, conversion rates will be too low to be profitable. | Organic content + direct outreach + referrals first. Paid ads only after 2-3 case studies establish what works. |

---

## Feature Dependencies

```
[PoC: Lead Follow-Up Automation]
    └──enables──> [Case Study]
                      └──enables──> [Landing Page credibility]
                                        └──enables──> [Content Funnel]

[Discovery Call Script]
    └──required by──> [Proposal Template]
                           └──required by──> [Client Agreement]
                                                └──required by──> [Invoicing]

[Business Name + Brand]
    └──required by──> [Landing Page]
    └──required by──> [Branded Email]
    └──required by──> [YouTube Channel]

[Lead Follow-Up Automation]
    └──depends on──> [Missed Call Text-Back] (simpler version of same pattern)
    └──enhances──> [Appointment Scheduling]
    └──enhances──> [Review Request Automation]

[Weekly Business Health Report]
    └──requires──> [at least one active automation per client]
    └──justifies──> [Monthly Retainer]

[Voice AI for Inbound Calls]
    └──requires──> [Lead Follow-Up PoC complete] (builds on same pattern)
    └──requires──> [Proven delivery track record] (higher client trust needed)
```

### Dependency Notes

- **PoC must come before everything else**: Without a working demo, there is nothing to sell, nothing to film, no landing page credibility. Every other item depends on this.
- **Business name/brand blocks landing page and email**: Cannot publish without identity. Resolve in first week.
- **Discovery call script must precede proposals**: Proposals without discovery are guesses. Clients see through them.
- **Voice AI conflicts with solo capacity**: High complexity + higher client expectations for reliability = not a Day 1 offering. Defer until delivery cadence is established.
- **Content funnel enhances all client-facing offerings**: Every automation you build becomes a YouTube video. They reinforce each other. The channel is not separate from sales — it is part of the sales process.

---

## MVP Definition

### Launch With (v1)

Minimum viable to earn the first paid client.

- [ ] Business name, domain, branded email — so you are credible
- [ ] Landing page (single page, clear outcome language, one CTA) — so leads have somewhere to land
- [ ] Lead follow-up automation PoC (built, working, screen-recorded) — the core sales asset
- [ ] Discovery call booking (Calendly) + value discovery script — the sales conversation
- [ ] Proposal template (3-tier pricing) — the close mechanism
- [ ] Client agreement template (7-clause plain English) — the legal minimum
- [ ] Invoicing (Stripe or Wave) — to collect payment
- [ ] Missed call text-back automation (sellable Day 1, low complexity) — first deliverable to a paid client

### Add After First Client (v1.x)

- [ ] Review request automation — natural second deliverable, builds on first
- [ ] Appointment scheduling automation — adds scheduling layer to lead follow-up
- [ ] Case study from first engagement — social proof for all future sales
- [ ] YouTube video from PoC — first content piece
- [ ] Lightweight CRM (Notion/HubSpot free) — once you have 3+ prospects to track
- [ ] Client onboarding playbook — reduces friction once you are repeating the same steps

### Future Consideration (v2+)

- [ ] Weekly business health report (automated) — once you have 3+ active retainer clients to justify build time
- [ ] Voice AI for inbound calls — high complexity, high wow-factor, high delivery risk; defer until delivery track record exists
- [ ] Post-job upsell/nurture sequences — once core lead capture is proven per vertical
- [ ] Referral partner pipeline — once case studies make referral conversations easy
- [ ] Paid ads — only after messaging is validated by organic traction

---

## Feature Prioritization Matrix

### Client-Facing Automations

| Feature                            | Client Value | Build Cost | Priority |
| ---------------------------------- | ------------ | ---------- | -------- |
| Lead follow-up automation          | HIGH         | MEDIUM     | P1       |
| Missed call text-back              | HIGH         | LOW        | P1       |
| Review request automation          | HIGH         | LOW        | P1       |
| Appointment scheduling + reminders | HIGH         | MEDIUM     | P1       |
| AI website chatbot                 | MEDIUM       | MEDIUM     | P2       |
| Quote/estimate follow-up           | HIGH         | MEDIUM     | P2       |
| Post-job upsell/nurture            | MEDIUM       | MEDIUM     | P2       |
| Invoice/payment follow-up          | MEDIUM       | LOW        | P2       |
| Weekly business health report      | HIGH         | MEDIUM     | P2       |
| Reputation monitoring              | MEDIUM       | MEDIUM     | P3       |
| Intake form → CRM pipeline         | MEDIUM       | MEDIUM     | P3       |
| Voice AI for inbound calls         | HIGH         | HIGH       | P3       |

### Business Infrastructure

| Feature                             | Business Value | Build Cost | Priority |
| ----------------------------------- | -------------- | ---------- | -------- |
| Business name + domain              | HIGH           | LOW        | P1       |
| Landing page                        | HIGH           | LOW        | P1       |
| Lead follow-up PoC (demo asset)     | HIGH           | MEDIUM     | P1       |
| Discovery call script + booking     | HIGH           | LOW        | P1       |
| Client agreement template           | HIGH           | LOW        | P1       |
| Invoicing (Stripe/Wave)             | HIGH           | LOW        | P1       |
| Branded email                       | MEDIUM         | LOW        | P1       |
| Proposal template (3-tier)          | HIGH           | LOW        | P2       |
| Case study (from PoC)               | HIGH           | LOW        | P2       |
| Video PoC walkthrough (Loom)        | HIGH           | LOW        | P2       |
| Lightweight CRM (own pipeline)      | MEDIUM         | LOW        | P2       |
| Client onboarding playbook          | MEDIUM         | LOW        | P2       |
| YouTube channel content             | HIGH           | MEDIUM     | P2       |
| Monthly retainer report template    | MEDIUM         | LOW        | P3       |
| Referral partner pipeline           | HIGH           | LOW        | P3       |
| Value discovery script (formalized) | HIGH           | LOW        | P2       |

---

## Competitor Feature Analysis

These are the patterns observed across competing AI automation agencies targeting local service businesses.

| Feature                 | Typical Competitor Approach                                               | Differentiator Opportunity                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Lead follow-up          | GoHighLevel white-label, n8n, or Zapier flows. Often templated.           | Custom-built with Claude Code + APIs. Methodology ownership means more flexibility, not locked to one platform.                      |
| Pricing transparency    | Most agencies hide pricing. Discovery call required just to get a number. | Publishing a pricing framework (Starter/Professional/Growth) on landing page qualifies leads before the call.                        |
| Deliverable tangibility | Many agencies sell vague "AI strategy."                                   | Focus on discrete automations with named deliverables and before/after metrics. "8 leads recovered in week 1" > "AI-powered growth." |
| Content / education     | Most agency content targets other builders, not buyers.                   | Content written for business owners ("what this does for your business") is a wide open lane.                                        |
| Niche depth             | Generalist agencies dominate the space ("we help all businesses").        | Vertical-specific positioning (starting with home services or dental) lets you speak the client's language in proposals and demos.   |

---

## Sources

- [How To Start An AI Automation Agency In 7 Days — Voiceflow](https://www.voiceflow.com/blog/ai-agency)
- [AI Service Proposals: Close Deals With Templates — Digital Applied](https://www.digitalapplied.com/blog/ai-service-proposals-close-deals-templates-guide)
- [AI Client Onboarding: First 30 Days Playbook — Digital Applied](https://www.digitalapplied.com/blog/ai-client-onboarding-first-30-days-playbook)
- [How to Start an AI Automation Agency — Function Point](https://functionpoint.com/blog/how-to-start-an-ai-automation-agency-a-step-by-step-guide)
- [Top 30 AI Automation Agencies Feb 2026 — DesignRush](https://www.designrush.com/agency/ai-companies/ai-automation-agency)
- [Agentic AI for Small Business Integration Guide 2026 — Digital Applied](https://www.digitalapplied.com/blog/agentic-ai-small-business-integration-guide-2026)
- [AI Lead Automation for Local Services — InsightCrafts Marketing](https://insightcraftsmarketing.com/ai-automation/)
- [5 Mistakes That Kill Your AI Agent ROI — Symphonize](https://www.symphonize.com/tech-blogs/5-mistakes-that-kills-your-ai-agent-roi)
- [5 Common Mistakes in AI Automation Implementation — ReachFirst](https://www.reachfirst.com/ai-automation-implementation-mistakes/)
- [Home Service Pilots — AI-Powered Lead Systems](https://homeservicepilots.com/)

---

_Feature research for: AI Automation Agency — Local Service Business Vertical_
_Researched: 2026-02-27_
