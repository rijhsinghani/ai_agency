"use client";

import { useState } from "react";

interface Props {
  guideSlug: string;
  onUnlock: () => void;
}

type Status = "idle" | "loading" | "error";

export default function GuideEmailGate({ guideSlug, onUnlock }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/guides/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), guideSlug, consent: true }),
      });

      const json = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setErrorMsg(
          json.error ??
            "Something went wrong. Please try again or DM @sameer_rijhsinghani.",
        );
        setStatus("error");
        return;
      }

      // Success — unlock the guide
      onUnlock();
    } catch {
      setErrorMsg(
        "Couldn't connect. Please check your connection and try again.",
      );
      setStatus("error");
    }
  }

  return (
    <div className="sa-gate-card">
      <div className="sa-gate-card-inner">
        <p className="sa-gate-label">Enter your email to read the full guide</p>
        <p className="sa-gate-helper">
          You'll also get the operator note — one idea a week, no fluff.
        </p>

        <form
          onSubmit={handleSubmit}
          className="sa-email-row"
          aria-label="Unlock guide with email"
        >
          <label htmlFor="gate-email" className="sa-sr-only">
            Your email address
          </label>
          <input
            id="gate-email"
            className="sa-email-input"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
          />
          <button
            type="submit"
            className="sa-btn-primary"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending…" : "Unlock"}
          </button>
        </form>

        {status === "error" && errorMsg && (
          <p className="sa-gate-error" role="alert">
            {errorMsg}
          </p>
        )}

        <p className="sa-gate-consent">No spam. Unsubscribe any time.</p>
      </div>
    </div>
  );
}
