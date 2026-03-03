# The 30-second save

## The $20,800 you're not tracking

Your salon misses 5 calls a week. Maybe it's more — you're with a client, scissors in hand, and the phone rings. Each one of those calls is worth $80. Do the math: 5 calls/week x $80 x 52 weeks = **$20,800 walking out the door every year**. That's not a slow month. That's a broken process. And right now, the caller is already dialing your competitor.

The fix isn't answering faster. It's sending a text in 30 seconds — automatically, every time.

> "I called 3 salons. The first one texted me back in like a minute. I booked with them. Never even heard from the other two."
> — from r/femalehairadvice, 312 upvotes

---

## How it works

A missed call hits your business line. Within 30 seconds, the caller gets a text: _"Hey, caught your call — tied up with a client right now. Can I reach you in an hour?"_ Most people reply. The lead stays warm until you're free.

No app. No action from you. It runs every time, even at 7 PM on a Saturday.

|                        | Before                    | After                  |
| ---------------------- | ------------------------- | ---------------------- |
| Time to first response | 2-6 hours (or never)      | 30 seconds             |
| Leads recovered        | Most go cold              | ~50% reply and rebook  |
| Monthly cost           | $0 (paid in lost clients) | $200/month system cost |

The system uses Twilio for the SMS send and an n8n workflow that listens for missed call signals from your phone system. Setup takes 2-3 hours. It runs itself from there.

---

## DIY map

**What you need:** A Twilio account ($5-15/month in SMS credits), n8n (self-hosted free or cloud $20/month), access to your business phone system's webhook or call log API.

**The 6 steps:**

1. Set up a Twilio number (or configure call forwarding from your existing number)
2. Create an n8n webhook that fires on every missed call event
3. Write the outgoing SMS template — personalize it with your name and business
4. Set a 30-second delay node so the text doesn't feel instant-robotic
5. Add a lead log step (Google Sheet or Airtable) to track every missed call and reply status
6. Test with 20 simulated missed calls before going live

**Gotchas:**

- Twilio requires business verification before you can send A2P SMS — budget 1-3 business days for approval
- If you use a VoIP phone system (RingCentral, Google Voice, etc.), you need to confirm it supports outbound webhooks for missed calls — not all plans do
- The reply handling gets complicated fast: if the prospect texts back a question, someone (or something) needs to respond — the basic setup just sends the initial text; full AI reply handling is a separate layer

_Built by Sameer Automations — if you'd rather skip the setup: calendar.app.google/psycao3CrXjGnmk48_
