"use strict";
const fs = require("fs");
const path = require("path");

// Load the shared banlist from brand/banned-phrases.json.
// Path resolves from repo root: research/tools/repurposing-script -> ../../.. -> repo root -> brand/
const _banlistPath = path.resolve(
  __dirname,
  "../../../..",
  "brand",
  "banned-phrases.json",
);
let BANNED_PHRASES;
try {
  const _raw = fs.readFileSync(_banlistPath, "utf8");
  BANNED_PHRASES = JSON.parse(_raw).banned_phrases;
} catch (e) {
  // Fallback to inline list if the shared file is unavailable
  BANNED_PHRASES = [
    "cutting-edge",
    "cutting edge",
    "disrupt",
    "ecosystem",
    "empower",
    "facilitate",
    "game-changer",
    "game changer",
    "groundbreaking",
    "holistic approach",
    "in today's fast-paced world",
    "innovative",
    "let me dive in",
    "let's dive in",
    "leverage",
    "leveraging",
    "paradigm shift",
    "platform suite",
    "revolutionary",
    "revolutionize",
    "robust",
    "scalable solution",
    "seamless",
    "seamlessly",
    "seamlessly integrates",
    "seamlessly integrated",
    "synergy",
    "unlock",
    "unleash",
    "utilize",
  ];
}

function buildPrompt(platform, transcript) {
  const specs = {
    twitter:
      'Write a Twitter thread (6-8 tweets, 280 chars max each). Lead with the result. End the final tweet with exactly: "Book a free 15-min discovery call: https://calendar.app.google/psycao3CrXjGnmk48"',
    instagram:
      'Write an Instagram caption (150-300 words). Open with the problem. One core insight. End with: "Book a free 15-min discovery call: https://calendar.app.google/psycao3CrXjGnmk48"',
    clip_script:
      "Identify the single most business-owner-relevant 30-60 second moment from this transcript. Write a short intro script (hook + insight + bridge to the clip). Include the approximate start and end timestamp if available in the transcript.",
  };
  return `${specs[platform]}\n\nTranscript:\n${transcript.slice(0, 8000)}`;
}

module.exports = { BANNED_PHRASES, buildPrompt };
