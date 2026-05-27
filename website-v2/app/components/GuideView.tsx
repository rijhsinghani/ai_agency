"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Guide } from "@/lib/guides";
import GuideEmailGate from "./GuideEmailGate";
import GuideContent from "./GuideContent";

interface Props {
  guide: Guide;
}

const STORAGE_KEY_PREFIX = "sa_guide_unlocked_";

function storageKey(slug: string) {
  return `${STORAGE_KEY_PREFIX}${slug}`;
}

export default function GuideView({ guide }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Check localStorage for a prior unlock of this guide
  useEffect(() => {
    try {
      const val = localStorage.getItem(storageKey(guide.slug));
      if (val === "1") setUnlocked(true);
    } catch {
      // localStorage unavailable (private mode etc.) — stay gated
    }
    setHydrated(true);
  }, [guide.slug]);

  function handleUnlock() {
    try {
      localStorage.setItem(storageKey(guide.slug), "1");
    } catch {
      // ignore
    }
    setUnlocked(true);
  }

  return (
    <div className="sa-page">
      {/* Back link */}
      <nav className="sa-guide-nav" aria-label="Breadcrumb">
        <Link href="/hub" className="sa-back-link">
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
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All guides
        </Link>
      </nav>

      {/* Guide header — always visible */}
      <header className="sa-guide-header">
        <span className="sa-eyebrow">Free Guide</span>
        <h1 className="sa-guide-title">{guide.title}</h1>
        <p className="sa-guide-outcome">{guide.outcome}</p>
        <p className="sa-guide-meta">{guide.readTime}</p>
      </header>

      {/* Summary — always visible (light gate: summary shown, email unlocks full read) */}
      <div className="sa-guide-summary">
        <p>{guide.summary}</p>
      </div>

      {/* Gate / content — wait for hydration to avoid flash */}
      {!hydrated ? null : unlocked ? (
        <GuideContent content={guide.content} />
      ) : (
        <GuideEmailGate guideSlug={guide.slug} onUnlock={handleUnlock} />
      )}
    </div>
  );
}
