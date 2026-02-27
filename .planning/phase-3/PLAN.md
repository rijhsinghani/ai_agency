# Phase 3: Sales Surface — Implementation Plan

**Phase Goal:** A prospect who finds the agency online can understand what it does, see a working demo, see published pricing, and book a discovery call — all in one place.

**Created:** 2026-02-27
**Status:** Ready to execute

---

## 1. Overview

### Phase Goal

Transform the existing landing page (already built and branded in Phase 1) into a full sales surface: productized packages with fixed prices, a PoC case study embedded as social proof, concrete ROI examples drawn from real PoC numbers, and a functional discovery call booking CTA.

### Requirements Covered

| Requirement | Description                                                      |
| ----------- | ---------------------------------------------------------------- |
| LAND-01     | Landing page communicates value prop in non-technical language   |
| LAND-02     | Landing page displays productized packages with published prices |
| LAND-03     | Landing page shows ROI value examples                            |
| LAND-04     | Landing page has one primary CTA: book a discovery call          |
| LAND-05     | Landing page includes the PoC case study as social proof         |
| LAND-06     | Landing page built using Gemini MCP for design assistance        |
| PKG-01      | Pre-built N8N templates exist for 3-5 high-value use cases       |
| PKG-02      | Each template has a fixed published price ($1,500-3,000)         |
| PKG-03      | Custom build option is available                                 |
| PKG-04      | Template catalog: Lead Follow-Up, Missed Call, Review, Reminders |

### Dependencies on Phase 2

Phase 3 CANNOT be fully executed until Phase 2 delivers:

- **PoC running end-to-end** (N8N + Claude + Twilio/Resend + Google Calendar) — needed for the case study section and to validate the Lead Follow-Up N8N template
- **Before/after metrics from the PoC** — needed for the ROI examples section (LAND-03). Placeholder numbers are used during build; replace with real PoC numbers before launch.
- **Video walkthrough (3-5 min)** — needed for the case study embed (LAND-05)

**Build now, launch after Phase 2:** The landing page sections can be built with placeholder data and swapped to real numbers once Phase 2 completes. The N8N templates do NOT depend on Phase 2 — they can be built in parallel.

---

## 2. Package Definitions

Five productized automation packages, each with a fixed price, clear scope, and target customer.

---

### Package 1: Lead Follow-Up Automation

**Price:** $2,500 build + $350/mo retainer

**In business-owner language:**
Every new lead — whether they fill out your contact form, click your Facebook ad, or call and leave a voicemail — gets an AI-powered text response within 60 seconds. The AI qualifies them ("What's the job? When do you need it done?"), answers basic questions, and books them straight to your calendar. You see a new appointment. You never touched your phone.

**What's included:**

- N8N workflow connecting your lead source (web form, Google Ads webhook, Facebook Lead Ads, or missed call trigger) to the AI qualification engine
- Claude API integration for conversational lead qualification via SMS (2-3 message exchange)
- Calendar booking via Google Calendar Appointment Scheduling — prospect self-books from available slots
- Confirmation SMS + email to prospect on booking
- Notification to owner (email or SMS) when new appointment is booked
- Integration with your existing CRM or a simple Notion/Airtable lead log if none exists
- Testing with 10+ simulated leads before go-live
- 30-minute Loom walkthrough video delivered at handoff
- First 30 days of monitoring included

**Target customer:**
Contractors, plumbers, HVAC, electricians, roofers, landscapers — anyone who gets web or phone leads and loses them to slow response times. Best fit: businesses missing 5+ leads per month due to response lag.

**Estimated build time:** 4-6 hours (using template; 12-16 hours if building from scratch for the first time)

**Pricing rationale:** If a contractor's average job is $800 and they're losing 8 leads/month, that's $6,400/month in lost revenue. Recovering even 50% pays for the build fee in the first week.

---

### Package 2: Missed Call Text-Back

**Price:** $1,500 build + $200/mo retainer

**In business-owner language:**
You're under a sink, on a roof, or driving between jobs. Your phone rings — you can't answer. Right now, that lead probably calls your competitor next. With this automation, the moment a call goes unanswered, they get a text: "Hey, caught your call — tied up on a job. Can I reach you in the next hour?" Most people reply. The lead stays warm until you're free.

**What's included:**

- Twilio phone number (or integration with your existing business number) to detect missed calls
- Automatic SMS sent within 30 seconds of missed call
- Customizable message template ("Hi, it's [Name] from [Business] — saw I missed your call...")
- Optional: AI-powered reply handling if prospect responds with a question
- Simple lead log (Notion or Google Sheet) capturing: caller number, timestamp, reply status
- Testing with 20+ simulated missed calls
- Setup of Twilio account and number configuration (if needed)
- Handoff doc + Loom walkthrough

**Target customer:**
Any solo operator or small team where the owner answers their own phone. Plumbers, electricians, HVAC — anyone who works with their hands and can't always pick up. Lowest friction package to sell: near-universal pain point.

**Estimated build time:** 2-3 hours (template-driven)

**Pricing rationale:** Recovering 4 leads/month from missed calls at $600/job average = $2,400/month. Build fee pays back in under one job.

---

### Package 3: Review & Reputation Automation

**Price:** $1,500 build + $200/mo retainer

