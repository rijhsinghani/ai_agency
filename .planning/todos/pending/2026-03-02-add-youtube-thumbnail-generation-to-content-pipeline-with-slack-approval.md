---
created: 2026-03-02T17:46:31.820Z
title: Add YouTube thumbnail generation to content pipeline with Slack approval
area: tooling
files:
  - .claude/skills/youtube-thumbnail/SKILL.md
  - .claude/skills/youtube-thumbnail/scripts/generate_thumbnail.py
  - .claude/skills/youtube-thumbnail/scripts/combine_thumbnails.py
  - .claude/skills/youtube-thumbnail/scripts/search_examples.py
---

## Problem

The claude-thumbnails skill (using Gemini 3.1 Flash Image via `generate_thumbnail.py`) produces professional YouTube thumbnails through a multi-step workflow: search competing thumbnails, design 4 concepts with different desire-loop angles, generate all 4 in parallel, create a comparison grid, and iterate on the chosen direction. Currently this runs manually via `/youtube-thumbnail` in Claude Code.

This needs to be integrated into the automated content distribution pipeline so that:

1. Thumbnail generation triggers automatically when a new video is ready for publishing
2. The 4-concept comparison grid gets posted to a Slack channel for review/approval
3. The approved thumbnail is uploaded to YouTube via the Data API

The Slack approval step is critical — Sameer wants to pick from the 4 options (or request iterations) before the thumbnail goes live. This mirrors the existing content approval pattern planned for Phase 10.

## Solution

### Integration approach

1. **Trigger**: When a new video enters the publishing queue (content-engine or n8n workflow), extract the video title/topic
2. **Generate**: Run the thumbnail skill's 4-concept workflow — search examples, craft prompts, generate via Gemini 3.1, create comparison grid
3. **Slack approval**: Post the comparison grid image to a dedicated Slack channel with interactive buttons (A/B/C/D/Iterate)
4. **Iterate loop**: If "Iterate" selected, generate refined version based on Slack thread feedback, re-post for approval
5. **Upload**: Once approved, upload selected thumbnail to YouTube via Data API v3 (`thumbnails.set` endpoint)

### Key components

- Wrap `generate_thumbnail.py` and `combine_thumbnails.py` as callable services (not just CLI scripts)
- Slack Block Kit message with the comparison grid image and approval buttons
- YouTube Data API thumbnail upload (requires OAuth2 with `youtube.upload` scope)
- n8n workflow node or content-engine integration point

### Dependencies

- Gemini API key (already configured)
- ScrapCreators API key (already configured)
- Slack workspace + bot with image upload permissions
- YouTube Data API OAuth2 credentials with upload scope
- Phase 10 content pipeline architecture decisions
