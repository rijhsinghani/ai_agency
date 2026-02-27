# Phase 2: Go to Market — Implementation Plan

**Phase Goal:** Generate inbound and outbound interest, book discovery calls, and close the first paying client — without building any automation infrastructure first.

**Estimated Effort:** 4-6 weeks of sustained part-time effort (~3-5 hours/week). First reply expected within 2 weeks. First discovery call expected within 3-4 weeks. First signed client is the phase exit gate.

---

## Overview

Phase 1 delivered: complete brand identity, voice guide, live landing page at https://rijhsinghani.github.io/ai_agency/, 5 portfolio case studies written from real GitHub repos, a YouTube content plan with 5 video ideas, outreach templates in `ops/outreach/`, and package concepts in `ops/packages/`.

Phase 2 uses all of that to generate real conversations. Nothing gets built until a client signs and pays. The stack — N8N, Make, Zapier, or custom — is chosen per client after the discovery call reveals their actual situation. The only output that matters at the end of Phase 2 is a signed agreement and a deposit.

**What Phase 2 is not:** a technical build phase. Do not spin up N8N, do not configure any automation tool, do not set up Supabase or Resend. That work begins in Phase 3, after a paying client exists.

### Four Parallel Tracks

| Track | What It Is                                            | Expected Output                              |
| ----- | ----------------------------------------------------- | -------------------------------------------- |
| A     | YouTube channel launch (origin story video first)     | Inbound credibility, searchable presence     |
| B     | Portfolio section live on landing page                | Proof of capability for outbound and inbound |
| C     | Outbound outreach campaign (local service businesses) | Direct conversations, booked calls           |
| D     | Free audit offer to qualified prospects               | Reply rate improvement, warm leads           |

All four tracks run simultaneously. Track C (outreach) is the primary driver of first revenue. Tracks A and B amplify Track C and build the long-term inbound engine.

---

## Prerequisites

Everything that must exist before outreach begins.

### Accounts to Create / Verify

| Tool            | Purpose                                                            | Status                        |
| --------------- | ------------------------------------------------------------------ | ----------------------------- |
| Notion          | Prospect tracking database                                         | Create if not already set up  |
| Loom            | 3-minute personalized audit videos for Day 7 follow-ups            | Create free account           |
| Google Calendar | Discovery call booking page (30-min appointment schedule)          | Set up appointment scheduling |
| Hunter.io       | Email lookup for prospects whose emails aren't public (25/mo free) | Create free account           |

### Google Calendar Appointment Schedule

Set up a public booking page before sending any outreach. Every email template ends with this link.

1. Open Google Calendar. Settings → "Appointment schedules" → Create new.
2. Name: "Free Discovery Call — 30 min"
3. Availability: Set your actual availability (e.g., Mon-Fri 10am-5pm). Be realistic — you need to be responsive when a call books.
4. Add a confirmation message: "Thanks for booking. I'll spend 10 minutes before our call reviewing your specific setup so we can use the time well."
5. Copy the booking page URL. This is your [BOOKING LINK]. Use it in every email template, every audit document, and every piece of content.

### Notion Prospect Database

Create one database with these columns before researching a single prospect. The database in `ops/outreach/prospecting-criteria.md` defines the full column structure. Minimum required before outreach begins:

- Business Name, Owner Name, Email, Phone, Business Type, City
- Qualification Score (1/2/3), Pain Signal Found (checkbox), Pain Signal Detail (text)
- Outreach Status (Not Started / Day 1 Sent / Day 3 Sent / Day 7 Sent / Responded / Booked / No Response / Disqualified)
- Day 1 / Day 3 / Day 7 sent dates
- Loom Link, Notes

Create three views: Active Sequence (Day 1/3 sent, needs follow-up), Top Prospects (Score = 3, not yet contacted), Booked.

### Portfolio on Landing Page

The 5 portfolio case studies written in Phase 1 must be linked from the landing page before any outreach is sent. When a prospect receives an email from you and visits the site, the portfolio section must exist. Add it as a prerequisite — complete this in the first week of Phase 2 before starting outreach.

---

## Implementation Steps

### Plan A: YouTube Channel Launch

**Goal:** Publish the origin story video. Establish a searchable, professional presence that supports outbound credibility and begins building inbound traffic.

**Recording is manual. Editing is manual. Publishing is manual. There is no automation here.**