**In business-owner language:**
Two hours after you finish a job and the customer is still happy, they get a friendly text: "Thanks for choosing us today — if you had a great experience, it would mean a lot if you left us a quick Google review." One tap, review page opens. Most satisfied customers will do it. Your star rating climbs, new customers trust you more, Google ranks you higher. All automatic, every job.

**What's included:**

- Trigger: job completion event from your scheduling app (ServiceTitan, Housecall Pro, Jobber, Square Appointments, or manual Google Sheet entry)
- 2-hour delay after job completion (catches peak satisfaction window)
- Personalized SMS with customer first name and business name
- Direct link to your Google Business Profile review page
- Optional: 3-day follow-up text if no review left
- Review alert: Resend email notification when a new review is posted (via Google Business Profile API or Zapier webhook)
- Monthly review count report
- Handoff doc + Loom walkthrough

**Target customer:**
Any local service business that needs more Google reviews. Especially strong for: HVAC, plumbing, landscaping, dentists, chiropractors, auto repair — businesses where reviews directly drive new customer acquisition.

**Estimated build time:** 2-4 hours

**Pricing rationale:** Moving from 4.1 to 4.7 stars on Google typically increases click-through by 25-30%. For a business getting 30 calls/month from Google, that's 7-9 more calls. At $400/average job, that's $2,800-3,600/month in additional revenue from the same ad spend.

---

### Package 4: Appointment Reminder Sequence

**Price:** $1,500 build + $200/mo retainer

**In business-owner language:**
Customer books a job for Thursday. Today is Monday. By Thursday, half of them have forgotten, had a conflict, or just won't be home when you show up. This automation sends them a reminder 24 hours before, then again 1 hour before. No-shows drop dramatically. You stop wasting drive time on empty jobs. If they need to reschedule, they can do it right from the text — without calling you.

**What's included:**

- Integration with your booking system (Google Calendar, Jobber, Housecall Pro, or similar)
- 24-hour reminder SMS + email with job details, technician name (optional), and a confirm/reschedule link
- 1-hour reminder SMS: shorter, friendlier tone, phone number to call if needed
- Reschedule link routes to your booking page — no phone tag required
- Cancellation handling: if customer cancels, owner gets immediate notification and the slot opens for rebooking
- Optional: post-appointment "how did we do?" text (combines with Review package for a bundle)
- Monthly report: reminders sent, confirmation rate, cancellation rate

**Target customer:**
Any appointment-based local service business. Strongest fit: HVAC maintenance, dentists, chiropractors, cleaning services, pest control — businesses with scheduled appointments (not emergency/on-demand). No-show rate above 10% is the trigger to buy.

**Estimated build time:** 2-4 hours

**Pricing rationale:** If a business does 40 appointments/month and 15% are no-shows, that's 6 wasted jobs at $300/job = $1,800/month in lost revenue + wasted drive time. Even cutting no-shows by half recovers $900/month — build fee pays back in under 2 months.

---

### Package 5: Lead Nurture & Quote Follow-Up

**Price:** $2,000 build + $300/mo retainer

**In business-owner language:**
You give someone a quote. They say "let me think about it." Then... nothing. Most businesses never follow up. This automation sends a sequence: Day 2 — "Just checking in on that quote we sent"; Day 5 — "Any questions I can answer?"; Day 10 — "Quote expires soon — want to lock in that price?" — all personalized, all automatic. You close the jobs your competitors forgot about.

**What's included:**

- Trigger: quote/estimate sent event (from your estimating software, or manually logged in a Google Sheet or Airtable)
- 3-touch follow-up sequence over 10 days via SMS + email
- Personalized messages with business name, quote amount, job type
- AI-written message variants (A/B testable) using Claude API
- Stop trigger: automation pauses if prospect responds or books
- Lead status logging in Notion or Airtable (Sent quote → Followed up → Closed or Dropped)
- Monthly report: quotes sent, follow-up open rates, close rate improvement
- Handoff doc + Loom walkthrough

**Target customer:**
Any trade business that sends quotes/estimates and struggles with follow-through. Roofers, HVAC, remodelers, landscapers, painters. Especially powerful for: businesses with jobs above $1,000 where even 1-2 recovered jobs/month justifies the package.

**Estimated build time:** 4-6 hours

**Pricing rationale:** If a business sends 20 quotes/month and closes 5 (25%), recovering 2 additional closes at $1,500/job = $3,000/month. Even at 50% improvement in close rate, that's $1,500/month — build fee pays back in under 2 months.

---

### Custom Build Option (PKG-03)

**Price:** Discovery call → custom scoped quote (typically $2,500–$3,000)

**In business-owner language:**
Have a workflow that's eating your time but doesn't fit neatly into one of the packages above? Tell me what's broken. If it's repetitive — a sequence of steps you do the same way every time — I can almost certainly automate it. We'll spend 45 minutes on a discovery call, I'll map out the workflow, and you'll have a fixed-price quote within 24 hours.

**When to recommend:** When a prospect's pain doesn't match packages 1-5, or when they want to combine multiple packages into a single integrated system.

---

## 3. Landing Page Updates

The existing `website/index.html` already has: nav, hero, "how it works", services overview (4 services without prices), ROI comparison, pricing (ranges only, no package names), about, and booking CTA.

Phase 3 adds/modifies the following sections:

---

