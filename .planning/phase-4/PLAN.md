# Phase 4: Acquisition Engine — Implementation Plan

**Phase:** 4 of 4
**Goal:** The agency is actively generating awareness and leads — YouTube channel pivoted and publishing, cold outreach running to a prospecting list, and at least one prospect in the pipeline.
**Depends on:** Phase 3 (landing page live, productized packages defined, PoC case study complete)
**Requirements:** CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, LEAD-01, LEAD-02, LEAD-03, LEAD-04
**Created:** 2026-02-27

---

## 1. Overview

### Phase Goal

By the end of Phase 4, two acquisition channels are actively running:

1. **YouTube** — Channel is fully pivoted from photography to AI automation for business owners. Five videos are published. Every video speaks directly to non-technical local business owners: shows results, outcomes, and ROI — not code, tools, or technical process.

2. **Cold Outreach** — A prospecting list of local service businesses exists. A personalized outreach sequence (Day 1 / Day 3 / Day 7) is ready. The free audit offer — "I found 3 things costing you leads" — is defined, deliverable, and personalized. At least one prospect has received outreach.

### Requirements Covered

| Req     | Description                                      | Status                                |
| ------- | ------------------------------------------------ | ------------------------------------- |
| CONT-01 | YouTube channel pivoted to AI automation         | Pending                               |
| CONT-02 | Channel branding, about section, banner updated  | Largely done (manual uploads pending) |
| CONT-03 | First 5 video topics planned                     | Pending                               |
| CONT-04 | First 5 videos produced and published            | Pending                               |
| CONT-05 | Content speaks to business owners, not builders  | Pending                               |
| LEAD-01 | Cold outreach system with email/DM templates     | Pending                               |
| LEAD-02 | Local business prospecting list built            | Pending                               |
| LEAD-03 | Free audit offer defined and deliverable         | Pending                               |
| LEAD-04 | Outreach cadence defined (Day 1 / Day 3 / Day 7) | Pending                               |

### Dependency on Phase 3

Phase 4 requires Phase 3 to be complete because:

- YouTube videos must link to the live landing page with a real booking CTA — driving traffic to a blank page kills conversion
- The PoC case study (POC-03) and video walkthrough (POC-04) from Phase 2 are the primary content asset for the first YouTube video
- Published pricing from Phase 3 allows cold outreach to reference specific package names if asked
- Social proof on the landing page (from Phase 3) gives prospects who click through something to evaluate

**Do not start Phase 4 until the landing page CTA routes to a working calendar booking.**

---

## 2. YouTube Content Strategy

### Channel Pivot Plan

The existing channel (photography content, low views) will be transformed in-place. There is no need to create a new channel — pivot the existing one. Brand assets are already complete from Phase 1 work:

**Already Complete (Phase 1):**

- Banner image: `brand/youtube/banner.png` (2560x1440) — APPROVED
- Profile picture: `brand/youtube/profile-pic-branded.png` (800x800)
- About section copy: `brand/youtube/about-section.md`
- Channel keywords (50 tags): `brand/youtube/channel-keywords.md`
- Thumbnail template: `brand/youtube/thumbnail-template.svg`

**Still Required (Manual — must complete before publishing):**

1. Upload `banner.png` → YouTube Studio > Customization > Branding > Banner
2. Upload `profile-pic-branded.png` → YouTube Studio > Customization > Branding > Picture
3. Update channel name to "Sameer Automations" → YouTube Studio > Customization > Basic Info
4. Paste about section text → YouTube Studio > Customization > Basic Info > Description
5. Paste channel keywords → YouTube Studio > Customization > Basic Info > Keywords
6. Set handle to @SameerAutomates (if available)

**Old photography videos:** Set all existing photography videos to "Unlisted" — do not delete (keep the channel history) but remove them from public view so the channel presents a clean, focused slate from day one.

### Core Content Principle

**The cardinal rule for every piece of content:**

> Sameer is not a vendor. He is a small business owner who built his way out of operational chaos and now helps others do the same. Every piece of content should feel like advice from someone who has been there.

Wrong frame: "I built this N8N workflow with a Claude API node that fires a webhook..."
Right frame: "I was losing leads at night in my own business. I fixed it. Here's what that looks like."

Every title, hook, thumbnail, and script must answer one question for the viewer: **"What does this do for MY business?"**

Show the outcome, not the mechanism. Reference real results — from Sameer's own business or from clients — with actual numbers. Never explain the technology unless asked. Never pitch. Demonstrate.

### First 5 Video Topics

#### Video 1 — Origin Story (Core Brand Asset)

**Title:** "I automated my own business. Here's what happened."

**Thumbnail:** Photo of Sameer, direct eye contact. Text: "I AUTOMATED MY OWN BUSINESS" on dark background with purple accent.

