"use strict";
const { Supadata } = require("@supadata/js");

async function getTranscript(youtubeUrl) {
  const supadata = new Supadata({ apiKey: process.env.SUPADATA_API_KEY });
  const response = await supadata.transcript({
    url: youtubeUrl,
    lang: "en",
    text: true,
    mode: "auto",
  });
  if (response.content) return response.content;
  return pollJob(supadata, response.jobId);
}

async function pollJob(supadata, jobId) {
  let attempts = 0;
  while (attempts < 60) {
    await new Promise((r) => setTimeout(r, 3000));
    const status = await supadata.getJobStatus(jobId);
    if (status.status === "completed") return status.content;
    if (status.status === "failed")
      throw new Error(`Transcript job failed: ${status.error}`);
    attempts++;
  }
  throw new Error("Transcript polling timed out after 3 minutes");
}

async function getTimestampedTranscript(youtubeUrl) {
  const supadata = new Supadata({ apiKey: process.env.SUPADATA_API_KEY });
  const response = await supadata.transcript({
    url: youtubeUrl,
    lang: "en",
    text: false,
    mode: "auto",
  });
  if (response.content) return response.content;
  return pollJob(supadata, response.jobId);
}

module.exports = { getTranscript, getTimestampedTranscript };
