import { ImageResponse } from "next/og";
import { chronotypeDetails } from "@/lib/chronotype-data";

export const runtime = "edge";
export const alt = "ARC Chronotype Sleep Schedule Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chronotype = chronotypeDetails[slug];

  if (!chronotype) {
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
        {/* Glowing Background Ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1000px",
            height: "1000px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(204,255,0,0.06) 0%, transparent 60%)",
          }}
        />

        {/* Left Column: Emoji & Key stats */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "40%",
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
              {chronotype.icon}
            </div>

            {/* Name & Percentage */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div
                style={{
                  fontSize: "56px",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.04em",
                }}
              >
                The {chronotype.name}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#CCFF00",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {chronotype.populationPercentage} of Population
              </div>
            </div>
          </div>

          {/* Logo Branding */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
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
              Circadian Chronotype Guide
            </span>
          </div>
        </div>

        {/* Right Column: Schedule & Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "55%",
            zIndex: 10,
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            paddingLeft: "60px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#a1a1aa",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                Profile Tagline
              </span>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#CCFF00",
                  lineHeight: 1.2,
                }}
              >
                &ldquo;{chronotype.tagline}&rdquo;
              </div>
            </div>

            <p
              style={{
                fontSize: "19px",
                color: "#d4d4d8",
                lineHeight: 1.4,
                margin: 0,
                fontWeight: 500,
              }}
            >
              {chronotype.description}
            </p>

            {/* Ideal Schedule Indicators */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "10px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  padding: "12px 18px",
                  borderRadius: "12px",
                  minWidth: "150px",
                }}
              >
                <span style={{ fontSize: "11px", color: "#71717a", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Ideal Wake</span>
                <span style={{ fontSize: "16px", color: "#fff", fontWeight: 800, marginTop: "4px" }}>{chronotype.idealSchedule.wake}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  padding: "12px 18px",
                  borderRadius: "12px",
                  minWidth: "150px",
                }}
              >
                <span style={{ fontSize: "11px", color: "#71717a", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Peak Focus</span>
                <span style={{ fontSize: "16px", color: "#fff", fontWeight: 800, marginTop: "4px" }}>{chronotype.idealSchedule.focus}</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(204,255,0,0.08)",
              border: "1px solid rgba(204,255,0,0.15)",
              padding: "10px 20px",
              borderRadius: "12px",
              alignSelf: "flex-end",
            }}
          >
            <span style={{ fontSize: "13px", color: "#a1a1aa", fontWeight: 700 }}>Find yours at</span>
            <span style={{ fontSize: "13px", color: "#CCFF00", fontWeight: 800 }}>arcapp.sbs/chronotype/{slug}</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