### 3A. Services Section — Add Package Pricing (Modify Existing)

**Current state:** Services section shows 4 automation cards (Lead Follow-Up featured, plus Missed Call, Review, Appointment Reminders) without prices.

**Change:** Add a price badge to each service card. No full redesign — just add a price line below each card's heading or in the header row.

**Copy addition for each card:**

- Lead Follow-Up: "Starting at $2,500 + $350/mo"
- Missed Call Text-Back: "$1,500 + $200/mo"
- Review & Reputation: "$1,500 + $200/mo"
- Appointment Reminders: "$1,500 + $200/mo"

**Also add:** A fifth card (or a separate "Advanced" row) for Lead Nurture / Quote Follow-Up at $2,000 + $300/mo.

**Implementation:** Add a `<span>` price badge styled like the "Most Popular" badge above each card's title. Use `text-purple` with a `bg-purple-muted` pill. Keep the card layout unchanged.

---

### 3B. Packages Section — New Full-Width Section (Add After Services)

**Goal:** Convert the services overview into a full pricing table that makes it easy to compare packages and pick one.

**Section design (new section, insert after `#services`):**

```html
<!-- PACKAGES / PRICING TABLE -->
<section id="packages" class="relative py-24 lg:py-32 bg-base">
  <!-- Section header -->
  <p class="eyebrow">Productized Packages</p>
  <h2>Pick your package. Know your price before you call.</h2>
  <p class="subtext">
    Fixed prices. No hourly billing. No scope creep surprises.
  </p>

  <!-- 5-column package table (desktop) / stacked cards (mobile) -->
  <!-- Each card: Package name | What it does (1 sentence) | Build price | Monthly retainer | CTA button -->

  <!-- CTA at bottom: "Not sure which fits? Book a free 20-minute intro call." -->
</section>
```

**Package card structure (each of 5 packages):**

```
[Icon]
Package Name
One-sentence business outcome
─────────────────────────────
Build: $X,XXX
Monthly: $XXX/mo
─────────────────────────────
[Book a Call]   ← purple button, routes to #book anchor
```

**Design guidelines:**

- Use `bg-surface-raised` cards with `border border-cream/[0.06]`
- "Most Popular" badge on Lead Follow-Up
- Featured card (Lead Follow-Up) uses slightly larger styling or a purple border
- All 5 packages + the Custom Build card (grayed out, "Let's scope it" CTA)
- Mobile: single column stack. Desktop: 3-column grid (2 on row 1, 3 on row 2), or horizontal scroll
- Use Gemini MCP during build to generate/refine card layout HTML

---

### 3C. ROI Examples Section — Enhance Existing (LAND-03)

**Current state:** There is a "Results" section (`#results`) with a before/after comparison showing "leads lost" vs "leads captured" and a large number counter. This is strong conceptually but uses hypothetical numbers.

**Change:** After Phase 2 PoC is complete, replace hypothetical numbers with real PoC metrics. For Phase 3 build (before PoC is live), use realistic placeholder numbers derived from industry benchmarks, clearly structured so swapping is easy.

**ROI copy framework (per package — embed in package cards or a dedicated "What it pays back" subsection):**

| Package          | ROI Example                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Lead Follow-Up   | "A plumber missing 8 leads/week at $700/job loses $5,600/week. This automation recovers most of it."                         |
| Missed Call      | "4 recovered calls/month × $600/job = $2,400/month. Build fee pays back in the first job."                                   |
| Review Request   | "Going from 4.1 to 4.5 stars typically increases Google clicks by 20-30%. For most businesses, that's 5-8 more calls/month." |
| Appointment Rem. | "Cutting no-shows from 15% to 7% on 40 jobs/month = 3 extra jobs at $300 each = $900/month recovered."                       |
| Quote Follow-Up  | "Closing 2 extra quotes/month at $1,500/quote = $3,000/month. Build fee pays back in under 2 months."                        |

**Add to existing `#results` section:** A "by the numbers" row beneath the before/after animation:

- 5 stat chips, one per package: "8 leads recovered/week", "4 calls answered automatically", "23% more Google reviews", "50% fewer no-shows", "2 more closes/month"

---

### 3D. Case Study / Social Proof Section — New Section (LAND-05)

**Goal:** Embed the PoC case study (video + written summary) as social proof.

**Position:** Insert between `#results` and the existing Pricing section.

**Section structure:**

```html
<!-- CASE STUDY -->
<section
  id="case-study"
  class="relative py-24 lg:py-32 bg-surface diagonal-top"
>
  <p class="eyebrow">Proof It Works</p>
  <h2>I built this for my own agency first. Here's what happened.</h2>

  <!-- Two-column layout -->
  <!-- Left: Video embed (YouTube iframe of the walkthrough, or placeholder "Video coming soon" card) -->
  <!-- Right: Written case study summary card -->

  <!--
  Before/After metrics (from PoC data):
  - Before: Average lead response time: 4.2 hours
  - After: Average lead response time: 47 seconds
  - Leads contacted within 5 min: 8% → 100%
  - Appointments booked without human intervention: 0% → 100%
  - Estimated revenue recovered (2-week PoC): $X,XXX
  -->

  <!-- Pull quote: "The lead texted back within 2 minutes. I didn't touch my phone." -->

  <!-- CTA: "See how it works for your business →" (routes to #book) -->
</section>
```

