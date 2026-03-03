# The review machine

## The gap between 8 reviews and 90

Your dental practice has 8 Google reviews and a 3.9 rating. The practice two miles away has 94 reviews and a 4.7 rating. When a new patient searches "dentist near me" on a Monday morning, they click the second result. Not yours. That gap costs you 25-30% of the clicks you should be getting from Google Maps — and you're not even in the room when it happens.

The fix isn't asking patients to leave reviews. It's a text that lands 2 hours after their appointment, when they're still feeling good about the visit.

---

## How it works

Appointment wraps up. 2 hours later, your patient gets a text: _"Thanks for coming in today — if you had a great experience, a quick Google review would mean a lot to us."_ One tap opens your review page directly. Satisfied patients do it. The ones who had a bad day usually don't — which works in your favor.

Manual ask gets a 5% response rate. An automated, timed request gets 40%.

|                        | Before                           | After                                        |
| ---------------------- | -------------------------------- | -------------------------------------------- |
| Review request method  | Manual ask at desk (5% response) | Automated text 2hr post-visit (40% response) |
| New reviews per month  | 2                                | 8-12                                         |
| Google Maps visibility | 8 reviews, 3.9 stars             | 50+ reviews, 4.7 stars                       |

At 4.7 stars with 90+ reviews, Google Maps sends you 25-30% more clicks than you're getting today. For a practice doing 30 new patient inquiries per month from search, that's 8-9 more calls. At $400 average value and a 50% booking rate, that's **$1,600-$2,000/month in recovered revenue from patients who never knew you existed before**.

---

## DIY map

**What you need:** Twilio ($5-10/month in SMS credits), n8n, access to your scheduling software (Dentrix, Carestream, Jane, or a Google Sheet), your Google Business Profile review link.

**The 6 steps:**

1. Get your Google Business Profile review link (short URL from your GBP dashboard)
2. Connect your scheduling software to n8n via webhook or API — or use a Google Sheet as a manual input log
3. Build a trigger that fires when an appointment status changes to "complete"
4. Add a 2-hour delay node — the timing is the variable most practices get wrong
5. Send the SMS via Twilio with the patient's first name and a direct link to your review page
6. Add a 3-day follow-up node for patients who didn't click — a second gentle ask

**Gotchas:**

- Most dental practice management systems (Dentrix, Eaglesoft) don't have clean outbound webhooks — you'll need to export a daily appointment completion list and trigger from that, which adds a step and a potential lag
- Texting patients in healthcare contexts touches TCPA compliance: you need documented opt-in consent, which most scheduling flows don't collect by default — add a checkbox to your intake form before going live
- The Google Business Profile review link changes format periodically — verify it works before embedding it in 1,000 texts

_Built by Sameer Automations — if you'd rather skip the setup: calendar.app.google/psycao3CrXjGnmk48_
