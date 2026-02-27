# Phase 2: PoC Build — Implementation Plan

**Phase Goal:** The lead follow-up automation is live, running for the agency's own inquiries, documented as a case study, and filmed as a walkthrough video.

**Requirements:** POC-01, POC-02, POC-03, POC-04

**Estimated Effort:** 3-5 focused work sessions (~12-20 hours total)

---

## 1. Overview

### What We're Building

A fully automated lead follow-up pipeline that:

1. Captures a new inquiry via a web form on the landing page
2. Sends the lead data to N8N via webhook
3. Claude qualifies the lead (AI scoring + personalized reply)
4. Books an appointment via Google Calendar Appointment Scheduling
5. Sends a confirmation email via Resend (and optionally SMS via Twilio)

The automation runs live for the agency's own inquiries. Every real lead that comes in goes through this pipeline. That real usage generates metrics for the case study and demo footage for the video.

### Requirements Coverage

| Requirement | What Satisfies It                                                         |
| ----------- | ------------------------------------------------------------------------- |
| POC-01      | N8N workflow: form → qualify → book → confirm                             |
| POC-02      | Stack: N8N + Claude API + Resend + Google Calendar Appointment Scheduling |
| POC-03      | Case study doc with before/after metrics                                  |
| POC-04      | 3-5 min OBS screen recording + narration                                  |

### Effort Breakdown

| Plan   | Effort    | Description                                |
| ------ | --------- | ------------------------------------------ |
| Plan A | 4-6 hours | Infrastructure setup (N8N, accounts, keys) |
| Plan B | 4-6 hours | Core automation build                      |
| Plan C | 2-3 hours | Testing, edge cases, monitoring            |
| Plan D | 2-4 hours | Case study writing + video recording       |

---

## 2. Prerequisites

Everything that must exist before writing a single N8N node.

### Accounts to Create / Verify

| Service         | Action                                                       | URL                   | Cost                         |
| --------------- | ------------------------------------------------------------ | --------------------- | ---------------------------- |
| Railway         | Create account, set up project                               | railway.app           | Free/$5 hobby                |
| Anthropic API   | Get API key (claude-haiku-4-5 for lead qualification)        | console.anthropic.com | Pay-as-you-go                |
| Google Calendar | Set up Appointment Scheduling (included in Google Workspace) | calendar.google.com   | Included in Google Workspace |
| Resend          | Create account, verify domain                                | resend.com            | Free (3K/mo)                 |
| Twilio          | Create account, get a phone number                           | twilio.com            | ~$1/mo + usage               |
| Supabase        | Create project (lead log/state storage)                      | supabase.com          | Free                         |

### Domain / Email

- Resend requires a verified sending domain. Use `rajphotovideo.com` or wait for `sameerautomations.com` to be registered.
- Set up a DNS TXT record for Resend domain verification (takes 5-30 min to propagate).
- Set up Google Calendar Appointment Scheduling (available in Google Workspace under Calendar settings → Appointment schedules).

### API Keys to Collect

Collect all of these before starting Plan B:

```
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...
GOOGLE_CALENDAR_APPOINTMENT_LINK=[Google Calendar booking link]
SUPABASE_URL=https://...supabase.co
SUPABASE_ANON_KEY=eyJ...
N8N_WEBHOOK_URL=https://your-n8n.railway.app/webhook/lead-intake
```

### N8N Self-Hosted on Railway

1. Go to railway.app → New Project → Deploy from template → search "n8n"
2. Railway has an official n8n template. Deploy it.
3. Set environment variables in Railway dashboard:
   - `N8N_HOST` = your Railway domain (e.g., `my-n8n.up.railway.app`)
   - `N8N_PROTOCOL` = `https`
   - `WEBHOOK_URL` = `https://my-n8n.up.railway.app/`
   - `N8N_BASIC_AUTH_ACTIVE` = `true`
   - `N8N_BASIC_AUTH_USER` = your username
   - `N8N_BASIC_AUTH_PASSWORD` = strong password
