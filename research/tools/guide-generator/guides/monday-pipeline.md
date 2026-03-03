# The Monday morning pipeline

## The 45-minute scramble you do every week

Every Monday morning you open your phone and dig. Texts from Friday. A voicemail you forgot to return. An email from a lead asking for availability. A form submission from Saturday at 9 PM. You spend 45 minutes reconstructing your own pipeline before you've done a single job. And somewhere in that pile, 3-5 leads per month fall through the cracks — not because you forgot them, but because there's no system surfacing them.

At $150 average cleaning job, 3 missed leads/month = **$5,400 in lost revenue every year**. From not having a 7 AM summary.

---

## How it works

Every Monday at 7 AM, one email lands in your inbox. It contains a clean, sorted list of every lead that came in the previous week: source (form, text, voicemail), current status (new, replied, booked, gone cold), and who needs action from you today. No digging. No cross-referencing three apps.

You read it in 2 minutes. You know exactly what to do. You start your week.

|                         | Before                                         | After                                      |
| ----------------------- | ---------------------------------------------- | ------------------------------------------ |
| Monday lead review time | 45 minutes scrolling texts, emails, voicemails | 2-minute inbox summary                     |
| Leads that fall through | 3-5/month untracked                            | Zero — every lead logged and status-tagged |
| Monthly system cost     | $0 (paid in missed clients)                    | $150/month                                 |

The pipeline runs on n8n. It pulls from your lead sources on a weekly schedule — web form submissions, Twilio missed call logs, Google Voice transcripts — consolidates them into a status-tagged list, and sends a formatted digest via Gmail. Claude API summarizes any voicemail transcripts so you read plain English, not raw audio.

---

## DIY map

**What you need:** n8n (self-hosted free or cloud $20/month), access to your lead sources (Typeform, web form webhook, Twilio, Google Voice), Gmail API access, Claude API key for voicemail summarization.

**The 7 steps:**

1. Map every place a lead can enter: web form, text, missed call, voicemail, direct email
2. Build n8n nodes to pull from each source — each has a different API or export format
3. Normalize the data into a single schema: name, phone, source, date, current status
4. Add a Claude API call to summarize any voicemail transcripts into one-sentence descriptions
5. Write a status-tagging logic node: new lead, replied, booked, 48hr-no-reply (needs follow-up), gone cold
6. Format the weekly digest as a clean HTML or plain-text email
7. Schedule the n8n workflow to run every Sunday night at 11 PM so the email lands by 7 AM Monday

**Gotchas:**

- Google Voice doesn't have a public API — you'll need to forward voicemails to a Gmail label and parse them from there, which works but adds fragility
- "Gone cold" status requires you to decide what "cold" means: 72 hours? 5 days? The threshold needs to match your sales cycle or you'll get false positives on every report
- If you use multiple team members or subcontractors, lead ownership gets complicated fast — the simple version of this works best when it's just you reviewing the list

_Built by Sameer Automations — if you'd rather skip the setup: calendar.app.google/psycao3CrXjGnmk48_
