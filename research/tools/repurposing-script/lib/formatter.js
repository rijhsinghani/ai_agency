"use strict";
const BANNED_PHRASES = [
  "game-changer",
  "seamless",
  "seamlessly",
  "leverage",
  "robust",
  "cutting-edge",
  "groundbreaking",
  "revolutionary",
  "synergy",
  "ecosystem",
  "platform suite",
  "innovative",
  "utilize",
  "facilitate",
  "empower",
  "unleash",
  "disrupt",
];

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