#### Step 1: Set Up the Channel (1 hour)

1. Create a YouTube channel under a Google account you control. Channel name: "Sameer Automations" or your name — match the landing page brand exactly.
2. Upload the brand logo as the channel icon. Use a banner image that matches the landing page color palette.
3. Write the channel description: "I build AI automation systems for local service businesses — plumbers, HVAC contractors, dental practices, realtors. My videos show exactly how these systems work and what they cost."
4. Add the landing page URL to the channel's links section.
5. Set up channel keywords: "AI automation small business, local business automation, lead follow-up automation, HVAC automation, plumber automation."
6. Do not publish any video yet. Complete setup first.

#### Step 2: Record the Origin Story Video (3-4 hours)

This is the first video. It is the most important video. It explains who you are, what you do, and why — without naming any employer, without claiming clients you don't have, and without overpromising.

**Title:** "Why I Left [My Career] to Build AI Systems for Small Businesses" or "The Problem With Local Business Lead Follow-Up (And Why I'm Fixing It)"

**Format:** On camera. No screen share. 5-8 minutes. No slides.

**Script outline:**

```
[0:00-0:45] The problem you kept seeing
What drew you to this. What breaks in local service businesses. The
missed call that costs a plumber a $1,200 job. Make it concrete.
Use a specific type of business. Do not name employers.

[0:45-2:30] What you built (your background, without specifics)
Without naming employers: "I spent years building automation systems
in corporate environments and kept thinking — the small business owner
down the street needs this more than any enterprise does."
What skills you bring. What you've built. Reference the case studies
from your portfolio as the proof.

[2:30-4:30] What "Sameer Automations" actually does
Walk through the core problems: missed calls, no follow-up, manual
booking, no review requests. Walk through what automated systems look
like for each. Keep it outcome-focused — no tool names, no jargon.
"A lead submits a form at 11 PM. By 11:00:23 PM they have a response
and a booking link. That's it."

[4:30-6:00] Who this is for
Plumbers, HVAC, roofers, dental practices. Why these businesses
specifically. Why now. Keep it honest — you're not claiming a hundred
clients. You're claiming expertise and a clear vision.

[6:00-7:00] What's next / CTA
"I'm documenting every system I build here. If you own a local service
business and want to see what this looks like for your specific
situation, book a free 30-minute call."
Show the booking link on screen. End.
```

**Recording notes:**

- Shoot on your phone propped up at eye level, or with a webcam if it's high quality. Good lighting matters more than camera quality. Face a window or buy a $30 ring light.
- Record in one take if possible. Authenticity outperforms polish for this type of content.
- Edit in Descript: cut long pauses, remove filler words, add captions (Descript does this automatically), add a title card at the start and an end card with the booking link.
- Export at 1080p minimum.

#### Step 3: Optimize and Publish the Origin Story Video

1. Write a description that includes: what the video is about, who it's for, 3-5 target keywords, and the booking link in the first 2 lines.
2. Create a thumbnail in Canva: your face + a bold text callout ("How I automated a plumber's lead follow-up in 48 hours" or similar).
3. Add chapters in the description using timestamps that match your script outline.
4. Publish. Do not wait for it to be perfect. The bar for video 1 is: does it clearly communicate who you are and what you do.
5. Share the YouTube link on the landing page and in the bio of any social profile you use for this project.

#### Step 4: Record and Publish the Remaining 4 Videos

Use the 5-video content plan from Phase 1. Publish one video per week after the origin story. Each video should demonstrate one type of automation in concrete terms.

**Suggested order:**

1. Origin story (Week 1)
2. "What happens when a plumber misses a call" — demo/explainer (Week 2)
3. First case study walkthrough — pick one from the portfolio (Week 3)
4. "What a free audit finds" — walk through a real audit you ran on a real prospect, anonymized (Week 4)
5. Discovery call breakdown — what you cover on a 30-minute call (Week 5)

Do not wait for a perfect recording schedule. One video per week is the target. Two weeks between videos is acceptable. Three weeks is too long.

---

### Plan B: Portfolio Section Live on Landing Page

**Goal:** The 5 portfolio case studies from Phase 1 are visible on the landing page and accessible from outreach emails before the first Day 1 email is sent.

**This must be complete before Plan C begins.**

#### Step 1: Add Portfolio Section to the Landing Page

