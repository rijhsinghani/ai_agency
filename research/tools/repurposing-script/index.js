#!/usr/bin/env node
"use strict";
const { program } = require("commander");
const { getTranscript } = require("./lib/transcript");
const { generateDraft } = require("./lib/generator");
const {
  writeToReviewQueue,
  cacheTranscript,
  loadCachedTranscript,
} = require("./lib/queue");

program
  .name("sameer-repurpose")
  .description(
    "Generate platform-specific content drafts from a YouTube video URL",
  )
  .requiredOption("--url <youtubeUrl>", "YouTube video URL to repurpose")
  .option(
    "--from-cache",
    "Load cached transcript (skips Supadata API call)",
    false,
  )
  .option(
    "--title <title>",
    "Override video title for file naming (auto-detected from URL if omitted)",
  )
  .option(
    "--cta <mode>",
    "CTA mode for generated posts: value (no CTA), soft (engagement prompt), booking (discovery call link)",
    "value",
  )
  .parse(process.argv);

const opts = program.opts();

(async () => {
  const videoTitle = opts.title || `video-${Date.now()}`;
  console.log(`Processing: ${opts.url}`);

  let transcript;
  if (opts.fromCache) {
    transcript = loadCachedTranscript(videoTitle);
    if (!transcript) {
      console.error(
        `No cached transcript found for "${videoTitle}". Run without --from-cache first.`,
      );
      process.exit(1);
    }
    console.log("Loaded transcript from cache.");
  } else {
    console.log("Extracting transcript via Supadata...");
    transcript = await getTranscript(opts.url);
    cacheTranscript(videoTitle, transcript);
    console.log("Transcript extracted and cached.");
  }

  const ctaMode = opts.cta;
  const validCtaModes = ["value", "soft", "booking"];
  if (!validCtaModes.includes(ctaMode)) {
    console.error(
      `Invalid --cta value "${ctaMode}". Must be one of: ${validCtaModes.join(", ")}.`,
    );
    process.exit(1);
  }

  const platforms = ["twitter", "instagram", "clip_script"];
  for (const platform of platforms) {
    console.log(`Generating ${platform} draft...`);
    const draft = await generateDraft(transcript, platform, ctaMode);
    const filepath = writeToReviewQueue(videoTitle, platform, draft);
    console.log(`  -> ${filepath}`);
  }

  console.log("\nDone. Review drafts in the review/ folder before posting.");
})();
