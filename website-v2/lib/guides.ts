/**
 * Guide library content — canonical source of truth for the four launch guides.
 * Each guide maps to a file in /GUIDES/ (already public-safe/scrubbed).
 * Slugs define the URL convention: /guides/<slug>
 */
export interface Guide {
  slug: string;
  title: string;
  outcome: string; // one-line outcome shown on hub card
  summary: string; // 2-3 sentence preview visible before email gate
  readTime: string;
  content: string; // full markdown content
}

export const GUIDES: Guide[] = [
  {
    slug: "never-lose-a-lead",
    title: "The missed-call machine",
    outcome: "Never lose a $500 job to voicemail again.",
    summary:
      "The research is brutal: the odds of reaching a lead drop by 10x if you wait longer than 5 minutes to reply. Most service businesses reply in hours, not minutes. This guide walks through the exact automation architecture — webhook to auto-reply to Slack notification — that replies in 60 seconds, 24 hours a day, whether you're on a job or asleep.",
    readTime: "8 min read",
    content: `# Never lose a lead while you sleep

## The problem

You got back from a job at 10:30pm. Three new inquiries came in while you were working. One of them wanted to book a date six months out — the kind of job that fills a calendar.

By the time you replied the next morning, two had already moved on. The third booked someone else the night before.

This isn't a leads problem. You had the leads. It's a response-time problem. The research on this is brutal: the odds of reaching a lead drop by 10x if you wait longer than 5 minutes to reply. Most service businesses reply in hours, not minutes. Some don't reply at all.

The fix isn't hiring someone to sit by your inbox. It's building a system that replies in 60 seconds, 24 hours a day, whether you're on a job, asleep, or shooting a wedding across town.

---

## What you'll have after this guide

A system that:

1. Responds to every new inbound inquiry in under 60 seconds
2. Asks 2-3 qualifying questions automatically to filter serious buyers from browsers
3. Books a call or sends a booking link based on how they respond
4. Notifies you in Slack so you wake up to a qualified lead, not a cold inbox

You won't touch a single inquiry manually unless it's ready to close.

---

## The system (step by step)

This is the exact architecture I built for a service business I run. The tools may vary — the trigger-processor-action structure is what matters.

### Step 1 — The trigger: catch every inbound channel

Most businesses have leads coming in from 3-4 places: web contact form, Instagram DMs, phone calls, and maybe a booking platform.

The system needs one entry point. Pick the highest-volume channel and start there.

For a web contact form, the trigger is simple: when someone submits the form, a webhook fires. That webhook carries their name, email, message, and timestamp.

**What you're building:** a webhook endpoint (or a form-connected automation tool like Make, Zapier, or n8n) that catches the submission and starts the flow.

**Tool names that work:** n8n (self-hosted, free), Make (cloud, freemium), Zapier (cloud, paid). Any of these can catch a form submission webhook.

### Step 2 — The auto-reply: 60 seconds or less

The moment the webhook fires, the system sends a reply. Not a generic "thanks for reaching out" — a reply that sounds like you wrote it, acknowledges what they asked about, and gives them one clear next step.

Example reply structure:

> "Hi [name], thanks for reaching out about [service]. I'm currently [on a shoot / with a client / wrapping up a project] but wanted to make sure you didn't have to wait. Here's what I'd love to know before we connect: [1-2 qualifying questions]. Reply here and I'll get back to you personally — or if you'd like to talk now, grab a time here: [calendar link]."

The key is the qualifying questions. Keep it to 2, max. Something like:

- "What date are you looking at?"
- "What's your rough budget range?"

This filters out browsers and gives you signal before you invest time.

**What you're building:** an email or SMS send step in your automation tool, with a simple message template that pulls in the lead's name and service interest.

### Step 3 — The qualifier: sort the responses

When the lead replies with their answers, the system reads them and routes accordingly.

Simple routing logic:

- Date mentioned + budget in range → send booking link
- Date mentioned + budget unclear → flag for manual follow-up
- No date / vague → send a "here's what I do" resource and schedule a follow-up in 3 days

You don't need AI for this. A simple conditional (if "date" appears in the reply, route to booking) handles 80% of cases.

**What you're building:** a conditional branch in your automation tool that checks the reply content and routes to one of three paths.

### Step 4 — The notification: you wake up knowing what happened

Every time the system processes a lead, it sends you a Slack message (or a text, or an email — whatever you actually look at).

The notification should tell you:

- Who inquired
- What they said
- What the system did (replied, booked, flagged)
- The lead's contact info in one tap

For the service business I run, this notification lands in a dedicated Slack channel. I check it once in the morning instead of monitoring an inbox all night.

**What you're building:** a Slack webhook call (free, instant setup) at the end of your automation flow that posts a short structured summary.

### Step 5 — The booking: close while they're warm

If the lead qualifies, the system sends your booking link automatically. No back-and-forth. No "let me check my calendar." They pick a time, you get a calendar invite.

For calls: Cal.com (free tier covers this). For direct booking (if your service has standard packages): a checkout page that takes the booking and a deposit in one step.

The automation fires the booking link. The lead books. You show up to a filled calendar.

---

## The full flow

\`\`\`
Inbound form submission
  → Webhook catches it
  → Auto-reply sends in < 60 seconds (qualifying questions + calendar link)
  → Lead replies
  → Conditional: date + budget? → Send booking link
                 unclear?       → Flag for manual follow-up
                 no signal?     → 3-day follow-up sequence
  → Slack notification fires: who, what they said, what the system did
  → You wake up to qualified leads, not cold inquiries
\`\`\`

---

## What to set this up with

| Piece               | Tool                                           | Cost                |
| ------------------- | ---------------------------------------------- | ------------------- |
| Form webhook        | Typeform, Tally, or your existing contact form | Free-$29/mo         |
| Automation glue     | n8n (self-hosted) or Make                      | Free-$9/mo          |
| Email send          | Resend or Postmark                             | Free for low volume |
| Calendar booking    | Cal.com                                        | Free                |
| Slack notifications | Slack (incoming webhooks)                      | Free                |

Total running cost once built: under $20/month for most service businesses.

---

## Where this breaks (read this before you build)

**The auto-reply sounds robotic.** This is the #1 failure mode. If the message sounds like a form letter, trust drops immediately. Fix: write the template yourself, in your actual voice. Read it aloud. If you wouldn't say it that way, rewrite it.

**Qualifying questions are too aggressive.** Asking for budget in the first reply alienates some leads. Test this. Some audiences answer immediately; others disappear. Start with softer questions ("What date are you looking at?") before asking about budget.

**The system fires on spam.** Set a simple filter: if the email domain is a known spam domain, or if the message is under 10 words, skip the auto-reply and route to a manual review folder. You don't want your auto-reply system sending warm messages to bots.

**The booking link doesn't match your service.** If you have multiple services at different price points, one booking link doesn't work. You need routing: qualify first, then send the right link based on what they asked about.

**Leads reply but you never see the notification.** Test the notification path before you go live. Send a test inquiry, verify the Slack message arrives, and make sure you're in the right channel. This sounds obvious. It's the thing that breaks in production.

---

## One thing you can do right now

Open your contact form settings. Find the email notification that fires when someone submits it. Rewrite that notification to arrive in your Slack instead of your email, and add the lead's name, message, and email in one tap-to-copy block.

That's not the full system. But it's the first step — and it means you'll stop missing leads in your email inbox starting today.

---

## What's next

This guide covers the architecture. Building it takes 4-6 hours if you're doing it yourself for the first time — mostly spent on the automation tool setup and testing edge cases.

If you want to skip the build and talk through whether this fits your business, book a free teardown call. I'll look at your current setup and tell you the one thing worth automating first. No pitch. Just an honest assessment.

**Get the operator note** — one short idea every week from the automations I'm actually building. No fluff.`,
  },
  {
    slug: "voice-to-action",
    title: "Run your business by talking to your phone",
    outcome: "Speak for 10 seconds. The work happens while you drive.",
    summary:
      "Most \"use AI to run your business\" advice assumes you're sitting at a desk. This guide is about a system that flips that assumption. You record a short voice note, it gets transcribed and sent to a Slack channel you control, and an AI agent reads it, understands the intent, takes action, and tells you what happened — all while you're driving, walking, or on a job.",
    readTime: "10 min read",
    content: `# Run your business by talking to your phone

## The problem

You're in the car between jobs. A thought hits you: "I need to follow up with that client about their deposit." You know you won't remember it by the time you're back at your desk. You open a notes app, type a half-sentence, and forget about it.

Or: you're at a venue doing a walkthrough. A vendor asks you a question about your availability on a date. You have no idea. You can't check your own system while you're standing there.

Or: it's 9pm and you remember you owe someone an invoice. You'd have to open your laptop, log into three different tools, and reconstruct the details from memory. So you don't do it tonight.

The assumption buried in every "use AI to run your business" article is that you're sitting at a desk. Most of the time, you're not.

This guide is about a system I built for myself that flips that assumption. I run parts of my business by talking to my phone. The system hears what I say, figures out what I need done, does it, and tells me what happened — all while I'm driving, walking, or on a job.

---

## What you'll have after this guide

A system where:

1. You record a short voice note on your iPhone ("follow up with Jordan about the deposit")
2. The note is transcribed and sent to a Slack channel you control
3. An AI agent reads it, understands the intent, and takes action (looks up the booking, drafts a follow-up, sends a notification, adds a to-do to your task list)
4. The agent replies in the Slack thread: "Done — I found Jordan's booking, deposit is still pending, I drafted a follow-up email for your review. Want me to send it?"

You speak for 10 seconds. The work happens while you drive.

---

## The system (step by step)

This is the architecture I run for my own businesses. I'm going to describe exactly how it works.

### Step 1 — The voice note: your iPhone as the input

The starting point is an iPhone shortcut. It's a simple automation: tap the shortcut, speak, tap stop.

The shortcut does two things:
- Transcribes your speech using Apple's built-in transcription (no additional app or API key needed)
- Sends the text to an edge function via a simple HTTP POST

The edge function receives the transcription and posts it to a Slack channel — a private channel that only you and the agent see.

**What you're building:** an iPhone shortcut (free, built into iOS) and a Supabase Edge Function that receives the POST and forwards to Slack.

### Step 2 — The Slack channel: the command layer

The Slack channel is where you give instructions and where the agent responds. It works like a text thread with someone who works for you.

You post: "Follow up with Jordan about the deposit"
Agent replies: "On it. Found Jordan Kim — booking confirmed for 10/15, deposit of $800 is still pending. I've drafted an email for your review. Want me to send it?"

The channel is the interface. The agent is the worker. You're the approver.

**What you're building:** a private Slack channel with a bot user that can both read messages and post replies.

### Step 3 — The agent: the thing that does the work

The agent is a small program that runs continuously, watching the Slack channel.

When a new message arrives, the agent:
1. Reads the message
2. Classifies the intent (follow-up request? invoice check? availability lookup? task note?)
3. Calls the right tool for that intent (your booking database, your email system, your calendar, your task list)
4. Takes the action
5. Posts a summary back to Slack

The agent is not a general chatbot. It's a narrow system with 4-6 specific capabilities, tuned to your business. That's what makes it reliable.

**What you're building:** a small server process (Node.js or Python) that listens to Slack events and routes requests to the right tool.

### Step 4 — The tools: what the agent can actually do

The agent can only do what you give it tools to do. Start with 3-4 capabilities, not 20.

Good starting tools for a service business:

- **Booking lookup:** given a client name, return their booking details (date, package, deposit status)
- **Draft email:** given a client and a situation, draft an email in your voice for review
- **Add task:** add an item to your task list with a due date
- **Check availability:** given a date, check if you're booked

Each tool is a function. The agent decides which function to call based on what you said. That decision is the only place AI is doing something complex — the rest is standard programming.

**What you're building:** 3-4 functions that read from or write to your existing systems (your booking database, your email tool, your calendar).

### Step 5 — The approval layer: you stay in control

The agent never sends an email on your behalf without showing it to you first.

Every action that affects a client or produces external output gets a review step:
- Agent drafts the email → posts it in Slack → waits for you to say "send it"
- Agent finds a booking conflict → posts the conflict in Slack → waits for your call

Actions that are internal (adding a task, logging a note, updating a status) can fire automatically.

This keeps you in control without putting you in the workflow. You review results, not processes.

---

## The full flow

\`\`\`
You tap iPhone shortcut
  → Apple transcribes your speech
  → Shortcut POSTs transcription to Edge Function
  → Edge Function posts to Slack channel
  → Agent reads the message
  → Agent classifies intent (follow-up? invoice? availability?)
  → Agent calls the right tool
  → Client-facing actions: Agent posts draft in Slack → you approve
  → Internal actions: Agent fires automatically
  → Agent posts summary: what it did, what it found
  → You're done before you park the car
\`\`\`

---

## What to set this up with

| Piece            | Tool                          | Cost              |
| ---------------- | ----------------------------- | ----------------- |
| Voice input      | iPhone Shortcuts              | Free              |
| Transcription    | Apple built-in                | Free              |
| Message delivery | Supabase Edge Function        | Free tier         |
| Slack bot        | Slack API (free tier)         | Free              |
| Agent runtime    | Node.js or Python             | Free to self-host |
| LLM for routing  | Claude Haiku or GPT-4o mini   | ~$0.01 per action |

Total running cost at 10-20 voice commands per day: under $5/month.

---

## Where this breaks

**The transcription gets the name wrong.** Apple's transcription is good but not perfect. "Jordan" becomes "Jordan" fine; "Dzmitry Kovalchuk" becomes "Jimmy Covercheck." Fix: add a name normalization step that checks transcription against your actual client list and flags mismatches.

**The intent classification is wrong.** "Check on Maria's invoice" could mean look up the invoice or follow up about it. The agent guesses wrong 10% of the time at first. Fix: add a low-confidence fallback where the agent posts "I think you want X — is that right?" before acting.

**The approval step gets skipped.** Under time pressure, it's tempting to let the agent send emails directly. Don't do this in the first 90 days. The errors aren't worth the 10 seconds you save. Add automatic approvals after you've seen 100+ drafts and trust the voice.

**The agent runs when you don't want it to.** A casual Slack message to yourself shouldn't trigger an agent response. Fix: require a trigger word or a specific channel. Only messages that start with the trigger word get processed.

---

## One thing you can do right now

Set up the iPhone shortcut — just the voice-to-Slack part, nothing else.

Open Shortcuts on your iPhone. Create a new shortcut: Record Audio → Transcribe → Send Message to Slack. Point it at a private channel you create for this purpose. Tap the shortcut, say something, and watch it arrive in Slack.

That's it. No agent yet. Just the input pipe. Once you're in the habit of speaking instead of typing, the agent is worth building.

---

## What's next

Building the full system takes 2-3 weekends for a developer, longer if you're learning as you go. The agent runtime is the hardest part — specifically, getting intent classification reliable enough that you trust it.

If you want to see whether this fits how you actually work, book a teardown call. I'll walk through your current setup and tell you what the first 2 tools should be.`,
  },
  {
    slug: "inquiry-to-invoice",
    title: "Inquiry to paid invoice with zero manual steps",
    outcome:
      "Close bookings from your phone. No laptop, no copy-paste, no chasing.",
    summary:
      "A new client wants to book you. Here's what happens manually: they fill a form, you reply with packages, they pick one, you create an invoice, you email it, you wait, they pay, you mark it paid, update your calendar, send a confirmation. That's 8-10 manual steps. This guide covers the system that handles the entire chain automatically the moment someone submits a booking form.",
    readTime: "12 min read",
    content: `# Inquiry to paid invoice with zero manual steps

## The problem

A new client wants to book you. Here's what happens next, if you're doing it manually:

1. They fill out your contact form
2. You reply with your packages and pricing
3. They pick a package
4. You manually create an invoice in QuickBooks (or FreshBooks, or Wave, or a spreadsheet)
5. You email it to them
6. You wait
7. They pay — or you chase them
8. You mark the invoice paid
9. You update your calendar
10. You send a confirmation email

That's 8-10 manual steps between "they want to book" and "they're confirmed." Most of them are copy-paste from one tool to another. All of them require you to be at your desk.

If you're doing 3-4 bookings a month, that's manageable. If you're scaling, or if you want a life outside your business, it isn't. And the error rate on manual copy-paste — wrong date, wrong price, wrong email — is higher than anyone admits.

This guide covers the system I built for a service business I run that handles this entire chain automatically, from the moment someone submits a booking form to the moment a paid invoice exists in accounting and a confirmation email lands in their inbox. Zero manual steps for a standard booking.

---

## What you'll have after this guide

A pipeline where:

1. A new booking form submission triggers the entire chain automatically
2. An invoice is created in your accounting system within seconds
3. A deposit request email goes to the client with a payment link
4. When they pay the deposit, you get notified and their booking is confirmed
5. Your calendar is updated
6. A confirmation email goes to the client

You close bookings from your phone. No laptop, no copy-paste, no chasing.

---

## The system (step by step)

### Step 1 — The form: structured input, structured output

The booking form is the entry point. It needs to collect the fields that the downstream systems need: name, email, event date, service type, and package tier. Nothing more.

The key insight: the form is not a contact form. It's a data capture form. Every field maps to a column in your booking database and a line item in your invoice. If the form doesn't capture it, the automation can't use it.

**What you're building:** a form (Typeform, Tally, or a custom page) with fields that map directly to your booking database schema.

### Step 2 — The webhook: the trigger

When the form is submitted, a webhook fires. The webhook payload contains everything from the form, plus a timestamp.

Your automation tool (n8n, Make, Zapier, or a custom webhook handler) receives this payload and starts the pipeline.

**What you're building:** a webhook endpoint that receives the form submission and kicks off the automation.

### Step 3 — The booking record: write to your database

The first thing the pipeline does is create a booking record in your database. This is the source of truth for everything that follows.

The record should include:
- Client name and email
- Event date
- Package tier and price
- Deposit amount (usually a percentage of total)
- Status: "pending deposit"

This record is what every subsequent step reads from. If you need to check on a booking, this is where you look.

**What you're building:** a database table (Postgres, Airtable, or similar) with a standard booking schema, and an insert step in your automation.

### Step 4 — The invoice: create it automatically

Once the booking record exists, the pipeline creates an invoice in your accounting system.

The invoice pulls the client's name, email, package name, and price from the booking record. It sets the deposit amount as the first line item and the remaining balance as the second. It sets a due date automatically based on your standard terms.

If you're using QuickBooks, FreshBooks, or Wave, there's an API for this. The automation calls it. The invoice appears in your accounting system before you've even looked at your phone.

**What you're building:** an API call to your accounting system that creates an invoice from the booking record.

### Step 5 — The deposit request: get the first payment

The pipeline sends the client a deposit request email. The email contains:
- A summary of what they booked
- The deposit amount
- A payment link (Stripe, Square, or whatever you use)

The email goes out within seconds of the form submission. While they're still excited about booking, not 24 hours later when they've moved on.

**What you're building:** an email template in your email system and a send step in your automation that fires immediately after the invoice is created.

### Step 6 — The payment trigger: close the loop

When the client pays the deposit, a webhook fires from your payment processor (Stripe, Square). This webhook is the signal that confirms the booking.

The pipeline catches this webhook and:
1. Updates the booking record status to "confirmed"
2. Updates the invoice status to "deposit received"
3. Adds the event to your calendar
4. Sends a confirmation email to the client
5. Sends a Slack notification to you

Everything happens in seconds. You get a Slack notification saying "Maria Kim paid the $800 deposit for October 15. Booking confirmed." That's it. You don't have to do anything.

**What you're building:** a webhook endpoint that receives the payment confirmation and triggers the confirmation flow.

---

## The full flow

\`\`\`
Client submits booking form
  → Webhook fires
  → Booking record created in database
  → Invoice created in accounting system (QuickBooks, FreshBooks, etc.)
  → Deposit request email sent to client with payment link
  → Client pays deposit
  → Payment webhook fires
  → Booking status updated to "confirmed"
  → Invoice marked "deposit received"
  → Event added to calendar
  → Confirmation email sent to client
  → Slack notification to you: who booked, what they booked, deposit amount
\`\`\`

Total time from form submission to confirmed booking with invoice in accounting: under 60 seconds, zero manual steps.

---

## What to set this up with

| Piece                 | Tool                              | Cost              |
| --------------------- | --------------------------------- | ----------------- |
| Booking form          | Tally (free) or Typeform          | Free-$50/mo       |
| Automation            | n8n (self-hosted)                 | Free              |
| Database              | Supabase (Postgres)               | Free tier         |
| Accounting            | QuickBooks Online                 | $30-90/mo         |
| Payment processing    | Stripe                            | 2.9% + 30 cents   |
| Email                 | Resend                            | Free for low vol  |
| Calendar              | Google Calendar API               | Free              |

---

## Where this breaks

**The form data doesn't match what the invoice needs.** If your form has "wedding photography" as an option but your invoice line items say "Photography — 8 hours, 2 photographers," you have a mapping problem. Fix this before you build: audit your invoice templates and reverse-engineer the form fields you need.

**The payment webhook arrives before the booking record is written.** Race conditions happen when two async processes write to the same record. Fix: add a retry loop on the payment handler that waits for the booking record to exist before processing.

**The accounting system API is rate-limited.** QuickBooks's API has rate limits. If you're doing high volume, you'll hit them. Fix: add a queue in front of the accounting API call so burst traffic gets processed smoothly rather than failing.

**The deposit is wrong.** If your pricing is tiered or variable, the deposit calculation has to account for that. A flat 25% sounds simple until you have packages that include optional add-ons at different price points. Build the deposit logic carefully.

---

## One thing you can do right now

Pick one booking type you do regularly and map out every manual step you take from form submission to confirmed booking. Write them down. Then identify which steps are pure copy-paste (no judgment, just data entry). Those are the steps the automation replaces.

Most people find 5-7 steps that are pure copy-paste. That's the scope of the automation. Build that first.

---

## What's next

The hardest part of this build is usually the accounting API integration — the credential setup, the rate limiting, the data mapping. The automation glue is straightforward once that's working.

If you want to skip the build and talk through whether this applies to your business, book a teardown call.`,
  },
  {
    slug: "ai-teammate",
    title: "An AI teammate that ships work overnight",
    outcome: "Wake up to a Slack summary of what shipped while you slept.",
    summary:
      "Not a chatbot. A system where an AI agent picks up a real task from a queue, does the work, opens a result for your review, and posts a summary when it's done. No human in the loop until review. This guide explains how it actually works and what it takes to set one up — without the vague claims.",
    readTime: "15 min read",
    content: `# An AI teammate that ships work overnight

## The problem

You've probably seen the claim: "AI that works for you while you sleep." It's everywhere. And it's mostly vague enough to mean nothing.

Here's what it usually means in practice: a chatbot that answers FAQs, or a tool that auto-responds to emails with generic text. Useful, but not what the claim promises.

This guide is about something more specific — a system where an AI agent picks up a real task from a queue, does the work, opens a result for your review, and posts a summary when it's done. No human in the loop until review. No scheduling, no prompting, no babysitting.

I built this for my own businesses. It runs automations like: scanning codebases for bugs and filing tickets, picking up those tickets overnight, writing the fixes, opening pull requests for my review, and posting a Slack digest of what shipped while I slept.

That's not a chatbot. That's a teammate — one that works nights and weekends and never loses context about what needs doing.

This guide explains how it works and what it actually takes to set one up.

---

## What you'll have after this guide

A system where:

1. Tasks are added to a queue throughout the day (by you, by other automations, by monitoring tools)
2. An agent picks up a claimable task overnight (or on a schedule you set)
3. The agent does the work — research, writing, code, data entry, analysis
4. The result lands somewhere you can review: a drafted email, a pull request, a document, a report
5. You get a Slack summary in the morning: what was picked up, what was done, what needs your eyes

You review and approve. The agent does the work. That's the division of labor.

---

## The system (step by step)

### Step 1 — The queue: a list the agent can read and claim

The agent needs something to work from. Not a chatbot prompt. A structured list of tasks with enough context to act on.

The simplest version is a table in a database with these columns:

| Task | Status | Priority | Context | Result |
|------|--------|----------|---------|--------|
| Draft follow-up for Jordan | ready | high | Booking #1234, deposit pending | |
| Review new FAQ questions | ready | medium | 3 new submissions | |
| Write this week's operator note | done | - | Topic: voice-to-action systems | Draft in Notion |

"Ready" means the agent can claim it. "Done" means it's been completed and reviewed.

The agent's first action every cycle is: look for a "ready" task, claim it (mark it "in progress" with a timestamp), and start working. The claim step is important — it prevents two agents from picking up the same task.

**What you're building:** a task table in your database with status, priority, and context fields.

### Step 2 — The trigger: when the agent runs

The agent runs on a schedule. For most service businesses, overnight is the right trigger: run at 11pm, work through 5am, post a summary at 6am.

A cron job (or a Cloud Scheduler job if you're on GCP) kicks off the agent process at the scheduled time.

The agent picks up tasks in priority order, works until it hits a time limit or runs out of claimable tasks, then stops and posts the summary.

**What you're building:** a cron job or scheduled cloud function that starts the agent process.

### Step 3 — The work: what the agent actually does

This is where vague AI demos and real systems diverge.

The agent does real work by calling real tools. For each task, it:

1. Reads the task description and context
2. Decides which tool to call (or sequence of tools)
3. Calls the tools
4. Evaluates the output
5. Writes the result to the task record
6. Marks the task done

The tools are the critical piece. The agent is only as capable as the tools it has access to. Tools I use in my own systems:

- **Search:** web search for research tasks
- **Read/write files:** read a document, write a draft
- **Database queries:** look up bookings, clients, invoices
- **Email draft:** draft an email in my voice, add it to a review queue
- **Code execution:** run a script, test a change, check for errors
- **Post to Slack:** deliver results and summaries

Each tool is a function the agent can call. The agent decides when to call it. You define what the functions do.

**What you're building:** a set of typed tool functions that your agent can call, connected to your actual systems.

### Step 4 — The review layer: results you can trust

The agent never takes irreversible action without a review step.

Every task that produces an external output (email, published post, code pushed to production, invoice sent) goes into a review queue before it fires.

The agent posts a review item to Slack: "I drafted this email for Jordan. Looks good? [Approve] [Edit] [Reject]"

You tap one button. Approved → sends. Rejected → agent tries again or flags for manual review.

Actions that are internal and reversible (adding a task, logging a note, updating a status field) can run automatically. Actions that affect customers or produce output you can't take back need your eyes.

**What you're building:** a review queue in Slack (or email) with approve/reject actions for each external output.

### Step 5 — The morning summary: your inbox for agent work

At 6am, the agent posts a summary to a Slack channel.

The summary contains:
- How many tasks were picked up
- What was completed (with links to results)
- What needs your review (with quick approve/reject buttons)
- What got stuck (and why)

You read it in 2 minutes. Approve what looks good. Flag what doesn't. Delete the summary. Day starts.

**What you're building:** a structured Slack message that formats the night's work into a scannable digest.

---

## The full flow

\`\`\`
Throughout the day:
  → Tasks added to queue (by you, by automations, by monitoring tools)

11pm — agent starts:
  → Reads queue, claims highest-priority "ready" task
  → Works on task using available tools
  → Writes result to task record
  → If external output: adds to review queue
  → Marks task done, claims next task
  → Repeats until time limit or no more tasks

6am — agent posts summary:
  → Completed tasks with links to results
  → Items needing your review with approve/reject buttons
  → Any tasks that got stuck

You read it over coffee:
  → Tap approve/reject on anything in review
  → Anything stuck: add context, requeue
  → Done in 2 minutes
\`\`\`

---

## What to set this up with

| Piece         | Tool                             | Cost              |
| ------------- | -------------------------------- | ----------------- |
| Task queue    | Supabase (Postgres)              | Free tier         |
| Scheduler     | GCP Cloud Scheduler              | Free tier         |
| Agent runtime | Node.js or Python on Cloud Run   | Free tier         |
| LLM           | Claude Sonnet (work) / Haiku (review) | ~$5-15/mo  |
| Review layer  | Slack                            | Free              |
| Tools         | Custom functions for your systems | -                |

Total running cost for a 1-person service business: $5-20/month depending on LLM usage.

---

## Where this breaks

**The agent hallucinates.** LLMs make things up. An agent writing a client email might invent details about a booking that don't match reality. Fix: every external output goes through review before it fires, and the agent cites its sources (the booking record ID, the document it referenced) so you can verify quickly.

**The agent loops.** A task that hits an error might get retried indefinitely. Fix: add a max-retry count to every task, and a "stuck" status that fires an alert after 3 failures.

**The queue grows faster than the agent can work.** If you're adding 20 tasks a day and the agent completes 10 overnight, you're falling behind. Fix: add a priority system and a "triage" status that requires human review before claiming.

**The tools are unreliable.** External APIs go down. Rate limits get hit. Timeouts happen. Fix: all tool calls need retry logic and a fallback — usually "log the error, mark the task stuck, move on."

---

## One thing you can do right now

Build the queue, not the agent.

Create a table in a spreadsheet or a database: task description, status (ready/in-progress/done/stuck), priority, context, result. Start adding tasks to it manually. Get in the habit of writing tasks with enough context for someone else to complete them.

Once you're doing that naturally, the agent is just the thing that processes the queue instead of you.

---

## What's next

The agent itself — the LLM integration, the tool calling, the retry logic — takes 2-3 weeks for a developer who's done it before. The queue and the review layer are simpler but just as important.

If you want to think through whether this applies to your specific business and what the first 3 tools should be, book a teardown call.`,
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
