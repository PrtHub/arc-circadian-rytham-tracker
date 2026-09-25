"use client";

import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

// Tracks "Section Viewed" once per landing section, so Mixpanel can chart how far visitors scroll
// before the App Store tap. A section counts once its top edge crosses the middle of the viewport.
export function SectionViewTracker() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          const section =
            el.id || el.getAttribute("aria-labelledby") || el.getAttribute("aria-label") || "unknown";
          try {
            mixpanel.track("Section Viewed", { section });
          } catch (e) {
            console.error(e);
          }
        }
      },
      { rootMargin: "0px 0px -50% 0px" }
    );

    document.querySelectorAll("main > section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
