import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Sameer — AI Operator",
  description:
    "Free guides on the AI systems I use to run service businesses. One-person operations, fully automated.",
  alternates: { canonical: `${SITE_CONFIG.siteUrl}/hub` },
};

export default function HubPage() {
  return (
    <div className="sa-page">
      {/* ── HEADER ── */}
      <header className="sa-header">
        <div className="sa-avatar-wrap">
          <div className="sa-avatar">
            <div className="sa-avatar-inner">
              <Image
                src="/sameer.jpg"
                alt="Sameer Rijhsinghani"
                width={76}
                height={76}
                className="sa-avatar-photo"
                priority
              />
            </div>
          </div>
        </div>

        <p className="sa-header-name">Sameer</p>
        <p className="sa-header-role">AI Operator</p>

        <h1 className="sa-header-headline">
          I help founders under $1M step out of the day-to-day with AI.
        </h1>

        <p
          className="sa-trust-strip"
          aria-label="15 years Fortune 500 product. Fractional AI operator."
        >
          15 YRS FORTUNE-500 PRODUCT
          <span className="sa-sep" aria-hidden="true">
            {" "}
            ·{" "}
          </span>
          FRACTIONAL AI
        </p>
      </header>

      {/* ── GUIDE LIBRARY ── */}
      <section className="sa-section" aria-labelledby="guides-heading">
        <div className="sa-section-eyebrow">
          <span className="sa-eyebrow" id="guides-heading">
            Free Guides
          </span>
        </div>

        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="sa-guide-card"
            aria-label={`Get guide: ${guide.title} — ${guide.outcome}`}
          >
            <div className="sa-guide-card-body">
              <p className="sa-guide-card-title">{guide.title}</p>
              <p className="sa-guide-card-outcome">{guide.outcome}</p>
            </div>
            <span className="sa-btn-outline" aria-hidden="true">
              Get it
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </section>

      {/* ── PROOF STRIP ── */}
      <a
        href="https://github.com/rijhsinghani"
        className="sa-proof-strip"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="See the actual machinery on GitHub"
      >
        <span className="sa-proof-prompt" aria-hidden="true">
          $
        </span>
        <span className="sa-proof-cmd">
          see the actual machinery <strong>on GitHub</strong>
          <span className="sa-cursor" aria-hidden="true" />
        </span>
        <span className="sa-proof-arrow" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </a>

      {/* ── WORK WITH ME (DM + text — no Cal.com booking) ── */}
      <section className="sa-section" aria-labelledby="work-heading">
        <div className="sa-work-card">
          <div className="sa-work-card-inner">
            <h2 className="sa-work-heading" id="work-heading">
              Want it done for you?
            </h2>
            <p className="sa-work-subtext">
              20-minute teardown. I map exactly what to automate first.
            </p>

            <div className="sa-contact-row">
              <a
                href={SITE_CONFIG.igUrl}
                className="sa-btn-outline-cta sa-btn-primary-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                DM me on Instagram
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <p className="sa-contact-alt">
                or{" "}
                <a
                  href={SITE_CONFIG.contactPhoneTel}
                  className="sa-contact-phone-link"
                >
                  text {SITE_CONFIG.contactPhone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER — EMAIL CAPTURE ── */}
      <footer className="sa-footer" aria-label="Newsletter signup">
        <div className="sa-email-card">
          <div className="sa-email-card-inner">
            <p className="sa-email-label">Get the operator note</p>
            <p className="sa-email-helper">Weekly. One idea. No fluff.</p>
            <HubEmailForm />
          </div>
        </div>

        <div className="sa-footer-handle">
          <a
            href={SITE_CONFIG.igUrl}
            className="sa-ig-handle"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram: @${SITE_CONFIG.igHandle}`}
          >
            <svg
              className="sa-ig-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            @{SITE_CONFIG.igHandle}
          </a>
        </div>
      </footer>
    </div>
  );
}

// Inline client component for the footer opt-in form (no guide slug — "operator note" list)
import HubEmailForm from "@/app/components/HubEmailForm";