**Before Phase 2 data is available:** Build the section with placeholder structure and a "Case study dropping soon — video walkthrough in progress" placeholder card. The layout and styling are final; only the numbers and video embed change after Phase 2.

**Video embed:** Use a YouTube iframe with `loading="lazy"` and a custom thumbnail overlay (click-to-play). The existing `brand/youtube/thumbnail-template.svg` is the visual reference for the thumbnail.

---

### 3E. CTA Optimization — Book a Discovery Call (LAND-04)

**Current state:** `#book` section exists with a heading and placeholder booking interface.

**Change:** Wire the booking CTA to the Google Calendar Appointment Scheduling booking link.

**Options (in order of preference):**

1. **Google Calendar Appointment Scheduling embed**: Use an iframe embed of the booking page — renders inline, no redirect. Best UX.
2. **Google Calendar redirect**: Button href points to `[Google Calendar booking link]` — simplest, functional.
3. **Google Calendar push notification / webhook**: For advanced integrations, use the Google Calendar API to receive booking events and trigger follow-up automations.

**CTA copy across the page:**

- Primary CTA (hero + book section): "Book a Free 20-Min Intro Call"
- Secondary CTAs (in package cards): "Book a Call" (shorter, action-oriented)
- Fallback text under booking widget: "Prefer email? sameer@rajphotovideo.com"

**Sticky mobile CTA:** Add a sticky bottom bar on mobile (hidden on desktop) with "Book a Free Call →" that routes to `#book`. This catches mobile visitors who scroll past the hero CTA.

**Discovery call framing (copy for the `#book` section):**

```
Heading: "Let's find your leaks."
Subheading: "20 minutes. Free. I'll identify the top 2-3 places your business is losing revenue to slow or missing follow-up — and tell you exactly how to fix it, whether you hire me or not."
Bullet points:
  - No pressure, no pitch deck
  - Walk away with a concrete action plan
  - If it's a fit, I'll quote the automation on the spot
```

---

### 3F. Navigation Update

Add `#packages` to the nav links. Current nav likely has: Services, How It Works, Pricing, Book a Call. Update to: Services, Packages, How It Works, Book a Call (drop redundant "Pricing" since pricing is now inside the Packages section).

---

## 4. Implementation Steps

Tasks are ordered. Complete each before starting the next — do not parallelize within a plan.

---

### Plan A: Package Definition & Pricing

**Goal:** Finalize all 5 package definitions and create one-pager reference docs for each.

**Steps:**

1. **Finalize the 5 packages** — confirm names, prices, and retainer amounts. The definitions in Section 2 of this plan are the canonical source. No changes without updating this PLAN.md.

2. **Create package one-pager docs** — for each package, create a markdown file at `ops/packages/[package-slug].md` with: name, business-owner description, what's included (bullet list), price, retainer, target customer, ROI example, build time estimate, required inputs from client (phone number, CRM API key, scheduling app credentials, etc.).

   Files to create:
   - `ops/packages/lead-follow-up.md`
   - `ops/packages/missed-call-text-back.md`
   - `ops/packages/review-reputation.md`
   - `ops/packages/appointment-reminders.md`
   - `ops/packages/quote-follow-up.md`

3. **Create the custom build intake template** — `ops/packages/custom-build-intake.md`: questions to ask on a discovery call to scope a custom engagement. Covers: current workflow (what steps, what tools), what triggers the process, where the data lives, what the desired output is, success metric.

4. **Verify pricing is sustainable** — sanity-check each package against estimated build time and retainer hours. If a $1,500 package takes 6+ hours to build, it may be underpriced. Document the time estimates in the one-pagers.

**Deliverable:** 5 package one-pager docs + 1 custom intake doc in `ops/packages/`.

---

### Plan B: N8N Template Development

**Goal:** Build working, tested N8N workflow templates for all 5 packages. Each template is a JSON export that can be imported into any N8N instance and configured with client credentials.

**Steps:**

1. **Set up N8N self-hosted instance** — Deploy N8N on Railway or DigitalOcean ($5-20/mo). Required before template development. Reference: STACK.md for hosting options. Create `n8n/README.md` documenting the N8N instance URL, credentials storage approach, and workflow export process.

2. **Build Template 1: Lead Follow-Up** — See Section 5.1 for full specification. This is the most complex template. Build it first since it's also the PoC template from Phase 2.

3. **Build Template 2: Missed Call Text-Back** — See Section 5.2. Simpler than Lead Follow-Up. Should take 2-3 hours.

4. **Build Template 3: Review Request** — See Section 5.3. Depends on a job-completion trigger source — build with a generic webhook trigger that can be mapped to any scheduling app.

5. **Build Template 4: Appointment Reminders** — See Section 5.4. Depends on calendar integration. Build with Google Calendar trigger; document Jobber as an alternative trigger.

6. **Build Template 5: Quote Follow-Up** — See Section 5.5. Uses Claude API for message personalization. Build last as it introduces AI-generated text variants.

7. **Export and document each template** — For each completed workflow:
   - Export as JSON from N8N (`workflows/export`)
   - Save to `templates/[package-slug]/workflow.json`
   - Create `templates/[package-slug]/README.md` with: required credentials, environment variables, customization points, test procedure
   - Record a Loom or OBS walkthrough of the workflow running end-to-end

