"use strict";

const { formatOutput } = require("../lib/formatter");

const SAMPLE_TOPICS = [
  {
    title: "Missed Calls Losing Customers to Competitors",
    baseScore: 2218.5,
    adjustedScore: 2551.3,
    packageMatch: "Missed Call Text-Back ($1,500 build / $200/mo)",
    packageStatus: "Ready to sell",
    alreadyCovered: false,
    subreddits: ["r/HVAC", "r/nocode", "r/smallbusiness"],
    evidenceQuotes: [
      '"Missed 3 calls today while on a roof — I know I lost at least 2 jobs to a competitor" — r/HVAC, 287 upvotes',
    ],
    contentAngle:
      "How a missed call text-back made one HVAC tech $4,200 last month without picking up the phone",
    evidencePosts: 4,
    subredditSpread: 3,
    competitorGapScore: 0,
  },
  {
    title: "Quotes Sent With No Follow-Up or Close",
    baseScore: 2076.5,
    adjustedScore: 2388.0,
    packageMatch: "Lead Nurture & Quote Follow-Up ($2,000 build / $300/mo)",
    packageStatus: "Ready to sell",
    alreadyCovered: false,
    subreddits: ["r/entrepreneur", "r/lawncare", "r/smallbusiness"],
    evidenceQuotes: [
      '"Quote follow up sequence — my close rate went from 23% to 41% in 60 days" — r/entrepreneur, 1243 upvotes',
    ],
    contentAngle:
      "Why 70% of your sent quotes go cold (and the 3-touch sequence that recovers them)",
    evidencePosts: 3,
    subredditSpread: 3,
    competitorGapScore: 0,
  },
];

describe("formatOutput", () => {
  test("default mode returns string with topic titles", () => {
    const output = formatOutput(SAMPLE_TOPICS, {
      verbose: false,
      format: "youtube",
      count: 5,
    });
    expect(typeof output).toBe("string");
    expect(output).toContain("Missed Calls Losing Customers to Competitors");
    expect(output).toContain("Quotes Sent With No Follow-Up or Close");
  });

  test("default mode includes Hook field", () => {
    const output = formatOutput(SAMPLE_TOPICS, {
      verbose: false,
      format: "youtube",
      count: 5,
    });
    expect(output).toContain("Hook");
  });

  test("default mode includes Package field", () => {
    const output = formatOutput(SAMPLE_TOPICS, {
      verbose: false,
      format: "youtube",
      count: 5,
    });
    expect(output).toContain("Package");
  });

  test("default mode does NOT include score breakdown", () => {
    const output = formatOutput(SAMPLE_TOPICS, {
      verbose: false,
      format: "youtube",
      count: 5,
    });
    expect(output).not.toMatch(/Score:.*→/);
  });

  test("verbose mode includes score breakdown", () => {
    const output = formatOutput(SAMPLE_TOPICS, {
      verbose: true,
      format: "youtube",
      count: 5,
    });
    expect(output).toMatch(/Score:|adjusted|penalty/i);
  });

  test("verbose mode includes subreddits", () => {
    const output = formatOutput(SAMPLE_TOPICS, {
      verbose: true,
      format: "youtube",
      count: 5,
    });
    expect(output).toMatch(/Subreddits?:/i);
  });

  test("verbose mode indicates de-dup penalty when alreadyCovered", () => {
    const coveredTopics = [{ ...SAMPLE_TOPICS[0], alreadyCovered: true }];
    const output = formatOutput(coveredTopics, {
      verbose: true,
      format: "youtube",
      count: 5,
    });
    expect(output).toMatch(/de-dup|penalty|covered/i);
  });

  test("output contains header with date info", () => {
    const output = formatOutput(SAMPLE_TOPICS, {
      verbose: false,
      format: "youtube",
      count: 5,
    });
    expect(output).toMatch(/Content ideas/i);
  });

  test("output shows topic count", () => {
    const output = formatOutput(SAMPLE_TOPICS, {
      verbose: false,
      format: "youtube",
      count: 5,
    });
    expect(output).toMatch(/Topics returned:/i);
  });
});
