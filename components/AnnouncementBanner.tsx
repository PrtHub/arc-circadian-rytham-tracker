"use client";

import { useState } from "react";
import Link from "next/link";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Announcement"
      className="relative z-60 bg-linear-to-r from-[#17263c] via-[#1f3754] to-[#17263c] border-b border-white/10 text-white text-xs py-2.5 px-4"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2.5 text-center font-medium">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-(--accent)/15 border border-(--accent)/30 text-accent font-mono font-bold text-[10px] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            MAJOR UPDATE
          </span>
          <span className="text-zinc-200">
            <strong className="text-white font-bold">ARC 2.0 is coming soon</strong> — Living Light biological adaptation, 100% on-device privacy.
          </span>
          <Link
            href="/#features"
            className="hidden sm:inline-flex items-center gap-1 text-accent hover:underline font-mono font-bold ml-1"
          >
            See what&apos;s new →
          </Link>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors shrink-0"
          aria-label="Dismiss announcement"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
