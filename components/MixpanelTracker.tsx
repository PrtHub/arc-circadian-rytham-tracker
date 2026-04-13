"use client";

import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

export function MixpanelTracker() {
  useEffect(() => {
    mixpanel.init("35c37bc34233f037da46361ece2459ca", {
      autocapture: true,
      record_sessions_percent: 100,
    });
  }, []);

  return null;
}
