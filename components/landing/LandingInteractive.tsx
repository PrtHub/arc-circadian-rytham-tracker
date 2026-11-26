"use client";

import { useEffect, useState } from "react";
import { initLanding } from "./landing-engine";
import {
  buildAppStoreUrl,
  isDesktopBrowser,
  trackAppStoreClick,
} from "@/lib/app-store";
import { AppStoreQrModal } from "@/components/AppStoreQrModal";

function deriveLandingLocation(anchor: HTMLAnchorElement): string {
  if (anchor.closest("header")) return "landing_header";
  const sectionId = anchor.closest("section")?.id;
  if (sectionId === "top") return "landing_hero";
  if (sectionId) return `landing_${sectionId}`;
  return "landing_cta";
}

export function LandingInteractive() {
  const [qrState, setQrState] = useState<{ open: boolean; location: string }>({
    open: false,
    location: "landing_cta",
  });

  useEffect(() => {
    initLanding();

    const buttons = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".landing-page a.btn-store")
    );
    const cleanups: Array<() => void> = [];

    buttons.forEach((btn) => {
      const location = deriveLandingLocation(btn);
      btn.href = buildAppStoreUrl(location);

      const onClick = (e: MouseEvent) => {
        if (isDesktopBrowser()) {
          e.preventDefault();
          trackAppStoreClick(location, "qr_modal_open");
          setQrState({ open: true, location });
          return;
        }
        trackAppStoreClick(location, "direct");
      };

      btn.addEventListener("click", onClick);
      cleanups.push(() => btn.removeEventListener("click", onClick));
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <AppStoreQrModal
      open={qrState.open}
      onClose={() => setQrState((prev) => ({ ...prev, open: false }))}
      location={qrState.location}
    />
  );
}
