"use strict";

/**
 * De-duplication module
 * Marks topics that overlap with content already in content-plan.md
 * De-duplication is SOFT — applies penalty, does not exclude topics
 */

const COVERED_THEMES = [
  {
    theme: "bookkeeping",
    keywords: ["bookkeeping", "invoice", "accounting", "financial"],
  },
  {
    theme: "missed-call",
    keywords: [
      "missed call",
      "missed calls",
      "unanswered",
      "text-back",
      "text back",
    ],
  },
  {
    theme: "employee-replacement",
    keywords: ["employee", "staff", "hire", "operations", "part-time"],
  },
  {
    theme: "automation-framework",
    keywords: ["worth automating", "what to automate", "framework"],
  },
  {
    theme: "content-engine",
    keywords: [
      "content engine",
      "content pipeline",
      "social posts",
      "posts and emails",
    ],
  },
];

/**
 * Check if a topic overlaps with a covered theme keyword.
 * @param {string} text - text to check
 * @param {string[]} keywords - list of keywords
 * @returns {boolean}
 */
function matchesTheme(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.some((kw) => lower.includes(kw.toLowerCase()));
}

/**
 * Mark topics as alreadyCovered if they overlap with existing content plan themes.
 * De-duplication is soft — covered topics still appear, they get a score penalty.
 *
 * @param {Array} topics - parsed topic objects
 * @param {string|null} contentPlan - raw content of content-plan.md, or null if unavailable
 * @returns {Array} topics with alreadyCovered property set
 */
function markDuplicates(topics, contentPlan) {
  // If no content plan available, no topics are covered
  if (!contentPlan || !contentPlan.trim()) {
    return topics.map((topic) => ({ ...topic, alreadyCovered: false }));
  }

  const contentPlanLower = contentPlan.toLowerCase();

  // Build list of active themes by checking which COVERED_THEMES have keywords in the content plan
  const activeThemes = COVERED_THEMES.filter((themeObj) =>
    themeObj.keywords.some((kw) => contentPlanLower.includes(kw.toLowerCase())),
  );

  return topics.map((topic) => {
    // Check topic title against active theme keywords
    const titleCovered = activeThemes.some((themeObj) =>
      matchesTheme(topic.title, themeObj.keywords),
    );

    // Check contentAngle if available
    const angleCovered = topic.contentAngle
      ? activeThemes.some((themeObj) =>
          matchesTheme(topic.contentAngle, themeObj.keywords),
        )
      : false;

    const alreadyCovered = titleCovered || angleCovered;

    return { ...topic, alreadyCovered };
  });
}

module.exports = { markDuplicates, COVERED_THEMES };
