"use strict";

const { parseTopicBank } = require("../lib/parser");

// Minimal well-formed topic-bank.md content for testing
const SAMPLE_TOPIC_BANK = `
## Ranked Topics

| Rank | Pain Point | Score | Posts | Subreddits | Package Match | Status |
| ---- | ---------- | ----- | ----- | ---------- | ------------- | ------ |
| 1 | Missed Calls Losing Customers to Competitors | 2218.5 | 4 | 3 | Missed Call Text-Back | Ready to sell |
| 2 | Quotes Sent With No Follow-Up or Close | 2076.5 | 3 | 3 | Lead Nurture & Quote Follow-Up | Ready to sell |

## Topic Details

### 1. Missed Calls Losing Customers to Competitors

**Score:** 2218.5 | **Posts:** 4 | **Subreddit spread:** 3
**Package:** Missed Call Text-Back ($1,500 build / $200/mo)
**Status:** Ready to sell
**Content angle:** How a missed call text-back made one HVAC tech $4,200 last month without picking up the phone
**Subreddits:** r/HVAC, r/nocode, r/smallbusiness

**Evidence:**

> "Missed 3 calls today while on a roof — I know I lost at least 2 jobs to a competitor" — r/HVAC, 287 upvotes (post)

> "Missed calls are costing me real money — HVAC owner rant + question" — r/HVAC, 445 upvotes (post)


### 2. Quotes Sent With No Follow-Up or Close

**Score:** 2076.5 | **Posts:** 3 | **Subreddit spread:** 3
**Package:** Lead Nurture & Quote Follow-Up ($2,000 build / $300/mo)
**Status:** Ready to sell
**Content angle:** Why 70% of your sent quotes go cold (and the 3-touch sequence that recovers them)
**Subreddits:** r/entrepreneur, r/lawncare, r/smallbusiness

**Evidence:**

> "Quote follow up — I send estimates and never hear back, then find out they went with someone else" — r/smallbusiness, 412 upvotes (post)
`;

const SAMPLE_TOPIC_BANK_12 = `
## Ranked Topics

| Rank | Pain Point | Score | Posts | Subreddits | Package Match | Status |
| ---- | ---------- | ----- | ----- | ---------- | ------------- | ------ |
| 1 | Topic One | 3921.5 | 12 | 8 | New development needed | New development needed |
| 2 | Topic Two | 2774.5 | 7 | 7 | New development needed | New development needed |
| 3 | Topic Three | 2612.5 | 7 | 6 | New development needed | New development needed |
| 4 | Topic Four | 2218.5 | 4 | 3 | Missed Call Text-Back | Ready to sell |
| 5 | Topic Five | 2076.5 | 3 | 3 | Lead Nurture | Ready to sell |
| 6 | Topic Six | 1918.5 | 3 | 2 | Review Automation | Ready to sell |
| 7 | Topic Seven | 1722.0 | 3 | 3 | New development needed | New development needed |
| 8 | Topic Eight | 1063.5 | 4 | 4 | New development needed | New development needed |
| 9 | Topic Nine | 1060.0 | 2 | 2 | Lead Follow-Up | Ready to sell |
| 10 | Topic Ten | 760.5 | 3 | 3 | Custom Build | Ready to sell |
| 11 | Topic Eleven | 604.5 | 2 | 2 | Appointment Reminder | Ready to sell |
| 12 | Topic Twelve | 563.5 | 2 | 2 | New development needed | New development needed |

## Topic Details

### 1. Topic One

**Score:** 3921.5 | **Posts:** 12 | **Subreddit spread:** 8
**Package:** New development needed
**Status:** New development needed
**Content angle:** Test content angle one
**Subreddits:** r/HVAC, r/smallbusiness

**Evidence:**

> "Test quote one" — r/HVAC, 287 upvotes (post)


### 2. Topic Two

**Score:** 2774.5 | **Posts:** 7 | **Subreddit spread:** 7
**Package:** New development needed
**Status:** New development needed
**Content angle:** Test content angle two
**Subreddits:** r/plumbing, r/smallbusiness

**Evidence:**

> "Test quote two" — r/plumbing, 341 upvotes (post)


### 3. Topic Three

**Score:** 2612.5 | **Posts:** 7 | **Subreddit spread:** 6
**Package:** New development needed
**Status:** New development needed
**Content angle:** Test content angle three
**Subreddits:** r/HVAC, r/HomeImprovement

**Evidence:**

> "Test quote three" — r/HVAC, 312 upvotes (post)


### 4. Topic Four

**Score:** 2218.5 | **Posts:** 4 | **Subreddit spread:** 3
**Package:** Missed Call Text-Back ($1,500 build / $200/mo)
**Status:** Ready to sell
**Content angle:** Test content angle four
**Subreddits:** r/HVAC, r/nocode

**Evidence:**

> "Test quote four HVAC" — r/HVAC, 287 upvotes (post)


### 5. Topic Five

**Score:** 2076.5 | **Posts:** 3 | **Subreddit spread:** 3
**Package:** Lead Nurture
**Status:** Ready to sell
**Content angle:** Test content angle five
**Subreddits:** r/entrepreneur, r/lawncare

**Evidence:**

> "Test quote five" — r/entrepreneur, 412 upvotes (post)


### 6. Topic Six

**Score:** 1918.5 | **Posts:** 3 | **Subreddit spread:** 2
**Package:** Review Automation
**Status:** Ready to sell
**Content angle:** Test content angle six
**Subreddits:** r/HVAC, r/plumbing

**Evidence:**

> "Test quote six" — r/HVAC, 523 upvotes (post)


### 7. Topic Seven

**Score:** 1722.0 | **Posts:** 3 | **Subreddit spread:** 3
**Package:** New development needed
**Status:** New development needed
**Content angle:** Test content angle seven
**Subreddits:** r/nocode, r/zapier

**Evidence:**

> "Test quote seven" — r/zapier, 891 upvotes (post)


### 8. Topic Eight

**Score:** 1063.5 | **Posts:** 4 | **Subreddit spread:** 4
**Package:** New development needed
**Status:** New development needed
**Content angle:** Test content angle eight
**Subreddits:** r/electricians, r/lawncare

**Evidence:**

> "Test quote eight" — r/electricians, 312 upvotes (post)


### 9. Topic Nine

**Score:** 1060.0 | **Posts:** 2 | **Subreddit spread:** 2
**Package:** Lead Follow-Up
**Status:** Ready to sell
**Content angle:** Test content angle nine
**Subreddits:** r/electricians, r/plumbing

**Evidence:**

> "Test quote nine" — r/plumbing, 341 upvotes (post)


### 10. Topic Ten

**Score:** 760.5 | **Posts:** 3 | **Subreddit spread:** 3
**Package:** Custom Build
**Status:** Ready to sell
**Content angle:** Test content angle ten
**Subreddits:** r/HomeImprovement, r/photography

**Evidence:**

> "Test quote ten" — r/photography, 267 upvotes (post)


### 11. Topic Eleven

**Score:** 604.5 | **Posts:** 2 | **Subreddit spread:** 2
**Package:** Appointment Reminder
**Status:** Ready to sell
**Content angle:** Test content angle eleven
**Subreddits:** r/AutoDetailing, r/HVAC

**Evidence:**

> "Test quote eleven" — r/HVAC, 312 upvotes (post)


### 12. Topic Twelve

**Score:** 563.5 | **Posts:** 2 | **Subreddit spread:** 2
**Package:** New development needed
**Status:** New development needed
**Content angle:** Test content angle twelve
**Subreddits:** r/personaltraining, r/plumbing

**Evidence:**

> "Test quote twelve" — r/plumbing, 178 upvotes (post)
`;