8. **Validate each template with test data** — Run each workflow with 10+ simulated inputs. Document edge cases. Fix failures before marking template as "ready."

**Deliverable:** 5 working N8N workflow JSON files in `templates/`, each with a README and test results documented.

---

### Plan C: Landing Page Enhancement

**Goal:** Modify `website/index.html` to add all Phase 3 sections. Use Gemini MCP (`mcp__gemini-cli__ask-gemini`) for design assistance and HTML generation as required by LAND-06.

**Steps:**

1. **Use Gemini MCP for Packages section design** — Before writing HTML, prompt Gemini to generate the packages grid layout and card HTML consistent with the existing page style (Tailwind CSS, dark theme, purple brand). Provide Gemini the existing services card HTML as context. Prompt: "Generate a responsive pricing grid for 5 automation packages using Tailwind CSS, dark background (#0E0E0E), purple accent (#7B2FBE), consistent with this existing card style: [paste existing card HTML]."

2. **Add price badges to existing service cards** — Modify the 4 existing service cards in `#services` to include the price. Small change: add `<span class="text-purple text-sm font-semibold">Starting at $1,500 + $200/mo</span>` below each card's `<h3>` title.

3. **Add Lead Nurture / Quote Follow-Up as a fifth service card** — Add a fifth card to the right-column stack in `#services` (or restructure to a 5-card grid if layout breaks). Card content from Package 5 definition above.

4. **Insert Packages section** (`#packages`) — New section after `#services`. Use the Gemini-generated HTML as the starting point. Ensure all 5 packages + custom build option are represented with prices.

5. **Update ROI section** (`#results`) — Add the 5-chip stat row below the existing before/after animation. Replace hardcoded hypothetical numbers with template placeholders tagged with `<!-- REPLACE WITH POC DATA -->` comments so they're easy to swap post-Phase-2.

6. **Insert Case Study section** (`#case-study`) — New section between `#results` and the existing Pricing section. Build with placeholder video card and placeholder metrics. Use the case study section structure from Section 3D above.

7. **Update booking section** (`#book`) — Replace existing placeholder with actual Google Calendar Appointment Scheduling embed or link. Update the copy to match the "Let's find your leaks" framing from Section 3E.

8. **Add sticky mobile CTA** — Add the sticky bottom bar HTML just before `</body>`. Show only on mobile (`lg:hidden`).

9. **Update navigation** — Add `#packages` link. Remove or consolidate "Pricing" if packages section now serves that role.

10. **Verify with Gemini MCP** — After all edits, use `mcp__gemini-cli__ask-gemini` to review the full HTML for design consistency, accessibility issues, and mobile layout problems. Prompt: "Review this landing page HTML for: (1) design consistency with the dark purple theme, (2) mobile responsiveness issues, (3) CTA clarity, (4) any accessibility issues. [paste HTML]"

**Deliverable:** Updated `website/index.html` with all Phase 3 sections complete.

---

### Plan D: Testing & Launch

**Goal:** Verify the landing page functions correctly across browsers and devices, and all CTAs route to working destinations. N8N templates are verified and ready to demo.

**Steps:**

1. **Cross-browser test** — Open `website/index.html` in Chrome, Safari, and Firefox (minimum). Verify: fonts load, animations play, cards display correctly, sticky CTA appears on narrow viewport.

2. **Mobile test** — Open in Chrome DevTools mobile emulator at 375px (iPhone SE), 390px (iPhone 14), and 428px (iPhone Pro Max). Verify: no horizontal overflow, sticky CTA visible, all sections readable, package prices visible without zoom.

3. **CTA flow test** — Click every CTA button on the page and verify it routes correctly:
   - Hero "Book a Call" → `#book` section
   - Package card "Book a Call" buttons → `#book` section
   - `#book` section booking link → Google Calendar Appointment Scheduling page (actual booking flow works)
   - Footer links function

4. **Load time check** — Open Chrome DevTools > Lighthouse > Performance. Target: Lighthouse performance score above 80. If below: check image sizes, remove unused CSS, add `loading="lazy"` to any images.

5. **Case study video test** — If YouTube video is embedded, verify it loads correctly. Test click-to-play overlay if using a custom thumbnail.

6. **N8N template smoke tests** — Run each template with one real test input (not simulated). Verify the full chain executes: trigger → AI processing → output (SMS/email/calendar booking) → log entry.

7. **Booking flow end-to-end** — Book an actual discovery call through the CTA. Verify: confirmation email arrives, calendar invite is created, booking appears in Google Calendar dashboard.

8. **Document launch-readiness** — Update `STATE.md`:
   - Mark Phase 3 progress
   - Record: landing page URL, Google Calendar booking link, N8N template locations
   - Note any known issues or follow-up items

**Deliverable:** Landing page passes all tests. N8N templates smoke-tested. Phase 3 success criteria verified against the checklist in Section 6.

---

## 5. N8N Template Specifications

---

### 5.1 Lead Follow-Up Template

**File location:** `templates/lead-follow-up/workflow.json`

**Trigger:**

- Webhook (POST) — receives lead data from web form submission, Google Ads, or Facebook Lead Ads
- Fields expected: `name`, `phone`, `email`, `service_type` (optional), `message` (optional)
- Alternative triggers: Typeform webhook, Gravity Forms (WordPress webhook), Elementor form webhook