The landing page lives at https://rijhsinghani.github.io/ai_agency/. The GitHub repo is at https://github.com/rijhsinghani/ai_agency.

1. Add a "Work" or "Results" section to the landing page HTML, positioned between the "What I Do" section and the contact form.
2. Display all 5 case studies as cards. Each card needs:
   - A title (the automation type, e.g., "Missed-Call Text-Back System")
   - The business category (e.g., "Plumbing / HVAC")
   - One quantified result (e.g., "Reduced average response time from 4 hours to 90 seconds")
   - A brief description (2-3 sentences)
   - No client names — describe the business type only
3. Do not add a "View Full Case Study" link unless the full case studies are also on the site. Cards alone are sufficient for Phase 2.
4. Commit, push to main, confirm the GitHub Pages deployment updates within 5 minutes.

#### Step 2: Verify the Portfolio Section on Mobile

Open the live site on a phone. Service business owners who receive your emails will often open the link on mobile. The portfolio cards must display cleanly at 375px width. Fix any layout issues before sending outreach.

---

### Plan C: Outbound Outreach Campaign

**Goal:** Build a list of 50 qualified prospects, run the 3-day email sequence for each, and book discovery calls.

**All outreach is manual. No automation. Templates are in `ops/outreach/`. The sequence is Day 1 → Day 3 → Day 7.**

#### Step 1: Build the Prospect List (Ongoing — 30-60 min/week)

Use the Google Maps and Yelp research methodology in `ops/outreach/prospecting-criteria.md`. The target business types in priority order: Plumbers (1), HVAC Contractors (2), Roofers/General Contractors (3), Dental Practices (4), Realtors (5).

Start with Priority 1 and 2. Pick one metro area. Stay local to start — local gives you credibility in outreach copy ("I work with businesses in [City]") and lets you offer to meet in person if a prospect responds but wants to see who they're dealing with.

**Weekly target:**

- Monday: Research 5-10 new prospects. Add to Notion. Score each with the 3-point system from `ops/outreach/prospecting-criteria.md`.
- Tuesday: Identify the top 3 from Monday (Score = 3). Run the 30-minute audit on each. Write Day 1 emails. Send.
- Friday: Check Notion for anyone needing Day 3 or Day 7 follow-up. Send. Record Loom videos for Day 7 prospects.

**Qualification score reminder:**

- Criterion 1: Revenue signal (10+ reviews, 3+ years in business, real website)
- Criterion 2: Pain signal (review mentioning slow response, no auto-reply on contact form, no after-hours contact method)
- Criterion 3: Non-technical owner (small team, no IT, independently owned)

Score 3/3 = outreach this week. Score 2/3 = add to list, reach out after running audit. Score 1/3 = monitor. Score 0/3 = disqualify.

**Do not skip the qualification step.** Sending 10 highly personalized emails to 10 well-researched 3/3 prospects will outperform sending 50 generic emails every time.

#### Step 2: Run the Free Audit Before Every Day 1 Email

For every prospect you plan to contact, complete the 30-minute audit from `ops/outreach/free-audit-framework.md` before writing the email. The audit produces two things:

1. The personalized observation for the Day 1 email opening — the specific thing you found that makes the email feel real.
2. The full audit document — held in reserve for Day 7 or shared if they reply and ask.

The five audit areas are: after-hours contact test, Google Business Profile review, website mobile usability and contact options, existing customer relationship signals, and speed-to-lead test (submit their form and time the response).

Pick the 3 most concrete, most dollar-quantifiable gaps. Write the 1-page audit output using the template in `ops/outreach/free-audit-framework.md`. Fill every bracket with business-specific data. Nothing generic.

#### Step 3: Send Day 1 Emails

Use the template in `ops/outreach/day-1-intro.md`. Maximum 5 per day. Subject line options — rotate and track which gets more replies:

- `Quick question about [Business Name]'s follow-up process`
- `Found something on [Business Name]'s Google page`
- `[First Name] — noticed something about your reviews`

The opening observation is the only sentence that matters in Day 1. If it could apply to any business without editing, rewrite it. Reference something specific: a review quote, a contact form response time you measured, an hours gap you found.

The Day 1 email does not pitch. It asks if a free breakdown would be useful. That's it.

After sending, update Notion: set Outreach Status to "Day 1 Sent," fill in Day 1 Sent Date, pre-fill Day 3 and Day 7 dates.

