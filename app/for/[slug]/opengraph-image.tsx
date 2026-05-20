import { ImageResponse } from "next/og";
import { audienceDetails } from "@/lib/audience-data";

export const runtime = "edge";
export const alt = "ARC Circadian Optimization Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const audience = audienceDetails[slug];

  if (!audience) {
    return new ImageResponse(
      (
        <div style={{ width: "1200px", height: "630px", background: "#000", display: "flex" }} />
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#000000",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "space-between",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
          padding: "80px",
        }}
      >
        {/* Abstract Circadian Glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            right: "-20%",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(204,255,0,0.06) 0%, transparent 60%)",
          }}
        />

        {/* Left Column: Emoji & Branding */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "38%",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Big Icon */}
            <div
              style={{
                fontSize: "120px",
                lineHeight: 1,
              }}
            >
              {audience.icon}
            </div>

            {/* Title / Name */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                }}
              >
                ARC for {audience.name}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "#CCFF00",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginTop: "8px",
                }}
              >
                Performance Operating System
              </div>
            </div>
          </div>

          {/* Logo Branding */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontSize: "36px",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-1.5px",
              }}
            >
              ARC<span style={{ color: "#CCFF00" }}>.</span>
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#52525b",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Circadian rhythm tracker
            </span>
          </div>
        </div>

        {/* Right Column: Problem and Solution */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "58%",
            zIndex: 10,
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            paddingLeft: "60px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#71717a",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                The Biological Goal
              </span>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.2,
                  letterSpacing: "-0.03em",
                }}
              >
                {audience.title}
              </div>
            </div>

            <p
              style={{
                fontSize: "19px",
                color: "#a1a1aa",
                lineHeight: 1.45,
                margin: 0,
                fontWeight: 500,
              }}
            >
              {audience.description}
            </p>

            {/* Solution Bullet Highlight */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "rgba(204,255,0,0.03)",
                border: "1px solid rgba(204,255,0,0.12)",
                padding: "16px 20px",
                borderRadius: "16px",
              }}
            >
              <span style={{ fontSize: "11px", color: "#CCFF00", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>Circadian Solution</span>
              <span style={{ fontSize: "15px", color: "#e4e4e7", fontWeight: 600, marginTop: "6px", lineHeight: 1.3 }}>
                {audience.arcSolution}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
              padding: "10px 20px",
              borderRadius: "12px",
              alignSelf: "flex-end",
            }}
          >
            <span style={{ fontSize: "13px", color: "#71717a", fontWeight: 700 }}>Optimize yours at</span>
            <span style={{ fontSize: "13px", color: "#CCFF00", fontWeight: 800 }}>arcapp.sbs/for/{slug}</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
