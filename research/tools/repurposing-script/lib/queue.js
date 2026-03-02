"use strict";
const fs = require("fs");
const path = require("path");

function slug(title) {
  return title
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase()
    .replace(/^-|-$/g, "");
}

function writeToReviewQueue(videoTitle, platform, draft, reviewDir) {
  const dir = reviewDir || path.join(process.cwd(), "review");
  fs.mkdirSync(dir, { recursive: true });
  const filename = `${slug(videoTitle)}-${platform}.md`;
  const filepath = path.join(dir, filename);
  const content = `# Review: ${videoTitle} — ${platform}\n\n**Status:** DRAFT — not posted\n**Generated:** ${new Date().toISOString()}\n\n---\n\n${draft}\n\n---\n\n_Review before posting. Edit as needed. CTA must include: https://calendar.app.google/psycao3CrXjGnmk48_\n`;
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
}

function cacheTranscript(videoTitle, transcript, reviewDir) {
  const dir = reviewDir || path.join(process.cwd(), "review");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, `${slug(videoTitle)}-transcript.txt`),
    transcript,
    "utf-8",
  );
}

function loadCachedTranscript(videoTitle, reviewDir) {
  const dir = reviewDir || path.join(process.cwd(), "review");
  const filepath = path.join(dir, `${slug(videoTitle)}-transcript.txt`);
  if (!fs.existsSync(filepath)) return null;
  return fs.readFileSync(filepath, "utf-8");
}

module.exports = { writeToReviewQueue, cacheTranscript, loadCachedTranscript };
