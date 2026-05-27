# ARCH Training — Site Content Analysis

**Source:** Firecrawl scrapes of arch-training.com (all pages), May 23 2026
**Pages scraped:** /, /membership, /about-us, /classes, /hyrox, /personal-training, /hybrid-training, /first-responder-memberships, /faq, /youth-sports, /arch-powercore, /marlboro, /freehold, /eatontown, /landing, /landing-eatontown

---

## Tagline / Positioning Language (verbatim from live site)

**Primary homepage hero CTA:**

> "EXPLORE MEMBERSHIP OPTIONS"

**Homepage sub-headline (verbatim):**

> "Since 2010, **ARCH Training** has delivered an elite fitness experience with locations in Marlboro, Freehold, and Eatontown, NJ offering open gym access, group classes, recovery services, personal training, and more."

**Landing page headline (verbatim):**

> "Transform Your Fitness Journey"
> "Since 2010, delivering exceptional fitness experiences with state-of-the-art equipment, expert training, and a supportive community across New Jersey."

**HYROX page headline (verbatim):**

> "The BEST HYROX Training Club in New Jersey!"

**Hybrid Training headline (verbatim):**

> "TRAIN ANYWHERE. CRUSH GOALS EVERYWHERE."

**Why Choose ARCH (verbatim from homepage):**

> ✔ No Crowds
> ✔ Top of the Line Equipment & Recovery
> ✔ Expert Trainers
> ✔ Results-Driven Environment & Community

**Instagram bio (verbatim):**

> "HYROX Training Club | NJ's Premier Fitness & Training Facility"

**Notable:** No single punchy tagline exists. The brand currently leads with location/founding year ("Since 2010") and feature lists, not an emotional brand promise or differentiating statement.

---

## Pricing — Full Detail (as published May 2026)

**Confirmed: Pricing IS in readable text (not images), with one exception noted below.**

### Month-to-Month Plans

| Plan                  | Price          | What's Included                                                                                                                                      |
| --------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Open Gym**          | **$99/month**  | Unlimited open gym, all 3 locations (Marlboro + Freehold + Eatontown), private recovery room (infrared sauna + more), no activation fee, no contract |
| **Unlimited Loyalty** | **$149/month** | Everything in Open Gym PLUS unlimited group fitness classes at all 3 locations, no activation fee, no contract                                       |

### 3-Month Bundle Options (pre-pay discount)

| Plan                     | Bundle Price | Regular Price | Savings |
| ------------------------ | ------------ | ------------- | ------- |
| Open Gym Bundle          | $269         | $327          | $58     |
| Unlimited Loyalty Bundle | $419         | $537          | $118    |

- After month 4, locks in to month-to-month at the $99/$149 rate

### Drop-In Options

| Option             | Price | Notes                                                             |
| ------------------ | ----- | ----------------------------------------------------------------- |
| Class Drop-In      | $25   | Must be 16+ (parent required under 18)                            |
| Open Gym Drop-In   | $25   | Must be 18+                                                       |
| 10 Pack Punch Card | $200  | Valid 1 year, usable for open gym OR classes, valid all locations |

### Hybrid Training (Add-On)

| Plan                       | Price      | Includes                                                                                                    |
| -------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------- |
| Add-On Only                | $199/month | Online PT app, nutrition coaching, weekly programming, progress tracking (requires existing gym membership) |
| Hybrid + Open Gym          | $299/month | All hybrid features + unlimited open gym                                                                    |
| Hybrid + Unlimited Loyalty | $370/month | All hybrid features + unlimited classes + open gym                                                          |

### Military / First Responder Rates (veteran-owned gym)

| Plan              | Price      | Notes                       |
| ----------------- | ---------- | --------------------------- |
| Open Gym          | $79/month  | Locked-in rate, no contract |
| Unlimited Loyalty | $134/month | Locked-in rate, no contract |

- _In-person verification with valid ID required. Not available online._

### Business Memberships

Page `/business-memberships` exists in sitemap but was not scraped in detail.

### Eatontown-Specific Note

