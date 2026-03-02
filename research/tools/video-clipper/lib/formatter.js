"use strict";

function buildVideoFilter(srtPath) {
  const cropScale = "crop=ih*9/16:ih,scale=1080:1920";
  if (!srtPath) return cropScale;
  // CRITICAL: srtPath must already be a /tmp path with no spaces
  const subtitles = `subtitles='${srtPath}':force_style='Fontname=Roc Grotesk,Fontsize=22,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,Outline=2,Alignment=2'`;
  return `${cropScale},${subtitles}`;
}

function buildAudioArgs() {
  return ["-c:a", "aac", "-b:a", "128k"];
}

module.exports = { buildVideoFilter, buildAudioArgs };