4. Open N8N, create credentials for: Anthropic, Resend, Twilio, Supabase, HTTP headers

**Expected cost:** Railway hobby plan is $5/mo. N8N self-hosted = $0 license cost.

---

## 3. Architecture

### Workflow Diagram

```
[Web Form on Landing Page]
         |
         | HTTP POST (form data)
         v
[N8N Webhook Trigger]
  - Lead name
  - Email
  - Phone (optional)
  - Business type
  - Message / inquiry text
         |
         v
[N8N: Set Fields Node]
  - Normalize field names
  - Add timestamp
  - Set lead_id (uuid)
         |
         v
[N8N: Claude API Node — Lead Qualification]
  - Send inquiry to Claude Haiku
  - Prompt: qualify interest level + extract business type + generate personalized reply
  - Returns: { score: 1-5, business_type: string, summary: string, reply: string, book_call: boolean }
         |
         v
[N8N: IF Node — Is Score >= 3?]
       /           \
   YES              NO
    |                |
    v                v
[Book Appointment]   [Send Nurture Email]
    |                       |
    v                       v
[Google Calendar     [Resend: Low-fit reply]
 Booking Link Node]
  - Create booking         (still polite, keep warm)
  - Pass lead name/email
  - Returns: booking URL
         |
         v
[N8N: Resend Node — Confirmation Email]
  - To: lead email
  - From: sameer@rajphotovideo.com
  - Subject: "Your intro call is booked — here's what to expect"
  - Body: personalized (uses Claude's reply draft + booking link)
         |
         v
[N8N: Twilio Node — Optional SMS]
  - To: lead phone (if provided)
  - Body: "Hi [name], Sameer here. Your call is booked for [datetime]. Check email for details."
         |
         v
[N8N: Supabase Node — Log Lead]
  - Insert row: lead_id, name, email, phone, business_type, score, booked, timestamp
         |
         v
[N8N: Resend Node — Internal Alert to Sameer]
  - To: sameer@rajphotovideo.com
  - Subject: "New lead: [name] ([business_type]) — Score [score]/5"
  - Body: Claude summary + booking status + lead message
```

### Data Payloads

**Webhook input (from form):**

```json
{
  "name": "John Smith",
  "email": "john@smithplumbing.com",
  "phone": "555-867-5309",
  "business_type": "plumbing",
  "message": "I keep missing calls when I'm on jobs. Interested in seeing what you can do."
}
```

**Claude API response (parsed JSON):**

```json
{
  "score": 4,
  "business_type": "plumbing",
  "summary": "Plumber losing leads from missed calls during service work. High fit for missed-call text-back automation.",
  "reply": "Hi John, thanks for reaching out! This is a really common problem for service businesses — you're on the job and can't pick up, leads move on. I've built automations that solve exactly this. Let me show you how it works on a quick call.",
  "book_call": true
}
```

---

## 4. Implementation Steps

### Plan A: Infrastructure Setup

**Goal:** All services running, credentials verified, N8N accessible.

1. **Deploy N8N on Railway**
   - Create Railway account at railway.app
   - New Project → Search template "n8n" → Deploy
   - Set environment variables (see Prerequisites section)
   - Wait for deploy (~3-5 min), open the Railway-provided URL
   - Log in to N8N admin UI with credentials you set

2. **Set Up Google Calendar Appointment Scheduling**
   - Open Google Calendar (already available in Google Workspace)
   - Click "Other calendars" → "Create new calendar" (optional: dedicated "Appointments" calendar)
   - In Calendar settings → "Appointment schedules" → Create a new schedule
   - Name it "Discovery Call — 30 min", set availability (e.g., Mon-Fri 10am-5pm)
   - Copy your personal booking page link (auto-generated by Google Calendar)
   - This link is your [Google Calendar booking link] — set up in Phase 2