**Hook (first 30 seconds):**
"I was running a wedding photography business. I was losing leads because I was on shoots when calls came in, and nobody followed up fast enough. So I built a system to fix it. Leads came in, got a text within 60 seconds, got a booking link, booked themselves. I wasn't touching it. That system is why I'm here."

**Outline:**

1. The origin (2 min) — Raj Photo Video. The operational chaos of running a service business solo: missed calls, slow follow-up, leads choosing the competitor who responded faster. Make it specific and personal.
2. What Sameer actually built (2 min, screen recording) — show the automation that ran in his own business. Not a demo environment. The real thing. Narrate what each step does in plain English.
3. What changed (1 min) — the before and after, in numbers. Response time, leads captured, time saved per week. Real figures.
4. The pivot (1 min) — "Other business owners started asking me to build the same thing for them. So I did." This is not a pitch — it's a natural conclusion to the story.
5. CTA (30 sec) — "If you're running a business and losing leads to slow follow-up, link in the description. 30-minute call, no obligation."

**Format:** Talking head with screen recording cut-ins. Total length: 7-10 minutes.

**Tools:** OBS for screen capture, Descript for editing, Canva for thumbnail.

---

#### Video 2 — What's Actually Worth Automating

**Title:** "What's actually worth automating in a small business (and what isn't)"

**Thumbnail:** Photo of Sameer, text: "WHAT'S WORTH AUTOMATING" on dark background.

**Hook (first 30 seconds):**
"Not everything in your business should be automated. A lot of what people try to automate first is the wrong stuff. I'm going to walk you through the three things that actually move the needle — and why they matter more than anything else."

**Outline:**

1. What automation is NOT (1 min) — not robots, not ChatGPT writing blog posts, not replacing your team. Keep it grounded. This is about systems that handle the boring, repetitive work so you don't have to.
2. The three highest-ROI automations for small businesses (3 min) — missed call text-back, lead follow-up sequence, appointment reminders and review requests. Quantify each: time saved, revenue recovered, response rate improvement.
3. What's not worth automating yet (1 min) — complex customer conversations, anything requiring judgment, anything you haven't done manually enough to know how it should work.
4. How to decide what to automate first (2 min) — the simple test: "Is this happening more than 10 times a week? Is it the same every time? Could a text message or email handle it?" If yes to all three, it's automatable.
5. CTA (30 sec) — "Book a free 30-minute call. I'll tell you which one would have the biggest impact on your business."

**Format:** Talking head with simple on-screen text. No screen recording needed. Length: 8-10 minutes.

**Tools:** iPhone or webcam, Descript for editing, simple on-screen text via Descript.

---

#### Video 3 — Behind-the-Scenes Build

**Title:** "Building a missed call system live — what it looks like and what it does"

**Thumbnail:** Screen recording still of the automation running. Text: "BUILT LIVE — ZERO CODE" on dark background.

**Hook (first 30 seconds):**
"I'm going to show you exactly how I build one of these automations. Not the finished product — the actual build. What a business owner asked for, what I built, where it got complicated, and what the final result looks like running in real time."

**Outline:**

1. The client's problem (1 min) — frame it as a real request from a real business. "They were losing after-hours leads because nobody was available to respond." Use the business type and the pain, not the name.
2. Walk through the build (screen recording, 4 min) — show the automation being constructed. Don't explain the technical details — narrate what each step does in plain English. "This part watches for a missed call. This part sends the text. This part logs the response."
3. The finished system running (2 min) — show the automation in real time with a test lead. Missed call → text within 60 seconds → AI response → booking link sent → calendar event created.
4. The result (1 min) — before and after with real numbers. Response time, leads captured, time the owner gets back per week.
5. CTA (30 sec)

**Format:** Screen recording with narration, talking head intro/outro. Length: 8-10 minutes.

---

#### Video 4 — Short-Form / YouTube Short

**Title:** "Missed calls are costing you more than you think"

**Hook (first 3 seconds):** "Every time your phone rings and you miss it — you're handing a job to your competitor." [direct to camera, no prop needed]

**Script (60 seconds total):**

- 0-3s: Hook — the missed call framing
- 3-15s: The problem — most small businesses miss 30-40% of inbound leads just because they're busy or off-hours. There's no system catching them.
- 15-35s: Quick screen flash of the automation running — "I built a system. Call comes in, you're busy, an automatic text goes out in 60 seconds. It asks what they need and sends a booking link. Done."
- 35-50s: Real number — "8 more leads booked per month that used to fall through. At $500 each, that's $4,000 a month from a system that costs $200."
- 50-60s: CTA — "Link in bio if you want this for your business."

