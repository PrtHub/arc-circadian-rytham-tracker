import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// ARC is iPhone-only, so Android visitors get a fallback instead of a dead App Store link.
// The server snapshot is false, so SSR and hydration render the App Store version first.
export function useIsAndroid() {
  return useSyncExternalStore(
    subscribe,
    () => /Android/i.test(navigator.userAgent),
    () => false,
  );
}
