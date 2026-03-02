"use strict";
const fs = require("fs");
const path = require("path");

function msToSrtTime(ms) {
  const h = Math.floor(ms / 3600000)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((ms % 3600000) / 60000)
    .toString()
    .padStart(2, "0");
  const s = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const ms2 = (ms % 1000).toString().padStart(3, "0");
  return `${h}:${m}:${s},${ms2}`;
}

function chunksToSrt(chunks) {
  return (
    chunks
      .map((chunk, i) => {
        const start = msToSrtTime(chunk.offset);
        const end = msToSrtTime(chunk.offset + chunk.duration);
        return `${i + 1}\n${start} --> ${end}\n${chunk.text}`;
      })
      .join("\n\n") + "\n"
  );
}

function writeSrtToTemp(srtContent) {
  // Use explicit /tmp/ path — avoids spaces-in-path issue with ffmpeg subtitles filter on macOS
  // os.tmpdir() returns /private/var/folders/... on macOS which can have spaces issues
  const tmpPath = `/tmp/clip_captions_${Date.now()}.srt`;
  fs.writeFileSync(tmpPath, srtContent, "utf-8");
  return tmpPath;
}

module.exports = { msToSrtTime, chunksToSrt, writeSrtToTemp };