3. **Set Up Resend**
   - Create account at resend.com
   - Add domain: `rajphotovideo.com` (or `sameerautomations.com` when registered)
   - Add DNS TXT record as instructed → wait for verification
   - Generate API key (Settings → API Keys)
   - Send a test email via Resend dashboard to verify delivery

4. **Set Up Twilio**
   - Create account at twilio.com
   - Get a phone number (US, SMS-capable) — ~$1/mo
   - Copy: Account SID, Auth Token, phone number
   - Send a test SMS via Twilio console

5. **Set Up Supabase**
   - Create project at supabase.com
   - Create `leads` table (SQL below)
   - Copy project URL and anon key

   ```sql
   create table leads (
     id uuid default gen_random_uuid() primary key,
     created_at timestamptz default now(),
     name text,
     email text,
     phone text,
     business_type text,
     message text,
     score int,
     summary text,
     booked boolean default false,
     booking_url text,
     internal_notified boolean default false
   );
   ```

6. **Configure N8N Credentials**
   - In N8N: Settings → Credentials → Add Credential
   - Add: Anthropic API (paste API key)
   - Add: Resend (paste API key)
   - Add: Twilio (SID + Auth Token)
   - Add: Supabase (URL + anon key)
   - Note: Google Calendar Appointment Scheduling uses OAuth2 via Google account — no separate API key needed for the booking link approach

7. **Verify Webhook URL**
   - In N8N: Create a new workflow → Add Webhook node → copy the webhook URL
   - Test with curl:
     ```bash
     curl -X POST https://your-n8n.railway.app/webhook/lead-intake \
       -H "Content-Type: application/json" \
       -d '{"name":"Test","email":"test@test.com","business_type":"plumbing","message":"Test lead"}'
     ```
   - Confirm N8N receives it (check execution log)

---

### Plan B: Core Automation Build

**Goal:** Full workflow running end-to-end in N8N.

**Node-by-node build order:**

**Step 1: Webhook Trigger Node**