describe("parseTopicBank", () => {
  test("returns array of topic objects from well-formed content", () => {
    const topics = parseTopicBank(SAMPLE_TOPIC_BANK);
    expect(Array.isArray(topics)).toBe(true);
    expect(topics.length).toBe(2);
  });

  test("each topic has required fields", () => {
    const topics = parseTopicBank(SAMPLE_TOPIC_BANK);
    const topic = topics[0];
    expect(topic).toHaveProperty("title");
    expect(topic).toHaveProperty("baseScore");
    expect(topic).toHaveProperty("subreddits");
    expect(topic).toHaveProperty("evidenceQuotes");
    expect(topic).toHaveProperty("packageMatch");
  });

  test("extracts correct title from heading", () => {
    const topics = parseTopicBank(SAMPLE_TOPIC_BANK);
    expect(topics[0].title).toBe(
      "Missed Calls Losing Customers to Competitors",
    );
    expect(topics[1].title).toBe("Quotes Sent With No Follow-Up or Close");
  });

  test("extracts correct baseScore", () => {
    const topics = parseTopicBank(SAMPLE_TOPIC_BANK);
    expect(topics[0].baseScore).toBe(2218.5);
    expect(topics[1].baseScore).toBe(2076.5);
  });

  test("extracts subreddits as array", () => {
    const topics = parseTopicBank(SAMPLE_TOPIC_BANK);
    expect(Array.isArray(topics[0].subreddits)).toBe(true);
    expect(topics[0].subreddits).toContain("r/HVAC");
    expect(topics[0].subreddits).toContain("r/nocode");
  });

  test("extracts evidence quotes", () => {
    const topics = parseTopicBank(SAMPLE_TOPIC_BANK);
    expect(Array.isArray(topics[0].evidenceQuotes)).toBe(true);
    expect(topics[0].evidenceQuotes.length).toBeGreaterThan(0);
  });

  test("extracts packageMatch", () => {
    const topics = parseTopicBank(SAMPLE_TOPIC_BANK);
    expect(topics[0].packageMatch).toContain("Missed Call Text-Back");
  });

  test("returns 12 topics from 12-topic bank", () => {
    const topics = parseTopicBank(SAMPLE_TOPIC_BANK_12);
    expect(topics.length).toBe(12);
  });

  test("throws descriptive error for empty input", () => {
    expect(() => parseTopicBank("")).toThrow(/empty|no topics|topic bank/i);
  });

  test("throws descriptive error for whitespace-only input", () => {
    expect(() => parseTopicBank("   \n  ")).toThrow(
      /empty|no topics|topic bank/i,
    );
  });
});
