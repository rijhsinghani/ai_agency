"use strict";

/**
 * Formatter module
 * Renders topic suggestions as Markdown to stdout
 */

/**
 * Format a single topic in default (clean) mode.
 * @param {Object} topic
 * @param {Object} opts - { verbose, format }
 * @returns {string}
 */
function formatTopic(topic, opts) {
  const { verbose, format } = opts;

  // Choose the hook based on format and available content
  let hook = topic.contentAngle;
  if (!hook && topic.evidenceQuotes.length > 0) {
    hook = topic.evidenceQuotes[0];
  }
  if (!hook) {
    hook = topic.title;
  }

  // Adapt hook format for platform
  if (format === "twitter" && hook.length > 240) {
    // Trim to first sentence for Twitter
    const sentences = hook.split(/[.!?]/);
    hook = sentences[0].trim() + ".";
    if (hook.length > 240) {
      hook = hook.substring(0, 237) + "...";
    }
  }

  const packageDisplay =
    topic.packageMatch && topic.packageMatch !== "New development needed"
      ? topic.packageMatch
      : "New opportunity — no existing package";

  let output = "";
  output += `### ${topic.title}\n`;
  output += `**Hook:** ${hook}\n`;
  output += `**Package:** ${packageDisplay}\n`;

  if (verbose) {
    const packageBonus = topic.packageStatus === "Ready to sell" ? "yes" : "no";
    const dedupPenalty = topic.alreadyCovered
      ? "yes — topic closely overlaps existing YouTube content"
      : "no";
    output += `**Score:** ${topic.baseScore} -> ${topic.adjustedScore} | Package bonus: ${packageBonus} | De-dup penalty: ${dedupPenalty}\n`;
    output += `**Subreddits:** ${topic.subreddits.join(", ")} | Evidence posts: ${topic.evidencePosts || topic.evidenceQuotes.length}\n`;
  }

  return output;
}

/**
 * Format a list of topics as Markdown output.
 * Includes a header block documenting date, command flags, and topic count.
 *
 * @param {Array} topics - scored and ranked topics
 * @param {Object} opts - { verbose, format, count, focus, totalAvailable }
 * @returns {string} Markdown string ready for stdout
 */
function formatOutput(topics, opts) {
  const { verbose, format, count, focus, totalAvailable } = opts;
  const date = new Date().toISOString().split("T")[0];

  // Build command string from options
  const flags = [];
  if (count) flags.push(`--count ${count}`);
  if (focus) flags.push(`--focus ${focus}`);
  if (format && format !== "youtube") flags.push(`--format ${format}`);
  if (verbose) flags.push("--verbose");
  const commandStr = `sameer-ideas${flags.length ? " " + flags.join(" ") : ""}`;

  const available = totalAvailable || topics.length;
  const returned = topics.length;

  let output = "";
  output += `# Content ideas — ${date}\n`;
  output += `# Command: ${commandStr}\n`;
  output += `# Topics returned: ${returned} of ${available}\n`;
  output += "\n---\n\n";

  if (topics.length === 0) {
    output += `_No topics match the current filter. Try a different --focus value._\n`;
    return output;
  }

  topics.forEach((topic, idx) => {
    output += formatTopic(topic, { verbose, format });
    if (idx < topics.length - 1) {
      output += "\n---\n\n";
    }
  });

  return output;
}

module.exports = { formatOutput };
