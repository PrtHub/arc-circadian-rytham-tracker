import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ARC: Circadian Rhythm Tracker — Sync Your Biology, Peak Every Day";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(204,255,0,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "200px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(204,255,0,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Top: logo + badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span
            style={{
              fontSize: "32px",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            ARC<span style={{ color: "#CCFF00" }}>.</span>
          </span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#CCFF00",
              background: "rgba(204,255,0,0.12)",
              border: "1px solid rgba(204,255,0,0.3)",
              borderRadius: "100px",
              padding: "4px 14px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Circadian Rhythm Tracker
          </span>
        </div>

        {/* Center: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.0,
              letterSpacing: "-3px",
            }}
          >
            Sync Your Biology.
            <br />
            <span style={{ color: "#CCFF00" }}>Peak Every Day.</span>
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#71717a",
              fontWeight: 400,
              lineHeight: 1.5,
              maxWidth: "640px",
            }}
          >
            Discover your chronotype. Find Peak Focus Windows.
            Optimize caffeine timing. Built on Stanford sleep science.
          </div>
        </div>

        {/* Bottom: stats + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            {[
              { value: "201+", label: "Downloads" },
              { value: "4.8★", label: "App Store" },
              { value: "4", label: "Chronotypes" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 900,
                    color: "#CCFF00",
                    letterSpacing: "-1px",
                  }}
                >
                  {stat.value}
                </span>
                <span style={{ fontSize: "13px", color: "#52525b", fontWeight: 500 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#CCFF00",
              color: "#000000",
              fontSize: "16px",
              fontWeight: 700,
              padding: "14px 28px",
              borderRadius: "100px",
              letterSpacing: "-0.3px",
            }}
          >
            Download on App Store →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
