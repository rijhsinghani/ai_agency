"use strict";

const { markDuplicates } = require("../lib/dedup");

const BASE_TOPICS = [
  {
    title: "Bookkeeping Automation for Small Business",
    baseScore: 1500,
    subreddits: ["r/smallbusiness"],
    evidenceQuotes: ['"I spend too much time on invoicing" — r/smallbusiness'],
  },
  {
    title: "Missed Call Text-Back System",
    baseScore: 2218.5,
    subreddits: ["r/HVAC"],
    evidenceQuotes: ['"Missed 3 calls today" — r/HVAC'],
  },
  {
    title: "Zapier Limitations for Complex Workflows",
    baseScore: 1722,
    subreddits: ["r/zapier"],
    evidenceQuotes: ['"Zapier breaks every time" — r/zapier'],
  },
];

const CONTENT_PLAN = `
### Video 1: How I automated my photography business
Bookkeeping, invoice, accounting systems

### Video 2: I automated my bookkeeping
financial records automated
`;

describe("markDuplicates", () => {
  test("marks topics overlapping with content-plan.md themes as alreadyCovered", () => {
    const marked = markDuplicates(BASE_TOPICS, CONTENT_PLAN);
    const bookkeepingTopic = marked.find((t) =>
      t.title.toLowerCase().includes("bookkeeping"),
    );
    expect(bookkeepingTopic.alreadyCovered).toBe(true);
  });

  test("does not mark unrelated topics as covered", () => {
    const marked = markDuplicates(BASE_TOPICS, CONTENT_PLAN);
    const zapierTopic = marked.find((t) =>
      t.title.toLowerCase().includes("zapier"),
    );
    expect(zapierTopic.alreadyCovered).toBe(false);
  });

  test("returns all topics unchanged in length (no exclusions)", () => {
    const marked = markDuplicates(BASE_TOPICS, CONTENT_PLAN);
    expect(marked.length).toBe(BASE_TOPICS.length);
  });

  test("all topics get alreadyCovered: false when contentPlan is null", () => {
    const marked = markDuplicates(BASE_TOPICS, null);
    marked.forEach((t) => {
      expect(t.alreadyCovered).toBe(false);
    });
  });

  test("all topics get alreadyCovered: false when contentPlan is empty string", () => {
    const marked = markDuplicates(BASE_TOPICS, "");
    marked.forEach((t) => {
      expect(t.alreadyCovered).toBe(false);
    });
  });
});