**Format:** Vertical (9:16). Talking head with fast cuts. Auto-captions via CapCut.

**Tools:** iPhone, CapCut for editing and captions.

---

#### Video 5 — Case Study with Real Numbers

**Title:** "3 automations. One small business. Here's what the numbers looked like after 60 days."

**Thumbnail:** Before/after number comparison. Text: "THE 60-DAY RESULTS" on dark background with purple accent.

**Hook (first 30 seconds):**
"I'm going to show you a real result from a real business — response time, leads captured, reviews gained — after 60 days of running the same system I build for clients. These are actual numbers, not projections."

**Outline:**

1. The starting point (1 min) — describe the business (by industry and pain, not by name). What was broken: missed calls, slow follow-up, no review system.
2. The 3 automations built (1 min) — missed call text-back, lead follow-up sequence, post-job review request. Name each, say what it does in one sentence.
3. The 60-day results (3 min, with screen recording or graphics) — for each automation: what the metric was before, what it is now. Use actual numbers. Response time, leads per month, review count, estimated revenue recovered.
4. What it cost vs. what it returned (1 min) — show the math. Monthly retainer vs. revenue recovered from additional bookings.
5. What this looks like in other industries (1 min) — the same pain (missed calls, slow follow-up, no reviews) shows up in any service business. The system adapts.
6. CTA (30 sec)

**Format:** Talking head + screen recording or data graphics. Length: 8-10 minutes.

---

### Upload Schedule

Publish consistently. One video per week minimum, two per week if bandwidth allows.

| Week   | Video                             | Type          |
| ------ | --------------------------------- | ------------- |
| Week 1 | Video 1 — Origin Story            | Long-form     |
| Week 2 | Video 4 — Short-form              | YouTube Short |
| Week 3 | Video 2 — What's Worth Automating | Long-form     |
| Week 4 | Video 3 — Behind-the-Scenes Build | Long-form     |
| Week 5 | Video 5 — Case Study with Numbers | Long-form     |

**Short-form repurposing:** After each long-form video, cut 1-2 60-second Shorts from the best moments. Publish on YouTube Shorts, Instagram Reels. This doubles output from one recording session.

### Thumbnail Strategy

All thumbnails follow the same visual template (`brand/youtube/thumbnail-template.svg`):

