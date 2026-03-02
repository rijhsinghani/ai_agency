"use strict";

const fs = require("fs");
const path = require("path");

/**
 * Resolve the project root directory.
 * Uses CONSULTANCY_ROOT env var if set, otherwise walks up 4 levels from this file's location.
 * lib/loader.js -> lib/ -> content-idea-cli/ -> tools/ -> research/ -> [ROOT]
 * @returns {string} absolute path to project root
 */
function resolveRoot() {
  if (process.env.CONSULTANCY_ROOT) {
    return process.env.CONSULTANCY_ROOT;
  }
  // Walk up 4 levels: lib/ -> content-idea-cli/ -> tools/ -> research/ -> root
  return path.resolve(__dirname, "../../../../");
}

/**
 * Load all data sources for the CLI.
 * - topic-bank.md: required — throws if missing
 * - content-plan.md: optional — warns and continues
 * - ops/packages/*.md: optional — warns and continues
 *
 * @param {string} root - project root directory
 * @returns {{ topicBank: string, contentPlan: string|null, packages: Object[] }}
 */
function loadSources(root) {
  // 1. Topic bank (required)
  const topicBankPath = path.join(root, "research", "output", "topic-bank.md");
  if (!fs.existsSync(topicBankPath)) {
    throw new Error(
      `Topic bank not found at ${topicBankPath}. Run the research scraper first:\n  python research/scripts/reddit-scraper.py`,
    );
  }
  const topicBank = fs.readFileSync(topicBankPath, "utf8");

  // 2. Content plan (optional)
  let contentPlan = null;
  const contentPlanPath = path.join(
    root,
    "content",
    "youtube",
    "content-plan.md",
  );
  if (fs.existsSync(contentPlanPath)) {
    contentPlan = fs.readFileSync(contentPlanPath, "utf8");
  } else {
    process.stderr.write(
      `Warning: Content plan not found at ${contentPlanPath} — skipping de-duplication check.\n`,
    );
  }

  // 3. Package files (optional)
  const packages = [];
  const packagesDir = path.join(root, "ops", "packages");
  if (fs.existsSync(packagesDir)) {
    const packageFiles = fs
      .readdirSync(packagesDir)
      .filter((f) => f.endsWith(".md"))
      .sort();

    packageFiles.forEach((fileName) => {
      const filePath = path.join(packagesDir, fileName);
      try {
        const raw = fs.readFileSync(filePath, "utf8");
        packages.push({
          slug: fileName.replace(".md", ""),
          raw,
          fileName,
        });
      } catch (err) {
        process.stderr.write(
          `Warning: Could not read package file ${filePath}: ${err.message}\n`,
        );
      }
    });
  } else {
    process.stderr.write(
      `Warning: Packages directory not found at ${packagesDir} — skipping package enrichment.\n`,
    );
  }

  return { topicBank, contentPlan, packages };
}

module.exports = { resolveRoot, loadSources };
