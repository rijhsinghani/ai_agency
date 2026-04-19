"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";

type BusinessType =
  | "dental"
  | "salon"
  | "trades"
  | "gym"
  | "real_estate"
  | "cleaning"
  | "law"
  | "tutoring"
  | "other";

const BUSINESS_TYPE_OPTIONS: { value: BusinessType; label: string }[] = [
  { value: "dental", label: "Dental / healthcare" },
  { value: "salon", label: "Salon / spa" },
  { value: "trades", label: "Trades / contractors" },
  { value: "gym", label: "Gym / fitness" },
  { value: "real_estate", label: "Real estate" },
  { value: "cleaning", label: "Cleaning" },
  { value: "law", label: "Law / professional services" },
  { value: "tutoring", label: "Tutoring / education" },
  { value: "other", label: "Other" },
];

type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full bg-zinc-900 border border-zinc-800 focus:border-[#7B2FBE] focus:outline-none text-white rounded-lg px-4 py-3 transition-colors placeholder:text-zinc-600";

export default function LeadForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [businessType, setBusinessType] = useState<BusinessType | "">("");
  const [painPoint, setPainPoint] = useState<string>("");
  const [consent, setConsent] = useState<boolean>(false);
  const [utm, setUtm] = useState<UtmParams>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const next: UtmParams = {};
    const src = params.get("utm_source");
    const med = params.get("utm_medium");
    const camp = params.get("utm_campaign");
    if (src) next.utm_source = src;
    if (med) next.utm_medium = med;
    if (camp) next.utm_campaign = camp;
    setUtm(next);
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setErrorMessage("");

    if (name.trim().length < 2 || name.trim().length > 80) {
      setErrorMessage("Please enter your name (2-80 characters).");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!businessType) {
      setErrorMessage("Please select a business type.");
      return;
    }
    if (painPoint.trim().length < 10 || painPoint.trim().length > 500) {
      setErrorMessage(
        "Please describe your biggest pain point (10-500 characters).",
      );
      return;
    }
    if (!consent) {
      setErrorMessage("Please agree to be contacted.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          business_type: businessType,
          biggest_pain_point: painPoint.trim(),
          consent: true,
          source: "sameerautomations.com",
          ...utm,
        }),
      });

      const data: { ok?: boolean; error?: string } = await response
        .json()
        .catch(() => ({ ok: false, error: "Unexpected server response." }));

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ||
            "Couldn't submit, please email sameer@rajphotovideo.com directly.",
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Couldn't submit, please email sameer@rajphotovideo.com directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
        className="mt-10 w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 p-10 text-center"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#7B2FBE]/15 ring-1 ring-[#7B2FBE]/40">
          <svg
            className="h-7 w-7 text-[#9B4FDE]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-white">
          Got it, Sameer will reply within 24 hours.
        </h3>
        <p className="mt-3 text-sm text-zinc-400">
          Keep an eye on your inbox &mdash; replies come from{" "}
          <span className="text-zinc-200">sameer@rajphotovideo.com</span>.
        </p>
      </motion.div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-10 w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 text-left sm:p-8"
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="lf-name"
            className="block text-sm font-medium text-zinc-300"
          >
            Name
          </label>
          <input
            id="lf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your full name"
            disabled={submitting}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="lf-email"
            className="block text-sm font-medium text-zinc-300"
          >
            Email
          </label>
          <input
            id="lf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@company.com"
            disabled={submitting}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="lf-business"
            className="block text-sm font-medium text-zinc-300"
          >
            Business type
          </label>
          <select
            id="lf-business"
            name="business_type"
            required
            value={businessType}
            onChange={(e) =>
              setBusinessType(e.target.value as BusinessType | "")
            }
            className={inputClass}
            disabled={submitting}
          >
            <option value="" disabled>
              Select your industry
            </option>
            {BUSINESS_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="lf-pain"
            className="block text-sm font-medium text-zinc-300"
          >
            Biggest pain point
          </label>
          <textarea
            id="lf-pain"
            name="biggest_pain_point"
            required
            minLength={10}
            maxLength={500}
            rows={4}
            value={painPoint}
            onChange={(e) => setPainPoint(e.target.value)}
            className={`${inputClass} resize-y`}
            placeholder="What's the biggest growth bottleneck in your business right now?"
            disabled={submitting}
          />
          <p className="text-xs text-zinc-500">{painPoint.trim().length}/500</p>
        </div>

        <div className="flex items-start gap-3 pt-1">
          <input
            id="lf-consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-[#7B2FBE] focus:ring-[#7B2FBE]"
            disabled={submitting}
            required
          />
          <label htmlFor="lf-consent" className="text-sm text-zinc-400">
            I agree to be contacted about my inquiry.
          </label>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#7B2FBE] hover:bg-[#9B4FDE] text-white font-medium px-8 py-3 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Book a free growth audit"}
        </button>
        {errorMessage && (
          <p className="mt-3 text-sm text-red-400" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