#### Step 4: Send Day 3 Follow-Up

Use the template in `ops/outreach/day-3-followup.md`. Brief. Reference the Day 1 email. Add one new piece of value — the speed-to-lead statistic (Harvard Business Review / InsideSales.com: leads contacted within 5 minutes are 100x more likely to convert) ties to whatever gap you found in the audit.

Do not apologize for following up. You are not bothering them. You are doing them a favor.

#### Step 5: Send Day 7 Follow-Up with Loom Video

Use the template in `ops/outreach/day-7-value-add.md`. This email includes a Loom link — a 3-minute personalized screen recording walking through the 3 gaps you found in the audit, on screen, showing their actual business.

Record in Loom (Screen + Camera mode). Structure from `ops/outreach/free-audit-framework.md`:

- 0:00-0:20: "Hey [First Name], this is Sameer. I spent 20 minutes looking at [Business Name] from a customer's perspective. Found 3 things worth flagging."
- 0:20-1:10: Gap 1 on screen — show the actual page, form, or review.
- 1:10-2:00: Gap 2 on screen.
- 2:00-2:40: Gap 3 on screen.
- 2:40-3:00: CTA — "These gaps are probably costing you [estimate] per month. 30 minutes, no obligation: [BOOKING LINK]."

After Day 7, mark Outreach Status as "No Response" if they haven't replied. Move on. Do not send a Day 14. Three touchpoints over 7 days is the sequence.

#### Step 6: Respond to Replies

Any reply — positive, skeptical, or "not interested" — gets a response within 2 hours during business days. This is critical. A reply is the hardest part. Losing it to a slow response is the exact problem you're selling solutions to.

For positive replies: send the booking link. Confirm the date immediately.
For skeptical replies: acknowledge the skepticism, offer the written audit document, ask one clarifying question about their specific situation.
For "not interested" replies: thank them, leave the door open ("Completely understand. If anything changes, the offer stands — same link."). Do not push.

#### Outreach Volume Targets

| Week | New Prospects Researched | Day 1 Emails Sent | Follow-Ups Sent        | Target Outcome         |
| ---- | ------------------------ | ----------------- | ---------------------- | ---------------------- |
| 1    | 10-15                    | 5-8               | 0                      | Pipeline seeded        |
| 2    | 10-15                    | 5-8               | 5-8 Day 3s             | First replies expected |
| 3    | 10-15                    | 5-8               | 5-8 Day 3s, 5-8 Day 7s | First Loom videos sent |
| 4    | 10-15                    | 5-8               | Full pipeline running  | First booked call      |
| 5-6  | Maintain                 | Maintain          | Maintain               | First signed client    |

A 10-15% reply rate across 50 outreach messages is a realistic target. If reply rate is below 5% after 20 sent messages, review the personalization — the observation is likely too generic.

---

### Plan D: Discovery Call to Signed Client

**Goal:** Convert a booked discovery call into a signed agreement.

**Calls are manual — Google Meet or phone, 30 minutes, no automated scheduling beyond the booking link.**

#### Step 1: Prepare for Each Call

Before every discovery call, spend 10 minutes:

1. Re-read your Notion notes on this prospect — review the audit findings, any reply thread, what they said when they booked.
2. Pull up their website and Google Business Profile. Have them visible during the call.
3. Know which package concept from `ops/packages/` is most relevant to their pain (see package mapping below).

**Package mapping:**

| Pain Signal                             | Likely Package                          |
| --------------------------------------- | --------------------------------------- |
| Misses calls, no text-back              | `ops/packages/missed-call-text-back.md` |
| Slow lead response, no follow-up        | `ops/packages/lead-follow-up.md`        |
| Slow quote / estimate follow-up         | `ops/packages/quote-follow-up.md`       |
| No review process, declining reputation | `ops/packages/review-reputation.md`     |
| Appointment-heavy, high no-show rate    | `ops/packages/appointment-reminders.md` |
| Complex or multi-system need            | `ops/packages/custom-build-intake.md`   |

Do not decide which package to offer before the call. Let the call reveal the situation.

#### Step 2: Run the Discovery Call

**The goal of the call is to understand their situation, not to pitch.** You already know a lot from the audit. The call fills in the gaps: what tools they use, who handles what internally, what has already been tried, what a successful outcome looks like in their words.

**Call structure (30 minutes):**