The `/membership` page header states: **"Pricing below honors our Eatontown Pre-Sale Rates."** This confirms the $99/$149 pricing was locked in as the "founders/presale" pricing for Eatontown (which opened March 2026). No separate discounted founders tier exists — the regular pricing IS the locked-in presale rate.

**No "Freehold founders pricing" separate tier was found.** Freehold opened Sept 2025 and is fully integrated into the single pricing structure.

---

## Pricing Image vs. Text Analysis

**KEY FINDING: The main /membership page pricing IS readable text, not images.**

- The markdown output of /membership contains full dollar amounts, plan names, bullet points — all as real text
- HOWEVER: The top of /membership has a prominent image (`Graphics+(7).png` from Squarespace CDN) with `alt="Graphics (7).png"` (auto-generated alt, not descriptive)
- This image likely serves as a decorative header/hero for the pricing page — not the actual pricing data
- The actual pricing ($99, $149, bundles, drop-ins) is all rendered in HTML text, confirmed parseable
- **No schema.org markup exists anywhere** — zero `<script type="application/ld+json">` blocks found on any page
- **No llms.txt** exists

**Bottom line:** Pricing is in real text (good for SEO/accessibility), but the one header image has no meaningful alt text (bad). No structured data / schema makes this invisible to Google Rich Snippets for gym/pricing search features.

---

## Services (Confirmed on Live Site)

### Group Fitness Classes (from /classes — live WellnessLiving widget)

Full class roster as of May 23, 2026:

- Boxing & Kickboxing
- Boxing + HYROX Strength
- Boxing Boot Camp
- Boxing Circuits
- Circuits
- **HYROX** (signature class)
- **HYROX Complete**
- **HYROX Endurance**
- **HYROX Strength**
- Kickboxing/HIIT
- Lower Body Strength / Upper Body Strength / Total Body Strength
- MetCon
- Strength & Conditioning
- Stretch / Supercon
- Youth Speed, Agility and Conditioning
- Memorial Day MURPH (special event)
- HYROX Level Set (event)

### Personal Training

- Free assessment offered
- PT available without a gym membership (confirmed in FAQ)
- Jordan Kaufman: 16 years experience, combat/endurance athletes, bodybuilders, powerlifters, first responders
- Domenick Cilea: co-owner, trains general population

### Hybrid Training (Online)

- Custom workouts to phone, nutrition coaching, video demos, progress tracking
- $199/mo add-on or bundled with gym membership

### Recovery

- **Private Recovery Room** at all 3 locations (confirmed: "Freehold Recovery Room", "Marlboro Recovery Room", "Eatontown Recovery Room" listed as staff/resources in class booking)
- **Infrared Sauna** with Red Light Therapy (confirmed)
- **Cold Plunge** (confirmed in about-us, FAQ)
- **EWOT (Exercise With Oxygen Therapy)** (confirmed via third-party review sources)
- Included with both $99 and $149 memberships

### Youth Sports Performance

- Ages 9–13 and high school athletes
- Speed, agility, endurance, strength
- Team and group sessions available
- Trainer: Ricky (Speed, Agility and Conditioning)
- Available at Marlboro location primarily

### ARCH x PowerCore Partnership

- Cross-gym punch card: 5 classes at PowerCore Studio + 5 ARCH drop-ins for $265
- Freehold-based (PowerCore is at 3338 Route 9 Freehold — same address as ARCH Freehold)

### Boxing

- No dedicated /boxing page — integrated into class schedule (Boxing & Kickboxing, Boxing Boot Camp, Boxing Circuits)
- No standalone boxing program page found

---

## The 3 Location Pages — What Exists vs. Missing

### Marlboro (`/marlboro`)

- **Content:** Single cover page image (`Website+(3).png`) with "View Gallery" + "JOIN NOW" links + embedded map
- **Content depth:** Minimal. No address, hours, or unique description on the page itself
- **Gallery:** `/marlboro-gallery` exists in sitemap
- **Missing:** Address (92 Vanderburg Rd — only in FAQ), hours, phone number, unique differentiators, staff list

### Freehold (`/freehold`)

