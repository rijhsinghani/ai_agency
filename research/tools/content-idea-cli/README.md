# Content idea CLI

Generate content topic suggestions from local research data. Reads topic-bank.md, content-plan.md, and package files — no network, no API keys, no installation required.

## Installation

Run directly from the repo root with npx:

```
npx ./research/tools/content-idea-cli
```

Or install globally for the current project:

```
cd research/tools/content-idea-cli
npm link
sameer-ideas
```

Note: macOS and Linux only. Requires Node.js v20+.

## Flags

| Flag      | Short | Description                                       | Default |
| --------- | ----- | ------------------------------------------------- | ------- |
| --count   | -c    | Number of topics to return                        | 5       |
| --focus   | -f    | Filter by vertical keyword (hvac, plumbing, etc.) | none    |
| --format  | -m    | Output format: youtube, twitter, carousel         | youtube |
| --verbose |       | Show scores, penalties, and de-dup reasons        | off     |

## Examples

Return 5 topics (default):

```
npx ./research/tools/content-idea-cli
```

Return all 12 topics:

```
npx ./research/tools/content-idea-cli --count 12
```

Filter to HVAC-relevant topics with verbose scoring:

```
npx ./research/tools/content-idea-cli --focus hvac --verbose
```

Get 3 Twitter-format hooks:

```
npx ./research/tools/content-idea-cli --count 3 --format twitter
```

Combined — 3 HVAC topics for Twitter with scoring visible:

```
npx ./research/tools/content-idea-cli --count 3 --focus hvac --format twitter --verbose
```

## Data sources

The CLI reads 4 local files at startup:

1. `research/output/topic-bank.md` — 12 ranked topics with scores, subreddits, and evidence quotes (required)
2. `content/youtube/content-plan.md` — existing YouTube video topics for de-duplication (optional)
3. `ops/packages/*.md` — 6 service package files for commercial context (optional)
4. `research/output/competitor-audit.md` — competitor gap data (optional, reserved for future use)

If content-plan.md or packages are missing, the CLI warns and continues. Only topic-bank.md is required.

## Scoring

Topics are scored at runtime:

- Base score from topic-bank.md (Reddit upvotes, post count, subreddit spread)
- +15% bonus if topic has a "Ready to sell" package match
- -30% penalty if topic closely overlaps an existing YouTube video (soft de-duplication — topic still appears)
- +5% format adjustment for twitter (punchy short quotes) or carousel (multi-step processes)

Use --verbose to see the full scoring breakdown for each topic.

## Output

Markdown to stdout. Save to file:

```
npx ./research/tools/content-idea-cli --count 5 > ideas-$(date +%Y-%m-%d).md
```
