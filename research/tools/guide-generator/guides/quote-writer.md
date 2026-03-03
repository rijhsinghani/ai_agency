# The quote that writes itself

## The Sunday nights you're not getting back

You run a small law firm. Every Sunday night you spend 2 hours writing proposals — same structure, same sections, same boilerplate, different client and matter details. You type it out anyway, because it has to sound right. By the time you're done, it's 10 PM and you've used your best thinking hours on formatting instead of strategy.

Meanwhile, the proposals you sent on Thursday are sitting unread because no one followed up. You meant to check in. You didn't.

At 1-2 quotes per day with 2 hours each, that's **up to 20 hours a month on document assembly**. That's a week of billable time.

---

## How it works

You leave a voice memo on your phone. 10 minutes, walking to your car: client name, matter type, scope, fee structure, relevant context. The automation transcribes it, sends it to Claude API, and gets back a formatted proposal draft — with your firm's standard sections, language, and structure already in place.

You review it, make 2 edits, and send. Total time: 10 minutes, not 2 hours.

|                   | Before                    | After              |
| ----------------- | ------------------------- | ------------------ |
| Time per proposal | 2 hours                   | 10 minutes         |
| Proposals per day | 1-2                       | 4-5                |
| Evening reclaimed | Lost to document assembly | Done before dinner |

The follow-up sequence runs automatically: Day 2, Day 5, and Day 10 check-ins go out via email — personalized, scheduled, and stopped the moment the prospect replies or signs.

---

## DIY map

**What you need:** Whisper API or a transcription service (AssemblyAI, $0.37/hour of audio), Claude API, n8n, your proposal template in plain text or markdown, a Twilio number for voice memo intake or a shared email inbox.

**The 5 steps:**

1. Record a voice memo and send it to a dedicated intake email or upload to a watched n8n folder
2. Transcribe the audio with Whisper API — output is a raw text transcript
3. Pass the transcript + your firm's proposal template to Claude API with a structured system prompt
4. Claude returns a formatted draft — review it in your email or a shared Notion page
5. Trigger the 3-touch follow-up sequence (Day 2, 5, 10) automatically from a Google Sheet or Airtable row when you mark a quote as "sent"

**Gotchas:**

- Claude API output quality depends heavily on your system prompt — a vague prompt produces a generic draft; you need to invest 2-3 hours writing a good template before this pays off
- Voice memo transcription accuracy drops on legal terminology, client names, and case-specific details — you'll catch errors in review, but expect them on first run
- The follow-up sequence needs a hard stop condition: if you mark a matter as "signed," "declined," or "conflict" in your tracking sheet, the sequence must halt immediately — loose stop logic sends awkward messages to signed clients

_Built by Sameer Automations — if you'd rather skip the setup: calendar.app.google/psycao3CrXjGnmk48_
