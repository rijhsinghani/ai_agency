#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
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
    "Generate platform-specific content drafts from a YouTube video URL or markdown file",
  )
  .option("--url <youtubeUrl>", "YouTube video URL to repurpose")
  .option(
    "--from-file <markdownPath>",
    "Path to a markdown file to repurpose (skips transcript fetch)",
  )
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
  // Mutual exclusivity validation
  if (!opts.url && !opts.fromFile) {
    console.error("Error: provide either --url or --from-file");
    process.exit(1);
  }
  if (opts.url && opts.fromFile) {
    console.error("Error: --url and --from-file are mutually exclusive");
    process.exit(1);
  }

  const ctaMode = opts.cta;
  const validCtaModes = ["value", "soft", "booking"];
  if (!validCtaModes.includes(ctaMode)) {
    console.error(
      `Invalid --cta value "${ctaMode}". Must be one of: ${validCtaModes.join(", ")}.`,
    );
    process.exit(1);
  }

  let transcript;
  let videoTitle;
  let platforms;

  if (opts.fromFile) {
    // --from-file path: read markdown file as transcript input
    const resolvedPath = path.resolve(opts.fromFile);
    console.log(`Loaded content from ${resolvedPath}`);
    transcript = fs.readFileSync(resolvedPath, "utf-8");
    // Derive title from filename (strip path and .md extension) or use --title override
    videoTitle =
      opts.title || path.basename(resolvedPath).replace(/\.md$/i, "");
    // Limit platforms to twitter + instagram only — clip_script prompts reference
    // timestamps and video moments that don't exist in markdown content
    platforms = ["twitter", "instagram"];
  } else {
    // --url path: existing behavior unchanged
    videoTitle = opts.title || `video-${Date.now()}`;
    console.log(`Processing: ${opts.url}`);

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

    platforms = ["twitter", "instagram", "clip_script"];
  }

  for (const platform of platforms) {
    console.log(`Generating ${platform} draft...`);
    const draft = await generateDraft(transcript, platform, ctaMode);
    const filepath = writeToReviewQueue(videoTitle, platform, draft);
    console.log(`  -> ${filepath}`);
  }

  console.log("\nDone. Review drafts in the review/ folder before posting.");
})();