- **Background:** Dark (#1A1A1A) or deep purple gradient
- **Focal image:** Sameer's face (left side) OR relevant outcome image (phone, calendar, before/after numbers)
- **Big bold text:** 3-5 words maximum. Use the outcome, not the method. "LEADS WHILE YOU SLEEP" not "AI Automation Demo"
- **Color accent:** Purple (#7B2FBE) for text highlights or borders
- **No clutter:** Thumbnails work at thumbnail size. If you can't read it small, it's too complex.

Create all 5 thumbnails in Canva before publishing Video 1 so the channel looks consistent from the start.

---

## 3. Cold Outreach System

### Prospecting Methodology

**Target geography:** Start hyper-local. Pick a single metro area or city neighborhood. Local = you can show up in person if needed. This also gives credibility: "I work with businesses in [City]."

**Target business types (in priority order):**

1. Plumbers and HVAC contractors — high lead volume, high ticket, frequently miss calls on jobsites
2. Roofers and general contractors — seasonal surges create overflow, strong ROI case
3. Dental and orthodontic practices — appointment-heavy, reminder ROI is immediate
4. Realtors and real estate teams — lead follow-up speed is critical, high LTV
5. Home cleaning services — recurring scheduling, review requests highly impactful

**Qualification criteria (prospect must meet at least 2 of 3):**

1. Revenue signals they're doing real volume (not a one-person shop): 4+ Google reviews, 3+ years in business, actual website (not just a Facebook page)
2. Pain signals in their reviews: complaints about slow response, not returning calls, hard to reach
3. Non-technical owner: no evidence they have a CTO or internal developer on staff

**Disqualify if:** franchise location (decisions made above local level), large corporate chain, or fewer than 10 Google reviews (too small).

### Building the Prospecting List

**Step 1: Google Maps scraping**

Use Google Maps manually or with a scraper to pull local businesses. For each business type:

1. Search "[business type] [city]" on Google Maps
2. Click "View all" in the business panel
3. For each listing, record:
   - Business name
   - Owner name (from Google Business Profile or website "About" page)
   - Phone number
   - Email (from website contact page or LinkedIn)
   - Website URL
   - Review count and average rating
   - Any notable reviews mentioning responsiveness or communication

**Step 2: Yelp supplemental list**

Same process on Yelp. Filter by: city, business type, 10+ reviews. Yelp sometimes surfaces businesses that aren't prominent on Google Maps.

**Step 3: Research qualification signals**

For each prospect that passes the filter:

- Read their 3 most recent Google reviews — do any mention slow follow-up, hard to reach, or not returning calls? Flag these as hot.
- Check their website — does it have a contact form? Is there a booking link? Is it clearly built for desktop only with no mobile experience? All of these are pain signals.
- Check LinkedIn for the owner's name (needed for personalization in outreach).

**Target prospecting list size:** 50-100 businesses before sending first outreach. Quality matters more than quantity — a list of 50 well-researched prospects outperforms 500 generic names.

**Store the list in Notion** with columns: Business Name, Owner Name, Email, Phone, Website, Business Type, Review Count, Pain Signal Found, Outreach Status (Not Started / Day 1 Sent / Day 3 Sent / Day 7 Sent / Responded / Booked / Disqualified).

### Target Business Types and Qualification

| Business Type | Why They're a Target              | Key Pain Signal                | Estimated LTV      |
| ------------- | --------------------------------- | ------------------------------ | ------------------ |
| Plumbers      | Miss calls constantly on jobsites | Reviews saying "hard to reach" | $800-2,000/job     |
| HVAC          | Seasonal surges = overflow calls  | Slow after-hours response      | $500-3,000/job     |
| Roofers       | Storm season = overwhelmed        | Delayed estimate follow-up     | $5,000-15,000/job  |
| Dentists      | Appointment-heavy, reminder ROI   | Cancellations, no-shows        | $200-800/visit     |
| Realtors      | Speed-to-lead is everything       | "Didn't hear back quickly"     | $5,000-15,000/deal |
| Cleaners      | Recurring scheduling grind        | Manual rebooking, reminders    | $150-300/clean     |

---

## 4. Outreach Templates

### The Golden Rule of Outreach

Every message must be personalized to THAT specific business. Generic "I help businesses like yours" messages get deleted. Messages that reference something real — a review they received, their specific business challenge, an observation about their website — get opened.

Research each prospect for 10-15 minutes before writing their Day 1 message. This is not optional.

### Day 1 — Introduction Message

**Email Subject Options (A/B test):**

- "Quick question about [Business Name]'s follow-up process"
- "Found something on [Business Name]'s Google page"
- "[Owner First Name] — noticed something about your reviews"

**Email Template:**

```
Hi [First Name],

I came across [Business Name] while looking at [City] [business type]s on Google.

[Personalized observation — one of these, customized to what you actually found:]

OPTION A (review signal): "I noticed a few of your reviews mention response time — one from [month] says '[brief quote].' That's the kind of thing that costs a service business real revenue, and it's fixable."

OPTION B (website signal): "I checked out your website and noticed there's no way for someone to book or leave their info after hours. In a business like yours, that's probably costing you leads every week."

OPTION C (general pain signal): "For most [business type]s in [City], the biggest revenue leak isn't marketing — it's leads that call or contact you and never hear back within a few minutes. That gap is where competitors win."

I build AI systems that automatically follow up every lead within 60 seconds — even at 2 AM — qualify them, and book appointments without you touching anything.

I did a quick review of [Business Name]'s setup. I found a few specific things that are likely costing you leads right now.

Would it be useful if I put together a short breakdown? No cost, no pitch — just honest observations.

— Sameer
sameer@rajphotovideo.com
```

**DM Version (LinkedIn / Instagram — shorter):**

```
Hi [First Name] — I came across [Business Name] and noticed [specific observation].

I build systems that automatically follow up every lead and book appointments — without you lifting a finger.

I took a quick look at your setup and found a couple of things worth flagging. Would a quick breakdown be useful? No cost.

— Sameer
```

---

### Day 3 — Follow-Up Message

Send if no response to Day 1. Do not re-pitch. Add value instead.

**Email Subject:** "One thing I forgot to mention — [Business Name]"

**Email Template:**

```
Hi [First Name],

Just following up on my note from a couple days ago.

One thing I didn't mention: businesses that respond to leads within 5 minutes are 100x more likely to connect with them than those who wait even 30 minutes. That's not a marketing claim — it's from a Harvard Business Review study on lead response time.

Most service businesses I talk to are responding in hours or not at all after hours. The businesses taking the work are the ones responding in minutes.

I've put together a short audit of [Business Name]'s lead capture process — 3 specific gaps I found. Happy to share it if useful.

— Sameer
```

**DM Version:**

```
Following up from a couple days ago — just wanted to add: businesses that respond to leads within 5 minutes are 100x more likely to close them than those who wait an hour. I found 3 specific things in [Business Name]'s setup worth flagging. Worth a quick look?
```

---

### Day 7 — Value-Add Message

Final touch in the sequence. Deliver genuine value. Make it easy to say yes.

**Email Subject:** "Quick video for [Business Name]"

**Email Template:**

```
Hi [First Name],

Last note from me — I put together a short 3-minute video specifically about [Business Name]. It walks through the 3 gaps I found in your lead capture process and exactly what I'd do to fix each one.

No setup, no login — just a Loom link you can watch at your desk or on your phone:

[Loom link — personalized 3-minute video]

If it's useful, great. If not, no worries — you've lost nothing.

But if even one of those gaps is costing you a lead per week, fixing it more than pays for itself.

Happy to jump on a 30-minute call if you want to go deeper: [Google Calendar booking link]

— Sameer
```

**DM Version:**

```
Last note — I made a quick 3-min video specifically for [Business Name]: [Loom link]. It's 3 things I found that are probably costing you leads. No setup to watch. If it's useful, I'm happy to jump on a 30-min call.
```

**Note on the Day 7 Loom video:** This is a personalized 3-minute screen recording showing:

1. Their website / Google Business Profile
2. Pointing out the 3 specific gaps from the free audit (see Section 5)
3. Showing what "fixed" looks like (a quick screen share of the automation running)
4. Ending with a direct CTA to book a call

This is the most labor-intensive part of the sequence but also the highest-converting. One personalized Loom video per prospect. Target: 10 per week once the system is running.

---

## 5. Free Audit Framework

### The Offer: "I Found 3 Things Costing You Leads"

This is not a generic report. It is a personalized 30-minute research exercise that produces a 3-point document specific to one business. The output is delivered as either a written summary or a 3-minute Loom video.

**Positioning:** Not a sales pitch. An observation. "I spent 20 minutes looking at your business from a customer's perspective and found these 3 things."

### The 30-Minute Research Process

Work through these 5 areas, in order. Document what you find.

#### Area 1: How do they handle after-hours contacts? (8 min)

1. Call their business number after hours (or during a time they're likely busy). Do they answer? Does voicemail pick up? Is there a text-back? Does anyone respond?
2. Submit a contact form on their website with a test name and email. Start a timer. How long until a response? (If 24+ hours, that's Gap #1.)
3. Check if their Google Business Profile has messaging enabled. Send a quick message. Does anyone respond?

**What to look for:**

- No voicemail, or voicemail that's full
- No auto-response to form submissions
- No text acknowledgment within 5 minutes of a missed call
- No after-hours booking option

**Gap to flag:** "When someone contacts you after hours or during a busy period, there's no automatic response. They're choosing the competitor who gets back to them first."

---

#### Area 2: What does their Google Business Profile signal to new leads? (5 min)

1. Look at review count, average rating, and date of most recent review.
2. Read the last 10 reviews. Are there any complaints about response time, communication, or not returning calls?
3. Is their profile complete? (Hours, photos, service list, Q&A answered?)
4. Have they responded to reviews — especially negative ones?

**What to look for:**

- Reviews mentioning slow response or hard to reach
- No response to negative reviews
- Outdated or missing hours
- Low review count relative to how long they've been in business

**Gap to flag:** "Two of your recent reviews mention difficulty reaching you. For every person who writes that review, there are 5-10 who just left silently and went elsewhere."

---

#### Area 3: What does their website do with a visitor who doesn't call? (7 min)

1. Visit the website on mobile. Does it load fast? Is it mobile-first?
2. Is there a contact form? If so, where is it and how many fields does it have?
3. Is there a way to book an appointment or at least request one? Or is "call us" the only option?
4. What happens after someone submits a contact form? Is there a confirmation page, an email, or nothing?
5. Is there a live chat, chatbot, or any AI assistant?

**What to look for:**

- No mobile optimization (test on phone)
- Contact form buried at the bottom of the page
- Form with more than 5 fields (conversion killer)
- No confirmation or follow-up after form submission
- "Call us" as the only contact method — no alternative for after-hours or non-callers

**Gap to flag:** "Your website has one contact method — a phone call. People who don't want to call (which is a growing segment, especially under 40) have no way to reach you. They leave."

---

#### Area 4: How are they handling existing customer relationships? (5 min)

1. Search for the business on Yelp and Facebook. Any reviews there? Are they responded to?
2. Look at their Instagram or Facebook page. When was the last post? Do they respond to comments?
3. Is there any evidence of appointment reminders, post-job follow-up, or review requests? (You won't know for sure, but if they have consistent fresh reviews, they probably have a system. If their last review was 4 months ago, they likely don't.)

**What to look for:**

- No recent reviews (suggesting no review request system)
- No social proof of repeat customers or referrals
- Stale social media

**Gap to flag:** "Your review velocity has slowed significantly — you're getting about 1 review every 2 months. Most service businesses with a post-job follow-up system get 3-5x more reviews, which directly impacts Google ranking and inbound calls."

---

#### Area 5: Speed-to-lead test (5 min)

Submit a lead inquiry via their preferred channel (form, Google Maps message, Facebook message) with a test name. Start a timer. Record how long it takes to respond. If over 5 minutes: Gap. If over 1 hour: Major gap. If never: Critical.

**The benchmark to cite:** "Leads contacted within 5 minutes are 100x more likely to convert than those contacted after 30 minutes." (Harvard Business Review / InsideSales.com research.)

---

### The Audit Output Document

After completing the research, write a 1-page (or 3-minute Loom video) summary:

```
FREE LEAD AUDIT: [Business Name]
Completed by Sameer | [Date]

I spent 20 minutes reviewing [Business Name] from a new customer's perspective.
Here's what I found.

GAP 1: [Name the specific gap]
What I found: [Specific observation — what I saw or tested]
What it's costing you: [Estimate in leads or dollars per month]
What a fix looks like: [One sentence — "An automated text-back that goes out within 60 seconds of a missed call"]

GAP 2: [Name the specific gap]
What I found: [Specific observation]
What it's costing you: [Estimate]
What a fix looks like: [One sentence]

GAP 3: [Name the specific gap]
What I found: [Specific observation]
What it's costing you: [Estimate]
What a fix looks like: [One sentence]

Combined estimate: These 3 gaps are likely costing [Business Name] approximately
[X] leads per month. At an average job value of [$X], that's [$X/month].

Want to talk through what fixing these would look like for your business?
30 minutes, no obligation: [Google Calendar booking link]
```

**The Loom version:** Record a 3-minute screen recording of you walking through this document on screen, then showing their actual website, Google profile, and the specific gaps you found. This is far more persuasive than text alone.

---

## 6. Implementation Steps

### Plan A: YouTube Pivot (Complete the Branding Uploads)

**Prerequisite for publishing any video.**

1. Open YouTube Studio in a browser
2. Go to Customization > Branding
3. Upload `brand/youtube/banner.png` as channel banner
4. Upload `brand/youtube/profile-pic-branded.png` as channel picture
5. Go to Customization > Basic Info
6. Change channel name to "Sameer Automations"
7. Paste about section from `brand/youtube/about-section.md` into Description
8. Paste keywords from `brand/youtube/channel-keywords.md` into Keywords field (comma-separated, first 15-20 tags)
9. Go to Handle — set to @SameerAutomates
10. Set all existing photography videos to Unlisted
11. Verify: search "Sameer Automations" on YouTube — confirm profile pic, banner, and about section all display correctly

**Estimated time:** 30 minutes

---

### Plan B: Build the Prospecting System

1. Choose your target geography — pick one metro area or city. Start with where you live or know well.
2. Choose your first two business types from the priority list (plumbers + dentists recommended as the highest-contrast pair — different enough to test messaging, similar enough in pain points).
3. Open Google Maps. Search "plumbers [city]". Export or manually record 30-40 results. Capture: name, address, phone, website, review count, 3 most recent review excerpts.
4. Repeat for the second business type.
5. Supplement with Yelp — search same categories, capture businesses not already on your list.
6. Create a Notion database with columns: Business Name, Owner Name, Email, Phone, Website, Business Type, City, Review Count, Pain Signal (Yes/No), Pain Signal Detail, Outreach Status, Last Contact Date, Notes.
7. For the top 50 prospects: find the owner's name via the website About page, Google Business Profile, or LinkedIn. Record it.
8. Find email addresses: check website contact page, LinkedIn, or use a free email finder tool (Hunter.io free tier allows 25 searches/month).
9. Qualify the list: for each prospect, score them 1-3 based on pain signals found. Focus Day 1 outreach on score-3 prospects first.

**Target output:** 50+ qualified prospects in Notion with owner name and contact info.
**Estimated time:** 3-4 hours over 2 sessions.

---

### Plan C: Write the Outreach Templates and Audit Framework

1. Using the templates in Section 4, write your three finalized Day 1, Day 3, and Day 7 messages.
2. Customize the email subject lines — write 2 options for each day for A/B testing.
3. Write the audit checklist as a repeatable document — use the framework in Section 5. Keep it as a Notion page or a Google Doc you can reference quickly during research.
4. Create the audit output template as a reusable document. Write the fill-in-the-blank structure once, then customize per prospect.
5. Set up your email for cold outreach: use sameer@rajphotovideo.com (already established). Make sure Gmail is configured with the email signature from `brand/email-signature.html`.
6. Set up Loom (free tier) for the Day 7 personalized video. Practice the 3-minute audit walkthrough format once before using it with a real prospect.

**Estimated time:** 2-3 hours

---

### Plan D: Produce and Publish the First 5 Videos

Work through videos in the order they appear in Section 2. Video 1 first — it's the most important and uses the PoC demo as its core asset.

**For each video:**

**Step 1: Script (60-90 min)**

- Write a full script using the outlines in Section 2 as your starting point
- Use Claude to help draft and refine — prompt: "Write a YouTube script for a non-technical small business owner audience. Here's my outline: [outline]. The tone should be direct, confident, peer-level, and outcome-focused. No technical jargon. No mention of code or tools. No emojis. Reference brand-voice.md for tone guidance."
- Read the script out loud before recording — it should sound like how you actually talk

**Step 2: Record (1-2 hours)**

- Screen recordings: use OBS Studio. Record the N8N automation demo in real time. Show a real lead coming in. Narrate as you go.
- Talking head: record with iPhone or webcam in a clean, well-lit location. Good lighting is more important than camera quality.
- Record in one take where possible — Descript makes editing easy, but unnecessary cuts slow down editing

**Step 3: Edit (1-2 hours in Descript)**

- Import screen recording + talking head footage
- Edit by deleting text in the transcript — each deleted text = deleted footage
- Remove filler words automatically (Descript's AI filler-word removal)
- Add simple text on screen for key numbers or terms using Descript's text tool
- Export at 1080p

**Step 4: Shorts clip (30-45 min in CapCut)**

- Identify the 60-second best moment from the video
- Import to CapCut, crop to vertical (9:16)
- Add auto-captions
- Add a text CTA overlay at the end: "Link in bio — book a free call"
- Export

**Step 5: Thumbnail (30 min in Canva)**

- Use the thumbnail template from `brand/youtube/thumbnail-template.svg` as a reference
- Create in Canva: 1280x720px, dark background, bold text, face or outcome-relevant image
- Download as PNG

**Step 6: Publish**

- Upload to YouTube Studio
- Write title and description — use Claude to optimize: "Write a YouTube title and description for this video [describe the video]. Target audience: non-technical small business owners. Optimize for search. Include a CTA to book a call. Tone: direct, peer-level, no jargon. Sentence case for the title."
- Add all channel tags from `brand/youtube/channel-keywords.md` to the video tags
- Set premiere for the upload schedule (see Section 2)
- Upload the Short to YouTube Shorts within 48 hours of the main video

**Estimated time per video:** 4-6 hours from script to published.

---

### Plan E: Send the First Outreach

Do not send outreach until:

- The landing page is live (Phase 3 complete)
- At least Video 1 is published on YouTube (so you can reference it in outreach if asked "who are you?")
- The prospecting list has at least 20 well-researched prospects
- You have your Day 1, Day 3, Day 7 templates written and ready

**First batch:**

1. Select the top 10 prospects from your list — those with the clearest pain signals
2. For each one, run the 30-minute free audit (Section 5)
3. Write a personalized Day 1 email using the template in Section 4 — make sure the opening observation is specific to THAT business
4. Send 5 per day maximum — keep the volume manageable so you can respond quickly if someone replies
5. Track status in Notion — update "Last Contact Date" and "Outreach Status" for each sent message
6. Set a calendar reminder for Day 3 follow-up (3 days after Day 1 send)
7. Set a calendar reminder for Day 7 (7 days after Day 1 send)

**What success looks like:** Of 10 outreach messages sent, you're doing well if 1-2 people respond. A response (even a "not interested") means your targeting is good. A booked call means the message landed.

**Iterate the message:** After the first 10, review what you sent. What was specific and genuine? What felt generic? Tighten the personalization before the next batch of 10.

---

## 7. Verification Checklist

Use this to confirm each Phase 4 success criterion is met before calling the phase complete.

### CONT-01: YouTube Channel Pivoted

- [ ] All photography videos set to Unlisted
- [ ] First video published is about AI automation for business owners
- [ ] Channel banner, profile pic, name, and about section all reflect new direction
- [ ] Search "Sameer Automations" or "@SameerAutomates" on YouTube — channel appears with correct branding

### CONT-02: Channel Branding Updated

- [ ] Banner (`brand/youtube/banner.png`) uploaded — visible on channel page
- [ ] Profile pic (`brand/youtube/profile-pic-branded.png`) uploaded — visible on all videos
- [ ] Channel name set to "Sameer Automations"
- [ ] About section matches `brand/youtube/about-section.md` copy
- [ ] Channel keywords set (paste from `brand/youtube/channel-keywords.md`)
- [ ] Handle set to @SameerAutomates

### CONT-03: First 5 Video Topics Planned

- [ ] This PLAN.md file exists with all 5 video outlines (complete)
- [ ] Scripts written for all 5 videos before production begins on Video 1
- [ ] Content calendar set with publish dates for all 5 videos

### CONT-04: First 5 Videos Published

- [ ] Video 1 published and public on YouTube
- [ ] Video 2 published and public on YouTube
- [ ] Video 3 published and public on YouTube
- [ ] Video 4 (Short) published and public on YouTube Shorts
- [ ] Video 5 published and public on YouTube
- [ ] At least 3 YouTube Shorts clips (repurposed from long-form) also published

### CONT-05: Content Speaks to Business Owners

Review each published video against this checklist. Also verify against `brand/brand-voice.md` before publishing.

- [ ] Does the title reference a business outcome, not a technical feature?
- [ ] Is the first 30 seconds focused on a business owner's specific pain point?
- [ ] Does the video avoid technical jargon (N8N, webhook, API, Claude, nodes)?
- [ ] Does the video show outcomes and results, not code or configuration?
- [ ] Could a non-technical small business owner understand this video completely?
- [ ] Is the tone peer-level — speaking as someone who has been there, not as a vendor pitching a product?
- [ ] Are there no emojis, no buzzwords, no jargon per brand-voice.md style rules?

### LEAD-01: Cold Outreach System Exists

- [ ] Day 1 email template written and saved
- [ ] Day 3 email template written and saved
- [ ] Day 7 email template + Loom video format written and saved
- [ ] DM versions of all three templates written and saved
- [ ] Email signature configured in Gmail from `brand/email-signature.html`
- [ ] Loom account set up (free tier)
- [ ] Google Calendar booking link inserted into Day 7 template

### LEAD-02: Prospecting List Built

- [ ] Notion database created with all required columns
- [ ] 50+ businesses on the list
- [ ] Each entry has: business name, owner name, email, phone, website, business type, review count
- [ ] Pain signal column filled in for top 20 prospects
- [ ] Outreach status column tracking send history

### LEAD-03: Free Audit Offer Defined

- [ ] Section 5 of this PLAN.md exists (the 30-minute audit framework) — complete
- [ ] Audit output template created as a reusable Notion or Google Doc
- [ ] At least one complete practice audit run on a real local business (do not send — just complete it to verify the process works in 30 minutes)

### LEAD-04: Outreach Cadence Defined

- [ ] Day 1 intro template finalized
- [ ] Day 3 follow-up template finalized
- [ ] Day 7 value-add template (with Loom video) finalized
- [ ] Notion tracking system in place to manage cadence dates

### Phase Completion Criterion (at least one prospect)

- [ ] At least 10 Day 1 outreach messages sent to real, researched prospects
- [ ] OR at least 1 prospect has booked a discovery call

---

## Appendix: Key Principles for All Phase 4 Work

### The Business Owner Test

Before publishing any video or sending any message, ask: **"If I were a small business owner who is stretched thin right now — busy, skeptical, and not interested in tech — would this feel relevant to me? Would the first 10 seconds earn the next 10?"**

If the answer is no — rewrite it. The target is any business owner losing time or money to a manual process they haven't fixed yet. They are not a developer. They are not reading tech blogs. They respond to their own pain, described back to them accurately, followed by a result they can verify.

Cross-check every piece of content against `brand/brand-voice.md` before publishing. The voice attributes are direct, peer-level, confident, practical, and transparent. If the content sounds like a vendor pitch, it fails the test.

### What to Say When Asked "How Does It Work?"

In outreach and early conversations, resist the urge to explain the technology. Explain what the business owner experiences.

**Wrong:** "I use N8N with a Claude AI node to trigger a Twilio webhook that sends personalized SMS..."

**Right:** "When someone calls and you can't answer, they get a text within 60 seconds. It asks what they need, sends a booking link, and the appointment lands on your calendar. You find out about it when you check your phone."

The mechanism is irrelevant. The outcome is everything. If they push and want to know how it works technically, say: "There are a few tools involved that handle the routing and the messaging. What matters is what it does on your end — and that's what I can show you."

This principle applies everywhere: YouTube, outreach, discovery calls, follow-up Looms. Lead with what it does for them. The technology is never the story.

### One-Week Rhythm

Once Phase 4 is running, target this weekly rhythm:

- **Monday:** Research 5-10 new prospects (30-60 min)
- **Tuesday:** Send Day 1 outreach to new batch (30 min)
- **Wednesday:** Record video content for that week (2-3 hours)
- **Thursday:** Edit and publish video (1-2 hours in Descript)
- **Friday:** Send Day 3 follow-ups and Day 7 Looms to prospects in cadence (45 min)

This rhythm, maintained for 4-6 weeks, produces 20 published pieces of content and 40-80 outreach touchpoints — enough to put at least one prospect in the pipeline.

---

_Plan created: 2026-02-27_
_Phase 4 depends on: Phase 3 (landing page live, PoC case study complete, booking CTA functional)_
