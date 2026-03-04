---
phase: 10-automated-content-preparation-distribution-pipeline
plan: "04"
subsystem: api
tags: [n8n, slack, block-kit, supabase, webhook, approval-workflow]

# Dependency graph
requires:
  - phase: 10-01
    provides: content_bank table schema, status values, platform_angles JSONB structure
  - phase: 10-03
    provides: content pipeline AI generation flow writing to content_bank

provides:
  - n8n workflow JSON (slack-approval.json) for Slack Block Kit content approval
  - Supabase pending_review trigger → #content-pipeline Block Kit message
  - Slack interactive button webhook handler with 3-second response pattern
  - Approve All / Approve Selected / Reject routing to Supabase status updates
  - Publishing handoff placeholder Set node for future platform-publishers connection

affects:
  - 10-05 (platform publishers — connects to this workflow's handoff node)
  - content_bank status lifecycle (pending_review → approved/rejected)

# Tech tracking
tech-stack:
  added:
    - n8n-nodes-base.supabaseTrigger (pending_review filter)
    - n8n-nodes-base.respondToWebhook (3-second timeout pattern)
    - Slack Block Kit (4-block message: header + image + section + actions)
  patterns:
    - Respond-to-webhook-first: respondToWebhook node MUST fire before any downstream DB operations to satisfy Slack's 3-second interactive callback timeout
    - URL-encoded payload decode: Slack sends callbacks as application/x-www-form-urlencoded with a JSON payload field; Set node uses JSON.parse($json.body.payload) to extract action_id and content_bank_id
    - 4-block Block Kit message: header + image + section + actions = 4 blocks (well under 50-block Slack limit)

key-files:
  created:
    - content-engine/n8n-workflows/slack-approval.json
  modified: []

key-decisions:
  - "respondToWebhook fires before Supabase: Flow 2 order is webhook → respondToWebhook → parse → switch → supabase; violating this causes Slack 'Operation failed' error"
  - "Approve Selected = Approve All in v1: simplified to same handler; v2 backlog item for Slack modal with per-platform checkboxes"
  - "Edit in Sheets uses url button type (no callback): opens Google Sheets directly without sending callback to n8n webhook; no handler needed"
  - "Block Kit message is 4 blocks: header + image + section + actions — deliberately lean, full drafts accessible via Edit in Sheets button"
  - "Publishing handoff is placeholder Set node: stores content_bank_id + trigger metadata; connect to Execute Workflow node for platform-publishers when ready"

patterns-established:
  - "Slack interactive callback decode: JSON.parse($json.body.payload) in Set node extracts action_id, value (content_bank_id), user.name, channel.id"
  - "Confirmation message is separate Slack post: sent AFTER respondToWebhook fires, using channel_id captured from callback payload"

requirements-completed: [SC-5, SC-6]

# Metrics
duration: 2min
completed: "2026-03-04"
---

# Phase 10 Plan 04: Slack Approval Workflow Summary

**n8n Slack Block Kit approval workflow — pending_review trigger sends 4-block interactive message to #content-pipeline; button callbacks handled with respondToWebhook-first pattern updating Supabase status to approved/rejected**

## Performance

- **Duration:** ~2 min (Task 1 automated)
- **Started:** 2026-03-04T23:23:26Z
- **Completed:** 2026-03-04T23:25:03Z (Task 1); Task 2 pending human checkpoint
- **Tasks:** 1 of 2 complete (Task 2 = human-verify checkpoint)
- **Files modified:** 1

## Accomplishments

- Complete n8n workflow JSON with two logical flows in a single importable file
- Flow 1: Supabase trigger on pending_review → 4-block Slack Block Kit message (header + thumbnail image + content preview section + 4-button actions)
- Flow 2: Webhook callback handler with respondToWebhook node as first action (3-second timeout pattern), then parse + switch + Supabase update + confirmation message
- All 4 buttons implemented: Approve All, Approve Selected (v1 = Approve All), Edit in Sheets (url button), Reject
- Credential placeholders ready for n8n credential binding; webhook URL registration instructions in workflow notes

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Slack approval n8n workflow JSON** - `280cd36` (feat)
2. **Task 2: Manual Slack App setup + verify** - PENDING (human-verify checkpoint)

**Plan metadata:** (committed after checkpoint resolution)

## Files Created/Modified

- `content-engine/n8n-workflows/slack-approval.json` — Complete n8n workflow: Supabase pending_review trigger, Block Kit message sender, webhook callback handler, respondToWebhook immediate response, action_id switch router, Supabase status updaters (approved/rejected), publishing handoff placeholder, Slack confirmation messages

## Decisions Made

- **respondToWebhook fires first**: The critical 3-second timeout pattern — `respondToWebhook` is connected directly after the `webhook` node before any Supabase operations. Documented as `CRITICAL` in node notes.
- **Approve Selected simplified to Approve All in v1**: Platform-selection modal requires additional Slack API complexity; deferred to v2 backlog. Documented in workflow notes.
- **Edit in Sheets uses `url` button type**: Opens Google Sheets directly without a callback; no webhook handling needed for this action. Documented in Switch node notes.
- **4-block Block Kit message**: header + image + section + actions = 4 blocks. Deliberately lean — full platform drafts accessible via the Edit in Sheets link. Well under Slack's 50-block limit.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

External Slack App and n8n credential configuration required before the workflow can run.

Setup steps documented in the workflow's `notes` field:

1. Create Slack App at https://api.slack.com/apps (name: "Content Pipeline Bot")
2. Add Bot Token Scopes: `chat:write`, `chat:write.public`
3. Install app to workspace → copy Bot Token (xoxb-...)
4. Create `#content-pipeline` channel → invite bot
5. Import `slack-approval.json` into n8n
6. Add Slack credential (n8n → Credentials → New → Slack OAuth2 API → paste Bot Token)
7. Configure Supabase credential (already done from Plan 01)
8. Set `YOUR_SLACK_CHANNEL_ID_HERE` in the "Flow 1: Send Slack Approval Message" node
9. Copy the Webhook URL from the "Flow 2: Receive Slack Button Callback" node
10. Slack App → Interactivity & Shortcuts → Enable → paste webhook URL → Save
11. Activate workflow
12. Test: set any content_bank row status to `pending_review` → expect Block Kit message in #content-pipeline within 60 seconds

Required credentials:

- `SLACK_BOT_TOKEN` (xoxb-...) from Slack App → OAuth & Permissions
- `SLACK_CHANNEL_ID` for #content-pipeline channel
- `SLACK_SIGNING_SECRET` from Slack App → Basic Information (for future request verification)

## Next Phase Readiness

- `slack-approval.json` importable into n8n — all nodes, connections, and credential placeholders in place
- Publishing handoff node (`Flow 2: Handoff to Publishing Workflow`) ready to connect to platform-publishers Execute Workflow node when Phase 10-05 is built
- Task 2 checkpoint requires Slack App creation, n8n credential binding, and end-to-end button test before this plan is fully complete

---

_Phase: 10-automated-content-preparation-distribution-pipeline_
_Completed: 2026-03-04 (Task 1); Task 2 pending_
