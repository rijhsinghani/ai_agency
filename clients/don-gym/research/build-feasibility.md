# Build Feasibility Research — Don Gym Client Project

**Researched:** 2026-05-23
**Researcher:** Claude (Sonnet 4.6) via WebSearch + WebFetch

---

## 1. WellnessLiving API Access

### Verdict: YES — API exists, but it is GATED (not self-serve)

**Key fact for deliverability:** Getting API credentials requires signing an NDA and an API Agreement with WellnessLiving. There is no self-service developer portal signup. The access process is:

1. Contact WellnessLiving Account Executive (new customers) or email support@wellnessliving.com (existing customers)
2. Complete an API Access Questionnaire
3. Sign NDA + API Agreement
4. Credentials granted within 24–48 hours after agreements are finalized

This means the **gym owner (or their consultant) must initiate this process before any API-driven work can begin**. There is no instant credentialing — a timeline of 1–5 business days minimum should be assumed. No indication of a partner/enterprise tier requirement beyond the agreement; it appears available to any paying WellnessLiving customer willing to sign.

**What data is accessible via API:**

- Client Management (profiles, info)
- Appointment Scheduling
- Class Management
- Staff Management
- Sales and Purchases (transactions, inventory)
- Financial integration (QuickBooks-compatible — revenue/accounting data is accessible)

Membership status and revenue data fall under "Sales and Purchases" + "Memberships" endpoints per the API doc categories.

**One-time data export (fallback alternative):**
YES — WellnessLiving has a native export feature. From any report screen: click Export → choose CSV / Excel / PDF. Available reports include:

- Memberships Report (active, on hold, expired, cancelled, converted — filterable by date range)
- Projected Revenue Report
- Detailed Revenue by Service Report
- Service Revenue Summary Report
- Lifetime Value & Visit Milestones Report (added May 2025)

If API agreement takes too long or is blocked, the **CSV export path is a viable fallback** for initial data ingestion or dashboard population (manual refresh vs. live feed).

**Implication for solo consultant:** Deliverable is feasible, but you must have the gym owner kick off the API agreement process on Day 1 of the engagement. Do not design the dashboard as API-live until credentials are confirmed in hand. Plan for CSV-import fallback in v1 if needed.

**Sources:**

- https://help.wellnessliving.com/en/articles/10697645-getting-started-with-the-wellnessliving-api
- https://www.wellnessliving.com/developer-portal/getting-started/introduction/
- https://help.wellnessliving.com/en/articles/9655038-memberships-report
- https://www.wellnessliving.com/knowledge-sharing/knowledge-base/exporting-a-report/
- https://apidoc.wellnessliving.io/ (live API docs, Feb 2026 version)

---

## 2. Squarespace Technical Limits

### (a) robots.txt — CANNOT edit directly; limited bulk control only

**Verdict: NO direct editing.** Squarespace generates the robots.txt file automatically. Users cannot edit the raw file. The only control is via Settings > Crawlers, which offers two checkboxes:

- Block all known AI crawlers (as a group)
- Block all search engines (as a group)

No granular per-crawler allow/disallow rules. No way to add, say, a single `User-agent: GPTBot / Disallow: /members/` line without affecting all AI crawlers.

**Implication:** If the deliverable requires fine-grained crawler control (e.g., allow Googlebot but block GPTBot), Squarespace cannot do it. The only option is "all AI on" or "all AI off."

### (b) JSON-LD / Schema.org structured data — YES, works well

**Verdict: YES.** Two methods:

- **Global (site-wide):** Settings > Advanced > Code Injection > paste JSON-LD in the `<head>` section
- **Page-specific:** Add a Code Block directly in the page editor and paste the JSON-LD `<script type="application/ld+json">` snippet

Squarespace does output some automatic structured data for blog posts, but it is not editable. Custom JSON-LD via Code Injection or Code Blocks gives full control and is the standard approach.