**Workflow steps:**

```
1. Webhook Trigger
   → Receive lead data

2. Validate & Normalize
   → Check: phone number present and valid (E.164 format)
   → Extract: first name from full name field
   → Set: business_name, calendar_link (configured per deployment)

3. Wait Node (30-second delay)
   → Prevents instant SMS from seeming bot-like; 30-45 seconds feels more natural

4. Send Initial SMS via Twilio
   → To: {phone}
   → From: Business Twilio number
   → Body: "Hey {first_name}! This is {owner_name} from {business_name}. Thanks for reaching out — what kind of work are you looking to get done?"

5. Log Lead to Notion/Airtable
   → Create row: name, phone, email, service_type, timestamp, status="contacted"

6. Wait for Reply (Webhook or Twilio Incoming SMS)
   → If no reply in 2 hours → send follow-up SMS ("Still interested in getting a quote?")
   → If reply received → continue to step 7

7. Claude API — Qualify Lead
   → System prompt: "You are a helpful assistant for {business_name}, a local {business_type} company. Based on the customer's reply, determine: (1) What service do they need? (2) Is this a valid service request (not spam/wrong number)? (3) What follow-up question to ask? Reply with JSON: {service, is_valid_lead, next_question}"
   → Input: customer reply text
   → Output: structured JSON with service type, validity flag, next question

8. Route by Lead Quality
   → If is_valid_lead = false → send "Thanks for reaching out! We handle [list services]. Would any of these fit?" → end
   → If is_valid_lead = true → continue

9. Send Booking SMS via Twilio
   → Body: "Sounds good! Here's a link to book a time that works for you: {calendar_link}. Takes about 30 seconds to grab a slot."

10. Wait for Booking Confirmation (Google Calendar push notification / webhook)
    → Google Calendar fires a push notification when booking is completed

11. Send Confirmation SMS via Twilio
    → Body: "You're all set! I've got you booked for [date/time]. You'll get a reminder the day before. See you then!"

12. Send Notification Email to Owner via Resend
    → Subject: "New appointment booked: {customer_name}"
    → Body: customer name, phone, service type, booking time

13. Update Lead Log
    → Update Notion/Airtable row: status="booked", booking_time
```

**Integrations required:**

- Twilio (SMS send + receive)
- Claude API (message classification and qualification)
- Google Calendar Appointment Scheduling (booking link + push notification)
- Notion or Airtable (lead log)
- Resend (owner notification email)

**Customization points per deployment:**

- `BUSINESS_NAME`, `OWNER_NAME`, `BUSINESS_TYPE`
- `TWILIO_NUMBER` (business Twilio number)
- `CALENDAR_LINK` (Google Calendar Appointment Scheduling booking link)
- `NOTION_DATABASE_ID` or `AIRTABLE_BASE_ID`
- System prompt context (services offered, pricing ranges if sharing upfront)

**Edge cases to handle:**

- Lead submits form multiple times (deduplicate by phone number + 24hr window)
- Lead replies out of sequence (e.g., replies to confirmation with a question)
- Booking link clicked but not completed (send 24hr reminder: "Did you get a chance to grab a time?")
- International phone numbers (handle +1 vs. country code stripping)

---

### 5.2 Missed Call Text-Back Template

**File location:** `templates/missed-call-text-back/workflow.json`

**Trigger:**

- Twilio webhook on missed call event (`CallStatus = no-answer` or `CallStatus = busy`)
- Alternative: missed call forwarding via phone system webhook (RingCentral, Google Voice business)

**Workflow steps:**

```
1. Twilio Incoming Call Webhook
   → CallStatus = no-answer OR caller hangs up after 4+ rings

2. Extract Caller Data
   → From: caller phone number (CallerNumber)
   → Lookup: check if number exists in lead log (Notion/Airtable) — returning customer?

3. Wait Node (15-30 seconds)
   → Short delay so SMS doesn't arrive while caller is still on the line

4. Send Text-Back SMS via Twilio
   → New caller: "Hey! Saw I missed your call — I'm tied up on a job right now. Can I reach you in the next hour? This is {owner_name} from {business_name}."
   → Returning customer (if match found): "Hey {first_name}! Missed your call — is everything good with the [prior service]? I'll call you back shortly."

5. Log Missed Call
   → Create or update row in Notion/Airtable: phone, timestamp, type="missed_call", status="text_sent"

6. Wait for Reply
   → If no reply in 4 hours → no follow-up (don't spam)
   → If reply received → continue

7. Route Reply
   → If reply = question ("how much for X?") → send: "Happy to give you a number. Can I get a quick call or text me what you're looking to get done?"
   → If reply = available time ("call me at 3pm") → log and send owner notification
   → Other → generic: "Thanks for texting back! I'll give you a call soon."

8. Notify Owner
   → Resend email or SMS: "Missed call from {number} — they replied: {reply_text}. Call them back."
```

**Integrations required:**

- Twilio (call status webhook + SMS)
- Notion or Airtable (lead log)
- Resend (owner notification)

**Customization points:**

- `BUSINESS_NAME`, `OWNER_NAME`
- `TWILIO_NUMBER`
- Reply routing logic (can disable AI routing for simpler version)

**Edge cases:**

