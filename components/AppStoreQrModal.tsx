"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { buildAppStoreUrl, trackAppStoreClick } from "@/lib/app-store";

interface AppStoreQrModalProps {
  open: boolean;
  onClose: () => void;
  location: string;
  headline?: string;
  subtitle?: string;
}

/**
 * Desktop bridge modal displaying a scannable App Store QR code so laptop/desktop visitors
 * can install ARC directly on their iPhone without hitting a dead-end App Store webpage.
 */
export function AppStoreQrModal({
  open,
  onClose,
  location,
  headline = "Scan with your iPhone camera",
  subtitle = "Point your iPhone camera at this QR code to open ARC directly on the App Store.",
}: AppStoreQrModalProps) {
  const [qrSvg, setQrSvg] = useState<string>("");
  const appStoreUrl = buildAppStoreUrl(location);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    QRCode.toString(appStoreUrl, {
      type: "svg",
      width: 240,
      margin: 2,
      color: { dark: "#070A18", light: "#FFFFFF" },
    })
      .then((svg) => {
        if (!cancelled) setQrSvg(svg);
      })
      .catch((err) => {
        console.error("Failed to generate App Store QR code:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [open, appStoreUrl]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="arc-qr-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md rounded-3xl bg-[#0c1228] border border-white/15 p-7 sm:p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.75)] text-[#FDF6EC] font-sans">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close QR code dialog"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[#C3BACB] hover:text-white flex items-center justify-center transition-colors text-sm cursor-pointer"
        >
          ✕
        </button>

        <span className="inline-block px-3 py-1 rounded-full bg-[#FFD9A0]/10 border border-[#FFD9A0]/25 text-[#FFD9A0] text-[11px] font-mono font-bold uppercase tracking-widest mb-4">
          ARC for iPhone · iOS 16.4+
        </span>

        <h3
          id="arc-qr-modal-title"
          className="text-2xl font-black tracking-tight text-white mb-2"
        >
          {headline}
        </h3>

        <p className="text-sm text-[#C3BACB] leading-relaxed mb-6">
          {subtitle}
        </p>

        <div className="w-56 h-56 mx-auto bg-white p-3 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden mb-5">
          {qrSvg ? (
            <div
              className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
              role="img"
              aria-label="QR code to download ARC on the Apple App Store"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
          ) : (
            <span className="text-xs font-mono text-zinc-500">Generating QR…</span>
          )}
        </div>

        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackAppStoreClick(location, "qr_modal_fallback")}
          className="inline-block text-xs font-mono font-bold text-[#FFD9A0] hover:text-white hover:underline transition-colors"
        >
          Or open the App Store web page →
        </a>

        <p className="mt-4 pt-4 border-t border-white/10 text-[11px] text-[#C3BACB]/75 font-mono">
          Free setup · No account · No wearable
        </p>
      </div>
    </div>
  );
}