**Plan tier required:** Code Injection requires the **Core plan** (new 2025 plan structure) or **Business plan** (legacy structure). The **Basic** (new) or **Personal** (legacy) plans do NOT include Code Injection. If the gym is on a Personal/Basic plan, they must upgrade. Core/Business is the minimum.

### (c) llms.txt at /llms.txt — NOT natively supported, but workable workaround exists

**Verdict: NOT natively possible.** Squarespace does not allow arbitrary files at the domain root. Uploaded files are stored under `/s/` (e.g., `/s/llms.txt`), not `/llms.txt`.

**Workaround that works:** Upload the `llms.txt` content as a file → configure a permanent redirect from `/llms.txt` → `/s/llms.txt`. Result: AI systems and humans hitting `/llms.txt` are 301-redirected to the correct file. This is the approach confirmed working by at least one practitioner (Kenny Kane, kenny-kane.com). It is a kludge, not a native feature.

**Implication for solo consultant:** JSON-LD is straightforward and well-supported. robots.txt is limited but the bulk "block AI crawlers" switch is sufficient for most gym use cases. llms.txt requires the redirect workaround — doable in 10 minutes once the file is written. Verify the gym is on Core/Business plan or budget for an upgrade.

**Sources:**

- https://www.beyondspace.studio/qanda/which-squarespace-plans-include-code-injection-in-2025
- https://www.collaborada.com/blog/robots-txt-guide
- https://kenny-kane.com/blog/llms-txt
- https://forum.squarespace.com/topic/338265-llmstxt-files-on-squarespace-sites/
- https://jsonschemaapp.com/blog/squarespace-schema-guide-implementing-structured-data/

---

## 3. GoHighLevel (GHL) Capabilities

### Verdict: YES — all listed capabilities are native to the platform

GHL is confirmed as a single platform (not Zapier-dependent) supporting all of the following:

| Capability                        | Native in GHL? | Notes                                                     |
| --------------------------------- | -------------- | --------------------------------------------------------- |
| CRM / Pipelines                   | Yes            | Full deal pipeline, contact records                       |
| Two-way SMS                       | Yes            | Usage-billed; not flat-rate                               |
| Missed-call text-back             | Yes            | Auto-SMS within 15 seconds of missed call                 |
| Email sending                     | Yes            | Built-in email campaigns + sequences                      |
| Web forms                         | Yes            | Forms, surveys, quizzes native                            |
| Instagram DM integration          | Yes            | Unified inbox with SMS, email, IG DM, WhatsApp, live chat |
| Google Business Profile messaging | Yes            | GBP messaging + call tracking via dual-number setup       |
| Workflow automation               | Yes            | Visual workflow builder, triggers, branches               |

**GBP and Instagram asterisks:** Both are native but require connecting the gym's GBP account and Instagram Business account through GHL's integrations panel. Instagram DM requires a Meta Business account in good standing. GBP messaging integration requires GBP verified and connected. These are account-linking steps, not platform capability gaps.

**Pricing (2025–2026):**

- **Starter:** $97/month — solo/small team, core CRM + marketing features
- **Unlimited:** $297/month — agency use, unlimited sub-accounts, API access
- **Agency Pro (SaaS mode):** $497/month — white-label, reseller

For a single gym client (sub-account), the **Starter at $97/mo is sufficient** for all listed features. If you (the consultant) are managing multiple clients, the Unlimited plan at $297/mo gives unlimited sub-accounts.

**Important 2026 note:** GHL posted route pricing updates effective May 13, 2026 — US carrier fees for SMS increased. SMS is usage-based; plan accordingly for high-volume texting scenarios.

**Implication for solo consultant:** GHL is the right single-platform choice for this stack. All capabilities are native. Budget for SMS usage costs on top of the subscription. Connecting IG and GBP requires the gym owner to grant access to their Meta/Google accounts — plan for a 30-minute onboarding call to connect integrations.

**Sources:**