```
[0:00-3:00] Open
"Thanks for making time. I spent some time looking at [Business Name]
before this call — I want to make sure we use the 30 minutes well.
Quick question to start: what made you decide to take this call?"

[3:00-15:00] Discovery
Use open questions. Shut up and listen. Do not interrupt.
  - "Walk me through what happens when a new lead contacts you."
  - "How are you currently handling [the gap you found]?"
  - "What has that cost you — either in time or in revenue you can estimate?"
  - "Is there anything you've already tried that didn't work?"
  - "Who else is involved when a decision like this gets made?"

[15:00-22:00] Reflect back and propose direction
"Based on what you're describing, the biggest gap is [X]. What I'd
typically build for a [business type] in your situation is [describe
the outcome, not the tools]. Does that match what you're looking for?"
Let them respond. Adjust if needed.

[22:00-27:00] Discuss the engagement
"If we decided to move forward, here's how it works."
  - Build fee: $1,500-$3,000 depending on complexity. Discuss a range,
    not a fixed number. The exact number is finalized after you scope
    the work in writing.
  - Monthly retainer: $200-500/mo. Required. Not optional. Explain why:
    "The system I build runs live in your business. I maintain it,
    monitor it, and update it as your situation changes. The retainer
    covers that."
  - Do not publish pricing. Always discuss on the call.
  - Do not discount on the call. "Let me scope the work properly and
    send you a proposal — I don't want to quote something I haven't
    fully thought through."

[27:00-30:00] Close / next step
One of three outcomes:
  1. Ready to move forward: "Great. I'll send a scope and agreement by
     [date]. Once you sign, we schedule a kickoff call and I'll start
     scoping the build."
  2. Needs to think: "Completely fair. What's the main question you want
     to think through? I'll follow up on [specific day]."
  3. Not a fit: "I appreciate you taking the call. [Business name] might
     not be the right fit right now — here's why. If that changes, you
     have my contact."
```

**Do not invent problems they didn't confirm.** If the call reveals the gap you found in the audit isn't actually a problem for them, pivot. Find what is.

#### Step 3: Send the Proposal

Send the proposal within 24 hours of the call. Same day is better.

The proposal document contains:

1. What you understood about their situation (reflect their words back)
2. What you will build (outcomes, not tools or technical steps)
3. What you will not build in this engagement (clear scope boundary)
4. Timeline (realistic — 2-4 weeks for a first build)
5. Investment: build fee + monthly retainer amount
6. How payment works: 50% deposit to start, 50% on delivery; retainer billed monthly starting on delivery date
7. How to sign: DocuSign or HelloSign, or a simple email reply confirming acceptance (acceptable for first client)

Keep the proposal to one page. The complexity of the proposal is inversely correlated with the probability of closing.

#### Step 4: Follow Up on the Proposal

If you don't hear back within 3 days: send one follow-up. "Just checking in on the proposal I sent — any questions I can answer?" That's it. Do not send a third message unprompted.

If they come back with price objections: do not discount the build fee. You can discuss the retainer amount if they push, but the retainer is required. "I understand the investment feels significant. The retainer isn't optional — it's how I make sure the system keeps working for you. What I can do is start with a lower retainer if you want a 90-day commitment to start."

#### Step 5: Collect Deposit and Begin Phase 3

When the proposal is accepted:

1. Send an invoice for 50% of the build fee.
2. Collect payment (PayPal, bank transfer, or Stripe — whatever they're comfortable with).
3. Schedule a kickoff call.
4. Phase 3 begins: scope the technical build, choose the stack, set up infrastructure.

**This is the Phase 2 exit gate.** Phase 2 is not complete until the deposit is received.

---

## Verification Checklist

### Before First Outreach Email is Sent

- [ ] Google Calendar appointment schedule is live and the booking link works on mobile
- [ ] Notion prospect database is set up with all columns and three views
- [ ] Loom account created, desktop app or Chrome extension installed
- [ ] Hunter.io account created (for email lookup)
- [ ] Portfolio section is live on the landing page at https://rijhsinghani.github.io/ai_agency/
- [ ] Portfolio section displays correctly on mobile (test at 375px)
- [ ] YouTube channel created and branded
- [ ] First 10 prospects researched, scored, and added to Notion
- [ ] First 5 audits completed (written 1-page output exists for each)

### Weekly Health Check

Run this every Friday:

- [ ] Notion "Active Sequence" view checked — no Day 3 or Day 7 emails overdue
- [ ] All replies responded to within the same day they came in
- [ ] New prospects added to hit the weekly target
- [ ] One YouTube video published or in editing (Week 1-5)

### Phase 2 Exit Gate

Phase 2 is complete when ALL of the following are true:

- [ ] A client has signed an agreement (email acceptance or signed document)
- [ ] A deposit (50% of build fee) has been received
- [ ] A kickoff call is scheduled
- [ ] Notion shows at least one prospect in "Booked" status (call completed)

---

## Risk and Mitigations

| Risk                                             | Likelihood | Impact               | Mitigation                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------ | ---------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Low reply rate on Day 1 emails                   | Medium     | Delays pipeline      | Review personalization — if the opening observation could apply to any business, rewrite it. Target business types with strongest pain signals first (plumbers, HVAC).                                                                                                                                   |
| Prospect replies but goes cold after the call    | Medium     | Delays close         | Send proposal same day. Follow up once at 3 days. If no response by day 6, mark as "No Response" and move on — time spent chasing is time not spent on new prospects.                                                                                                                                    |
| Prospect wants custom scope beyond what you know | Low        | Stalls close         | Be honest: "I'll research that and include it in the proposal." Do not promise what you can't deliver. One confident "I don't know yet but I'll find out" is worth more than ten uncertain "I think so."                                                                                                 |
| No replies after 30+ outreach messages           | Low        | Delays pipeline      | Two-track response: (1) Revisit subject lines — A/B test all three options from `ops/outreach/day-1-intro.md`. (2) Check targeting — are you contacting the actual owner? A contact form reply goes to a receptionist, not the decision-maker.                                                           |
| YouTube channel gets no views initially          | High       | No inbound           | Expected. YouTube builds over 3-6 months. Phase 2 revenue comes from outbound, not inbound. YouTube is a long-term asset. Do not optimize Phase 2 decisions around YouTube metrics.                                                                                                                      |
| Prospect pushes back hard on the retainer        | Medium     | Stalls close         | Retainer is required. Do not waive it. "The retainer is what makes this sustainable — it's how I make sure the system keeps working after the build. Without it I can't take responsibility for ongoing reliability." If they won't accept a retainer at any price, they are not the right first client. |
| Pricing pushback on build fee                    | Medium     | Stalls or loses deal | Do not discount on the call. Send the proposal first. If they push back in writing, acknowledge it: "I understand. The build fee reflects the time to scope, build, and test properly. I don't want to cut corners on something that runs live in your business." Hold the number.                       |
| Calendar is empty after outreach starts          | Low        | Demoralizing         | This happens in week 1-2. The sequence takes time to mature. Focus on the weekly activity metrics (prospects researched, emails sent, follow-ups done) rather than the outcome metrics (calls booked) in the first two weeks.                                                                            |

---

## File Reference

All supporting documents referenced in this plan:

| File                                    | Purpose                                                                                               |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `ops/outreach/prospecting-criteria.md`  | 3-point qualification scoring, Google Maps/Yelp methodology, Notion database structure, weekly rhythm |
| `ops/outreach/free-audit-framework.md`  | 30-minute audit process, 5 research areas, written audit output template, Loom video format           |
| `ops/outreach/day-1-intro.md`           | Day 1 email template with personalization options                                                     |
| `ops/outreach/day-3-followup.md`        | Day 3 follow-up email template                                                                        |
| `ops/outreach/day-7-value-add.md`       | Day 7 Loom video follow-up email template                                                             |
| `ops/packages/missed-call-text-back.md` | Package: missed call + text-back automation                                                           |
| `ops/packages/lead-follow-up.md`        | Package: lead follow-up + booking automation                                                          |
| `ops/packages/quote-follow-up.md`       | Package: quote / estimate follow-up automation                                                        |
| `ops/packages/review-reputation.md`     | Package: review request + reputation automation                                                       |
| `ops/packages/appointment-reminders.md` | Package: appointment reminder + no-show reduction                                                     |
| `ops/packages/custom-build-intake.md`   | Package: custom scoping for complex needs                                                             |

---

_Phase 2 plan written: 2026-02-27_
_Phase 2 begins: Portfolio section live + first 10 prospects researched_
_Phase 2 exit gate: Signed agreement + deposit received_
