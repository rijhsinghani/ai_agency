"use strict";

const { scoreTopics } = require("../lib/scorer");

const BASE_TOPICS = [
  {
    title: "Missed Calls Losing Customers",
    baseScore: 2218.5,
    packageMatch: "Missed Call Text-Back ($1,500 build / $200/mo)",
    packageStatus: "Ready to sell",
    alreadyCovered: false,
    subreddits: ["r/HVAC", "r/nocode", "r/smallbusiness"],
    evidenceQuotes: [
      '"Missed 3 calls today while on a roof" — r/HVAC, 287 upvotes',
    ],
    contentAngle:
      "How a missed call text-back made one HVAC tech $4,200 last month",
    competitorGapScore: 0,
  },
  {
    title: "Quotes Sent With No Follow-Up",
    baseScore: 2076.5,
    packageMatch: "Lead Nurture & Quote Follow-Up ($2,000 build / $300/mo)",
    packageStatus: "Ready to sell",
    alreadyCovered: false,
    subreddits: ["r/entrepreneur", "r/lawncare", "r/smallbusiness"],
    evidenceQuotes: [
      '"Quote follow up sequence — my close rate went from 23% to 41% in 60 days" — r/entrepreneur, 1243 upvotes',
    ],
    contentAngle: "Why 70% of your sent quotes go cold",
    competitorGapScore: 0,
  },
  {
    title: "Business Owners Seeking Help",
    baseScore: 3921.5,
    packageMatch: "New development needed",
    packageStatus: "New development needed",
    alreadyCovered: false,
    subreddits: ["r/AutoDetailing", "r/HVAC", "r/smallbusiness"],
    evidenceQuotes: [
      '"Missed 3 calls today while on a roof" — r/HVAC, 287 upvotes',
    ],
    contentAngle: "Reddit most-asked automation question",
    competitorGapScore: 0,
  },
];

describe("scoreTopics", () => {
  test("returns array of topics with adjustedScore", () => {
    const scored = scoreTopics(BASE_TOPICS, {
      format: "youtube",
      focus: null,
      count: 5,
    });
    expect(Array.isArray(scored)).toBe(true);
    scored.forEach((t) => {
      expect(t).toHaveProperty("adjustedScore");
    });
  });

  test("applies +15% package match bonus for Ready to sell topics", () => {
    const topics = [
      {
        ...BASE_TOPICS[0],
        packageStatus: "Ready to sell",
        alreadyCovered: false,
      },
    ];
    const scored = scoreTopics(topics, {
      format: "youtube",
      focus: null,
      count: 5,
    });
    expect(scored[0].adjustedScore).toBeCloseTo(2218.5 * 1.15, 1);
  });

  test("does not apply package bonus for New development needed", () => {
    const topics = [
      {
        ...BASE_TOPICS[2],
        packageStatus: "New development needed",
        alreadyCovered: false,
      },
    ];
    const scored = scoreTopics(topics, {
      format: "youtube",
      focus: null,
      count: 5,
    });
    expect(scored[0].adjustedScore).toBeCloseTo(3921.5, 1);
  });

  test("applies -30% already-covered penalty", () => {
    const topics = [
      {
        ...BASE_TOPICS[0],
        alreadyCovered: true,
        packageStatus: "Ready to sell",
      },
    ];
    const scored = scoreTopics(topics, {
      format: "youtube",
      focus: null,
      count: 5,
    });
    // Package bonus first (2218.5 * 1.15), then -30% penalty (* 0.7)
    const expected = 2218.5 * 1.15 * 0.7;
    expect(scored[0].adjustedScore).toBeCloseTo(expected, 1);
  });

  test("sorts by adjustedScore descending", () => {
    const scored = scoreTopics(BASE_TOPICS, {
      format: "youtube",
      focus: null,
      count: 10,
    });
    for (let i = 0; i < scored.length - 1; i++) {
      expect(scored[i].adjustedScore).toBeGreaterThanOrEqual(
        scored[i + 1].adjustedScore,
      );
    }
  });

  test("slices to --count", () => {
    const scored = scoreTopics(BASE_TOPICS, {
      format: "youtube",
      focus: null,
      count: 2,
    });
    expect(scored.length).toBe(2);
  });

  test("filters by --focus (case-insensitive match against subreddits)", () => {
    const scored = scoreTopics(BASE_TOPICS, {
      format: "youtube",
      focus: "hvac",
      count: 10,
    });
    scored.forEach((t) => {
      const hasHvac =
        t.subreddits.some((s) => s.toLowerCase().includes("hvac")) ||
        t.evidenceQuotes.some((q) => q.toLowerCase().includes("hvac"));
      expect(hasHvac).toBe(true);
    });
  });

  test("returns empty array if focus matches nothing", () => {
    const scored = scoreTopics(BASE_TOPICS, {
      format: "youtube",
      focus: "nonexistent-vertical-xyz",
      count: 10,
    });
    expect(scored.length).toBe(0);
  });
});