- Type: `Webhook`
- Method: POST
- Path: `lead-intake`
- Response: Return immediately (don't block form submission)

**Step 2: Set Fields Node**

- Type: `Set`
- Fields to set:
  ```
  lead_id     → {{ $guid }}
  received_at → {{ $now.toISO() }}
  name        → {{ $json.name }}
  email       → {{ $json.email }}
  phone       → {{ $json.phone ?? "" }}
  business_type → {{ $json.business_type ?? "unknown" }}
  message     → {{ $json.message }}
  ```

**Step 3: Claude Haiku API Node**

- Type: `HTTP Request`
- Method: POST
- URL: `https://api.anthropic.com/v1/messages`
- Headers:
  ```
  x-api-key: {{ $credentials.anthropicApiKey }}
  anthropic-version: 2023-06-01
  Content-Type: application/json
  ```
- Body:
  ```json
  {
    "model": "claude-haiku-4-5-20251001",
    "max_tokens": 500,
    "messages": [
      {
        "role": "user",
        "content": "You are a lead qualification assistant for an AI automation agency that serves local service businesses (plumbers, HVAC, dentists, realtors, contractors).\n\nA new inquiry came in. Analyze it and respond with ONLY valid JSON — no explanation, no markdown, just raw JSON.\n\nLead info:\nName: {{ $json.name }}\nBusiness type: {{ $json.business_type }}\nMessage: {{ $json.message }}\n\nRespond with this exact JSON structure:\n{\n  \"score\": <1-5 integer, 5=best fit>,\n  \"business_type\": \"<confirmed or inferred business type>\",\n  \"summary\": \"<1-2 sentence summary of the lead and their fit>\",\n  \"reply\": \"<personalized 2-3 sentence reply to send to the lead, warm but professional, references their specific business>\",\n  \"book_call\": <true if score >= 3, false otherwise>\n}"
      }
    ]
  }
  ```
- Parse response: Extract `content[0].text` → parse as JSON

**Step 4: Parse Claude Response Node**

- Type: `Code` (JavaScript)
- Code:
  ```javascript
  const raw = $input.first().json.content[0].text;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    parsed = {
      score: 2,
      business_type: $("Set Fields").first().json.business_type,
      summary: "Could not parse qualification response.",
      reply:
        "Thanks for reaching out! I'll be in touch shortly to learn more about your business.",
      book_call: false,
    };
  }
  return [{ json: { ...parsed } }];
  ```

**Step 5: IF Node — Route by Score**

- Type: `IF`
- Condition: `{{ $json.book_call }}` equals `true`
- True path → Book appointment flow
- False path → Nurture email flow

**Step 6a (True path): Google Calendar Booking Link Node**

- Type: `Set` (just pass the booking link through — no API call needed for PoC)
- Set field: `calendar_link` = `[Google Calendar booking link]`

  > Note: For the PoC, include the Google Calendar Appointment Scheduling booking link in the confirmation email rather than programmatically creating a booking. The simpler pattern: send lead the booking link, let them self-schedule. This avoids slot-selection API complexity. Use Google Calendar API for programmatic booking in Phase 3+ when you want zero-click automation.

**Simpler Google Calendar approach for PoC:**

- Skip any API booking call
- Include `[Google Calendar booking link]` in the confirmation email
- Track "link sent" in Supabase as the proxy for booking

**Step 6b (False path): Low-Fit Nurture Email**

- Type: `Resend` (HTTP Request to Resend API)
- Method: POST
- URL: `https://api.resend.com/emails`
- Headers: `Authorization: Bearer {{ $credentials.resendApiKey }}`
- Body:
  ```json
  {
    "from": "Sameer <sameer@rajphotovideo.com>",
    "to": ["{{ $('Set Fields').first().json.email }}"],
    "subject": "Got your message — quick note from Sameer",
    "html": "<p>Hi {{ $('Set Fields').first().json.name }},</p><p>Thanks for reaching out about AI automation for your business. {{ $('Parse Claude').first().json.reply }}</p><p>If you'd like to explore what's possible, feel free to book a quick 30-minute call anytime: <a href='[Google Calendar booking link]'>[Google Calendar booking link]</a></p><p>Best,<br>Sameer</p>"
  }
  ```

**Step 7: Confirmation Email (True path)**

- Type: HTTP Request to Resend API
- Body:
  ```json
  {
    "from": "Sameer <sameer@rajphotovideo.com>",
    "to": ["{{ $('Set Fields').first().json.email }}"],
    "subject": "Let's talk — here's how to book a call, {{ $('Set Fields').first().json.name }}",
    "html": "<p>Hi {{ $('Set Fields').first().json.name }},</p><p>{{ $('Parse Claude').first().json.reply }}</p><p>Book your free 30-minute discovery call here:<br><a href='[Google Calendar booking link]' style='background:#7B2FBE;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;margin:16px 0;'>Book Your Call</a></p><p>Talk soon,<br>Sameer<br><small>Sameer Automations — Smart systems. Built for your business.</small></p>"
  }
  ```

**Step 8: Twilio SMS (True path, if phone provided)**

- Type: `HTTP Request`
- Method: POST
- URL: `https://api.twilio.com/2010-04-01/Accounts/{{ $credentials.twilioSid }}/Messages.json`
- Auth: Basic (SID + Token)
- Body (form-encoded):
  ```
  To={{ $('Set Fields').first().json.phone }}
  From={{ $credentials.twilioPhone }}
  Body=Hi {{ $('Set Fields').first().json.name }}, Sameer here. Thanks for reaching out — check your email for next steps on booking a call. Reply STOP to opt out.
  ```
- Add IF node before this: only run if `$('Set Fields').first().json.phone` is not empty

**Step 9: Supabase Lead Log Node**

- Type: `HTTP Request`
- Method: POST
- URL: `{{ $credentials.supabaseUrl }}/rest/v1/leads`
- Headers:
  ```
  apikey: {{ $credentials.supabaseAnonKey }}
  Authorization: Bearer {{ $credentials.supabaseAnonKey }}
  Content-Type: application/json
  Prefer: return=minimal
  ```
- Body:
  ```json
  {
    "id": "{{ $('Set Fields').first().json.lead_id }}",
    "name": "{{ $('Set Fields').first().json.name }}",
    "email": "{{ $('Set Fields').first().json.email }}",
    "phone": "{{ $('Set Fields').first().json.phone }}",
    "business_type": "{{ $('Parse Claude').first().json.business_type }}",
    "message": "{{ $('Set Fields').first().json.message }}",
    "score": {{ $('Parse Claude').first().json.score }},
    "summary": "{{ $('Parse Claude').first().json.summary }}",
    "booked": {{ $('Parse Claude').first().json.book_call }}
  }
  ```

**Step 10: Internal Alert Email**

- Type: HTTP Request to Resend API
- To: `sameer@rajphotovideo.com`
- Subject: `New lead: {{ $('Set Fields').first().json.name }} ({{ $('Parse Claude').first().json.business_type }}) — Score {{ $('Parse Claude').first().json.score }}/5`
- Body: Full lead details + Claude summary + booking status + original message

**Connect Form to Webhook**

Add a hidden form field or JS fetch call in the landing page that POSTs form data to your N8N webhook URL on submission:

```html
<form id="contact-form">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <input type="tel" name="phone" />
  <select name="business_type">
    <option value="plumbing">Plumbing</option>
    <option value="hvac">HVAC</option>
    <option value="dental">Dental</option>
    <option value="real_estate">Real Estate</option>
    <option value="contracting">Contracting</option>
    <option value="other">Other</option>
  </select>
  <textarea name="message" required></textarea>
  <button type="submit">Send Message</button>
</form>

<script>
  document
    .getElementById("contact-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      await fetch("https://your-n8n.railway.app/webhook/lead-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // Show success message to user
      e.target.innerHTML =
        "<p>Thanks! Check your email — you'll hear from me within minutes.</p>";
    });
</script>
```

---

### Plan C: Testing & Polish

**Goal:** Workflow handles real inputs and edge cases without breaking.

**Test Sequence:**

1. **Happy path — high-fit lead:**
   - Submit form with a plumbing business, strong inquiry message
   - Expected: Score 4-5, confirmation email sent, internal alert sent, Supabase row created
   - Check all three outputs in N8N execution log

2. **Happy path — low-fit lead:**
   - Submit form with a vague message ("just curious")
   - Expected: Score 1-2, nurture email sent (not confirmation), booked=false in Supabase

3. **Missing phone number:**
   - Submit without phone field
   - Expected: Twilio node skipped (no error), everything else runs normally

4. **Claude API error:**
   - Temporarily use invalid API key
   - Expected: Parse Claude node catches error, uses fallback JSON, workflow continues
   - Restore valid key after test

5. **Duplicate submissions:**
   - Submit same email twice within 60 seconds
   - Expected: Two rows in Supabase (acceptable for PoC), two emails sent (document as known behavior)

6. **Long message input:**
   - Submit with 1,000+ character inquiry
   - Expected: Claude handles it, no truncation errors

**Edge Cases to Handle:**

| Edge Case                     | Current Behavior     | Fix                                                    |
| ----------------------------- | -------------------- | ------------------------------------------------------ |
| Phone with country code       | Twilio may reject    | Add E.164 normalization in Set Fields node             |
| Non-US business type          | Claude may score low | Acceptable for PoC — we target US local businesses     |
| Claude returns malformed JSON | Code node crashes    | Covered by try/catch in Parse Claude node              |
| Resend rate limit (100/day)   | Email fails silently | Add error notification to Sameer via alternative email |

**Monitoring Setup:**

- In N8N: Enable execution logging (Settings → Log Level → Info)
- Set up N8N error workflow: Workflow Settings → Error Workflow → create a simple workflow that emails Sameer when any execution fails
- Check Supabase table weekly to count leads and verify all rows have `score` populated (NULL score = Claude failed)

**Performance Baseline:**

- Expected latency from form submit to email received: 10-30 seconds
- Claude Haiku: ~1-3 seconds for qualification
- Resend delivery: ~5-15 seconds
- Total: under 30 seconds end-to-end

---

### Plan D: Documentation & Content

**Goal:** Written case study and video walkthrough that serve as sales assets.

#### Case Study Document

Write `content/case-studies/lead-follow-up-poc.md` with this structure:

**Before State (baseline to document before going live):**

- Response time: Manual, 2-24 hours (or never — if no one responds)
- Leads captured: Tracked manually (or not at all)
- Time spent on follow-up: Estimated hours per week
- Revenue at risk: Use formula: estimated missed leads/month × average client LTV

**After State (measure after 2-4 weeks live):**

- Response time: Under 30 seconds (automated)
- Leads captured: 100% of form submissions receive a reply
- Bookings generated: Count of calls booked via Google Calendar Appointment Scheduling
- Time freed: Hours not spent on manual follow-up

**Metrics Template:**

```
Before: Average response time = [X hours]
After:  Average response time = 23 seconds

Before: % of leads receiving follow-up = [X%] (often <50% for manual process)
After:  % of leads receiving follow-up = 100%

Before: Time spent on lead follow-up = [X hours/week]
After:  Time spent = 0 hours/week (fully automated)

Before: Estimated leads lost to slow response = [X/month]
After:  Estimated leads lost = 0 (every lead gets an immediate reply)
```

**ROI Calculation for Case Study:**

```
If average client LTV = $1,200
And we recover 3 leads/month that would have gone cold:
Monthly recovered revenue = $3,600
Cost of automation: $0 (running on free/low-cost tiers)
Annual recovered revenue: $43,200
```

Even if the "before" numbers are estimated (not real historical data), document the methodology and be transparent that this is the agency's own PoC.

#### Video Walkthrough Script (3-5 minutes)

**Recording tools:** OBS Studio (screen capture) + iPhone or webcam (talking head)

**Script outline:**

```
[0:00-0:30] Hook
"Every time a local business owner doesn't respond to a lead within 5 minutes,
there's a 10x drop in their chance of closing it. Most businesses respond in
hours — or not at all. Here's how I automated that entirely for my own agency."

[0:30-1:30] The Problem
Show: a typical lead inquiry coming in via email. Walk through the manual process —
open email, think of a reply, maybe schedule a call, maybe forget. "This is what
every small business does. And every minute of delay costs them money."

[1:30-3:00] The Demo
Open N8N. Show the workflow (zoom in on each node briefly).
Trigger a live test submission (use a dummy lead via the form).
Show in real time:
  - Form submission
  - N8N execution running (watch the nodes light up green)
  - Email arriving in inbox (< 30 seconds)
  - Supabase showing the new row
  - Claude's qualification score and reply visible in N8N logs

[3:00-4:00] The Results
"Here's what this means: every lead that comes in gets an AI-written,
personalized reply in under 30 seconds. It knows their business type.
It sounds like me. And it books a call automatically."
Show before/after stats on screen.

[4:00-4:30] CTA
"If you want this for your business — plumbing, HVAC, dental, real estate —
book a free call and I'll show you what it looks like for your specific situation."
Show [Google Calendar booking link]. End on face/logo.
```

**Recording checklist:**

- [ ] OBS configured: capture N8N browser window + audio
- [ ] N8N workflow open and ready for live demo
- [ ] Test form open in another tab
- [ ] Supabase table open in another tab
- [ ] Resend activity log open in another tab
- [ ] Clean desktop (no notifications)
- [ ] Quiet room, good mic
- [ ] Record at 1080p minimum
- [ ] Edit in Descript: remove filler words, add captions, add title card

---

## 5. Technical Details

### N8N

| Item            | Detail                                                                       |
| --------------- | ---------------------------------------------------------------------------- |
| Hosting         | Railway (official N8N template)                                              |
| URL             | `https://[project].up.railway.app`                                           |
| Auth            | Basic auth (username + password)                                             |
| Webhook path    | `/webhook/lead-intake`                                                       |
| Workflow export | Export JSON after build → commit to `templates/lead-follow-up/workflow.json` |
| Cost            | Railway hobby: $5/mo                                                         |

### Claude API (Anthropic)

| Item            | Detail                                                                          |
| --------------- | ------------------------------------------------------------------------------- |
| Model           | `claude-haiku-4-5-20251001` (fast, cheap, sufficient for classification)        |
| Endpoint        | `https://api.anthropic.com/v1/messages`                                         |
| Purpose         | Lead qualification (score 1-5, extract business type, draft personalized reply) |
| Tokens per call | ~300 input + ~200 output = ~500 tokens/lead                                     |
| Cost per lead   | ~$0.0005 (fraction of a cent per lead at Haiku pricing)                         |
| Error handling  | Try/catch in Parse node, fallback JSON on parse failure                         |

### Resend

| Item            | Detail                                              |
| --------------- | --------------------------------------------------- |
| Sending domain  | `rajphotovideo.com` (or `sameerautomations.com`)    |
| From address    | `sameer@rajphotovideo.com`                          |
| API endpoint    | `https://api.resend.com/emails`                     |
| Auth            | Bearer token in Authorization header                |
| Free tier       | 3,000 emails/mo, 100/day (more than sufficient)     |
| Emails per lead | 2 (confirmation to lead + internal alert to Sameer) |

### Twilio SMS

| Item      | Detail                                                           |
| --------- | ---------------------------------------------------------------- |
| Use       | Optional SMS to lead (if phone provided)                         |
| Endpoint  | `https://api.twilio.com/2010-04-01/Accounts/{SID}/Messages.json` |
| Auth      | HTTP Basic (Account SID + Auth Token)                            |
| Cost      | ~$0.0079/SMS + $1/mo for the number                              |
| Format    | Plain text, include STOP opt-out                                 |
| Condition | Only fires if `phone` field is not empty                         |

### Google Calendar Appointment Scheduling

| Item         | Detail                                                                |
| ------------ | --------------------------------------------------------------------- |
| Plan         | Included in Google Workspace (already have it)                        |
| Backend      | Google Calendar (native)                                              |
| Event type   | "Discovery Call — 30 min"                                             |
| Booking link | [Google Calendar booking link — set up in Phase 2]                    |
| PoC approach | Send link in email (vs. programmatic API booking)                     |
| API          | Google Calendar API available for future automation of slot selection |

### Supabase

| Item      | Detail                                                        |
| --------- | ------------------------------------------------------------- |
| Plan      | Free (500MB)                                                  |
| Table     | `leads`                                                       |
| Purpose   | Persistent log of all leads, scores, booking status           |
| Access    | REST API via anon key                                         |
| RLS       | Disable for PoC (internal table, no public access)            |
| Later use | Build simple dashboard from this table for case study metrics |

---

## 6. Risk & Mitigations

| Risk                             | Likelihood | Impact                                     | Mitigation                                                                                                 |
| -------------------------------- | ---------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Resend domain verification fails | Medium     | Blocks email sending                       | Have a fallback: use Gmail SMTP via N8N until domain verified                                              |
| Railway N8N deploy fails         | Low        | Blocks everything                          | Alternative: Render.com (has N8N template too) or local N8N + ngrok for PoC testing                        |
| Claude API rate limits           | Low        | Slows qualification                        | Haiku has high rate limits; add 1-second delay node if needed                                              |
| Google Calendar API complexity   | Low        | Minimal — link-based approach used for PoC | Use Google Calendar Appointment Scheduling link (send URL) for PoC; Google Calendar API booking is Phase 3 |
| Twilio number blocked            | Low        | SMS fails                                  | SMS is optional in PoC; email confirmation is the primary path                                             |
| N8N workflow crashes mid-run     | Low        | Lead lost                                  | Enable N8N execution logging; set up error workflow to alert Sameer                                        |
| Webhook URL exposed publicly     | Medium     | Spam submissions                           | Add a simple secret token check at the top of the workflow (IF header token != expected, stop)             |
| No real leads during testing     | Medium     | No case study data                         | Use test submissions; document test data as "simulated leads" in case study if needed                      |
| Form submits but N8N is down     | Low        | Silent failure                             | Add Railway uptime monitoring (Railway has built-in health checks); email Sameer on failure                |

### Spam Protection for Webhook

Add at the top of the N8N workflow, after the Webhook node:

```
IF node: Check for secret token
  Condition: {{ $json.headers['x-webhook-secret'] }} equals {{ $env.WEBHOOK_SECRET }}
  True path: continue
  False path: Stop And Error node
```

In the form JavaScript, add the header:

```javascript
headers: {
  'Content-Type': 'application/json',
  'x-webhook-secret': 'your-secret-here'
}
```

---

## 7. Verification Checklist

How to confirm each success criterion is fully met before calling Phase 2 complete.

### POC-01: Automation is built and working

- [ ] Submit a test lead via the contact form on the landing page
- [ ] Confirm N8N execution log shows all nodes ran successfully (no red nodes)
- [ ] Confirm Claude qualification ran and returned a valid score (1-5)
- [ ] Confirm personalized email arrives in test inbox within 60 seconds
- [ ] Confirm Supabase `leads` table has a new row with correct data
- [ ] Submit a second lead with no phone number — confirm workflow completes without error
- [ ] Confirm internal alert email arrives at `sameer@rajphotovideo.com`

### POC-02: Stack verification

- [ ] N8N is self-hosted on Railway (not N8N cloud, not Zapier)
- [ ] Claude API (Anthropic) is the LLM used for qualification (not OpenAI)
- [ ] Resend is the email delivery service (not SendGrid, not SMTP only)
- [ ] Google Calendar Appointment Scheduling booking link is in the confirmation email
- [ ] Twilio sends SMS (at least verified in test mode, even if not required for every lead)

### POC-03: Case study exists

- [ ] `content/case-studies/lead-follow-up-poc.md` exists
- [ ] Document has before/after response time numbers
- [ ] Document has before/after lead capture rate
- [ ] Document has estimated revenue recovered calculation
- [ ] Numbers are sourced from actual Supabase data OR clearly labeled as estimates/projections

### POC-04: Video walkthrough recorded

- [ ] Video is 3-5 minutes long
- [ ] Video shows the N8N workflow
- [ ] Video includes a live demo of form submission → email received
- [ ] Video includes before/after metrics
- [ ] Video ends with a CTA (book a call)
- [ ] Video is exported at 1080p or higher
- [ ] Video is ready to upload to YouTube and embed on landing page

### Phase Gate Check

Before calling Phase 2 complete and moving to Phase 3, confirm:

- [ ] The automation has processed at least 3 real or test leads without manual intervention
- [ ] Case study is written and includes at least two quantified before/after metrics
- [ ] Video is recorded, edited, and exported (not just planned)
- [ ] N8N workflow JSON is exported and committed to `templates/lead-follow-up/workflow.json`
- [ ] All credentials are stored in Railway environment variables (not hardcoded in N8N nodes)

---

## File Structure (after Phase 2 complete)

```
agency/
├── templates/
│   └── lead-follow-up/
│       ├── workflow.json          ← N8N workflow export
│       ├── README.md              ← What this is, how to configure it
│       └── prompt-template.md     ← Claude qualification prompt (standalone)
├── content/
│   └── case-studies/
│       └── lead-follow-up-poc.md  ← Before/after case study
└── .planning/
    └── phase-2/
        ├── PLAN.md                ← This file
        └── STATE.md               ← Track execution progress
```

---

_Phase 2 plan written: 2026-02-27_
_Execution begins after Phase 1 (brand + foundation) is complete_
