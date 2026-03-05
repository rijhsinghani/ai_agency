---
phase: 12
slug: social-content-optimization
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-05
---

# Phase 12 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property               | Value                                                             |
| ---------------------- | ----------------------------------------------------------------- |
| **Framework**          | Manual + puppeteer render verification                            |
| **Config file**        | research/tools/carousel-generator/package.json (to be created)    |
| **Quick run command**  | `node research/tools/carousel-generator/index.js --dry-run`       |
| **Full suite command** | `node research/tools/carousel-generator/index.js --all --preview` |
| **Estimated runtime**  | ~15 seconds                                                       |

---

## Sampling Rate

- **After every task commit:** Verify output files exist and are non-empty
- **After every plan wave:** Run full suite command, visual check previews
- **Before `/gsd:verify-work`:** All 10 social drafts rewritten, all carousels rendered, all flow diagrams exported
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID  | Plan | Wave | Requirement              | Test Type   | Automated Command                                      | File Exists | Status     |
| -------- | ---- | ---- | ------------------------ | ----------- | ------------------------------------------------------ | ----------- | ---------- |
| 12-01-01 | 01   | 1    | Content rewrite          | manual      | Visual review of .md files                             | ❌ W0       | ⬜ pending |
| 12-01-02 | 01   | 1    | DM CTAs + hashtags       | manual      | grep for keyword triggers in drafts                    | ❌ W0       | ⬜ pending |
| 12-02-01 | 02   | 1    | Carousel generator CLI   | integration | `node index.js --guide missed-call-textback --preview` | ❌ W0       | ⬜ pending |
| 12-02-02 | 02   | 1    | Carousel PNG output      | integration | Check output/\*.png exist and >10KB                    | ❌ W0       | ⬜ pending |
| 12-03-01 | 03   | 1    | Flow diagram export      | integration | `node index.js --diagrams --all`                       | ❌ W0       | ⬜ pending |
| 12-03-02 | 03   | 1    | Square + landscape sizes | integration | Check output dimensions match 1080x1080 / 1200x675     | ❌ W0       | ⬜ pending |

_Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky_

---

## Wave 0 Requirements

- [ ] `research/tools/carousel-generator/package.json` — puppeteer dependency
- [ ] `research/tools/carousel-generator/index.js` — CLI entrypoint

_Existing guide-generator infrastructure covers puppeteer patterns._

---

## Manual-Only Verifications

| Behavior                           | Requirement        | Why Manual                       | Test Instructions                                   |
| ---------------------------------- | ------------------ | -------------------------------- | --------------------------------------------------- |
| Hook quality matches Hormozi style | Content rewrite    | Subjective copy quality          | Read each hook, compare to CONTEXT.md hook formulas |
| Carousel visual design quality     | Carousel generator | Subjective design quality        | Open preview PNGs, verify dark high-contrast style  |
| Brand voice compliance             | All drafts         | No automated brand voice checker | Read drafts, verify no banned phrases/emojis        |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
