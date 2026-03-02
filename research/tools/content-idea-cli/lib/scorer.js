"use strict";

/**
 * Scoring module for content topic suggestions
 * Applies multipliers and penalties on top of the base score from topic-bank.md
 */

/**
 * Check if a topic matches the focus filter.
 * Checks subreddits and evidence quotes for the focus keyword (case-insensitive).
 * @param {Object} topic
 * @param {string} focus - keyword to filter by
 * @returns {boolean}
 */
function matchesFocus(topic, focus) {
  const focusLower = focus.toLowerCase();

  // Check subreddits
  const inSubreddits = topic.subreddits.some((s) =>
    s.toLowerCase().includes(focusLower),
  );
  if (inSubreddits) return true;

  // Check evidence quotes
  const inQuotes = topic.evidenceQuotes.some((q) =>
    q.toLowerCase().includes(focusLower),
  );
  if (inQuotes) return true;

  // Check title
  const inTitle = topic.title.toLowerCase().includes(focusLower);
  if (inTitle) return true;

  return false;
}

/**
 * Score topics and return ranked, filtered, sliced list.
 *
 * Scoring order:
 * 1. Start with baseScore
 * 2. Package match bonus: +15% if "Ready to sell"
 * 3. Already-covered penalty: -30% if alreadyCovered
 * 4. Format adjustment: twitter +5% for punchy short quotes, carousel +5% for multi-step
 * 5. Sort descending by adjustedScore
 * 6. Filter by --focus
 * 7. Slice to --count
 *
 * @param {Array} topics - parsed and dedup-marked topics
 * @param {Object} opts - { format, focus, count }
 * @returns {Array} scored, filtered, sliced topics
 */
function scoreTopics(topics, opts) {
  const { format, focus, count } = opts;

  // Apply scoring multipliers
  let scored = topics.map((topic) => {
    let score = topic.baseScore;

    // Package match bonus: +15% for Ready to sell packages
    if (topic.packageStatus === "Ready to sell") {
      score = score * 1.15;
    }

    // Already-covered penalty: -30%
    if (topic.alreadyCovered) {
      score = score * 0.7;
    }

    // Format relevance adjustment
    if (format === "twitter") {
      // Small upward adjustment for topics with punchy short evidence quotes
      const hasShortQuotes = topic.evidenceQuotes.some((q) => q.length < 120);
      if (hasShortQuotes) {
        score = score * 1.05;
      }
    } else if (format === "carousel") {
      // Upward adjustment for topics with multi-step processes
      const multiStepKeywords = [
        "sequence",
        "step",
        "reminder",
        "follow-up",
        "3-touch",
      ];
      const isMultiStep = multiStepKeywords.some(
        (kw) =>
          topic.title.toLowerCase().includes(kw) ||
          (topic.contentAngle && topic.contentAngle.toLowerCase().includes(kw)),
      );
      if (isMultiStep) {
        score = score * 1.05;
      }
    }

    return { ...topic, adjustedScore: Math.round(score * 10) / 10 };
  });

  // Filter by --focus if provided
  if (focus) {
    scored = scored.filter((topic) => matchesFocus(topic, focus));
  }

  // Sort by adjustedScore descending
  scored.sort((a, b) => b.adjustedScore - a.adjustedScore);

  // Slice to --count
  if (count && count < scored.length) {
    scored = scored.slice(0, count);
  }

  return scored;
}

module.exports = { scoreTopics };