- Robocalls/spam (filter if `CallerNumber` starts with known spam prefixes, or if call duration < 3 seconds)
- Repeat missed calls from same number in same day (send only one text-back, not multiple)

---

### 5.3 Review Request Template

**File location:** `templates/review-reputation/workflow.json`

**Trigger:**

- Webhook from scheduling app (Jobber, Housecall Pro, ServiceTitan) on job status = "completed"
- Alternative: Manual trigger — owner enters customer phone + name into a Google Form or Airtable form; N8N polls or receives webhook

**Workflow steps:**

```
1. Job Completion Trigger
   → Receives: customer_name, customer_phone, job_type, technician_name (optional)

2. Wait 2 Hours
   → N8N Wait node: 2 hours after job completion
   → This is the peak satisfaction window — customer is still happy

3. Send Review Request SMS via Twilio
   → Body: "Hi {first_name}! {owner_name} here from {business_name}. Really appreciated you choosing us for your {job_type} today. If we did a good job, would you take 30 seconds to leave us a review? It means a lot: {google_review_link}"
   → Keep it personal, not templated-feeling

4. Log Request
   → Notion/Airtable: customer, timestamp, status="review_requested"

5. Wait 3 Days
   → Check if review was posted (optional: Google Business Profile API polling)
   → If confirmed review posted: update log status="review_received", notify owner
   → If not confirmed after 3 days: continue to step 6

6. Optional Follow-Up SMS (if no review detected)
   → Body: "Hey {first_name} — just a gentle nudge on that review if you get a minute! No worries if not. {google_review_link}"

7. Update Log
   → Status = "follow_up_sent" or "completed_no_review"
```

**Integrations required:**

- Twilio (SMS)
- Google Business Profile API (optional — for review detection)
- Notion or Airtable (log)

**Customization points:**