- https://www.gohighlevel.com/
- https://autogencrm.com/gohighlevel-features/
- https://netpartners.marketing/gohighlevel-review-2026-full-platform-breakdown-honest-verdict/
- https://help.gohighlevel.com/support/solutions/articles/48001179764-call-tracking-and-missed-call-text-back-through-google-business-profile
- https://autogencrm.com/gohighlevel-sms-pricing/

---

## 4. 10DLC Registration

### Verdict: YES — mandatory, carrier filtering is active, ~3–15 business days, GHL handles submission

**10DLC is now fully enforced.** As of February 1, 2025, unregistered A2P 10DLC traffic is **blocked** (not just filtered) by US carriers. This is a hard requirement, not a best practice.

**Two-part registration:**

1. **Brand Registration** — register the business entity (matches IRS/EIN records exactly). Takes minutes to 1–2 days.
2. **Campaign Registration** — register the specific SMS use case (e.g., "appointment reminders," "marketing offers"). Currently takes **3–15 business days** (3 days with the fast-track option GHL includes; up to 15 days due to volume backlog at TCR as of 2025).

**Carrier filtering:** T-Mobile and other major carriers actively filter/block unregistered traffic. Unregistered senders also face increased per-message carrier surcharges on top of blocked delivery.

**Reseller/consultant note (2025 enforcement):** If registering on behalf of the gym (another legal entity), you must include a **reseller ID** during campaign registration. This requirement was strictly enforced starting in 2025 and cannot be modified post-registration.

**GHL handles submission:** Yes. GHL (via its LeadConnector integration) submits brand and campaign information to TCR on the gym's behalf through the Trust Center in the GHL dashboard. The gym owner provides business details; GHL does the filing.

**Fees via GHL:**

- Low Volume Standard registration: **$24.50 one-time** (includes $3 fast-track fee for ~3 business day approval)
- High Volume Standard: $71.91 one-time
- Campaign maintenance: up to $11.03/month ongoing

**Implication for solo consultant:** This is Day 1 work — file 10DLC registration the moment GHL sub-account is created. A 3-business-day fast-track timeline means SMS cannot be live at kickoff; plan a 1-week buffer before any SMS workflows go live. If you are submitting on behalf of the gym (consultant-managed account), confirm you include a reseller ID or have the gym owner submit under their own entity.

**Sources:**

- https://help.gohighlevel.com/support/solutions/articles/48001225526-a2p-standard-brand-registration-for-10dlc
- https://help.leadconnectorhq.com/support/solutions/articles/155000006428-what-is-a2p-10-dlc-brand-and-campaign-registration
- https://callhub.io/blog/compliance/10dlc-2025-registration-callhub/
- https://www.twilio.com/docs/messaging/compliance/a2p-10dlc
- https://cloudcontactai.com/10dlc-registration-and-regulation-recent-update/

---

## Summary Table

| Question               | Answer                                                                                                    | Deliverability Risk                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| WellnessLiving API     | Exists, gated behind NDA/agreement (24–48h after signing). CSV export is self-serve fallback.             | Low — manageable with Day 1 kickoff. Have gym owner start the process immediately. |
| Squarespace robots.txt | No direct edit. Bulk AI-crawler toggle only.                                                              | Low for most use cases. Cannot do per-crawler granular rules.                      |
| Squarespace JSON-LD    | Yes, via Code Injection / Code Blocks. Requires Core/Business plan or higher.                             | Low if on right plan. Check their current plan at kickoff.                         |
| Squarespace llms.txt   | Not native. Workaround: upload file + 301 redirect from /llms.txt to /s/llms.txt.                         | Low — 10-minute workaround.                                                        |
| GHL full feature set   | All listed features confirmed native in one platform.                                                     | None — platform can deliver the full stack.                                        |
| GHL pricing            | $97/mo Starter (single client). $297/mo Unlimited (agency multi-client).                                  | None — cost is clear.                                                              |
| 10DLC                  | Mandatory, enforced since Feb 2025. GHL submits to TCR. 3–15 business days approval. $24.50 one-time fee. | Low — but start Day 1. Do not promise SMS workflows at project kickoff.            |
