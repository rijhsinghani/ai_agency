"use strict";
const { spawn } = require("child_process");
const ffmpegPath = require("ffmpeg-static");
const { buildVideoFilter, buildAudioArgs } = require("./formatter");

async function extractClip({
  inputPath,
  outputPath,
  startSec,
  durationSec,
  srtPath,
}) {
  const vfFilter = buildVideoFilter(srtPath || null);

  const args = [
    "-ss",
    String(startSec),
    "-i",
    inputPath,
    "-t",
    String(durationSec),
    "-vf",
    vfFilter,
    "-c:v",
    "libx264",
    "-crf",
    "23",
    "-preset",
    "fast",
    ...buildAudioArgs(),
    "-movflags",
    "+faststart",
    "-y",
    outputPath,
  ];

  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegPath, args);
    let stderr = "";
    proc.stderr.on("data", (data) => {
      stderr += data.toString();
    });
    proc.on("close", (code) => {
      if (code === 0) resolve(outputPath);
      else reject(new Error(`ffmpeg exited ${code}: ${stderr.slice(-500)}`));
    });
    proc.on("error", reject);
  });
}

module.exports = { extractClip };
