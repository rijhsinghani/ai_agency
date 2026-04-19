# Session handoff — IG + brand + landing page pivot

**Date:** 2026-04-19
**Anchor task:** IG profile redesign + link-in-bio strategy + DM playbook + landing page form
**Status:** IG mockup finishing in claude.ai/design. Rest queued.

---

## 1. Locked decisions

### ICP (pattern, not verticals)

> Growth partner for founders who are the brand, the operator, and the sales team — and running out of hours.

- Fitness (gym/trainers), real estate, photo/video = examples, not gates
- Out of scope: dental, salons, HVAC, plumbing, B2B SaaS, enterprise, regulated
- Full context: `~/.claude/projects/-Users-sameerrijhsinghani-automation-consulting/memory/project_icp_locked.md`

### Business model

- Not an agency. Solo operator with AI force multipliers.
- Revenue share held back — too sensitive to pitch publicly
- Public positioning: scarcity-first ("4 clients, 1 slot open")
- Free audit is the only entry CTA on public surfaces
- Full context: `memory/project_business_model_pivot.md`

### Visual system

- **Visual lock:** purple studio backdrop (matches brand #7B2FBE) is Sameer's signature — equivalent of Dain Walker's all-black outfit + dark backdrop
- **Font:** Inter 900 via Google Fonts CDN (free substitute for Roc Grotesk Wide; DEMO watermarks on Fontspring OTFs forced this)
  - Roc Grotesk license (~$200) is optional future upgrade — typeKit swap is one line
- **Colors:** #7B2FBE primary purple, #9B4FDE light, #4DD9E8 cyan (output nodes), #1A1A1A dark base, #F5F5F3 light break, #ff8a4c warm orange (metrics/ROI)
- **Per brand-voice.md color rules:** purple = titles/anchors/CTA, orange = metrics/ROI numbers, cyan = output/endpoint nodes. Don't apply one-word-purple to metrics — that's what made the grid feel "off-brand."

### IG bio (UNDECIDED — left open for design iteration)

Two candidates:

**A — Original with emoji bullets (Sameer said "looked good"):**

```
🤖 AI growth partner
🎯 For founders who are the brand
🛠 Solo, AI-powered, limited slots
↓ Free audit
```

**B — Option P from iteration (Sameer said "feels messy"):**

```
Growth systems for founders who do everything.
I build the stack you'd have with a full team — one person, AI-first.
sameerautomations.com
```

Leaning toward A based on Sameer's reaction to B. Finalize when IG mockup lands from Claude Designs.

### Highlights (3 tiles)

About · Case Studies · Work With Me

### CTA philosophy

- No keyword DMs ("DM SCALE") at 368 followers — reads gimmicky
- Route to owned assets: landing page (sameerautomations.com) or Cal.com booking
- DMs stay conversational, peer-level, never quote pricing
- Reintroduce keyword DM if follower count crosses ~10K
- Link-in-bio: native IG multi-link (not Linktree/linkin.bio)

### Grid discipline

- Current grid: archive (don't delete) gym/personal/car selfie/rajphotovideo wedding posts
- Unfollow 1,373 → <500 over 60 days. Max 50/day (IG flags bulk)
- New posts only: purple studio shots OR concept cards OR rare lifestyle

---

## 2. Work shipped (12 commits across 2 repos)

### content-engine

- `content(sameer-social-content): swap ICP examples to gym/realtor/photographer` — `e2d7bc10`, `284ab590`
- `content(guide): narrow ICP to owner-led businesses` — `4e065527`, `e5b5f2e6`
- `content(prospect-prototype): align example ICPs with current focus` — `8fd3d40b`, `eba54496`

### automation_consulting

- `brand(voice): narrow ICP to owner-led businesses` — `af7b2e6`
- `giveaway(general): update ICP examples to owner-led verticals` — `1cd8d65`
- `giveaway: archive HVAC/plumbing variant (off-ICP)` — `749257d`
- `case-study(bookkeeping): lean photographer framing over generic contractor` — `2fc94a7`
- `case-study: archive content-automation (off-ICP product/SaaS)` — `43a826a`
- `calendar: flag HVAC/plumber topics for ICP rewrite` — `ceb41d6`
- `brand(ig-vision): implement Direction C with real photos + production highlight covers` — `d7dc1b9`
- `brand(ig-vision): rebalance grid to value-heavy (2 face cells, 7 value cells)` — `f65739b`
- `brand(ig-vision): swap demo fonts to Inter 900 + update bio copy` — `3b38185`

None pushed to remote. All on `main` branch locally.

---

## 3. Assets produced

### IG mockup iterations (under `/automation_consulting/brand/ig-vision/`)

- `project/Instagram Profile - Direction C.html` — current state: value-heavy grid, Inter 900 fonts, Option P bio
- `project/direction-c-render.png` — latest screenshot
- `assets/cover-{about,case-studies,work-with-me}.png` — BROKEN in last pass (lost face photos during font regen). Need restore.

### Older PIL-generated assets (superseded, can delete)

- `/automation_consulting/brand/ig-assets/` — early PIL attempts

### Case studies (inventory)

Location: `/automation_consulting/content/case-studies/`

- `lead-management.md` ✓ on-ICP (wedding photo/video)
- `operations-automation.md` ✓ on-ICP (wedding photo/video)
- `bookkeeping-automation.md` ✓ reframed (photographer angle)
- `financial-management.md` — industry-agnostic, leave alone
- `archive/content-automation.md` — moved out of core set

---

## 4. 9 IG post captions (ready to use)

All written in strict brand voice: no emojis, contractions, numerals for metrics, peer-level, single CTA "Book a free audit — link in bio." Paste directly into IG when posting.

### Post 1 — THE AI OPERATOR STACK (concept card)

People ask what tools I use. Here's the actual stack.

Claude for thinking and copy. Gemini for research and fast drafts. Custom agents for client-specific workflows. n8n for wiring everything together. Supabase as the spine — every lead, message, invoice lives there. Resend and Twilio for the outbound. A few APIs I pay for so I don't have to rebuild them.

That's it. No secret tools. No hidden "growth hack" platform. What's different isn't the tools — it's that they're actually talking to each other, and the whole thing is built around your business, not a template.

If that stack doesn't sound like a full marketing team, wait till you see what it does in 30 days.

Book a free audit — link in bio.

**Hashtags:** #AIStack #SmallBusinessSystems #Automation #Solopreneur #GrowthPartner

### Post 2 — WHY FOUNDERS BURN OUT (reel)

**Reel overlay:** Founders burn out for 1 reason — and it's not hours.

Nobody burns out from 60-hour weeks. People burn out from being the sales team, the delivery team, and the admin team at the same time.

The problem isn't time. It's attention. Every role pulls at a different part of your brain. Every switch costs you. By Friday your body's still going but your judgment is gone.

Automation isn't about working less. It's about taking 4 of those roles off your plate so the one that actually needs you — the work only you can do — gets your full head.

I've been the founder doing all of it. I know exactly which parts to hand off first, because I built my way out of the same job.

Book a free audit — link in bio.

**Hashtags:** #FounderBurnout #Solopreneur #SmallBusinessOwner #OperatorLife #SystemsOverHustle

### Post 3 — ONE PERSON. FULL AGENCY. (concept card)

How does one person run like a full agency?

Research: an agent scrapes the market and surfaces what's working. Copy: drafted by Claude, edited by me. Follow-up: automated, triggered by lead behavior. Reviews: requested the moment a job closes. Admin: invoiced, reconciled, filed without me touching it.

What stays with me: strategy, client conversations, the decisions that shape the business. Everything else runs.

It's not replacing a team with a chatbot. It's replacing repetitive work with systems that hold the shape of your business. You end up with the output of a 6-person agency and the margin of a solo operator.

That's the model. That's what I build for clients who are ready.

Book a free audit — link in bio.

**Hashtags:** #AIAgency #Solopreneur #Automation #GrowthSystems #OperatorModel

### Post 4 — THE FOLLOW-UP PROBLEM (reel)

**Reel overlay:** 5-minute follow-up closes 40%. 2-hour follow-up closes 10%. You can't sit by your phone.

Most leads don't die from a bad pitch. They die in silence.

Responding within 5 minutes closes 40% of leads. Responding within 2 hours closes 10%. The founders I work with aren't bad at follow-up — they're with a client when the lead comes in. The math doesn't forgive that.

Missed call text-back, instant email confirm, a quick qualifier that routes the lead to the right place — all of it runs in the background. You still talk to the prospects who matter. You just stop losing them while you work.

The gap between "good enough to book you" and "lost them" is 15 minutes. That's it.

Book a free audit — link in bio.

**Hashtags:** #LeadFollowUp #MissedCalls #SmallBusinessGrowth #SalesAutomation #SpeedToLead

### Post 5 — Lifestyle (palate cleanser)

Quiet Saturday. Two client calls and a long walk. Built one thing, broke two things, fixed one of them. The other can wait till Monday.

The point of systems isn't to work more. It's to have afternoons like this and know the business is still running.

**Hashtags:** #SoloFounder #OperatorLife #SlowGrowth

### Post 6 — NOT AN AGENCY (reel)

**Reel overlay:** Agencies give you account managers. I give you the work.

Agencies have account managers, briefs, revisions, layers of people between you and the output. By the time the idea reaches the person doing the work, it's been flattened four times.

I'm one person, with AI as my team. You email me, I'm the one reading it. You approve a plan, I'm the one shipping it. There's no briefing chain. There's no retainer that pays for someone's manager's manager. There's the work, and there's you.

That's why I only take a handful of clients. Proximity is the product. If you've ever walked out of an agency call thinking "I could've said that to the intern directly" — that's the gap I'm built around.

Book a free audit — link in bio.

**Hashtags:** #NotAnAgency #SoloOperator #GrowthPartner #SmallBusiness #AIPowered

### Post 7 — WHY I ONLY TAKE 4 CLIENTS (light concept)

4 clients isn't a scarcity trick. It's math.

Each client gets real research, real strategy, systems built around their business, and someone on call when things break. That takes time. Not calendar time — attention. Four is what I can hold without the work getting thin.

When I grow capacity, I grow it through AI agents, not more humans. Which means when you work with me in month 1, you're still working with me in month 12. The thing you bought doesn't turn into "you got handed off to a junior."

Right now: 4 active, 1 slot open this quarter.

Book a free audit — link in bio.

**Hashtags:** #LimitedSlots #GrowthPartner #SoloFounder #OperatorLife #QualityOverScale

### Post 8 — STOP DOING THIS MANUALLY (reel)

**Reel overlay:** 5 tasks you're still doing by hand. Each one is an hour a day.

The 5 tasks every owner-led business still does manually — and shouldn't.

1. Missed call text-back. Phone rings while you're with a client, lead hears voicemail, lead calls the next business.
2. Review requests. You finish the job, forget to ask, lose the social proof forever.
3. Lead follow-up. That "let me check my calendar" email sits for 3 days.
4. Invoice reminders. You chase, or you eat the bill.
5. Calendar reschedules. Clients text, you text back, 12 messages to move one appointment.

Each one costs you about an hour a day. Each one is either a $99/month tool or a one-time build. None of them are hard. You just haven't had time to set them up.

Book a free audit — link in bio.

**Hashtags:** #SmallBusinessAutomation #Productivity #MissedCallTextBack #ReviewAutomation #OperatorTools

### Post 9 — THE OPERATOR MODEL (diagram)

Every system I build fits the same shape.

LEADS come in — from ads, referrals, content, walk-ins. The SYSTEM handles the boring 90%: qualification, routing, follow-up, reminders, reviews, reporting. CLIENTS come out — with less of your time spent in the middle and more of it spent on the work that actually needs you.

That's the whole model. It's not complicated. It's just rarely built this cleanly because most businesses bolt on tools as they grow, and the seams start to leak.

If the 90% in the middle of your business feels leaky — leads falling through, follow-ups missed, reviews never asked for — that's where we start.

Book a free audit — link in bio.

**Hashtags:** #OperatorModel #GrowthSystems #SmallBusiness #Automation #FoundersLife

---

## 5. Outstanding — priority order

### P0 — Unblocks everything else

- [ ] **Submit landing page form in claude.ai/design** — answers are drafted. The resulting wireframes are the link-in-bio destination.
- [ ] **Finish IG mockup in claude.ai/design** (in-flight) — restore original Direction C with silhouettes + emoji bio, just swap to Inter 900 to kill DEMO watermarks

### P1 — After mockup lands

- [ ] Fix broken highlight covers — last agent lost the face photos; need to regenerate with real photos + Inter 900 labels
- [ ] Update `website-v2/` P1 brand issues (off-brand colors, inconsistent sections) — documented in existing BRAND-AUDIT.md
- [ ] Run `/marketing:campaign-plan` for 30-day IG relaunch (cadence, unfollow push schedule, launch post)

### P2 — Playbook gaps

- [ ] DM conversation playbook — what scripts, when to route to audit call, never quote pricing in DM
- [ ] Email follow-up sequence post-audit (`/marketing:email-sequence` is the right skill)
- [ ] Start unfollow execution: 50/day max, target <500 within 60 days

### P3 — Decisions pending

- [ ] Roc Grotesk license decision (~$200) or stay on Inter 900
- [ ] Bio final pick (emoji bullets vs Option P) — waiting on IG mockup
- [ ] Real portrait for IG profile photo — current headshots work; no reshoot needed unless you want moody Dain-style look

---

## 6. Landing page form answers (ready to paste)

**Business name:** Sameer Automations
**#1 action:** Book a free growth audit call
**Ideal customer:** Owner-led service businesses where the founder is the brand, the operator, and the sales team. Fitness, real estate, creators are examples, not gates.
**Services (6):** Landing pages & websites · Lead capture & follow-up · AI agents / automations · SMS & missed-call text-back · Reviews & reputation · Quote / proposal automation
**Proof:** Case studies + Real client results / numbers
**Pricing:** No — hide behind a call
**Tone:** Peer-level & practical
**Wireframe directions:** 4
**Fidelity:** Mixed
**Sections:** Hero · Problem · Services grid · How it works · Results/stats · Testimonials · About/founder story · Free audit CTA · Footer
**Variation focus:** Overall structure · Hero layout · Services presentation · CTA placement

**Anything else I should know paste:**

> **Positioning:** Growth partner for founders who are the brand, the operator, and the sales team — and running out of hours. NOT an agency. Solo operator with AI force multipliers. Currently 4 clients, 1 slot open. Scarcity qualifies, not pricing.
>
> **ICP framing:** pattern-based, NOT vertical lists. Owner-led service businesses, founder-is-the-brand, time-constrained. Don't write "dental, salons, plumbers." Write "founders who are running out of hours." Real clients come from fitness, real estate, photo/video — weave organically, never list.
>
> **Brand tokens:** #7B2FBE primary purple, #9B4FDE light purple, #4DD9E8 cyan accent, #1A1A1A dark base, #F5F5F3 light break, #ff8a4c warm orange for metrics/ROI. Roc Grotesk (700) or Inter 900 for headlines. Avoid #3BCEAC / #D97706 / #10B981.
>
> **Voice:** direct, peer-level, confident. No emojis on the landing (they're only allowed in the IG bio, not here). Contractions. Numerals for metrics.
>
> **Aesthetic reference:** Dan Koe × Dain Walker × Jack Butcher personal sites. Premium, minimal, dark-mode-first, spacious. Not a Framer SaaS template. Strict one-accent-word-per-headline rule. Metrics in orange, not purple.
>
> **Do NOT include:** revenue share, 10% language, fixed pricing, "agency" framing, hype/buzzwords, keyword DM CTAs.
>
> **The one CTA, repeated:** "Book a free growth audit."

---

## 7. Recommended next session opener

> "Resume the IG/landing/DM pivot. Start by reading `brand/SESSION-HANDOFF-2026-04-19.md`. Landing form is blocking — answer should be submitted first."

Memory also has the latest state:

- `memory/project_icp_locked.md`
- `memory/project_business_model_pivot.md`
- `memory/project_ig_playbook.md`
