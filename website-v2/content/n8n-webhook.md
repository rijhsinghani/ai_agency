# n8n Webhook — Landing Page Lead Capture

## Status

**NEEDS CREATION.** No `n8n-mcp` tool is available in this agent session, and there is no existing webhook confirmed for a "landing page form" / "contact form" / "lead capture" on `hooks.rajphotovideo.com`. The host itself is reachable (returns 200), but an authenticated MCP probe of the workflow list was not possible from here. The shipper should create this webhook explicitly before cutover.

## Proposed endpoint

```
POST https://hooks.rajphotovideo.com/webhook/sameer-automations-lead
```

- Host: `hooks.rajphotovideo.com` (existing n8n instance, reused across Raj Photo Video infrastructure)
- Path: `/webhook/sameer-automations-lead` (distinct from any studio-os booking webhooks so it can be monitored and rate-limited independently)
- Method: `POST`
- Content-Type: `application/json`
- Auth: unauthenticated public webhook gated by Cloudflare Turnstile on the client side plus n8n-side rate limiting (10 req / IP / minute). No bearer token in the browser.

## Request schema

```json
{
  "name": "string, required, 2-80 chars",
  "email": "string, required, valid email",
  "business_type": "string, required, one of: dental, salon, trades, gym, real_estate, cleaning, law, tutoring, other",
  "biggest_pain_point": "string, required, 10-500 chars",
  "consent": "boolean, required, must be true",
  "source": "string, optional, defaults to 'sameerautomations.com'",
  "utm_source": "string, optional",
  "utm_medium": "string, optional",
  "utm_campaign": "string, optional",
  "submitted_at": "ISO8601 timestamp, optional, server will stamp if missing"
}
```

## Expected response

```json
{ "ok": true, "id": "<n8n execution id>" }
```

On validation failure:

```json
{ "ok": false, "error": "<human-readable reason>" }
```

## Downstream n8n flow (to be built by shipper)

1. Webhook trigger (POST above)
2. Field validation (drop request if consent !== true, email invalid, or pain_point < 10 chars)
3. Append row to a Google Sheet `Sameer Automations - Leads` (columns matching schema)
4. Send Slack message to `#claude` with name, business_type, email, and first 200 chars of pain_point
5. Send confirmation email to the submitter from `sameer@rajphotovideo.com` via Resend ("Got your note, I'll reply within 24 hours")
6. Return `200 { ok: true, id }`

## What the shipper should do

1. Use `n8n-mcp` (available in the main agent session) to create a new workflow named `Sameer Automations - Lead Capture`.
2. Configure the webhook node with the path above.
3. Wire the downstream nodes per the list above.
4. Activate the workflow.
5. Update `website-v2/.env.production` with `N8N_LEAD_WEBHOOK_URL=https://hooks.rajphotovideo.com/webhook/sameer-automations-lead`.
6. Test with a curl POST of the schema before cutover.

## Why this was not created during content extraction

The content extractor agent did not have `n8n-mcp` in its toolset. Creating a live webhook without MCP would require raw API access and is out of scope for this phase. Documenting the exact schema keeps the shipper's work purely mechanical.
