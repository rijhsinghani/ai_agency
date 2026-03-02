"use strict";

/**
 * State machine parser for topic-bank.md
 * Parses the structured Markdown format produced by the Reddit scraper
 */

const STATES = {
  SCANNING: "SCANNING",
  IN_TOPIC_SECTION: "IN_TOPIC_SECTION",
};

/**
 * Parse topic-bank.md content into an array of topic objects.
 * @param {string} raw - full file contents of topic-bank.md
 * @returns {Array} array of topic objects
 * @throws {Error} if input is empty or no topics are found
 */
function parseTopicBank(raw) {
  if (!raw || !raw.trim()) {
    throw new Error(
      "Topic bank is empty. Run the research scraper first to generate research/output/topic-bank.md.",
    );
  }

  const lines = raw.split("\n");
  const topics = [];
  let state = STATES.SCANNING;
  let currentTopic = null;
  let inEvidenceSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Detect topic section heading: "### N. Topic Title" (numbered topics in "Topic Details")
    // Must be in a "Topic Details" region (after "## Topic Details")
    // The heading pattern is ### followed by a number and period
    const topicHeadingMatch = trimmed.match(/^###\s+(\d+)\.\s+(.+)$/);

    if (topicHeadingMatch) {
      // Save previous topic if any
      if (currentTopic) {
        topics.push(currentTopic);
      }

      currentTopic = {
        rank: parseInt(topicHeadingMatch[1], 10),
        title: topicHeadingMatch[2].trim(),
        baseScore: 0,
        contentAngle: "",
        subreddits: [],
        evidencePosts: 0,
        subredditSpread: 0,
        evidenceQuotes: [],
        packageMatch: null,
        packageStatus: "New development needed",
        alreadyCovered: false,
        competitorGapScore: 0,
      };
      inEvidenceSection = false;
      state = STATES.IN_TOPIC_SECTION;
      continue;
    }

    if (state === STATES.IN_TOPIC_SECTION && currentTopic) {
      // Parse score line: "**Score:** 2218.5 | **Posts:** 4 | **Subreddit spread:** 3"
      const scoreLine = trimmed.match(
        /^\*\*Score:\*\*\s+([\d.]+)\s*\|?\s*\*\*Posts:\*\*\s*(\d+)\s*\|?\s*\*\*Subreddit spread:\*\*\s*(\d+)/,
      );
      if (scoreLine) {
        currentTopic.baseScore = parseFloat(scoreLine[1]);
        currentTopic.evidencePosts = parseInt(scoreLine[2], 10);
        currentTopic.subredditSpread = parseInt(scoreLine[3], 10);
        continue;
      }

      // Parse package line: "**Package:** Package Name"
      const packageLine = trimmed.match(/^\*\*Package:\*\*\s+(.+)$/);
      if (packageLine) {
        currentTopic.packageMatch = packageLine[1].trim();
        continue;
      }

      // Parse status line: "**Status:** Ready to sell"
      const statusLine = trimmed.match(/^\*\*Status:\*\*\s+(.+)$/);
      if (statusLine) {
        currentTopic.packageStatus = statusLine[1].trim();
        continue;
      }

      // Parse content angle: "**Content angle:** ..."
      const angleLine = trimmed.match(/^\*\*Content angle:\*\*\s+(.+)$/);
      if (angleLine) {
        currentTopic.contentAngle = angleLine[1].trim();
        continue;
      }

      // Parse subreddits: "**Subreddits:** r/HVAC, r/nocode, r/smallbusiness"
      const subredditLine = trimmed.match(/^\*\*Subreddits?:\*\*\s+(.+)$/);
      if (subredditLine) {
        currentTopic.subreddits = subredditLine[1]
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
        continue;
      }

      // Detect evidence section
      if (trimmed === "**Evidence:**") {
        inEvidenceSection = true;
        continue;
      }

      // Parse evidence quotes: "> "quote text" — source"
      if (inEvidenceSection && trimmed.startsWith('> "')) {
        // Strip leading "> " and extract the quote
        const quote = trimmed.replace(/^>\s+/, "");
        currentTopic.evidenceQuotes.push(quote);
        continue;
      }

      // Reset evidence section on next heading or empty section marker
      if (inEvidenceSection && trimmed.startsWith("###")) {
        inEvidenceSection = false;
      }
    }
  }

  // Push last topic
  if (currentTopic) {
    topics.push(currentTopic);
  }

  if (topics.length === 0) {
    throw new Error(
      "No topics found in topic bank. The file may be malformed or empty. Check the ### heading format in research/output/topic-bank.md.",
    );
  }

  // Validate each topic has a non-zero baseScore
  topics.forEach((topic, idx) => {
    if (!topic.baseScore || topic.baseScore === 0) {
      throw new Error(
        `Topic at position ${idx + 1} ("${topic.title}") has zero or missing baseScore. Check the **Score:** line format.`,
      );
    }
  });

  return topics;
}

module.exports = { parseTopicBank };
