import mixpanel from "mixpanel-browser";

export const APP_STORE_BASE_URL =
  "https://apps.apple.com/us/app/arc-circadian-rhythm-tracker/id6758214892";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetOrEvent: string | Date,
      params?: Record<string, string | number | boolean | undefined>
    ) => void;
  }
}

/**
 * Build an App Store URL carrying Apple App Analytics campaign attribution (?ct=&mt=8, plus optional pt).
 */
export function buildAppStoreUrl(campaign?: string): string {
  const url = new URL(APP_STORE_BASE_URL);
  url.searchParams.set("mt", "8");

  if (campaign) {
    const clean = campaign
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 40);
    if (clean) {
      url.searchParams.set("ct", clean);
    }
  }

  const providerToken = process.env.NEXT_PUBLIC_APPLE_PT?.trim();
  if (providerToken) {
    url.searchParams.set("pt", providerToken);
  }

  return url.toString();
}

/**
 * Desktop visitors cannot install an iOS app from the browser; route them through the iPhone QR modal.
 */
export function isDesktopBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  return !/iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent);
}

export type AppStoreClickMethod = "direct" | "qr_modal_open" | "qr_modal_fallback";

/**
 * Record App Store CTA intent in both GA4 (for Key Events) and Mixpanel.
 */
export function trackAppStoreClick(
  location: string,
  method: AppStoreClickMethod = "direct"
): void {
  const pagePath = typeof window !== "undefined" ? window.location.pathname : "";

  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "app_store_click", {
        location,
        method,
        page_path: pagePath,
      });
    }
  } catch (e) {
    console.error(e);
  }

  try {
    mixpanel.track("App Store Button Clicked", {
      location,
      method,
      page_path: pagePath,
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * Record Android fallback CTA clicks in both GA4 and Mixpanel.
 */
export function trackAndroidFallbackClick(location: string): void {
  const pagePath = typeof window !== "undefined" ? window.location.pathname : "";

  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "android_fallback_click", {
        location,
        page_path: pagePath,
      });
    }
  } catch (e) {
    console.error(e);
  }

  try {
    mixpanel.track("Android Fallback Clicked", {
      location,
      page_path: pagePath,
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * Record interactive tool share actions for organic distribution attribution.
 */
export function trackShareResult(tool: string, summary: string): void {
  const pagePath = typeof window !== "undefined" ? window.location.pathname : "";

  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "share_tool_result", {
        tool,
        summary,
        page_path: pagePath,
      });
    }
  } catch (e) {
    console.error(e);
  }

  try {
    mixpanel.track("Tool Result Shared", {
      tool,
      summary,
      page_path: pagePath,
    });
  } catch (e) {
    console.error(e);
  }
}