- `BUSINESS_NAME`, `OWNER_NAME`
- `GOOGLE_REVIEW_LINK` (the direct link to business's Google review page)
- Delay timing (2 hours is default; adjust based on business type)
- Follow-up: on/off toggle per deployment

---

### 5.4 Appointment Reminder Template

**File location:** `templates/appointment-reminders/workflow.json`

**Trigger:**

- Google Calendar: new event created in a specific calendar (polling via N8N's Google Calendar node)
- Alternative: Jobber/Housecall Pro scheduled job webhook

**Workflow steps:**

```
1. Google Calendar Trigger (Poll every 15 min)
   → New event detected in "Appointments" calendar
   → Extract: customer_name, customer_phone, appointment_datetime, job_type

2. Schedule 24-Hour Reminder
   → N8N Wait until: {appointment_datetime} - 24 hours
   → Send SMS via Twilio: "Hi {first_name}! Reminder: {owner_name} from {business_name} is scheduled for your {job_type} tomorrow at {time}. Reply CANCEL or RESCHEDULE if you need to change anything. Otherwise, we'll see you then!"
   → Send Email via Resend (if email provided): same content, HTML formatted with appointment details

3. Schedule 1-Hour Reminder
   → N8N Wait until: {appointment_datetime} - 1 hour
   → Send SMS via Twilio: "Hi {first_name}! Heading your way in about an hour for the {job_type}. Our number is {business_phone} if you need to reach us."

4. Handle Cancellation/Reschedule
   → If customer replies "CANCEL" → Notify owner immediately via Resend + SMS
   → If customer replies "RESCHEDULE" → Send booking link: "No problem! Here's our scheduling link: {calendar_link}"
   → Update calendar event status (mark cancelled)

5. Post-Appointment (Optional — 2 hours after scheduled end time)
   → Trigger review request workflow (integrates with 5.3)
   → Or: send standalone "How did we do?" text

6. Log All Activity
   → Notion/Airtable: appointment, reminder_24h_sent, reminder_1h_sent, status (kept/cancelled/rescheduled)
```

**Integrations required:**

- Google Calendar (trigger)
- Twilio (SMS)
- Resend (email)
- Notion or Airtable (log)

**Customization points:**

- Calendar trigger source (Google Calendar, Jobber)
- Reminder timing (24h and 1h are defaults; can add 48h)
- Reply keywords for cancel/reschedule
- Post-appointment review integration: on/off

---

### 5.5 Quote Follow-Up Template

**File location:** `templates/quote-follow-up/workflow.json`

**Trigger:**

- Manual: owner enters customer info in a Google Form or Airtable form after sending a quote
- Fields: customer_name, customer_phone, customer_email, quote_amount, job_description, quote_date
- Alternative: webhook from quoting software (Jobber, Housecall Pro, ServiceTitan) on quote_status = "sent"

**Workflow steps:**

```
1. Quote Sent Trigger
   → Receive: customer_name, phone, email, quote_amount, job_description, quote_date

2. Log to Airtable/Notion
   → Create row: customer, quote, date, status="quote_sent"

3. Wait 2 Days

4. Day 2 Follow-Up — Check-In
   → Claude API generates personalized message:
     System: "Write a friendly, non-pushy 1-sentence check-in SMS for a {job_description} quote of ${quote_amount} sent 2 days ago. Sign off as {owner_name} from {business_name}. No exclamation marks. Conversational."
   → Send SMS via Twilio
   → Send email via Resend (slightly longer version)
   → Update log: status="day2_followup_sent"

5. Monitor for Reply
   → If reply received at any point → stop sequence, notify owner, log reply
   → If booking confirmed → stop sequence, mark "closed_won"

6. Wait 3 More Days (Day 5 from quote)

7. Day 5 Follow-Up — Value Reinforcement
   → Claude API generates message:
     System: "Write a 2-sentence SMS for a {job_description} quote follow-up. Mention one specific benefit of choosing us (quality, speed, local, warranty — pick one). Don't be pushy."
   → Send SMS
   → Update log: status="day5_followup_sent"

8. Wait 5 More Days (Day 10 from quote)

9. Day 10 Follow-Up — Urgency/Expiry
   → Template SMS (not AI — be precise about urgency): "Hi {first_name} — just a heads up that our quoted price of ${quote_amount} for the {job_description} expires in the next few days. Happy to answer any questions. {owner_name}, {business_phone}"
   → Update log: status="day10_followup_sent"

10. Close Sequence
    → After Day 10 send: update status to "sequence_complete"
    → No further automated contact

11. Owner Notification Summary (weekly)
    → Resend email: list of all open quotes, days since sent, last follow-up status
```

**Integrations required:**

- Claude API (message personalization)
- Twilio (SMS)
- Resend (email)
- Airtable or Notion (lead/quote log)

**Customization points:**

- Sequence timing (2/5/10 days default; can shorten for time-sensitive work)
- Claude prompt context (service type, business personality, any talking points)
- Stop conditions (reply detection: keyword match or Twilio incoming SMS webhook)
- Day 10 message: template vs. AI-generated

---

## 6. Verification Checklist

Use this checklist to confirm each Phase 3 success criterion is met before declaring Phase 3 complete.

---

### Success Criterion 1: Landing page live, explains value prop in plain English

- [ ] `website/index.html` opens in browser without errors
- [ ] Hero headline is immediately understandable to a non-technical business owner (test: read it to someone unfamiliar with AI — do they understand what the agency does?)
- [ ] Services/packages section uses business outcome language, not technical language ("your phone rings" not "webhook integration")
- [ ] No jargon on the page that requires a tech background to understand (scan for: API, webhook, LLM, N8N, Claude — these should not appear in public-facing copy)
- [ ] Page is hosted and accessible via public URL (or: static file ready to deploy to Framer/GitHub Pages)

### Success Criterion 2: 3-5 productized packages with fixed prices ($1,500-3,000)

- [ ] All 5 packages are listed on the page with specific dollar amounts (not ranges)
- [ ] Each package shows: name, 1-2 sentence description, build price, monthly retainer price
- [ ] Prices are in the $1,500-3,000 build / $200-500 retainer range
- [ ] Custom build option is visible with "Book a call to scope it" CTA
- [ ] Package one-pagers exist in `ops/packages/` (one file per package)

### Success Criterion 3: At least one ROI example using real PoC numbers

- [ ] At least one ROI example on the page uses specific numbers ("8 leads recovered per week", not "more leads")
- [ ] The ROI calculation is logical and verifiable (if challenged, you can show the math)
- [ ] If PoC data is available: real numbers from Phase 2 are used. If not: realistic industry benchmark numbers are used with `<!-- REPLACE WITH POC DATA -->` comments for easy swap
- [ ] ROI example is placed near the package it refers to, or in the dedicated Results section

### Success Criterion 4: PoC case study or video embedded as social proof

- [ ] Case study section exists on the page (`#case-study`)
- [ ] Either: YouTube video is embedded (click-to-play) OR a written case study card with before/after metrics is present
- [ ] Before/after metrics are specific (response time, leads captured, bookings)
- [ ] If video not yet available: placeholder card exists with "Case study in progress" state — section layout is final, just needs content swap

### Success Criterion 5: Book a discovery call CTA is functional

- [ ] "Book a Free 20-Min Intro Call" button exists in the hero section
- [ ] "Book a Call" CTA exists in each package card
- [ ] `#book` section has working booking functionality (Google Calendar Appointment Scheduling embed or link)
- [ ] Clicking the CTA from the hero routes to the booking section or external booking page
- [ ] Booking flow tested end-to-end: click → booking page loads → select time → confirm → receive confirmation email
- [ ] Booking appears in Google Calendar after test booking

### Success Criterion 6: N8N templates exist for minimum 3 packages

- [ ] `templates/lead-follow-up/workflow.json` exists and is importable to N8N
- [ ] `templates/missed-call-text-back/workflow.json` exists and is importable to N8N
- [ ] At least one of: `templates/review-reputation/workflow.json` OR `templates/appointment-reminders/workflow.json` exists
- [ ] Each template has a `README.md` documenting required credentials, customization points, and test procedure
- [ ] Each template has been tested with real inputs (not just simulated) at least once
- [ ] Templates are parameterized (no hardcoded business names, phone numbers, or API keys)

---

### Final Gate: Phase 3 Complete

All 6 success criteria above must be checked before:

- Updating `STATE.md` to mark Phase 3 as complete
- Updating `ROADMAP.md` to check off Phase 3
- Starting Phase 4 (Acquisition Engine)

---

_Phase 3 plan authored: 2026-02-27_
_Author: Planning agent — execute with Claude Code_
_Status: Ready for execution (pending Phase 2 completion for case study data)_
