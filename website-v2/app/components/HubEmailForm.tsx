"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Footer opt-in form on the hub page.
 * No guide gate — just captures the email for the "operator note" list.
 * Uses the same /api/guides/subscribe endpoint with a sentinel slug.
 */
export default function HubEmailForm() {
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
        body: JSON.stringify({
          email: email.trim(),
          guideSlug: "operator-note",
          consent: true,
        }),
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

      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg(
        "Couldn't connect. Please check your connection and try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="sa-hub-email-success" role="status">
        You're in. Check your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="sa-email-row"
      aria-label="Operator note newsletter signup"
    >
      <label htmlFor="hub-email" className="sa-sr-only">
        Your email address
      </label>
      <input
        id="hub-email"
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
        {status === "loading" ? "…" : "Subscribe"}
      </button>

      {status === "error" && errorMsg && (
        <p
          className="sa-gate-error"
          role="alert"
          style={{ gridColumn: "1/-1" }}
        >
          {errorMsg}
        </p>
      )}
    </form>
  );
}
