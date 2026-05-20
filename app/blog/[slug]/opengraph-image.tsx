import { ImageResponse } from "next/og";
import { blogPosts } from "@/lib/blog-data";

export const runtime = "edge";
export const alt = "The ARC Journal — Circadian Rhythm Optimization";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
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
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
          padding: "80px",
        }}
      >
        {/* Dynamic Circadian Wave Background */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1400px",
            height: "800px",
            display: "flex",
            opacity: 0.08,
          }}
        >
          <svg width="1400" height="800" viewBox="0 0 1400 800" fill="none">
            <path
              d="M0 400C100 250 200 250 350 400C500 550 600 550 750 400C900 250 1000 250 1150 400C1300 550 1400 550 1400 400"
              stroke="#CCFF00"
              strokeWidth="3"
            />
            <circle cx="350" cy="400" r="10" fill="#CCFF00" />
            <circle cx="750" cy="400" r="10" fill="#CCFF00" />
            <circle cx="1150" cy="400" r="10" fill="#CCFF00" />
          </svg>
        </div>

        {/* Radial Glows */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(204,255,0,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Top Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", zIndex: 10, width: "100%" }}>
          {/* Category & Read Time Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 900,
                color: "#CCFF00",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: "rgba(204,255,0,0.1)",
                border: "1px solid rgba(204,255,0,0.25)",
                borderRadius: "6px",
                padding: "6px 14px",
              }}
            >
              {post.category}
            </span>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#27272a" }} />
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {post.readTime} Read
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              marginTop: "20px",
              maxWidth: "1000px",
            }}
          >
            {post.title}
          </div>

          {/* Excerpt */}
          <div
            style={{
              fontSize: "22px",
              color: "#a1a1aa",
              maxWidth: "880px",
              lineHeight: 1.4,
              fontWeight: 500,
              marginTop: "16px",
            }}
          >
            {post.excerpt}
          </div>
        </div>

        {/* Bottom branding footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "flex-end",
            zIndex: 10,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "32px",
          }}
        >
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
                fontSize: "13px",
                color: "#52525b",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Circadian rhythm journal
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
              padding: "10px 20px",
              borderRadius: "14px",
            }}
          >
            <span style={{ fontSize: "14px", color: "#a1a1aa", fontWeight: 700 }}>Read full article at</span>
            <span style={{ fontSize: "14px", color: "#CCFF00", fontWeight: 800 }}>arcapp.sbs</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
