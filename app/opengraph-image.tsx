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
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Abstract Circadian Wave Background */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1400px",
            height: "800px",
            display: "flex",
            opacity: 0.15,
          }}
        >
          <svg width="1400" height="800" viewBox="0 0 1400 800" fill="none">
            <path
              d="M0 400C100 300 200 300 350 400C500 500 600 500 750 400C900 300 1000 300 1150 400C1300 500 1400 500 1400 400"
              stroke="#CCFF00"
              strokeWidth="2"
              strokeDasharray="10 10"
            />
            <circle cx="350" cy="400" r="8" fill="#CCFF00" />
            <circle cx="750" cy="400" r="8" fill="#CCFF00" />
            <circle cx="1150" cy="400" r="8" fill="#CCFF00" />
          </svg>
        </div>

        {/* Radial Glows */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(204,255,0,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            zIndex: 10,
            gap: "24px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(204,255,0,0.1)",
              border: "1px solid rgba(204,255,0,0.3)",
              borderRadius: "100px",
              padding: "8px 20px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#CCFF00",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#CCFF00",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              The Science of Peak Performance
            </span>
          </div>

          {/* Main Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "96px",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.05em",
                lineHeight: 0.9,
              }}
            >
              Stop Fighting
            </div>
            <div
              style={{
                fontSize: "110px",
                fontWeight: 900,
                color: "#CCFF00",
                letterSpacing: "-0.06em",
                lineHeight: 0.9,
              }}
            >
              Your Biology.
            </div>
          </div>

          {/* Subtext */}
          <p
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              maxWidth: "700px",
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            ARC maps your body&apos;s internal clock to reveal the perfect time to
            focus, rest, and optimize your life.
          </p>
        </div>

        {/* Footer Info */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 72px",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontSize: "42px",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-2px",
              }}
            >
              ARC<span style={{ color: "#CCFF00" }}>.</span>
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#71717a",
                fontWeight: 500,
              }}
            >
              Stanford & Berkeley Physics of Sleep
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "2px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#CCFF00",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Available now
              </span>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                App Store
              </span>
            </div>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #CCFF00 0%, #99cc00 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4L12 20M12 4L18 10M12 4L6 10"
                  stroke="black"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

