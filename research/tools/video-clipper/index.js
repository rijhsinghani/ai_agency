#!/usr/bin/env node
"use strict";
const { program } = require("commander");
const path = require("path");
const fs = require("fs");
const { extractClip } = require("./lib/extractor");
const { writeSrtToTemp } = require("./lib/captioner");

program
  .name("sameer-clip")
  .description(
    "Extract a 9:16 short-form clip from a video file with optional burned-in captions",
  )
  .requiredOption("--input <path>", "Path to the source video file (local MP4)")
  .requiredOption(
    "--start <seconds>",
    "Start time of the clip in seconds (integer)",
    parseInt,
  )
  .requiredOption(
    "--duration <seconds>",
    "Duration of the clip in seconds (integer, 30-60 recommended)",
    parseInt,
  )
  .option(
    "--output <path>",
    "Output file path (default: ./clip-[start]-[duration].mp4)",
  )
  .option("--srt <path>", "Path to an SRT caption file to burn into the clip")
  .parse(process.argv);

const opts = program.opts();

(async () => {
  if (!fs.existsSync(opts.input)) {
    console.error(`Input file not found: ${opts.input}`);
    process.exit(1);
  }

  const outputPath =
    opts.output ||
    path.join(
      path.dirname(opts.input),
      `clip-${opts.start}-${opts.duration}.mp4`,
    );

  let srtTmpPath = null;
  if (opts.srt) {
    if (!fs.existsSync(opts.srt)) {
      console.error(`SRT file not found: ${opts.srt}`);
      process.exit(1);
    }
    // Write to /tmp to avoid spaces-in-path issue with ffmpeg subtitles filter
    const srtContent = fs.readFileSync(opts.srt, "utf-8");
    srtTmpPath = writeSrtToTemp(srtContent);
    console.log(`SRT copied to: ${srtTmpPath}`);
  }

  console.log(
    `Extracting clip: ${opts.start}s for ${opts.duration}s from ${opts.input}`,
  );
  console.log(`Output: ${outputPath}`);

  try {
    await extractClip({
      inputPath: opts.input,
      outputPath,
      startSec: opts.start,
      durationSec: opts.duration,
      srtPath: srtTmpPath,
    });
    console.log(`Done. Clip saved to: ${outputPath}`);
  } catch (err) {
    console.error(`Clip extraction failed: ${err.message}`);
    process.exit(1);
  }
})();
