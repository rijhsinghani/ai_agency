# The no-show killer

## The $12,480 you're losing to empty sessions

3 no-shows a week. You show up, set up, wait 10 minutes, pack up. At $80 a session, that's $240/week — every week, all year. By December, that's **$12,480 gone** and nothing to show for it but a calendar full of blank slots you couldn't fill in time.

The fix isn't calling every client the day before. You don't have time for that. It's a 48-hour text, then a 2-hour text, then a reschedule link they can use without calling you.

> "Personal trainers: do you send reminders? I didn't until I lost $600 in one week to no-shows. Now I text every client the night before. Zero tolerance policy. My no-show rate went from 22% to 4%."
> — from r/personaltraining, 891 upvotes

---

## How it works

A member books a personal training session or group class. 48 hours before the session, they get a text: _"Reminder: your session with [trainer] is Thursday at 6 AM. Reply CANCEL to reschedule."_ 2 hours before, another text. If they need to cancel, one tap opens the booking page and they pick a new slot — no phone call, no back-and-forth.

Your no-show rate drops from 20% to 5%. That's 3 empty slots becoming 0-1 per week.

|                     | Before                           | After                         |
| ------------------- | -------------------------------- | ----------------------------- |
| Reminder method     | None, or manual the night before | Automated 48hr + 2hr sequence |
| No-show rate        | 20% (3 empty sessions/week)      | 5% (0-1 empty sessions/week)  |
| Annual lost revenue | $12,480                          | $2,080                        |

The system costs $100/month. At $80/session, recovering 2 sessions per week pays for itself in the first 7 days of every month.

---

## DIY map

**What you need:** Twilio ($5-15/month in SMS credits), n8n, access to your booking system (Mindbody, Acuity, Google Calendar, or a shared spreadsheet), a reschedule link from your booking software.

**The 5 steps:**

1. Connect your booking system to n8n — pull new appointments as they're created
2. Build a 48-hour delay node that fires a first SMS reminder with the session details and a CANCEL reply keyword
3. Build a 2-hour delay node that fires a shorter, warmer reminder with your phone number for urgent contact
4. Handle CANCEL replies: trigger an n8n webhook that opens the rebooking link and notifies you of the cancellation immediately so you can attempt to fill the slot
5. Log all no-shows, cancellations, and reschedules to a Google Sheet for a monthly review

**Gotchas:**

- Mindbody and some other gym platforms charge extra for API access — confirm your plan tier before building the integration, or use a Google Sheet as a manual bridge
- The CANCEL reply keyword requires a Twilio messaging service (not a regular phone number) and a webhook to receive inbound SMS — this is a separate setup step that most tutorials skip
- Group fitness classes add complexity: if a class cancels, you need a broadcast message to all registered attendees, not a 1:1 reply flow — the logic branches differently

_Built by Sameer Automations — if you'd rather skip the setup: calendar.app.google/psycao3CrXjGnmk48_