- **Content:** Unique notice about keyless/secure mobile entry (Brivo Mobile Pass app), cover image, gallery link, join now
- **Notable copy (verbatim):** "Our Freehold location now uses a secure mobile entry system. The front door will be locked. Members enter using the Brivo Mobile Pass app. New visitors and prospective members are encouraged to schedule an appointment in advance so we can ensure staff is available to assist you."
- **Unique feature:** "Book a tour" CTA links to WellnessLiving appointment scheduling
- **Gallery:** `/freehold-gallery` exists
- **Missing:** Address, hours, unique equipment callouts

### Eatontown (`/eatontown`)

- **Content:** Richest of the three pages — 30+ photos from the new facility, opening announcement
- **Headline:** "✨ARCH TRAINING EATONTOWN NOW OPEN✨" (emojis, informal — signals this was a recent/fast launch page)
- **Class schedule note:** Schedule image linked as PNG (`Eatontown-Schedule-March-20th.png`) — schedule is an IMAGE, not text
- **Missing:** Address (749 Hope Road, Eatontown, NJ 07724 — only in FAQ), hours, full service list
- **Observation:** This is the newest location (March 2026) and the most photo-heavy but least structured content-wise

### Location page gap: All 3 pages are essentially cover/splash pages — no NAP (Name/Address/Phone), no hours on the page itself, no local SEO signals, no unique content per location. This is a significant local SEO weakness.

---

## About / Story Copy (verbatim from /about-us)

> "In 2010, Jordan opened a small group fitness studio specializing in boxing and bootcamps in Marlboro, NJ. The first of its kind, the studio quickly became a unique training experience that attracted a like-minded, hard-working community. In 2011, Jordan joined the U.S. Army. At the time, Dom was a member and loved the training so much that he stepped in to partner with Jordan during his absence, relocating the business to a larger space.
>
> When Jordan returned in 2017, they doubled the training space, introduced new classes, and continued to build what we know today: a gym unlike anything else in Monmouth County.
>
> Previously known for top-tier group fitness classes, the business rebranded to ARCH Training in 2021, marking several major upgrades. Dom and Jordan completely renovated the facility to include an Open Gym option, featuring state-of-the-art equipment from top brands like Watson, Atlantis, Arsenal Strength, and Rogue, along with premium amenities such as a shower, sauna, and cold plunge.
>
> In September 2025, ARCH Training expanded with the opening of its second location in Freehold, NJ, followed by a third location in Eatontown, NJ in March 2026.
>
> All three locations offer open gym access, group fitness classes, private recovery rooms, and personal training. Each facility features different equipment brands, creating three distinct training environments under one membership — all located within 20 minutes of each other."

**Key phrases they use to describe themselves:**

- "a gym unlike anything else in Monmouth County"
- "state-of-the-art equipment"
- "top brands like Watson, Atlantis, Arsenal Strength, and Rogue"
- "elite fitness experience"
- "results-driven environment & community"
- "no crowds"
- "expert trainers"
- "HYROX Training Club"
- "NJ's Premier Fitness & Training Facility"
- "veteran-owned gym" (implied by military pricing page)

**Founders language:**

- Jordan Kaufman: founder, 16 years experience, U.S. Army veteran (served 2011–2017)
- Domenick Cilea: co-owner, original member-turned-partner

---

## FAQ — Key Operational Details (verbatim selections)

**Hours:**

> "Monday–Thursday: 5AM–10PM | Friday: 5AM–8PM | Saturday & Sunday: 7AM–3PM"

**Addresses:**

> Marlboro: 92 Vanderburg Road Marlboro NJ, 07746
> Freehold: 3338 Route 9 Freehold, NJ 07728
> Eatontown: 749 Hope Road Eatontown, NJ 07724

**Contracts:**

> "No! All of our membership options are month-to-month and do not have a contract. We also have zero annual fees, processing fees or any other additional fees."

**Cardio equipment:**

> "StairMasters, treadmills, assault treadmills, Echo Bikes, Rowers, Skierg's, Jacobs Ladder, and stationary bikes. Our Marlboro location is within walking distance of the Henry Hudson Trail."
